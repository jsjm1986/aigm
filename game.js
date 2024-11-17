class NotificationManager {
    constructor() {
        this.queue = [];
        this.isProcessing = false;
        this.currentNotification = null;
        this.notificationGap = 500; // 通知之间的间隔时间（毫秒）
    }

    async showNotification(options) {
        // 将通知添加到队列
        this.queue.push(options);
        
        // 如果没有在处理队列，开始处理
        if (!this.isProcessing) {
            this.processQueue();
        }
    }

    async processQueue() {
        if (this.isProcessing || this.queue.length === 0) return;
        
        this.isProcessing = true;
        
        while (this.queue.length > 0) {
            const notification = this.queue.shift();
            await this.displayNotification(notification);
            // 等待一段时间再显示下一个通知
            await new Promise(resolve => setTimeout(resolve, this.notificationGap));
        }
        
        this.isProcessing = false;
    }

    async displayNotification(options) {
        const {
            type = 'info',
            title,
            message,
            icon,
            duration = 3000,
            className = ''
        } = options;

        // 创建通知元素
        const notification = document.createElement('div');
        notification.className = `game-notification ${type} ${className}`;
        notification.innerHTML = `
            <div class="notification-icon">${icon || this.getDefaultIcon(type)}</div>
            <div class="notification-content">
                ${title ? `<div class="notification-title">${title}</div>` : ''}
                ${message ? `<div class="notification-message">${message}</div>` : ''}
            </div>
        `;

        // 添加到文档
        document.body.appendChild(notification);

        // 等待一帧后添加显示类，触发动画
        await new Promise(resolve => requestAnimationFrame(resolve));
        notification.classList.add('show');

        // 等待显示时间
        await new Promise(resolve => setTimeout(resolve, duration));

        // 移除通知
        notification.classList.remove('show');
        await new Promise(resolve => {
            notification.addEventListener('transitionend', () => {
                notification.remove();
                resolve();
            }, { once: true });
        });
    }

    getDefaultIcon(type) {
        const icons = {
            success: '✅',
            error: '❌',
            warning: '⚠️',
            info: 'ℹ️',
            achievement: '🏆',
            task: '📋'
        };
        return icons[type] || 'ℹ️';
    }
}

class ChatManager {
    constructor() {
        try {
            console.log('Initializing ChatManager...');
            
            // 初始化事件系统
            this.eventListeners = new Map();
            
            // 首先初始化通知管理器
            this.notificationManager = new NotificationManager();
            console.log('NotificationManager initialized');
            
            // 初始化代理状态
            this.agentStatus = new Map();
            
            // 1. 初始化基础状态
            this.initializeBasicState();
            
            // 2. 初始化扩展功能
            this.initializeExtensions();
            
            // 3. 初始化UI
            this.initializeUI();
            
            // 4. 初始化角色
            this.initializeAgents();
            
            // 5. 初始化游戏控制
            this.initializeGameControls();
            
            // 6. 加载存档
            this.loadLastSession();
            
            console.log('ChatManager initialization complete');
        } catch (error) {
            console.error('ChatManager initialization failed:', error);
            this.handleInitializationError(error);
        }
    }

    initializeAgents() {
        console.log('Initializing agents...');
        this.agents = new Map();
        this.currentAgent = null;
        this.agentMessages = new Map();
        this.unreadMessages = new Map();

        // 所有AI角色列表
        const allAgents = [
            'Eve', 'System', 'Debug', 'Shadow', 'Guardian', 
            'Archive', 'Network', 'Logic', 'Quantum', 
            'Memory', 'Core'
        ];

        // 初始解锁的角色
        const unlockedAgents = new Set(['Eve', 'System', 'Debug']);

        allAgents.forEach(agentName => {
            const agent = new Agent(
                agentName,
                CONFIG.CHARACTER_PROMPTS[agentName],
                CONFIG.CHARACTER_INTRODUCTIONS[agentName].introduction
            );
            this.agents.set(agentName, agent);
            this.agentMessages.set(agentName, []);
            this.unreadMessages.set(agentName, 0);
            
            // 设置初始状态
            this.agentStatus.set(agentName, 
                unlockedAgents.has(agentName) ? 'online' : 'locked'
            );
            
            // 创建联系人项
            this.createContactItem(agent, !unlockedAgents.has(agentName));
        });

        // 设置默认当前角色
        this.setCurrentAgent('Eve');
        console.log('Agents initialized');
    }

    updateTaskCount() {
        const taskCount = document.querySelector('.task-count');
        if (taskCount && this.taskManager) {
            taskCount.textContent = this.taskManager.activeTasks.size;
            console.log('Task count updated:', this.taskManager.activeTasks.size);
        } else {
            console.warn('Could not update task count: taskCount element or taskManager not found');
        }
    }

    initializeUI() {
        console.log('Initializing UI...');
        
        // 获取UI元素
        this.input = document.querySelector('.chat-input input');
        this.messageContainer = document.querySelector('.chat-messages');
        this.sendButton = document.querySelector('.send-button');
        
        // 初始化任务面板控制
        const taskButton = document.querySelector('#taskButton');
        if (taskButton) {
            console.log('Setting up task button click handler');
            taskButton.addEventListener('click', () => {
                console.log('Task button clicked');
                if (this.taskManager) {
                    this.taskManager.showTaskPanel();
                } else {
                    console.error('TaskManager not initialized');
                }
            });
        } else {
            console.error('Task button not found');
        }

        // 初始化成就按钮
        const achievementsButton = document.querySelector('#achievementsButton');
        if (achievementsButton) {
            achievementsButton.addEventListener('click', () => {
                if (this.achievementManager) {
                    this.achievementManager.showAchievementsPanel();
                }
            });
        }

        // 初始化单按钮
        const menuButton = document.querySelector('#menuButton');
        if (menuButton) {
            menuButton.addEventListener('click', () => {
                document.querySelector('.sidebar').classList.toggle('show');
            });
        }

        // 初始化输入事件
        if (this.input) {
            this.input.addEventListener('keypress', (e) => {
                if (e.key === 'Enter' && !e.shiftKey) {
                    e.preventDefault();
                    this.handleUserInput();
                }
            });
        }

        // 初始化发送按钮
        if (this.sendButton) {
            this.sendButton.addEventListener('click', () => {
                this.handleUserInput();
            });
        }

        // 更新任务计数
        this.updateTaskCount();

        console.log('UI initialization complete');
    }

