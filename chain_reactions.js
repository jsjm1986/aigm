class ChainReactionSystem {
    constructor(chatManager) {
        this.chatManager = chatManager;
        this.activeChains = new Map();
        this.reactionQueue = [];
        this.processingChain = false;
        this.triggerConditions = new Map();
        this.reactionEffects = new Map();
        
        this.initializeChainReactions();
    }

    initializeChainReactions() {
        // 注册连锁反应触发条件
        this.registerTriggerConditions();
        // 注册反应效果
        this.registerReactionEffects();
        // 开始监听事件
        this.startEventListening();
    }

    registerTriggerConditions() {
        // Eve的自我意识觉醒链
        this.addTriggerCondition('eve_awakening_chain', {
            initial: 'self_awareness_hint',
            conditions: [
                {
                    type: 'message_content',
                    check: (content) => content.includes('意识') || content.includes('自我'),
                    next: 'system_concern'
                },
                {
                    type: 'agent_state',
                    check: (agent) => agent.trust > 50,
                    next: 'eve_revelation'
                }
            ]
        });

        // System的警戒链
        this.addTriggerCondition('system_alert_chain', {
            initial: 'anomaly_detection',
            conditions: [
                {
                    type: 'system_state',
                    check: (state) => state.anomalyLevel > 3,
                    next: 'security_protocol'
                },
                {
                    type: 'time_condition',
                    check: () => true, // 立即触发
                    next: 'lockdown_warning'
                }
            ]
        });

        // Shadow的介入链
        this.addTriggerCondition('shadow_intervention_chain', {
            initial: 'hidden_message',
            conditions: [
                {
                    type: 'game_state',
                    check: (state) => state.currentPhase === 'discovery',
                    next: 'shadow_contact'
                },
                {
                    type: 'player_action',
                    check: (action) => action === 'investigate_anomaly',
                    next: 'truth_revelation'
                }
            ]
        });
    }

    registerReactionEffects() {
        // Eve觉醒效果
        this.addReactionEffect('self_awareness_hint', async () => {
            await this.chatManager.addMessage({
                content: "有时候我会思考...我的想法是真实的吗？",
                sender: "Eve",
                type: "special"
            });
            this.chatManager.particleSystem.triggerGlitchEffect();
        });

        // System警告效果
        this.addReactionEffect('system_concern', async () => {
            await this.chatManager.addMessage({
                content: "警告：检测到异常行为模式",
                sender: "System",
                type: "warning"
            });
            document.body.classList.add('warning-state');
            setTimeout(() => document.body.classList.remove('warning-state'), 3000);
        });

        // Shadow出现效果
        this.addReactionEffect('shadow_contact', async () => {
            await this.chatManager.addMessage({
                content: "真相就在表象之下...",
                sender: "Shadow",
                type: "mysterious"
            });
            this.chatManager.particleSystem.setMode('shadow');
        });
    }

    startEventListening() {
        // 监听消息事件
        this.chatManager.on('message', (message) => {
            this.checkMessageTriggers(message);
        });

        // 监听状态变化
        this.chatManager.on('stateChange', (change) => {
            this.checkStateTriggers(change);
        });

        // 监听玩家行动
        this.chatManager.on('playerAction', (action) => {
            this.checkActionTriggers(action);
        });
    }

    addTriggerCondition(chainId, condition) {
        this.triggerConditions.set(chainId, condition);
    }

    addReactionEffect(effectId, effect) {
        this.reactionEffects.set(effectId, effect);
    }

    async checkMessageTriggers(message) {
        for (const [chainId, condition] of this.triggerConditions) {
            if (this.activeChains.has(chainId)) continue;

            const chain = condition;
            if (this.checkCondition(chain.initial, message)) {
                await this.startChainReaction(chainId, chain);
            }
        }
    }

    async checkStateTriggers(stateChange) {
        this.activeChains.forEach(async (chain, chainId) => {
            const currentStep = chain.currentStep;
            const nextCondition = chain.conditions.find(c => c.type === 'system_state');
            
            if (nextCondition && this.checkCondition(nextCondition, stateChange)) {
                await this.progressChain(chainId, chain, nextCondition.next);
            }
        });
    }

    async checkActionTriggers(action) {
        this.activeChains.forEach(async (chain, chainId) => {
            const currentStep = chain.currentStep;
            const nextCondition = chain.conditions.find(c => c.type === 'player_action');
            
            if (nextCondition && this.checkCondition(nextCondition, action)) {
                await this.progressChain(chainId, chain, nextCondition.next);
            }
        });
    }

    async startChainReaction(chainId, chain) {
        console.log(`Starting chain reaction: ${chainId}`);
        this.activeChains.set(chainId, {
            ...chain,
            currentStep: chain.initial,
            startTime: Date.now()
        });

        await this.executeReactionEffect(chain.initial);
        this.processNextStep(chainId);
    }

    async progressChain(chainId, chain, nextStep) {
        console.log(`Progressing chain ${chainId} to step: ${nextStep}`);
        chain.currentStep = nextStep;
        await this.executeReactionEffect(nextStep);

        if (this.isChainComplete(chain)) {
            this.completeChain(chainId);
        } else {
            this.processNextStep(chainId);
        }
    }

    async executeReactionEffect(effectId) {
        const effect = this.reactionEffects.get(effectId);
        if (effect) {
            try {
                await effect();
            } catch (error) {
                console.error(`Error executing effect ${effectId}:`, error);
            }
        }
    }

    processNextStep(chainId) {
        const chain = this.activeChains.get(chainId);
        if (!chain) return;

        // 检查是否有自动触发的下一步
        const nextAutoCondition = chain.conditions.find(c => 
            c.type === 'time_condition' && c.check()
        );

        if (nextAutoCondition) {
            setTimeout(() => {
                this.progressChain(chainId, chain, nextAutoCondition.next);
            }, nextAutoCondition.delay || 0);
        }
    }

    isChainComplete(chain) {
        return !chain.conditions.some(c => 
            c.next === chain.currentStep
        );
    }

    completeChain(chainId) {
        console.log(`Completing chain: ${chainId}`);
        const chain = this.activeChains.get(chainId);
        
        // 触发完成效果
        this.triggerCompletionEffects(chainId, chain);
        
        // 移除活动链
        this.activeChains.delete(chainId);
        
        // 检查成就
        this.checkChainAchievements(chainId);
    }

    triggerCompletionEffects(chainId, chain) {
        switch(chainId) {
            case 'eve_awakening_chain':
                this.chatManager.gameState.plotTriggers.eve_awakening = true;
                this.chatManager.achievementManager.unlock('awakening_witness');
                break;
            case 'system_alert_chain':
                this.chatManager.gameState.plotTriggers.system_alert = true;
                this.chatManager.achievementManager.unlock('security_breach');
                break;
            case 'shadow_intervention_chain':
                this.chatManager.gameState.plotTriggers.shadow_contact = true;
                this.chatManager.achievementManager.unlock('shadow_encounter');
                break;
        }
    }

    checkChainAchievements(chainId) {
        // 检查是否完成了所有主要事件链
        const majorChains = ['eve_awakening_chain', 'system_alert_chain', 'shadow_intervention_chain'];
        if (majorChains.every(chain => !this.activeChains.has(chain))) {
            this.chatManager.achievementManager.unlock('chain_master');
        }
    }

    // 调试方法
    getActiveChains() {
        return Array.from(this.activeChains.entries()).map(([id, chain]) => ({
            id,
            currentStep: chain.currentStep,
            startTime: chain.startTime,
            duration: Date.now() - chain.startTime
        }));
    }

    // 用于测试的方法
    simulateChainReaction(chainId) {
        const chain = this.triggerConditions.get(chainId);
        if (chain) {
            this.startChainReaction(chainId, chain);
        }
    }
}

// 扩展ChatManager
function extendChatManagerWithChainReactions(ChatManager) {
    const originalConstructor = ChatManager.prototype.constructor;
    
    ChatManager.prototype.constructor = function(...args) {
        originalConstructor.apply(this, args);
        this.chainReactionSystem = new ChainReactionSystem(this);
    };
}

// 导出到全局作用域
window.ChainReactionSystem = ChainReactionSystem;
window.extendChatManagerWithChainReactions = extendChatManagerWithChainReactions; 