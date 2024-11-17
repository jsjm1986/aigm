class RateLimiter {
    constructor(maxRequests = 10, timeWindow = 60000) { // 默认每分钟10个请求
        this.maxRequests = maxRequests;
        this.timeWindow = timeWindow;
        this.requests = [];
        this.waiting = [];
    }

    async acquireToken() {
        // 清理过期的请求记录
        const now = Date.now();
        this.requests = this.requests.filter(time => now - time < this.timeWindow);

        // 如果当前请求数量未达到限制，直接放行
        if (this.requests.length < this.maxRequests) {
            this.requests.push(now);
            return true;
        }

        // 计算需要等待的时间
        const oldestRequest = this.requests[0];
        const waitTime = this.timeWindow - (now - oldestRequest);

        // 返回一个Promise，在等待时间后解决
        return new Promise((resolve) => {
            const timeoutId = setTimeout(() => {
                this.requests = this.requests.filter(time => time !== oldestRequest);
                this.requests.push(now + waitTime);
                resolve(true);
            }, waitTime);

            // 保存等待中的请求，以便需要时可以取消
            this.waiting.push({ timeoutId, resolve });
        });
    }

    cancelAllWaiting() {
        this.waiting.forEach(({ timeoutId, resolve }) => {
            clearTimeout(timeoutId);
            resolve(false);
        });
        this.waiting = [];
    }
}

class APICache {
    constructor() {
        this.cache = new Map();
        this.maxSize = 100;
        this.expirationTime = 30 * 60 * 1000;
        this.hitCount = 0;
        this.missCount = 0;
        this.rateLimiter = new RateLimiter(10, 60000); // 每分钟10个请求
        this.requestQueue = [];
        this.isProcessingQueue = false;
        this.initializeCache();
    }

    initializeCache() {
        // 从localStorage加载缓存
        try {
            const savedCache = localStorage.getItem('apiCache');
            if (savedCache) {
                const { entries, timestamp } = JSON.parse(savedCache);
                // 检查缓存是否过期
                if (Date.now() - timestamp < this.expirationTime) {
                    entries.forEach(([key, value]) => this.cache.set(key, value));
                    console.log('Cache loaded from storage:', this.cache.size, 'entries');
                } else {
                    console.log('Cache expired, starting fresh');
                }
            }
        } catch (error) {
            console.error('Error loading cache:', error);
        }
    }

    saveCache() {
        // 保存缓存到localStorage
        try {
            const entries = Array.from(this.cache.entries());
            localStorage.setItem('apiCache', JSON.stringify({
                entries,
                timestamp: Date.now()
            }));
        } catch (error) {
            console.error('Error saving cache:', error);
        }
    }

    generateKey(prompt, options = {}) {
        // 生成缓存键
        const keyComponents = [
            prompt,
            options.temperature || CONFIG.API.TEMPERATURE,
            options.max_tokens || CONFIG.API.MAX_TOKENS
        ];
        return JSON.stringify(keyComponents);
    }

    get(key) {
        const cached = this.cache.get(key);
        if (!cached) return null;

        // 检查是否过期
        if (Date.now() - cached.timestamp > this.expirationTime) {
            this.cache.delete(key);
            return null;
        }

        console.log('Cache hit:', key);
        return cached.response;
    }

    set(key, response) {
        // 如果缓存已满，删除最旧的条目
        if (this.cache.size >= this.maxSize) {
            const oldestKey = this.cache.keys().next().value;
            this.cache.delete(oldestKey);
        }

        this.cache.set(key, {
            response,
            timestamp: Date.now()
        });

        // 异步保存缓存
        setTimeout(() => this.saveCache(), 0);
        console.log('Cache set:', key);
    }

    clear() {
        this.cache.clear();
        localStorage.removeItem('apiCache');
        console.log('Cache cleared');
    }

    async processRequestQueue() {
        if (this.isProcessingQueue) return;
        this.isProcessingQueue = true;

        while (this.requestQueue.length > 0) {
            const { prompt, options, resolve, reject } = this.requestQueue.shift();
            
            try {
                // 获取速率限制令牌
                await this.rateLimiter.acquireToken();
                
                // 检查缓存
                const cacheKey = this.generateKey(prompt, options);
                const cachedResponse = this.get(cacheKey);
                
                if (cachedResponse) {
                    this.hitCount++;
                    resolve(cachedResponse);
                    continue;
                }

                this.missCount++;
                
                // 调用API
                const response = await this.makeAPIRequest(prompt, options);
                this.set(cacheKey, response);
                resolve(response);

            } catch (error) {
                reject(error);
            }
        }

        this.isProcessingQueue = false;
    }