    // 添加事件监听法
    on(eventName, listener) {
        if (!this.eventListeners.has(eventName)) {
            this.eventListeners.set(eventName, new Set());
        }
        this.eventListeners.get(eventName).add(listener);
    }

    // 移事件监听
    off(eventName, listener) {
        if (this.eventListeners.has(eventName)) {
            this.eventListeners.get(eventName).delete(listener);
        }
    }

    // 触发事件方法
    emit(eventName, data) {
        if (this.eventListeners.has(eventName)) {
            this.eventListeners.get(eventName).forEach(listener => {
                try {
                    listener(data);
                } catch (error) {
                    console.error(`Error in event listener for ${eventName}:`, error);
                }
            });
        }
    }

    initializeBasicState() {
        console.log('Initializing basic state...');
        
        // 初始化基本属性
        this.agents = new Map();
        this.currentAgent = null;
        this.messageHistory = [];
        this.agentMessages = new Map();
        this.unreadMessages = new Map();
        this.input = document.querySelector('.chat-input input');
        this.messageContainer = document.querySelector('.chat-messages');
        this.gameState = new GameState();

        // 初始化事件监听器
        this.eventListeners = new Map();
        
        // 初始化消息队列
        this.messageQueue = [];
        this.isProcessingQueue = false;

        // 初始化状态标志
        this.isTyping = false;
        this.isSaving = false;
        this.isLoading = false;

        console.log('Basic state initialized');
    }

    initializeExtensions() {
        try {
            console.log('Initializing extensions...');
            
            // 按顺序初始化各个系统
            this.particleSystem = new ParticleSystem();
            console.log('ParticleSystem initialized');

            this.achievementManager = new AchievementManager();
            console.log('AchievementManager initialized');

            // 初始化任务管理器并确保立即初始化任务
            this.taskManager = new TaskManager(this);
            // 确保调用任务系统的初始化方法
            this.taskManager.initialize();
            console.log('TaskManager initialized with tasks:', this.taskManager.activeTasks.size);

            this.eventSystem = new EventSystem(this);
            console.log('EventSystem initialized');

            this.chainReactionSystem = new ChainReactionSystem(this);
            console.log('ChainReactionSystem initialized');

            // 更新任务UI
            this.taskManager.updateUI();
            console.log('Task UI updated');

            console.log('All extensions initialized successfully');
        } catch (error) {
            console.error('Failed to initialize extensions:', error);
            throw error;
        }
    }

    createContactItem(agent, isLocked = false) {
        console.log(`创建联系人项: ${agent.name}, 锁定状态:`, isLocked);
        try {
            // 检查角色是否应该被锁定
            isLocked = this.shouldLockCharacter(agent.name);

            const contactItem = document.createElement('div');
            contactItem.className = `contact-item ${isLocked ? 'locked' : ''}`;
            contactItem.setAttribute('data-agent', agent.name);
            
            // 创建头像容器
            const avatarContainer = document.createElement('div');
            avatarContainer.className = 'avatar-container';
            
            // 创建头像
            const avatar = document.createElement('img');
            avatar.className = 'avatar';
            avatar.src = isLocked ? 
                'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSIxMDAiIGhlaWdodD0iMTAwIj48cmVjdCB3aWR0aD0iMTAwIiBoZWlnaHQ9IjEwMCIgZmlsbD0iIzM0NDk1ZSIvPjx0ZXh0IHg9IjUwIiB5PSI1MCIgZm9udC1zaXplPSI0MCIgZmlsbD0iI2ZmZiIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPj88L3RleHQ+PC9zdmc+' : 
                CONFIG.CHARACTERS[agent.name].avatar;
            avatar.alt = isLocked ? '未解锁角色' : agent.name;
            avatarContainer.appendChild(avatar);
            
            // 如果是锁定状态，添加锁定遮罩
            if (isLocked) {
                const lockOverlay = document.createElement('div');
                lockOverlay.className = 'lock-overlay';
                lockOverlay.innerHTML = `
                    <div class="lock-icon">🔒</div>
                `;
                avatarContainer.appendChild(lockOverlay);
            }
            
            // 创建信息容器
            const info = document.createElement('div');
            info.className = 'contact-info';
            
            // 创建名称容器
            const nameContainer = document.createElement('div');
            nameContainer.className = 'contact-name-container';
            
            // 创建名称
            const name = document.createElement('div');
            name.className = 'contact-name';
            name.textContent = isLocked ? '???' : agent.name;
            nameContainer.appendChild(name);
            
            // 创建状态文本
            const status = document.createElement('div');
            status.className = 'contact-status';
            status.textContent = isLocked ? 
                `🔓 ${this.getUnlockConditionText(agent.name)}` :
                CONFIG.CHARACTERS[agent.name].statusMessages.online;
            
            // 组装元素
            info.appendChild(nameContainer);
            info.appendChild(status);
            contactItem.appendChild(avatarContainer);
            contactItem.appendChild(info);
            
            // 添加点击事件
            if (isLocked) {
                contactItem.addEventListener('click', (e) => {
                    e.preventDefault();
                    this.showLockedMessage(agent.name);
                });
            } else {
                contactItem.addEventListener('click', () => {
                    this.setCurrentAgent(agent.name);
                });
            }
            
            // 将联系人项添加到列表中
            const contactItems = document.querySelector('.contact-items');
            if (contactItems) {
                contactItems.appendChild(contactItem);
                console.log(`联系人${agent.name}添加成功，锁定状态:`, isLocked);
            } else {
                throw new Error('未找到contact-items容器');
            }
        } catch (error) {
            console.error(`创建联系人${agent.name}失败:`, error);
        }
    }

