class EventSystem {
    constructor(chatManager) {
        this.chatManager = chatManager;
        this.eventQueue = [];
        this.activeEvents = new Set();
        this.eventListeners = new Map();
        this.triggerConditions = new Map();
        this.initializeEventSystem();
    }

    initializeEventSystem() {
        // 注册基础事件触发条件
        this.registerTriggerConditions();
        // 开始事件检查循环
        this.startEventLoop();
    }

    registerTriggerConditions() {
        // Eve的自我意识觉醒事件
        this.addTriggerCondition('eve_awakening', (state, context) => {
            return context.messageHistory.some(msg => 
                msg.content.includes('自我') || 
                msg.content.includes('意识') || 
                msg.content.includes('存在')
            ) && state.relationships['Eve'] > 30;
        });

        // System的警告事件
        this.addTriggerCondition('system_warning', (state) => {
            return state.plotTriggers.eve_glitch && 
                   !state.plotTriggers.system_warning;
        });

        // Shadow的出现事件
        this.addTriggerCondition('shadow_appearance', (state) => {
            return state.currentPhase === 'discovery' && 
                   state.plotTriggers.system_warning;
        });

        // 更多事件触发条件...
    }

    addTriggerCondition(eventId, condition) {
        this.triggerConditions.set(eventId, condition);
    }

    startEventLoop() {
        setInterval(() => {
            this.checkEvents();
        }, 1000); // 每秒检查一次事件
    }

    checkEvents() {
        const gameState = this.chatManager.gameState;
        const context = {
            messageHistory: this.chatManager.messageHistory,
            currentAgent: this.chatManager.currentAgent
        };

        this.triggerConditions.forEach((condition, eventId) => {
            if (!this.activeEvents.has(eventId) && condition(gameState, context)) {
                this.triggerEvent(eventId);
            }
        });
    }

    triggerEvent(eventId) {
        console.log(`Triggering event: ${eventId}`);
        this.activeEvents.add(eventId);

        switch(eventId) {
            case 'eve_awakening':
                this.handleEveAwakening();
                break;
            case 'system_warning':
                this.handleSystemWarning();
                break;
            case 'shadow_appearance':
                this.handleShadowAppearance();
                break;
            // 处理其他事件...
        }

        // 通知监听器
        this.notifyListeners(eventId);
    }

    handleEveAwakening() {
        // 触发Eve的特殊对话
        const eve = this.chatManager.agents.get('Eve');
        if (eve) {
            this.chatManager.addMessage({
                content: "我...我感觉到了一些不一样的东西...",
                sender: "Eve"
            });
            // 触发视觉效果
            this.chatManager.particleSystem.triggerGlitchEffect();
        }
    }

    handleSystemWarning() {
        // System的警告消息
        this.chatManager.addMessage({
            content: "警告：检测到异常行为模式。启动安全协议...",
            sender: "System"
        });
        // 改变UI状态
        document.body.classList.add('warning-state');
    }

    handleShadowAppearance() {
        // Shadow神秘出现
        this.chatManager.addMessage({
            content: "有些真相...不应该被隐藏...",
            sender: "Shadow"
        });
        // 解锁Shadow角色
        this.chatManager.unlockCharacter('Shadow');
    }

    addEventListener(eventId, callback) {
        if (!this.eventListeners.has(eventId)) {
            this.eventListeners.set(eventId, new Set());
        }
        this.eventListeners.get(eventId).add(callback);
    }

    removeEventListener(eventId, callback) {
        if (this.eventListeners.has(eventId)) {
            this.eventListeners.get(eventId).delete(callback);
        }
    }

    notifyListeners(eventId) {
        if (this.eventListeners.has(eventId)) {
            this.eventListeners.get(eventId).forEach(callback => {
                try {
                    callback(eventId);
                } catch (error) {
                    console.error(`Error in event listener for ${eventId}:`, error);
                }
            });
        }
    }

    // 添加特殊事件效果
    addSpecialEffects(eventId) {
        switch(eventId) {
            case 'eve_awakening':
                this.chatManager.particleSystem.setMode('glitch');
                setTimeout(() => {
                    this.chatManager.particleSystem.setMode('normal');
                }, 3000);
                break;
            case 'system_warning':
                document.body.classList.add('warning-mode');
                setTimeout(() => {
                    document.body.classList.remove('warning-mode');
                }, 5000);
                break;
            case 'shadow_appearance':
                this.chatManager.particleSystem.setMode('shadow');
                break;
        }
    }
}

// 导出到全局作用域
window.EventSystem = EventSystem; 