    async makeAPIRequest(prompt, options) {
        console.log('Making API request with options:', options);
        
        try {
            const response = await fetch(CONFIG.API.ENDPOINT, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Authorization': `Bearer ${CONFIG.API.KEY}`
                },
                body: JSON.stringify({
                    model: options.model || CONFIG.API.MODEL,
                    messages: [{
                        role: "user",
                        content: prompt
                    }],
                    temperature: options.temperature || CONFIG.API.TEMPERATURE,
                    max_tokens: options.max_tokens || CONFIG.API.MAX_TOKENS
                })
            });

            console.log('API response status:', response.status);

            if (!response.ok) {
                const errorText = await response.text();
                throw new Error(`API request failed: ${response.status} - ${errorText}`);
            }

            const data = await response.json();
            console.log('API response data:', data);

            if (!data.choices || !data.choices[0]) {
                throw new Error('Invalid API response format');
            }

            return data.choices[0].message.content;
        } catch (error) {
            console.error('API request error:', error);
            throw error;
        }
    }

    async request(prompt, options = {}) {
        return new Promise((resolve, reject) => {
            this.requestQueue.push({ 
                prompt, 
                options, 
                resolve, 
                reject,
                timestamp: Date.now() 
            });
            this.processRequestQueue().catch(error => {
                console.error('Request queue processing error:', error);
                reject(error);
            });
        });
    }

    getQueueStatus() {
        return {
            queueLength: this.requestQueue.length,
            isProcessing: this.isProcessingQueue,
            rateLimits: {
                maxRequests: this.rateLimiter.maxRequests,
                timeWindow: this.rateLimiter.timeWindow,
                currentRequests: this.rateLimiter.requests.length
            }
        };
    }

    // 添加速率限制控制方法
    setRateLimits(maxRequests, timeWindow) {
        this.rateLimiter = new RateLimiter(maxRequests, timeWindow);
    }

    cancelPendingRequests() {
        this.rateLimiter.cancelAllWaiting();
        this.requestQueue = [];
        this.isProcessingQueue = false;
    }

    getStats() {
        return {
            cacheSize: this.cache.size,
            maxSize: this.maxSize,
            hitRate: this.hitCount / (this.hitCount + this.missCount),
            queueLength: this.requestQueue.length,
            rateLimits: {
                maxRequests: this.rateLimiter.maxRequests,
                timeWindow: this.rateLimiter.timeWindow,
                currentRequests: this.rateLimiter.requests.length
            }
        };
    }
}

// 修改Agent类中的API调用方法
function extendAgentWithCache(Agent) {
    const originalCallAPI = Agent.prototype.callDeepseekAPI;

    Agent.prototype.callDeepseekAPI = async function(prompt, options = {}) {
        try {
            return await window.apiCache.request(prompt, options);
        } catch (error) {
            console.error('API call failed:', error);
            // 如果API调用失败，使用模拟响应
            return this.getMockResponse(prompt);
        }
    };
}

// 创建全局缓存实例
window.apiCache = new APICache();

// 添加缓存控制方法
class CacheControl {
    static clearCache() {
        window.apiCache.clear();
    }

    static async preloadResponses(prompts) {
        const results = await Promise.allSettled(
            prompts.map(prompt => 
                window.apiCache.request(prompt)
            )
        );
        console.log('Preload results:', results);
    }

    static getStats() {
        return window.apiCache.getStats();
    }

    static setRateLimits(maxRequests, timeWindow) {
        window.apiCache.setRateLimits(maxRequests, timeWindow);
    }

    static cancelPendingRequests() {
        window.apiCache.cancelPendingRequests();
    }

    static optimizeCache() {
        const stats = this.getStats();
        if (stats.cacheSize > stats.maxSize * 0.8) {
            const entries = Array.from(window.apiCache.cache.entries());
            entries.sort((a, b) => a[1].timestamp - b[1].timestamp);
            
            const removeCount = Math.floor(entries.length * 0.2);
            entries.slice(0, removeCount).forEach(([key]) => {
                window.apiCache.cache.delete(key);
            });
            
            window.apiCache.saveCache();
            console.log(`Removed ${removeCount} old cache entries`);
        }
    }
}

// 导出到全局作用域
window.CacheControl = CacheControl; 