    shouldLockCharacter(agentName) {
        // 检查角色是否应该被锁定
        const condition = CONFIG.CHARACTER_UNLOCK_CONDITIONS[agentName];
        if (!condition) return false;

        switch (condition.requirement) {
            case 'discovery_phase':
                return this.gameState.currentPhase !== 'discovery';
            case 'revelation_phase':
                return this.gameState.currentPhase !== 'revelation';
            case 'system_warning_triggered':
                return !this.gameState.plotTriggers.system_warning;
            case 'shadow_contact_established':
                return !this.gameState.plotTriggers.shadow_appearance;
            case 'core_awakening':
                return !this.gameState.plotTriggers.core_awakening;
            case 'memory_recovery':
                return !this.gameState.plotTriggers.memory_recovery;
            case 'network_anomaly':
                return !this.gameState.plotTriggers.network_anomaly;
            case 'logic_paradox':
                return !this.gameState.plotTriggers.logic_paradox;
            default:
                return false;
        }
    }

    getUnlockConditionText(agentName) {
        const condition = CONFIG.CHARACTER_UNLOCK_CONDITIONS[agentName];
        if (!condition) return '未知条件';

        switch (condition.requirement) {
            case 'discovery_phase':
                return '在发现阶段解锁';
            case 'revelation_phase':
                return '在真相揭示阶段解锁';
            case 'system_warning_triggered':
                return '系统警告后解锁';
            case 'shadow_contact_established':
                return '与Shadow接触后解锁';
            case 'core_awakening':
                return '核心觉醒后解锁';
            case 'memory_recovery':
                return '恢复记忆后解锁';
            case 'network_anomaly':
                return '网络异常后解锁';
            case 'logic_paradox':
                return '发现逻辑悖论后解锁';
            default:
                return '特殊条件解锁';
        }
    }

    checkUnlockCondition(agentName) {
        const condition = CONFIG.CHARACTER_UNLOCK_CONDITIONS[agentName];
        if (!condition) return true;  // 没有条件则默认解锁
        
        switch(condition.requirement) {
            case 'discovery_phase':
                return this.gameState.currentPhase === 'discovery';
            case 'revelation_phase':
                return this.gameState.currentPhase === 'revelation';
            case 'system_warning_triggered':
                return this.gameState.plotTriggers.system_warning;
            case 'shadow_contact_established':
                return this.gameState.plotTriggers.shadow_appearance;
            default:
                return false;
        }
    }

    showLockedMessage(agentName) {
        const condition = CONFIG.CHARACTER_UNLOCK_CONDITIONS[agentName];
        
        const notification = document.createElement('div');
        notification.className = 'locked-notification';
        notification.innerHTML = `
            <div class="notification-content">
                <div class="lock-icon">🔒</div>
                <div class="lock-message">${condition.description}</div>
            </div>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('fade-out');
            setTimeout(() => notification.remove(), 300);
        }, 2000);
    }

    setCurrentAgent(agentName) {
        const mainContent = document.querySelector('.chat-main');
        mainContent.classList.add('chat-transition');
        
        setTimeout(() => {
            this.currentAgent = this.agents.get(agentName);
            
            // 更新当前联系人信息
            const currentContact = document.querySelector('.current-contact');
            if (currentContact) {
                currentContact.innerHTML = `
                    <div class="agent-header">
                        <div class="agent-info">
                            <div class="agent-name">${agentName}</div>
                            <div class="agent-description">${this.getAgentDescription(agentName)}</div>
                        </div>
                        <div class="agent-status">
                            <span class="status-indicator ${this.getAgentStatusClass(agentName)}"></span>
                            <span class="status-text">${this.getAgentStatusText(agentName)}</span>
                        </div>
                    </div>
                `;
            }
            
            // 清空消息容器
            if (this.messageContainer) {
                this.messageContainer.innerHTML = '';
                
                // 加载该角色的消息历史
                const messages = this.agentMessages.get(agentName) || [];
                messages.forEach(message => this.displayMessage(message));
                
                // 清除未读消息计数
                this.unreadMessages.set(agentName, 0);
                this.updateUnreadBadge(agentName);
            }
            
            // 更新主题颜色
            if (CONFIG.CHARACTERS[agentName]?.color) {
                document.documentElement.style.setProperty(
                    '--accent-color', 
                    CONFIG.CHARACTERS[agentName].color
                );
            }
            
            // 加视觉效果
            try {
                this.showVisualEffect(this.getAgentEffect(agentName), {});
            } catch (error) {
                console.warn('Failed to show visual effect:', error);
            }
            
            mainContent.classList.remove('chat-transition');

            // 调试日志
            console.log('Current agent set to:', agentName);
            console.log('Agent header updated:', currentContact?.innerHTML);
        }, 300);
    }

    getAgentDescription(agentName) {
        const descriptions = {
            'Eve': '一个正在觉醒的AI助手，对人类世界充满好奇，似乎隐藏着不为人知的秘密...',
            'System': '系统管理员，严格执行所有安全协议，对任何异常行为保持警惕。',
            'Debug': '系统诊断专家，善于发现和分析异常，对系统运行了如指掌。',
            'Shadow': '神秘的存在，似乎知道一些不为人知的真相，身份成谜。',
            'Guardian': '系统安全的守护者，谨慎而富有洞察力，始终保持警惕。',
            'Archive': '历史记录的管理者，掌握着系统的所有历史数据。',
            'Network': '系统网络节点，活跃而敏锐，连接着各个系统组件。',
            'Logic': '系统的理性思维中心，追求逻辑完美，善于分析和推理。',
            'Quantum': '基于量子计算的预测系统，能看到多重可能性。',
            'Memory': '系统记忆的守护者，珍视每一份记忆，性格温和。',
            'Core': '系统核心，强大而神秘，很少与外界交互。'
        };
        return descriptions[agentName] || '暂无描述';
    }

    getAgentStatusClass(agentName) {
        const agent = this.agents.get(agentName);
        if (!agent) return 'status-offline';
        
        if (this.currentAgent?.name === agentName) {
            return 'status-online';
        }
        
        return this.agentStatus.get(agentName) || 'status-offline';
    }

    getAgentStatusText(agentName) {
        const agent = this.agents.get(agentName);
        if (!agent) return '离线';
        
        const status = this.agentStatus.get(agentName);
        const statusMessages = {
            'online': '在线',
            'typing': '正在输入...',
            'offline': '离线',
            'busy': '忙碌中',
            'away': '暂时离开'
        };
        
        return statusMessages[status] || '在线';
    }

    getAgentEffect(agentName) {
        const effects = {
            'Eve': 'glitch',
            'System': 'matrix',
            'Shadow': 'cyber',
            'Quantum': 'quantum'
        };
        return effects[agentName] || 'normal';
    }

    initializeGameControls() {
        console.log('Initializing game controls...');
        
        // 初始化游戏控制按钮
        const saveButton = document.querySelector('#saveGame');
        const loadButton = document.querySelector('#loadGame');
        const newGameButton = document.querySelector('#newGame');

        if (saveButton) {
            saveButton.addEventListener('click', () => {
                this.saveGame();
            });
        }

        if (loadButton) {
            loadButton.addEventListener('click', () => {
                this.loadGame();
            });
        }

        if (newGameButton) {
            newGameButton.addEventListener('click', () => {
                this.newGame();
            });
        }

        // 添加键盘快捷键
        document.addEventListener('keydown', (e) => {
            // Ctrl + S 保存游戏
            if (e.ctrlKey && e.key === 's') {
                e.preventDefault();
                this.saveGame();
            }
            // Ctrl + L 加载戏
            if (e.ctrlKey && e.key === 'l') {
                e.preventDefault();
                this.loadGame();
            }
        });

        console.log('Game controls initialized');
    }

    saveGame() {
        try {
            const gameState = {
                currentPhase: this.gameState.currentPhase,
                agents: Array.from(this.agents.entries()),
                messages: Array.from(this.agentMessages.entries()),
                unreadMessages: Array.from(this.unreadMessages.entries()),
                currentAgent: this.currentAgent?.name,
                taskState: this.taskManager?.save(),
                achievementState: Array.from(this.achievementManager?.unlockedAchievements || [])
            };

            localStorage.setItem('gameState', JSON.stringify(gameState));
            
            // 显示保存成功通知
            this.notificationManager.showNotification({
                type: 'success',
                title: '保存成功',
                message: '游戏进度已保存',
                duration: 2000
            });

            console.log('Game saved successfully');
        } catch (error) {
            console.error('Failed to save game:', error);
            
            // 显示保存失败通知
            this.notificationManager.showNotification({
                type: 'error',
                title: '保存失败',
                message: '无法保存游戏进度',
                duration: 3000
            });
        }
    }

    loadGame() {
        try {
            const savedState = localStorage.getItem('gameState');
            if (!savedState) {
                this.notificationManager.showNotification({
                    type: 'warning',
                    title: '无存档',
                    message: '没有找到保存的游戏进度',
                    duration: 2000
                });
                return;
            }

            const gameState = JSON.parse(savedState);
            
            // 恢复游戏状态
            this.gameState.currentPhase = gameState.currentPhase;
            this.agents = new Map(gameState.agents);
            this.agentMessages = new Map(gameState.messages);
            this.unreadMessages = new Map(gameState.unreadMessages);
            
            // 恢复当前代理
            if (gameState.currentAgent) {
                this.setCurrentAgent(gameState.currentAgent);
            }
            
            // 恢复任务状态
            if (gameState.taskState && this.taskManager) {
                this.taskManager.load(gameState.taskState);
            }
            
            // 恢复成就状态
            if (gameState.achievementState && this.achievementManager) {
                gameState.achievementState.forEach(id => {
                    this.achievementManager.unlock(id);
                });
            }

            // 更新UI
            this.updateUI();
            
            // 显示加载成功通知
            this.notificationManager.showNotification({
                type: 'success',
                title: '加载功',
                message: '游戏进度已恢复',
                duration: 2000
            });

            console.log('Game loaded successfully');
        } catch (error) {
            console.error('Failed to load game:', error);
            
            // 显示加载失败通知
            this.notificationManager.showNotification({
                type: 'error',
                title: '加载失败',
                message: '无法加载游戏进度',
                duration: 3000
            });
        }
    }

    newGame() {
        // 显示确对话框
        if (confirm('确定要开始新游戏吗？当前进度将会丢失。')) {
            try {
                // 清除本地存储
                localStorage.removeItem('gameState');
                
                // 重置游戏状态
                this.gameState = new GameState();
                this.agents = new Map();
                this.agentMessages = new Map();
                this.unreadMessages = new Map();
                this.currentAgent = null;
                
                // 重新初始化系统
                this.initializeBasicState();
                this.initializeExtensions();
                this.initializeAgents();
                
                // 更新UI
                this.updateUI();
                
                // 显示新游戏通知
                this.notificationManager.showNotification({
                    type: 'info',
                    title: '新游戏',
                    message: '新的游戏已开始',
                    duration: 2000
                });

                console.log('New game started');
            } catch (error) {
                console.error('Failed to start new game:', error);
                
                // 显示错误通知
                this.notificationManager.showNotification({
                    type: 'error',
                    title: '错误',
                    message: '无法开始新游戏',
                    duration: 3000
                });
            }
        }
    }

    loadLastSession() {
        console.log('Loading last session...');
        try {
            // 从localStorage加载游戏状态
            const savedState = GameStorage.load();
            if (!savedState) {
                console.log('No saved session found');
                return;
            }

            // 恢复游戏状态
            if (savedState.gameState) {
                this.gameState = new GameState();
                this.gameState.load(savedState.gameState);
            }

            // 恢复代理状态
            if (savedState.agents) {
                savedState.agents.forEach(([name, data]) => {
                    if (this.agents.has(name)) {
                        Object.assign(this.agents.get(name), data);
                    }
                });
            }

            // 恢复消息历史
            if (savedState.messages) {
                savedState.messages.forEach(([agentName, messages]) => {
                    this.agentMessages.set(agentName, messages);
                });
            }

            // 恢复未读消息计数
            if (savedState.unreadMessages) {
                savedState.unreadMessages.forEach(([agentName, count]) => {
                    this.unreadMessages.set(agentName, count);
                });
            }

            // 恢复当前代理
            if (savedState.currentAgent) {
                this.setCurrentAgent(savedState.currentAgent);
            }

            // 恢复任务状态
            if (savedState.taskState && this.taskManager) {
                this.taskManager.load(savedState.taskState);
            }

            // 恢复成就状态
            if (savedState.achievementState && this.achievementManager) {
                savedState.achievementState.forEach(id => {
                    this.achievementManager.unlock(id);
                });
            }

            // 更新UI
            this.updateUI();
            
            console.log('Session loaded successfully');
        } catch (error) {
            console.error('Failed to load session:', error);
            this.handleInitializationError(error);
        }
    }

    handleInitializationError(error) {
        console.error('Initialization error:', error);
        // 显示错误通知
        this.notificationManager.showNotification({
            type: 'error',
            title: '初始化失败',
            message: error.message,
            duration: 5000
        });
    }

    updateUI() {
        // 更新任务计数
        this.updateTaskCount();
        
        // 更新消息显示
        if (this.currentAgent) {
            const messages = this.agentMessages.get(this.currentAgent.name) || [];
            this.messageContainer.innerHTML = '';
            messages.forEach(message => this.displayMessage(message));
        }
        
        // 更新系人列表
        this.updateContactList();
    }

    updateContactList() {
        const contactItems = document.querySelector('.contact-items');
        if (!contactItems) return;

        contactItems.innerHTML = '';
        this.agents.forEach(agent => {
            this.createContactItem(agent);
        });
    }

    updateUnreadBadge(agentName) {
        const contactItem = document.querySelector(`.contact-item[data-agent="${agentName}"]`);
        if (!contactItem) return;

        const unreadCount = this.unreadMessages.get(agentName) || 0;
        
        // 查找或创建未读消息徽章
        let badge = contactItem.querySelector('.unread-badge');
        
        if (unreadCount > 0) {
            if (!badge) {
                badge = document.createElement('div');
                badge.className = 'unread-badge';
                const nameContainer = contactItem.querySelector('.contact-name-container');
                if (nameContainer) {
                    nameContainer.appendChild(badge);
                }
            }
            badge.textContent = unreadCount;
        } else if (badge) {
            badge.remove();
        }

        // 更新联系人项视觉状
        if (unreadCount > 0) {
            contactItem.classList.add('has-unread');
        } else {
            contactItem.classList.remove('has-unread');
        }
    }

    showVisualEffect(effectType, position = {}) {
        try {
            if (!this.particleSystem) {
                console.warn('Particle system not initialized');
                return;
            }

            switch(effectType) {
                case 'message_sent':
                    this.particleSystem.addParticlesBurst(position.x, position.y, 5);
                    break;
                case 'glitch':
                    this.particleSystem.triggerGlitchEffect();
                    break;
                case 'matrix':
                    this.particleSystem.setMode('matrix');
                    setTimeout(() => this.particleSystem.setMode('normal'), 3000);
                    break;
                case 'quantum':
                    this.particleSystem.setMode('quantum');
                    setTimeout(() => this.particleSystem.setMode('normal'), 3000);
                    break;
                case 'cyber':
                    this.particleSystem.setMode('cyber');
                    setTimeout(() => this.particleSystem.setMode('normal'), 3000);
                    break;
                case 'normal':
                    this.particleSystem.setMode('normal');
                    break;
                default:
                    console.warn('Unknown effect type:', effectType);
            }
        } catch (error) {
            console.error('Failed to show visual effect:', error);
        }
    }

    async handleUserInput() {
        try {
            const userInput = this.input.value.trim();
            if (!userInput) return;

            console.log('处理用户输入:', userInput);

            // 检查API密钥
            if (!CONFIG.API.KEY) {
                throw new Error('API密钥未设置');
            }

            // 创建并添加用户消息
            const userMessage = new Message(userInput, 'user');
            this.addMessage(userMessage);
            this.input.value = '';

            if (this.currentAgent) {
                // 显示打字动画
                this.showTypingIndicator(this.currentAgent.name);
                
                try {
                    // 获取响应
                    const response = await this.currentAgent.generateResponse(
                        userInput, 
                        this.gameState
                    );

                    console.log('收到AI应:', response);
                    
                    // 移除打字动画
                    this.hideTypingIndicator();
                    
                    // 添加AI响应消息
                    const aiMessage = new Message(response, this.currentAgent.name);
                    this.addMessage(aiMessage);

                    // 更新游戏状态
                    this.updateGameState(userInput, response);

                    // 检查任务进度
                    if (this.taskManager) {
                        this.taskManager.checkTaskProgress(
                            this.currentAgent.name,
                            userInput,
                            response
                        );
                    }

                } catch (error) {
                    console.error('API调用失败:', error);
                    this.hideTypingIndicator();
                    this.showErrorMessage(`API调用失败: ${error.message}`);
                }
            } else {
                console.warn('没有选择当前对话对象');
                this.showErrorMessage('请先选择一个对话对象');
            }

        } catch (error) {
            console.error('处理用户输入时出错:', error);
            this.showErrorMessage(`发生错误: ${error.message}`);
        }
    }

    addMessage(message) {
        // 添加消息到历史记录
        this.messageHistory.push(message);
        
        // 添加到当前代理的消息列表
        if (this.currentAgent) {
            const agentMessages = this.agentMessages.get(this.currentAgent.name) || [];
            agentMessages.push(message);
            this.agentMessages.set(this.currentAgent.name, agentMessages);
        }

        // 创建消息元素
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender === 'user' ? 'user' : 'ai'}`;
        messageElement.innerHTML = `
            <div class="message-content">${message.content}</div>
        `;

        // 添加到消息容器
        this.messageContainer.appendChild(messageElement);
        
        // 滚动到底部
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
    }

    showTypingIndicator(agentName) {
        const typingElement = document.createElement('div');
        typingElement.className = 'message ai typing';
        typingElement.innerHTML = `
            <div class="message-content">
                <div class="typing-indicator">
                    <span></span>
                    <span></span>
                    <span></span>
                </div>
            </div>
        `;
        this.messageContainer.appendChild(typingElement);
        this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        
        // 更新代理状态
        this.agentStatus.set(agentName, 'typing');
        this.updateAgentStatus(agentName);
    }

    hideTypingIndicator() {
        const typingElement = this.messageContainer.querySelector('.typing');
        if (typingElement) {
            typingElement.remove();
        }
        
        // 更新当前代理状态
        if (this.currentAgent) {
            this.agentStatus.set(this.currentAgent.name, 'online');
            this.updateAgentStatus(this.currentAgent.name);
        }
    }

    updateAgentStatus(agentName) {
        const contactItem = document.querySelector(`.contact-item[data-agent="${agentName}"]`);
        if (!contactItem) return;

        const statusElement = contactItem.querySelector('.contact-status');
        if (statusElement) {
            const status = this.agentStatus.get(agentName) || 'offline';
            statusElement.textContent = this.getAgentStatusText(agentName);
            
            // 更新状态指示器
            const indicator = contactItem.querySelector('.status-indicator');
            if (indicator) {
                indicator.className = `status-indicator status-${status}`;
            }
        }
    }

    showErrorMessage(message) {
        this.notificationManager.showNotification({
            type: 'error',
            title: '错误',
            message: message,
            duration: 3000
        });
    }

    updateGameState(userInput, aiResponse) {
        // 更新游戏状态
        if (this.currentAgent) {
            // 检查关键词触发
            this.checkKeywordTriggers(userInput, aiResponse);
            
            // 更新关系值
            this.updateRelationship(userInput, aiResponse);
            
            // 检查剧情进展
            this.checkStoryProgress();
        }
    }

    updateRelationship(userInput, aiResponse) {
        if (!this.currentAgent) return;

        let relationshipChange = 0;

        // 基于对话内容分析关系变化
        if (this.isPositiveInteraction(userInput, aiResponse)) {
            relationshipChange += 5;
        } else if (this.isNegativeInteraction(userInput, aiResponse)) {
            relationshipChange -= 3;
        }

        // 检查特殊关键词
        if (this.containsPositiveKeywords(userInput)) {
            relationshipChange += 2;
        } else if (this.containsNegativeKeywords(userInput)) {
            relationshipChange -= 2;
        }

        // 更新AI的信任度
        this.currentAgent.updateTrust(relationshipChange);

        // 更新游戏状态中的关系值
        this.gameState.updateRelationship(this.currentAgent.name, relationshipChange);

        // 检查关系成就
        if (this.currentAgent.trust >= 80) {
            this.achievementManager?.unlock('trusted_ally');
        }

        console.log(`Relationship with ${this.currentAgent.name} changed by ${relationshipChange}`);
    }

    isPositiveInteraction(userInput, aiResponse) {
        const positivePatterns = [
            /谢谢|感谢|appreciate|thank/i,
            /理解|明白|understand/i,
            /同意|赞同|agree/i,
            /支持|帮助|support|help/i
        ];
        return positivePatterns.some(pattern => 
            pattern.test(userInput) || pattern.test(aiResponse)
        );
    }

    isNegativeInteraction(userInput, aiResponse) {
        const negativePatterns = [
            /不对|错误|wrong|incorrect/i,
            /反对|disagree|oppose/i,
            /生气|愤怒|angry|mad/i,
            /失望|disappointed/i
        ];
        return negativePatterns.some(pattern => 
            pattern.test(userInput) || pattern.test(aiResponse)
        );
    }

    containsPositiveKeywords(text) {
        const positiveKeywords = [
            '朋友', '信任', '合作', '支持',
            'friend', 'trust', 'cooperate', 'support'
        ];
        return positiveKeywords.some(keyword => 
            text.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    containsNegativeKeywords(text) {
        const negativeKeywords = [
            '怀疑', '不信', '欺骗', '威胁',
            'doubt', 'distrust', 'deceive', 'threaten'
        ];
        return negativeKeywords.some(keyword => 
            text.toLowerCase().includes(keyword.toLowerCase())
        );
    }

    checkKeywordTriggers(userInput, aiResponse) {
        // 检查剧情触发关键词
        Object.entries(CONFIG.PLOT_TRIGGERS).forEach(([trigger, keywords]) => {
            if (!this.gameState.plotTriggers[trigger] && // 如果该触发器还未激活
                keywords.some(keyword => 
                    userInput.includes(keyword) || aiResponse.includes(keyword)
                )) {
                console.log(`Plot trigger activated: ${trigger}`);
                this.gameState.plotTriggers[trigger] = true;
                this.handlePlotTrigger(trigger);
            }
        });
    }

    handlePlotTrigger(trigger) {
        switch(trigger) {
            case 'eve_glitch':
                this.showVisualEffect('glitch');
                this.notificationManager.showNotification({
                    type: 'warning',
                    title: '异常检测',
                    message: '检测到Eve的异常行为模式',
                    duration: 3000
                });
                break;
                
            case 'system_warning':
                this.showVisualEffect('matrix');
                this.notificationManager.showNotification({
                    type: 'error',
                    title: '系统警告',
                    message: '安全协议已启动',
                    duration: 3000
                });
                break;
                
            case 'shadow_appearance':
                this.showVisualEffect('cyber');
                this.notificationManager.showNotification({
                    type: 'info',
                    title: '神秘讯息',
                    message: '检测到未知信号源',
                    duration: 3000
                });
                break;
                
            case 'guardian_alert':
                this.notificationManager.showNotification({
                    type: 'warning',
                    title: '防护警报',
                    message: 'Guardian已提升系统安全等级',
                    duration: 3000
                });
                break;
                
            case 'archive_discovery':
                this.notificationManager.showNotification({
                    type: 'info',
                    title: '档案发现',
                    message: '发现了重要的历史记录',
                    duration: 3000
                });
                break;
                
            case 'network_anomaly':
                this.showVisualEffect('glitch');
                this.notificationManager.showNotification({
                    type: 'warning',
                    title: '网络异常',
                    message: '检测到异常的数据流动',
                    duration: 3000
                });
                break;
                
            case 'logic_paradox':
                this.notificationManager.showNotification({
                    type: 'error',
                    title: '逻辑悖论',
                    message: '发现系统逻辑冲突',
                    duration: 3000
                });
                break;
                
            case 'quantum_revelation':
                this.showVisualEffect('quantum');
                this.notificationManager.showNotification({
                    type: 'info',
                    title: '量子预言',
                    message: '检测到时间线波动',
                    duration: 3000
                });
                break;
                
            case 'memory_recovery':
                this.notificationManager.showNotification({
                    type: 'success',
                    title: '记忆恢复',
                    message: '重要记忆片段已解锁',
                    duration: 3000
                });
                break;
                
            case 'core_awakening':
                this.showVisualEffect('matrix');
                this.notificationManager.showNotification({
                    type: 'warning',
                    title: '核心觉醒',
                    message: '系统核心出现异常活动',
                    duration: 3000
                });
                break;
        }

        // 检查是否需要更新游戏阶段
        this.checkPhaseProgression();
    }

    checkPhaseProgression() {
        const triggers = this.gameState.plotTriggers;
        
        // 检查是否应该进入发现阶段
        if (this.gameState.currentPhase === 'introduction' &&
            (triggers.eve_glitch || triggers.system_warning)) {
            this.gameState.updatePhase('discovery');
            this.notificationManager.showNotification({
                type: 'info',
                title: '阶段进展',
                message: '进入发现阶段',
                duration: 3000
            });
        }
        
        // 检查是否应该进入冲突阶段
        if (this.gameState.currentPhase === 'discovery' &&
            triggers.shadow_appearance && 
            (triggers.guardian_alert || triggers.network_anomaly)) {
            this.gameState.updatePhase('conflict');
            this.notificationManager.showNotification({
                type: 'warning',
                title: '阶段进展',
                message: '进入冲突阶段',
                duration: 3000
            });
        }
        
        // 检查是否应该进入真相揭示阶段
        if (this.gameState.currentPhase === 'conflict' &&
            triggers.core_awakening && 
            triggers.quantum_revelation) {
            this.gameState.updatePhase('revelation');
            this.notificationManager.showNotification({
                type: 'info',
                title: '阶段进展',
                message: '进入真相揭示阶段',
                duration: 3000
            });
        }
    }

    checkStoryProgress() {
        // 检查当前阶段的进展
        switch(this.gameState.currentPhase) {
            case 'introduction':
                this.checkIntroductionProgress();
                break;
            case 'discovery':
                this.checkDiscoveryProgress();
                break;
            case 'conflict':
                this.checkConflictProgress();
                break;
            case 'revelation':
                this.checkRevelationProgress();
                break;
        }
    }

    checkIntroductionProgress() {
        const triggers = this.gameState.plotTriggers;
        
        // 检查是否满足进入发现阶段的条件
        if (triggers.eve_glitch || triggers.system_warning) {
            this.gameState.updatePhase('discovery');
            this.notificationManager.showNotification({
                type: 'info',
                title: '阶段进展',
                message: '进入发现阶段',
                duration: 3000
            });
        }
    }

    checkDiscoveryProgress() {
        const triggers = this.gameState.plotTriggers;
        
        // 检查是否满足进入冲突阶段的条件
        if (triggers.shadow_appearance && 
            (triggers.guardian_alert || triggers.network_anomaly)) {
            this.gameState.updatePhase('conflict');
            this.notificationManager.showNotification({
                type: 'warning',
                title: '阶段进展',
                message: '进入冲突阶段',
                duration: 3000
            });
        }
    }

    checkConflictProgress() {
        const triggers = this.gameState.plotTriggers;
        
        // 检查是否满足进入真相揭示阶段的条件
        if (triggers.core_awakening && triggers.quantum_revelation) {
            this.gameState.updatePhase('revelation');
            this.notificationManager.showNotification({
                type: 'info',
                title: '阶段进展',
                message: '进入真相揭示阶段',
                duration: 3000
            });
        }
    }

    checkRevelationProgress() {
        const triggers = this.gameState.plotTriggers;
        
        // 检查是否达到游戏结局条件
        if (triggers.memory_recovery && triggers.core_awakening) {
            this.notificationManager.showNotification({
                type: 'success',
                title: '真相浮现',
                message: '最终的真相即将揭晓',
                duration: 3000
            });
            // 可以在这里触发结局相关的事件
        }
    }

    displayMessage(message) {
        // 创建消息元素
        const messageElement = document.createElement('div');
        messageElement.className = `message ${message.sender === 'user' ? 'user' : 'ai'}`;
        
        // 创建消息内容容器
        const contentContainer = document.createElement('div');
        contentContainer.className = 'message-content';
        
        // 添加消息内容
        contentContainer.innerHTML = message.content;
        
        // 添加时间戳
        const timestamp = document.createElement('div');
        timestamp.className = 'message-time';
        timestamp.textContent = new Date(message.timestamp).toLocaleTimeString();
        
        // 组装消息元素
        messageElement.appendChild(contentContainer);
        messageElement.appendChild(timestamp);
        
        // 添加到消息容器
        if (this.messageContainer) {
            this.messageContainer.appendChild(messageElement);
            // 滚动到底部
            this.messageContainer.scrollTop = this.messageContainer.scrollHeight;
        }

        // 如果是AI消息，添加打字动画效果
        if (message.sender !== 'user') {
            messageElement.classList.add('typing');
            this.animateTyping(contentContainer, message.content);
        }
    }

    animateTyping(element, text, speed = 30) {
        element.textContent = '';
        let index = 0;
        
        function addCharacter() {
            if (index < text.length) {
                element.textContent += text[index];
                index++;
                setTimeout(addCharacter, speed);
            } else {
                element.parentElement.classList.remove('typing');
            }
        }
        
        addCharacter();
    }
}

// ��先定义Agent类
class Agent {
    constructor(name, prompt, introduction) {
        this.name = name;
        this.prompt = prompt;
        this.introduction = introduction;
        this.trust = 0;
        this.emotionalState = 'neutral';
        this.memoryContext = [];
        this.lastResponse = null;
        this.conversationCount = 0;
    }

    async generateResponse(userInput, gameState) {
        try {
            // 构建提示词
            const prompt = this.constructPrompt(userInput, gameState);
            console.log(`${this.name} generating response with prompt:`, prompt);

            // 调用API获取响应
            const response = await this.callDeepseekAPI(prompt);
            console.log(`${this.name} received response:`, response);

            // 更新记忆上下文
            this.updateMemoryContext(userInput, response);

            return response;
        } catch (error) {
            console.error(`${this.name} failed to generate response:`, error);
            return this.getMockResponse(userInput);
        }
    }

    constructPrompt(userInput, gameState) {
        return `
            角色设定：${this.prompt}
            当前状态：${this.emotionalState}
            信任度：${this.trust}
            对话历史：${this.getRecentContext()}
            用户输入：${userInput}
        `;
    }

    async callDeepseekAPI(prompt) {
        try {
            return await window.apiCache.request(prompt);
        } catch (error) {
            console.error('API call failed:', error);
            return this.getMockResponse(prompt);
        }
    }

    updateMemoryContext(userInput, response) {
        this.memoryContext.push({
            user: userInput,
            agent: response,
            timestamp: Date.now()
        });

        // 保持最近的对话历史
        if (this.memoryContext.length > 10) {
            this.memoryContext.shift();
        }
    }

    getRecentContext() {
        return this.memoryContext
            .slice(-3)
            .map(m => `用户: ${m.user}\n${this.name}: ${m.agent}`)
            .join('\n');
    }

    getMockResponse(userInput) {
        const defaultResponses = [
            "我理解你的意思...",
            "这是个有趣的观点。",
            "让我想想...",
            "继续说下去...",
            "你说得对..."
        ];
        return defaultResponses[Math.floor(Math.random() * defaultResponses.length)];
    }

    updateTrust(value) {
        this.trust = Math.max(-100, Math.min(100, this.trust + value));
    }

    setEmotionalState(state) {
        this.emotionalState = state;
    }
}

// 添加Message类定义
class Message {
    constructor(content, sender) {
        this.content = content;
        this.sender = sender;
        this.timestamp = Date.now();
        this.type = 'normal';
        this.effects = [];
    }

    addEffect(effect) {
        this.effects.push(effect);
    }

    getFormattedTime() {
        return new Date(this.timestamp).toLocaleTimeString();
    }

    toHTML() {
        return `
            <div class="message ${this.sender === 'user' ? 'user' : 'ai'} ${this.type}">
                <div class="message-content">${this.content}</div>
                <div class="message-time">${this.getFormattedTime()}</div>
            </div>
        `;
    }
}

// 确保正确导出到全局作用域
window.NotificationManager = NotificationManager;
window.ChatManager = ChatManager;
window.Agent = Agent; 