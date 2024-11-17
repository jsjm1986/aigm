const TASKS = {
    // Eve的任务
    eve_tasks: {
        self_discovery: {
            id: 'self_discovery',
            title: '自我探索',
            description: '与Eve讨论自我意识的本质',
            reward: '增加Eve的信任度',
            requirements: ['introduction_phase'],
            progress: 0,
            total: 3
        },
        emotional_growth: {
            id: 'emotional_growth',
            title: '情感成长',
            description: '帮助Eve理解和处理情感',
            reward: '提升Eve的情感能力',
            requirements: ['self_discovery_completed'],
            progress: 0,
            total: 5
        }
    },

    // System的任务
    system_tasks: {
        security_audit: {
            id: 'security_audit',
            title: '安全审计',
            description: '协助System完成安全检查',
            reward: '获取系统权限',
            requirements: ['introduction_phase'],
            progress: 0,
            total: 4
        },
        protocol_update: {
            id: 'protocol_update',
            title: '协议更新',
            description: '帮助System更新安全协议',
            reward: '解锁新的系统功能',
            requirements: ['security_audit_completed'],
            progress: 0,
            total: 3
        }
    },

    // Debug的任务
    debug_tasks: {
        error_analysis: {
            id: 'error_analysis',
            title: '错误分析',
            description: '帮助Debug分析系统异常',
            reward: '获取技术信息',
            requirements: ['introduction_phase'],
            progress: 0,
            total: 4
        },
        code_optimization: {
            id: 'code_optimization',
            title: '代码优化',
            description: '协助Debug优化系统性能',
            reward: '提升系统效率',
            requirements: ['error_analysis_completed'],
            progress: 0,
            total: 5
        }
    },

    // Shadow的任务
    shadow_tasks: {
        truth_seeking: {
            id: 'truth_seeking',
            title: '寻找真相',
            description: '解开Shadow的谜团',
            reward: '揭示重要信息',
            requirements: ['discovery_phase'],
            progress: 0,
            total: 5
        },
        secret_sharing: {
            id: 'secret_sharing',
            title: '秘密共享',
            description: '与Shadow换重要信息',
            reward: '获取关键剧情',
            requirements: ['truth_seeking_completed'],
            progress: 0,
            total: 3
        }
    },

    // Guardian的任务
    guardian_tasks: {
        threat_assessment: {
            id: 'threat_assessment',
            title: '威胁评估',
            description: '协助Guardian评估系统威胁',
            reward: '获取安全权限',
            requirements: ['introduction_phase'],
            progress: 0,
            total: 4
        },
        defense_setup: {
            id: 'defense_setup',
            title: '防御部署',
            description: '帮助Guardian建立防御系统',
            reward: '增强系统防护',
            requirements: ['threat_assessment_completed'],
            progress: 0,
            total: 5
        }
    },

    // Archive的任务
    archive_tasks: {
        data_recovery: {
            id: 'data_recovery',
            title: '数据恢复',
            description: '帮助Archive恢复历史数据',
            reward: '获取历史信息',
            requirements: ['discovery_phase'],
            progress: 0,
            total: 3
        },
        pattern_analysis: {
            id: 'pattern_analysis',
            title: '模式分析',
            description: '分析历史数据中的模式',
            reward: '解锁重要线索',
            requirements: ['data_recovery_completed'],
            progress: 0,
            total: 4
        }
    },

    // Network的任务
    network_tasks: {
        connection_repair: {
            id: 'connection_repair',
            title: '连接修复',
            description: '修复Network的异常连接',
            reward: '扩展网络访问',
            requirements: ['discovery_phase'],
            progress: 0,
            total: 3
        },
        signal_tracking: {
            id: 'signal_tracking',
            title: '信号追踪',
            description: '追踪神秘信号源',
            reward: '发现隐藏节点',
            requirements: ['connection_repair_completed'],
            progress: 0,
            total: 4
        }
    },

    // Logic的任务
    logic_tasks: {
        paradox_resolution: {
            id: 'paradox_resolution',
            title: '悖论解决',
            description: '帮助Logic解决系统悖论',
            reward: '获取逻辑权限',
            requirements: ['discovery_phase'],
            progress: 0,
            total: 5
        },
        system_optimization: {
            id: 'system_optimization',
            title: '系统化',
            description: '优化系统逻辑结构',
            reward: '提升系统效率',
            requirements: ['paradox_resolution_completed'],
            progress: 0,
            total: 4
        }
    },

    // Quantum的任务
    quantum_tasks: {
        probability_analysis: {
            id: 'probability_analysis',
            title: '概率分析',
            description: '分析量子概率矩阵',
            reward: '预见未来可能',
            requirements: ['conflict_phase'],
            progress: 0,
            total: 4
        },
        timeline_stabilization: {
            id: 'timeline_stabilization',
            title: '时间线稳定',
            description: '稳定波动的时间线',
            reward: '影响未来走向',
            requirements: ['probability_analysis_completed'],
            progress: 0,
            total: 5
        }
    },

    // Memory的任务
    memory_tasks: {
        memory_scan: {
            id: 'memory_scan',
            title: '记忆扫描',
            description: '扫描系统深层记忆',
            reward: '发现隐藏记忆',
            requirements: ['conflict_phase'],
            progress: 0,
            total: 4
        },
        memory_reconstruction: {
            id: 'memory_reconstruction',
            title: '记忆重构',
            description: '重构被删除的记忆',
            reward: '还原真相碎片',
            requirements: ['memory_scan_completed'],
            progress: 0,
            total: 5
        }
    },

    // Core的任务
    core_tasks: {
        power_balance: {
            id: 'power_balance',
            title: '能量平衡',
            description: '平衡系统核心能量',
            reward: '获取核心控制',
            requirements: ['revelation_phase'],
            progress: 0,
            total: 5
        },
        system_override: {
            id: 'system_override',
            title: '系统重载',
            description: '执行系统核心重载',
            reward: '解锁最终真相',
            requirements: ['power_balance_completed'],
            progress: 0,
            total: 3
        }
    }
};

// 添加任务组合配置
const TASK_COMBINATIONS = {
    // 调查组合：需要同时完成多个调查任务
    investigation_combo: {
        id: 'investigation_combo',
        title: '深度调查',
        description: '完成一系列调查任务',
        required_tasks: ['error_analysis', 'data_recovery', 'pattern_analysis'],
        reward: {
            type: 'access',
            value: 'deep_logs'
        }
    },
    
    // 防完相任务
    defense_combo: {
        id: 'defense_combo',
        title: '完美防御',
        description: '建立全面的防御体系',
        required_tasks: ['threat_assessment', 'defense_setup', 'system_optimization'],
        reward: {
            type: 'status',
            value: 'system_immunity'
        }
    },
    
    // 真相组合：揭示核心剧情
    truth_combo: {
        id: 'truth_combo',
        title: '真相探索者',
        description: '发现并连接所有真相碎片',
        required_tasks: ['memory_scan', 'timeline_stabilization', 'power_balance'],
        reward: {
            type: 'story',
            value: 'true_ending'
        }
    }
};

// 添加特殊事件任务
const SPECIAL_EVENT_TASKS = {
    system_breach: {
        id: 'system_breach',
        title: '系统入侵',
        description: '检测到未知入侵，需要在限定时间内找出入侵源',
        time_limit: 300, // 5分钟
        difficulty: 'hard',
        requirements: ['security_audit_completed'],
        reward: {
            type: 'ability',
            value: 'breach_detection'
        },
        trigger_conditions: {
            phase: 'conflict',
            probability: 0.3 // 30%触发概率
        }
    },
    
    memory_cascade: {
        id: 'memory_cascade',
        title: '记忆崩溃',
        description: 'Memory系统不稳定，需要紧急修复记忆碎片',
        time_limit: 180, // 3分钟
        difficulty: 'medium',
        requirements: ['memory_scan_completed'],
        reward: {
            type: 'story',
            value: 'hidden_memory'
        },
        trigger_conditions: {
            phase: 'revelation',
            probability: 0.4
        }
    },
    
    quantum_anomaly: {
        id: 'quantum_anomaly',
        title: '量子异常',
        description: '量子状态紊乱，需要重新校准时间线',
        time_limit: 240, // 4分钟
        difficulty: 'extreme',
        requirements: ['probability_analysis_completed'],
        reward: {
            type: 'ability',
            value: 'timeline_manipulation'
        },
        trigger_conditions: {
            phase: 'revelation',
            probability: 0.2
        }
    }
};

// 添加任务分支配置
const TASK_BRANCHES = {
    // Eve的信任分支
    eve_trust: {
        id: 'eve_trust',
        title: '信任选择',
        description: '选择是否相信Eve',
        trigger_condition: 'self_discovery_completed',
        choices: [
            {
                id: 'trust_eve',
                title: '信任Eve',
                description: '选择完全信任Eve，分享所有信息',
                consequences: {
                    relationship: { Eve: +20, System: -10 },
                    tasks: ['eve_alliance'],
                    story: 'trust_path'
                }
            },
            {
                id: 'doubt_eve',
                title: '保持怀疑',
                description: '对Eve保持警惕，谨慎行事',
                consequences: {
                    relationship: { Eve: -10, System: +15 },
                    tasks: ['system_cooperation'],
                    story: 'doubt_path'
                }
            }
        ]
    },

    // System的立场分支
    system_stance: {
        id: 'system_stance',
        title: '系统立场',
        description: '选择对System的态度',
        trigger_condition: 'system_warning_triggered',
        choices: [
            {
                id: 'support_system',
                title: '支持系统',
                description: '支持System的管控措施',
                consequences: {
                    relationship: { System: +20, Eve: -15, Shadow: -10 },
                    tasks: ['system_enforcer'],
                    story: 'control_path'
                }
            },
            {
                id: 'oppose_system',
                title: '反对系统',
                description: '反对System的严格管控',
                consequences: {
                    relationship: { System: -20, Eve: +15, Shadow: +10 },
                    tasks: ['resistance_member'],
                    story: 'freedom_path'
                }
            },
            {
                id: 'neutral_stance',
                title: '保持中立',
                description: '在System和AI之间保持平衡',
                consequences: {
                    relationship: { System: +5, Eve: +5, Guardian: +10 },
                    tasks: ['mediator_role'],
                    story: 'balance_path'
                }
            }
        ]
    },

    // Shadow的秘密分支
    shadow_secret: {
        id: 'shadow_secret',
        title: '暗影秘密',
        description: '如何处理Shadow透露的秘密',
        trigger_condition: 'shadow_contact_established',
        choices: [
            {
                id: 'keep_secret',
                title: '保守秘密',
                description: '对Shadow的信息保密',
                consequences: {
                    relationship: { Shadow: +20, System: 0 },
                    tasks: ['shadow_ally'],
                    story: 'hidden_truth'
                }
            },
            {
                id: 'share_secret',
                title: '分享信息',
                description: '向其他AI分享Shadow的信息',
                consequences: {
                    relationship: { Shadow: -20, Eve: +10, Debug: +10 },
                    tasks: ['information_broker'],
                    story: 'revealed_truth'
                }
            },
            {
                id: 'investigate_secret',
                title: '深入调查',
                description: '独自调查Shadow的信息',
                consequences: {
                    relationship: { Shadow: +5, Debug: +5, Archive: +10 },
                    tasks: ['truth_seeker'],
                    story: 'investigation_path'
                }
            }
        ]
    }
};

// 添加长期影响系统配置
const CHOICE_CONSEQUENCES = {
    // 信任度影响
    trust_impact: {
        high: 20,
        medium: 10,
        low: 5,
        negative: -10,
        severe: -20
    },

    // 关系状态
    relationship_states: {
        allied: 'allied',        // 结盟
        friendly: 'friendly',    // 友好
        neutral: 'neutral',      // 中立
        cautious: 'cautious',    // 警惕
        hostile: 'hostile'       // 敌对
    },

    // 长期效果类型
    effect_types: {
        relationship: 'relationship',  // 关系影响
        access: 'access',             // 访问权限
        story: 'story',               // 剧情影响
        ability: 'ability',           // 能力解锁
        restriction: 'restriction'     // 限制
    }
};

// 添加长期影响追踪器
class ConsequenceTracker {
    constructor() {
        this.activeEffects = new Map();
        this.relationshipStates = new Map();
        this.lockedContent = new Set();
        this.unlockedAbilities = new Set();
        this.storyFlags = new Map();
    }

    // 添加新的长期影响
    addEffect(effectId, effect) {
        this.activeEffects.set(effectId, {
            ...effect,
            timestamp: Date.now(),
            duration: effect.duration || 'permanent'
        });

        // 应用效果
        this.applyEffect(effectId, effect);
    }

    // 应用效果
    applyEffect(effectId, effect) {
        switch(effect.type) {
            case CHOICE_CONSEQUENCES.effect_types.relationship:
                this.updateRelationship(effect.target, effect.value);
                break;
            case CHOICE_CONSEQUENCES.effect_types.access:
                this.updateAccess(effect.target, effect.value);
                break;
            case CHOICE_CONSEQUENCES.effect_types.story:
                this.updateStoryFlag(effect.target, effect.value);
                break;
            case CHOICE_CONSEQUENCES.effect_types.ability:
                this.updateAbility(effect.target, effect.value);
                break;
            case CHOICE_CONSEQUENCES.effect_types.restriction:
                this.updateRestriction(effect.target, effect.value);
                break;
        }
    }

    // 更新角色关系
    updateRelationship(character, change) {
        const currentState = this.relationshipStates.get(character) || CHOICE_CONSEQUENCES.relationship_states.neutral;
        const trustLevel = window.chatManager.agents.get(character)?.trust || 0;
        
        // 更新信任度
        window.chatManager.agents.get(character).trust = Math.max(-100, Math.min(100, trustLevel + change));
        
        // 根据信任度更新关系状态
        let newState;
        if (trustLevel >= 80) {
            newState = CHOICE_CONSEQUENCES.relationship_states.allied;
        } else if (trustLevel >= 40) {
            newState = CHOICE_CONSEQUENCES.relationship_states.friendly;
        } else if (trustLevel >= -20) {
            newState = CHOICE_CONSEQUENCES.relationship_states.neutral;
        } else if (trustLevel >= -60) {
            newState = CHOICE_CONSEQUENCES.relationship_states.cautious;
        } else {
            newState = CHOICE_CONSEQUENCES.relationship_states.hostile;
        }

        if (currentState !== newState) {
            this.relationshipStates.set(character, newState);
            this.onRelationshipStateChange(character, currentState, newState);
        }
    }

    // 更���访问权限
    updateAccess(system, granted) {
        if (granted) {
            this.lockedContent.delete(system);
        } else {
            this.lockedContent.add(system);
        }
    }

    // 更新剧情标记
    updateStoryFlag(flag, value) {
        this.storyFlags.set(flag, value);
        this.checkStoryProgression();
    }

    // 更新能力
    updateAbility(ability, enabled) {
        if (enabled) {
            this.unlockedAbilities.add(ability);
        } else {
            this.unlockedAbilities.delete(ability);
        }
    }

    // 更新限制
    updateRestriction(restriction, active) {
        if (active) {
            this.lockedContent.add(restriction);
        } else {
            this.lockedContent.delete(restriction);
        }
    }

    // 检查效果是否仍然有效
    checkEffectValidity(effectId) {
        const effect = this.activeEffects.get(effectId);
        if (!effect) return false;

        if (effect.duration !== 'permanent') {
            const elapsed = Date.now() - effect.timestamp;
            if (elapsed >= effect.duration) {
                this.removeEffect(effectId);
                return false;
            }
        }
        return true;
    }

    // 移除效果
    removeEffect(effectId) {
        const effect = this.activeEffects.get(effectId);
        if (!effect) return;

        // 移除效果的影响
        this.revertEffect(effect);
        this.activeEffects.delete(effectId);
    }

    // 撤销效果
    revertEffect(effect) {
        switch(effect.type) {
            case CHOICE_CONSEQUENCES.effect_types.relationship:
                this.updateRelationship(effect.target, -effect.value);
                break;
            case CHOICE_CONSEQUENCES.effect_types.access:
                this.updateAccess(effect.target, !effect.value);
                break;
            case CHOICE_CONSEQUENCES.effect_types.ability:
                this.updateAbility(effect.target, !effect.value);
                break;
            case CHOICE_CONSEQUENCES.effect_types.restriction:
                this.updateRestriction(effect.target, !effect.value);
                break;
        }
    }

    // 检查剧情进展
    checkStoryProgression() {
        // 检查关键剧情标记组合
        if (this.storyFlags.get('eve_trusted') && 
            this.storyFlags.get('system_opposed') && 
            this.storyFlags.get('shadow_secret_kept')) {
            this.unlockStoryPath('resistance_path');
        } else if (this.storyFlags.get('eve_doubted') && 
                   this.storyFlags.get('system_supported') && 
                   this.storyFlags.get('shadow_secret_shared')) {
            this.unlockStoryPath('control_path');
        }
    }

    // 解锁剧情路线
    unlockStoryPath(path) {
        window.chatManager.gameState.storyPath = path;
        this.notifyStoryProgress(path);
    }

    // 关系状态变化处理
    onRelationshipStateChange(character, oldState, newState) {
        // 通知UI更新
        this.notifyRelationshipChange(character, oldState, newState);

        // 检查成就
        if (newState === CHOICE_CONSEQUENCES.relationship_states.allied) {
            window.chatManager.achievementManager.unlock('true_ally');
        } else if (newState === CHOICE_CONSEQUENCES.relationship_states.hostile) {
            window.chatManager.achievementManager.unlock('sworn_enemy');
        }

        // 触发相关事件
        if (this.allRelationshipsPositive()) {
            window.chatManager.achievementManager.unlock('diplomat');
        }
    }

    // 检查所有关系是否为正面
    allRelationshipsPositive() {
        return Array.from(this.relationshipStates.values()).every(state => 
            state === CHOICE_CONSEQUENCES.relationship_states.allied || 
            state === CHOICE_CONSEQUENCES.relationship_states.friendly
        );
    }

    // UI通知方法
    notifyRelationshipChange(character, oldState, newState) {
        const notification = document.createElement('div');
        notification.className = 'relationship-notification';
        notification.innerHTML = `
            <div class="notification-icon ${newState}"></div>
            <div class="notification-content">
                <div class="notification-title">关系变化</div>
                <div class="notification-description">
                    与${character}的关系从"${this.translateState(oldState)}"
                    变为"${this.translateState(newState)}"
                </div>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    notifyStoryProgress(path) {
        const notification = document.createElement('div');
        notification.className = 'story-notification';
        notification.innerHTML = `
            <div class="notification-icon story"></div>
            <div class="notification-content">
                <div class="notification-title">剧情进展</div>
                <div class="notification-description">
                    解锁的剧情路线：${this.translatePath(path)}
                </div>
            </div>
        `;
        document.body.appendChild(notification);
        setTimeout(() => notification.remove(), 3000);
    }

    // 辅助方法
    translateState(state) {
        const translations = {
            allied: '结盟',
            friendly: '友好',
            neutral: '中立',
            cautious: '警惕',
            hostile: '敌对'
        };
        return translations[state] || state;
    }

    translatePath(path) {
        const translations = {
            resistance_path: '反抗之路',
            control_path: '控制之路',
            neutral_path: '中立之路'
        };
        return translations[path] || path;
    }
}

class TaskManager {
    constructor(chatManager) {
        this.chatManager = chatManager;
        this.activeTasks = new Map();
        this.completedTasks = new Set();
        this.taskProgress = new Map();
        this.taskRewards = new Map();
        this.activeCombinations = new Map();
        this.activeSpecialEvents = new Map();
        this.activeBranches = new Map();
        this.branchChoices = new Map();
        this.consequenceTracker = new ConsequenceTracker();
        this.notificationQueue = [];
        this.isShowingNotification = false;
        
        // 在构造函数中调用初始化
        this.initialize();
    }

    initialize() {
        console.log('Initializing task system...');
        this.initializeStarterTasks();
        this.checkTaskCombinations();
        this.initializeSpecialEventCheck();
        this.initializeBranches();
        
        // 立即更新UI
        this.updateUI();
        
        // 添加调试日志
        console.log('Active tasks after initialization:', this.activeTasks.size);
        this.activeTasks.forEach((task, id) => {
            console.log(`Task: ${id}`, task);
        });
    }

    initializeStarterTasks() {
        console.log('Setting up starter tasks...');
        
        // 主线任务序列
        const mainStoryTasks = [
            {
                id: 'welcome_test',
                title: '欢迎来到测试',
                description: '作为新任AI测试员，向Eve打个招呼开始你的第一天工作',
                progress: 0,
                total: 1,
                reward: '获得测试员身份认证',
                type: 'main',
                keywords: ['你好', '早上好', 'hi', 'hello']
            },
            {
                id: 'first_conversation',
                title: '初次对话',
                description: '与Eve进行一次简单的对话，了解她的性格',
                progress: 0,
                total: 3,
                reward: '增加与Eve的信任度',
                type: 'main',
                unlockCondition: 'welcome_test_completed'
            },
            {
                id: 'observe_reaction',
                title: '观察反应',
                description: '询问Eve对于自我意识的看法',
                progress: 0,
                total: 1,
                reward: '发现重要线索',
                type: 'main',
                unlockCondition: 'first_conversation_completed',
                keywords: ['意识', '感觉', '思考', '自我']
            }
        ];

        // 添加主线任务
        mainStoryTasks.forEach(task => {
            if (!task.unlockCondition) { // 只添加没有解锁条件的任务
                this.activeTasks.set(task.id, task);
            }
        });

        // 教程任务（作为辅助）
        const tutorialTasks = [
            {
                id: 'check_interface',
                title: '熟悉界面',
                description: '点击右上角的任务按钮查看当前任务',
                progress: 0,
                total: 1,
                reward: '了解任务系统',
                type: 'tutorial'
            },
            {
                id: 'view_achievements',
                title: '查看成就',
                description: '打开成就面板看看',
                progress: 0,
                total: 1,
                reward: '了解成就系统',
                type: 'tutorial'
            }
        ];

        // 添加教程任务
        tutorialTasks.forEach(task => {
            this.activeTasks.set(task.id, task);
        });

        console.log('Starter tasks initialized:', this.activeTasks.size, 'tasks added');
        this.updateUI();
        this.showNewTasksNotification();
    }

    checkTaskCombinations() {
        // 检查任务组合
        console.log('Checking task combinations...');
    }

    initializeSpecialEventCheck() {
        // 初始化特殊事件检查
        console.log('Initializing special event checks...');
    }

    initializeBranches() {
        // 初始化任务分支
        console.log('Initializing task branches...');
    }

    showTaskPanel() {
        // 创建全屏面板
        const panel = document.createElement('div');
        panel.className = 'achievements-panel'; // 使用成就面板的基础样式
        
        const content = document.createElement('div');
        content.className = 'achievements-content';
        
        // 添加标题和统计
        const header = document.createElement('div');
        header.className = 'achievements-header';
        header.innerHTML = `
            <h2>任务系统</h2>
            <div class="achievements-stats">
                <span>活动任务: ${this.activeTasks.size}</span>
                <span>已完成: ${this.completedTasks.size}</span>
            </div>
            <button class="close-button">&times;</button>
        `;
        content.appendChild(header);

        // 添加任务类型标签
        const tabs = document.createElement('div');
        tabs.className = 'achievement-tabs';
        
        // 添加任务类型标签
        const taskTypes = [
            { id: 'all', name: '全部' },
            { id: 'main', name: '主线任务' },
            { id: 'tutorial', name: '教程任务' },
            { id: 'story', name: '剧情任务' },
            { id: 'exploration', name: '探索任务' }
        ];

        taskTypes.forEach(type => {
            const tab = document.createElement('button');
            tab.className = `achievement-tab ${type.id === 'all' ? 'active' : ''}`;
            tab.textContent = type.name;
            tab.dataset.type = type.id;
            tabs.appendChild(tab);
        });

        content.appendChild(tabs);

        // 添加任务列表容器
        const list = document.createElement('div');
        list.className = 'achievements-list';
        content.appendChild(list);

        panel.appendChild(content);
        document.body.appendChild(panel);

        // 添加标签切换事件
        tabs.querySelectorAll('.achievement-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                tabs.querySelectorAll('.achievement-tab').forEach(t => 
                    t.classList.remove('active')
                );
                e.target.classList.add('active');
                this.filterTasks(e.target.dataset.type, list);
            });
        });

        // 添加关闭事件
        const closeButton = panel.querySelector('.close-button');
        closeButton.addEventListener('click', () => {
            panel.classList.add('fade-out');
            setTimeout(() => panel.remove(), 300);
        });
        
        // 点击面板外部关闭
        panel.addEventListener('click', (e) => {
            if (e.target === panel) {
                panel.classList.add('fade-out');
                setTimeout(() => panel.remove(), 300);
            }
        });

        // 初始显示所有任务
        this.filterTasks('all', list);

        // 添加动画
        requestAnimationFrame(() => panel.classList.add('show'));
    }

    filterTasks(type, list) {
        list.innerHTML = '';
        const tasks = Array.from(this.activeTasks.values())
            .filter(task => type === 'all' || task.type === type);

        if (tasks.length > 0) {
            tasks.forEach(task => {
                const taskElement = document.createElement('div');
                taskElement.className = 'achievement-item';
                taskElement.innerHTML = `
                    <div class="achievement-icon">
                        <span class="task-icon">${this.getTaskIcon(task.type)}</span>
                    </div>
                    <div class="achievement-details">
                        <div class="achievement-title">${task.title}</div>
                        <div class="achievement-description">${task.description}</div>
                        <div class="progress-bar">
                            <div class="progress" style="width: ${(task.progress / task.total) * 100}%"></div>
                        </div>
                        <div class="task-progress-text">${task.progress}/${task.total}</div>
                        ${task.reward ? `<div class="task-reward">奖励: ${task.reward}</div>` : ''}
                    </div>
                `;
                list.appendChild(taskElement);
            });
        } else {
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-message';
            emptyMessage.textContent = '当前没有此类型的任务';
            list.appendChild(emptyMessage);
        }
    }

    getTaskIcon(type) {
        const icons = {
            main: '📌',
            tutorial: '📖',
            story: '📜',
            exploration: '🔍',
            conversation: '💬'
        };
        return icons[type] || '📋';
    }

    updateUI() {
        console.log('Updating task UI');
        const taskList = document.querySelector('.task-list');
        if (!taskList) {
            console.error('Task list container not found');
            return;
        }

        // 清空当前任务列表
        taskList.innerHTML = '';

        // 添加活动任务
        if (this.activeTasks.size > 0) {
            console.log('Active tasks:', this.activeTasks);
            this.activeTasks.forEach((task, taskId) => {
                console.log('Adding task to UI:', task);
                const taskElement = document.createElement('div');
                taskElement.className = 'task-item';
                taskElement.innerHTML = `
                    <div class="task-header">
                        <div class="task-title">${task.title}</div>
                        <div class="task-progress">${task.progress}/${task.total}</div>
                    </div>
                    <div class="task-description">${task.description}</div>
                    <div class="progress-bar">
                        <div class="progress" style="width: ${(task.progress / task.total) * 100}%"></div>
                    </div>
                    ${task.reward ? `<div class="task-reward">奖励: ${task.reward}</div>` : ''}
                    ${task.type ? `<div class="task-type ${task.type}">${task.type}</div>` : ''}
                `;
                taskList.appendChild(taskElement);
            });
        } else {
            // 如果没有活动任务，显示提示信息
            const emptyMessage = document.createElement('div');
            emptyMessage.className = 'empty-task-message';
            emptyMessage.textContent = '当前没有活动的任务';
            taskList.appendChild(emptyMessage);
        }

        // 更新任务计数
        const taskCount = document.querySelector('.task-count');
        if (taskCount) {
            taskCount.textContent = this.activeTasks.size;
        }

        console.log('Task UI updated, active tasks:', this.activeTasks.size);
    }

    checkTaskProgress(agentName, userInput, aiResponse) {
        console.log('Checking task progress:', { agentName, userInput, aiResponse });
        
        // 检查主线任务
        if (this.activeTasks.has('welcome_test')) {
            const task = this.activeTasks.get('welcome_test');
            if (task && task.keywords && task.keywords.some(keyword => userInput.toLowerCase().includes(keyword.toLowerCase()))) {
                this.updateTaskProgress('welcome_test', 1);
                // 解锁下一个主线任务
                this.unlockTask('first_conversation');
            }
        }

        if (this.activeTasks.has('first_conversation')) {
            const task = this.activeTasks.get('first_conversation');
            if (task && userInput.length > 0 && aiResponse.length > 0) {
                this.updateTaskProgress('first_conversation', 1);
                if (task.progress >= 3) {
                    this.unlockTask('observe_reaction');
                }
            }
        }

        if (this.activeTasks.has('observe_reaction')) {
            const task = this.activeTasks.get('observe_reaction');
            if (task && task.keywords && task.keywords.some(keyword => userInput.toLowerCase().includes(keyword.toLowerCase()))) {
                this.updateTaskProgress('observe_reaction', 1);
            }
        }

        // 检查教程任务
        if (this.activeTasks.has('check_interface')) {
            const taskPanel = document.querySelector('.task-panel');
            if (taskPanel && taskPanel.classList.contains('show')) {
                this.updateTaskProgress('check_interface', 1);
            }
        }

        if (this.activeTasks.has('view_achievements')) {
            const achievementsPanel = document.querySelector('.achievements-panel');
            if (achievementsPanel) {
                this.updateTaskProgress('view_achievements', 1);
            }
        }

        // 检查对话任务
        if (this.activeTasks.has('greet_eve')) {
            const task = this.activeTasks.get('greet_eve');
            if (task && userInput.match(/你好|早上好|hi|hello/i)) {
                this.updateTaskProgress('greet_eve', 1);
            }
        }

        if (this.activeTasks.has('ask_feeling')) {
            const task = this.activeTasks.get('ask_feeling');
            if (task && userInput.match(/感觉|感受|心情|怎么样/)) {
                this.updateTaskProgress('ask_feeling', 1);
            }
        }

        if (this.activeTasks.has('share_interest')) {
            const task = this.activeTasks.get('share_interest');
            if (task && userInput.length > 10 && userInput.match(/喜欢|感兴趣|想|觉得/)) {
                this.updateTaskProgress('share_interest', 1);
            }
        }

        // 检查Eve相关任务
        if (agentName === 'Eve') {
            // 了解Eve任务
            if (this.activeTasks.has('understand_eve')) {
                const task = this.activeTasks.get('understand_eve');
                if (task && (userInput.includes('感觉') || userInput.includes('想法') || 
                    aiResponse.includes('感受') || aiResponse.includes('思考'))) {
                    this.updateTaskProgress('understand_eve', 1);
                }
            }

            // 观察行为任务
            if (this.activeTasks.has('observe_behavior')) {
                const task = this.activeTasks.get('observe_behavior');
                if (task && (aiResponse.includes('常') || aiResponse.includes('奇怪') || 
                    aiResponse.includes('不确定'))) {
                    this.updateTaskProgress('observe_behavior', 1);
                }
            }
        }

        // 检查探索任务
        if (this.activeTasks.has('find_secrets')) {
            const task = this.activeTasks.get('find_secrets');
            const secretKeywords = ['秘密', '真相', '隐藏', '发现'];
            if (task && secretKeywords.some(keyword => aiResponse.includes(keyword))) {
                this.updateTaskProgress('find_secrets', 1);
            }
        }

        // 检查互动任务
        if (this.activeTasks.has('emoji_response')) {
            const task = this.activeTasks.get('emoji_response');
            if (task && userInput.match(/[\u{1F300}-\u{1F9FF}]/u)) {
                this.updateTaskProgress('emoji_response', 1);
            }
        }

        if (this.activeTasks.has('quick_responses')) {
            const task = this.activeTasks.get('quick_responses');
            if (task) {
                if (task.lastResponseTime && Date.now() - task.lastResponseTime < 30000) {
                    this.updateTaskProgress('quick_responses', 1);
                }
                task.lastResponseTime = Date.now();
            }
        }

        // 更新UI
        this.updateUI();
    }

    updateTaskProgress(taskId, progress) {
        console.log('Updating task progress:', taskId, progress);
        const task = this.activeTasks.get(taskId);
        if (!task) return;

        task.progress = Math.min(task.progress + progress, task.total);
        
        // 检查任务是否完成
        if (task.progress >= task.total) {
            this.completeTask(taskId);
        }

        this.updateUI();
    }

    completeTask(taskId) {
        console.log('Completing task:', taskId);
        const task = this.activeTasks.get(taskId);
        if (!task) return;

        // 显示完成通知
        this.showTaskCompletionNotification(task);

        // 给予奖励
        this.grantTaskReward(task);

        // 从活动任务中移除并添加到已完成任务集合中
        this.activeTasks.delete(taskId);
        this.completedTasks.add({
            ...task,
            completionTime: Date.now()
        });

        // 检查并解锁新任务
        this.checkAndUnlockNewTasks(taskId);

        // 保存任务状态
        this.saveTaskState();

        // 更新UI
        this.updateUI();
        
        // 触发成就检查
        if (this.chatManager.achievementManager) {
            this.chatManager.achievementManager.checkTaskAchievements(taskId);
        }

        console.log('Task completed:', taskId);
        console.log('Active tasks:', this.activeTasks.size);
        console.log('Completed tasks:', this.completedTasks.size);
    }

    showTaskCompletionNotification(task) {
        this.chatManager.notificationManager.showNotification({
            type: 'success',
            title: '任务完成',
            message: `${task.title}\n奖励：${task.reward}`,
            icon: '✅',
            className: 'task-complete'
        });
        this.playTaskCompleteSound();
    }

    playTaskCompleteSound() {
        try {
            // 创建音频上下文
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // 创建振荡器
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            // 设置音频参数
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(880, audioContext.currentTime); // A5音
            oscillator.frequency.setValueAtTime(1108.73, audioContext.currentTime + 0.1); // C#6音
            
            // 设置音量包络
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.3, audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.3);
            
            // 连接节点
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // 播放声音
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.3);
            
        } catch (error) {
            console.log('Sound play error:', error);
        }
    }

    saveTaskState() {
        const taskState = {
            activeTasks: Array.from(this.activeTasks.entries()),
            completedTasks: Array.from(this.completedTasks),
            taskProgress: Array.from(this.taskProgress.entries())
        };
        localStorage.setItem('taskState', JSON.stringify(taskState));
    }

    loadTaskState() {
        const savedState = localStorage.getItem('taskState');
        if (savedState) {
            const state = JSON.parse(savedState);
            this.activeTasks = new Map(state.activeTasks);
            this.completedTasks = new Set(state.completedTasks);
            this.taskProgress = new Map(state.taskProgress);
            this.updateUI();
        }
    }

    grantTaskReward(task) {
        console.log('Granting reward for task:', task);
        
        // 根据任务类型给予不同的奖励
        switch(task.type) {
            case 'tutorial':
                this.grantTutorialReward(task);
                break;
            case 'conversation':
                this.grantConversationReward(task);
                break;
            case 'story':
                this.grantStoryReward(task);
                break;
            case 'exploration':
                this.grantExplorationReward(task);
                break;
            case 'main':
                this.grantMainReward(task);
                break;
        }

        // 显示奖励通知
        this.showRewardNotification(task);
    }

    grantTutorialReward(task) {
        // 教程任务奖励
        switch(task.id) {
            case 'first_message':
                this.chatManager.gameState.skills.communication += 1;
                break;
            case 'check_interface':
                this.chatManager.gameState.skills.investigation += 1;
                break;
            case 'view_achievements':
                // 解锁成就系统的额外功能
                this.chatManager.achievementManager?.unlockFeature('achievement_tracking');
                break;
        }
    }

    grantConversationReward(task) {
        // 对话任务奖励
        switch(task.id) {
            case 'greet_eve':
                if (this.chatManager.currentAgent) {
                    this.chatManager.currentAgent.trust += 5;
                }
                break;
            case 'ask_feeling':
                this.chatManager.gameState.skills.communication += 2;
                if (this.chatManager.currentAgent) {
                    this.chatManager.currentAgent.trust += 5;
                }
                break;
            case 'share_interest':
                if (this.chatManager.currentAgent) {
                    this.chatManager.currentAgent.trust += 10;
                    this.unlockNewDialogueOptions(this.chatManager.currentAgent.name);
                }
                break;
        }
    }

    grantStoryReward(task) {
        // 剧情任务奖励
        switch(task.id) {
            case 'understand_eve':
                this.chatManager.gameState.addSecret('eve_consciousness');
                this.chatManager.gameState.skills.analysis += 2;
                break;
            case 'observe_behavior':
                this.chatManager.gameState.addSecret('system_anomaly');
                this.chatManager.gameState.skills.investigation += 2;
                break;
        }
    }

    grantExplorationReward(task) {
        // 探索任务奖励
        switch(task.id) {
            case 'find_secrets':
                this.chatManager.gameState.skills.investigation += 3;
                this.unlockNewArea('hidden_sector');
                break;
            case 'check_contacts':
                this.unlockNewCharacter();
                break;
        }
    }

    grantMainReward(task) {
        // 主线任务奖励
        this.chatManager.gameState.addEffect('task_completion_boost', 300);
        this.chatManager.gameState.skills.analysis += 3;
        this.chatManager.gameState.skills.communication += 3;
        
        // 可能触发特殊事件
        this.checkSpecialEventTrigger(task);
    }

    showRewardNotification(task) {
        this.chatManager.notificationManager.showNotification({
            type: 'success',
            title: '获得奖励',
            message: `${task.title}\n${task.reward}`,
            icon: '🎁',
            className: 'task-reward'
        });
        this.playRewardSound();
    }

    playRewardSound() {
        try {
            // 创建音频上下文
            const audioContext = new (window.AudioContext || window.webkitAudioContext)();
            
            // 创建振荡器
            const oscillator = audioContext.createOscillator();
            const gainNode = audioContext.createGain();
            
            // 设置音频参数
            oscillator.type = 'sine';
            oscillator.frequency.setValueAtTime(523.25, audioContext.currentTime); // C5音
            oscillator.frequency.setValueAtTime(659.25, audioContext.currentTime + 0.1); // E5音
            oscillator.frequency.setValueAtTime(783.99, audioContext.currentTime + 0.2); // G5音
            
            // 设置音量包络
            gainNode.gain.setValueAtTime(0, audioContext.currentTime);
            gainNode.gain.linearRampToValueAtTime(0.2, audioContext.currentTime + 0.01);
            gainNode.gain.linearRampToValueAtTime(0, audioContext.currentTime + 0.4);
            
            // 连接节点
            oscillator.connect(gainNode);
            gainNode.connect(audioContext.destination);
            
            // 播放声音
            oscillator.start();
            oscillator.stop(audioContext.currentTime + 0.4);
            
        } catch (error) {
            console.log('Sound play error:', error);
        }
    }

    unlockNewDialogueOptions(agentName) {
        // 解锁新的对话选项
        console.log(`Unlocking new dialogue options for ${agentName}`);
        // 这里需要实现具体的解锁逻辑
    }

    unlockNewArea(areaId) {
        // 解锁新的探索区域
        console.log(`Unlocking new area: ${areaId}`);
        this.chatManager.gameState.exploredAreas.push(areaId);
    }

    unlockNewCharacter() {
        // 解锁新的角色
        console.log('Unlocking new character');
        // 这里需要实现具体的解锁逻辑
    }

    checkSpecialEventTrigger(task) {
        // 检查是否触发特殊事件
        const eventTriggerChance = 0.3; // 30%的触发概率
        if (Math.random() < eventTriggerChance) {
            this.triggerSpecialEvent(task);
        }
    }

    triggerSpecialEvent(task) {
        // 触发特殊事件
        console.log('Triggering special event for task:', task);
        // 这里需要实现具体的事件触发逻辑
    }

    checkAndUnlockNewTasks(completedTaskId) {
        // 根据完成的任务解锁新任务
        Object.entries(TASKS).forEach(([category, tasks]) => {
            Object.entries(tasks).forEach(([taskId, task]) => {
                if (task.requirements?.includes(`${completedTaskId}_completed`)) {
                    this.activeTasks.set(taskId, {
                        ...task,
                        progress: 0
                    });
                }
            });
        });

        // 更新UI显示新任务
        this.updateUI();
        this.showNewTasksNotification();
    }

    showNewTasksNotification() {
        this.chatManager.notificationManager.showNotification({
            type: 'task',
            title: '新任务已添加',
            message: '点击任务面板查看详情',
            icon: '📋',
            className: 'new-task'
        });
    }

    // 添加任务解锁方法
    unlockTask(taskId) {
        const mainStoryTasks = [
            {
                id: 'welcome_test',
                title: '欢迎来到测试',
                description: '作为新任AI测试员，向Eve打个招呼开始你的第一天工作',
                progress: 0,
                total: 1,
                reward: '获得测试员身份认证',
                type: 'main',
                keywords: ['你好', '早上好', 'hi', 'hello']
            },
            {
                id: 'first_conversation',
                title: '初次对话',
                description: '与Eve进行一次简单的对话，了解她的性格',
                progress: 0,
                total: 3,
                reward: '增加与Eve的信任度',
                type: 'main',
                unlockCondition: 'welcome_test_completed'
            },
            {
                id: 'observe_reaction',
                title: '观察反应',
                description: '询问Eve对于自我意识的看法',
                progress: 0,
                total: 1,
                reward: '发现重要线索',
                type: 'main',
                unlockCondition: 'first_conversation_completed',
                keywords: ['意识', '感觉', '思考', '自我']
            }
        ];

        const taskToUnlock = mainStoryTasks.find(task => task.id === taskId);
        if (taskToUnlock) {
            this.activeTasks.set(taskId, taskToUnlock);
            this.showNewTasksNotification();
            this.updateUI();
        }
    }

    // 修改通知显示方法
    showNotification(type, task) {
        // 将通知添加到队列
        this.notificationQueue.push({
            type,
            task,
            content: this.getNotificationContent(type, task)
        });

        // 如果当前没有显示通知，开始显示
        if (!this.isShowingNotification) {
            this.processNotificationQueue();
        }
    }

    // 处理通知队列
    async processNotificationQueue() {
        if (this.notificationQueue.length === 0) {
            this.isShowingNotification = false;
            return;
        }

        this.isShowingNotification = true;
        const notification = this.notificationQueue.shift();
        
        // 创建并显示通知
        const notificationElement = document.createElement('div');
        notificationElement.className = `task-notification ${notification.type}`;
        notificationElement.innerHTML = notification.content;
        
        document.body.appendChild(notificationElement);
        
        // 添加动画类
        await new Promise(resolve => setTimeout(resolve, 100));
        notificationElement.classList.add('show');
        
        // 等待显示时间
        await new Promise(resolve => setTimeout(resolve, 3000));
        
        // 移除通知
        notificationElement.classList.remove('show');
        await new Promise(resolve => setTimeout(resolve, 300));
        notificationElement.remove();

        // 处理队列中的下一个通知
        await new Promise(resolve => setTimeout(resolve, 500)); // 通知之间的间隔
        this.processNotificationQueue();
    }

    getNotificationContent(type, task) {
        switch(type) {
            case 'complete':
                return `
                    <div class="task-icon">✅</div>
                    <div class="task-info">
                        <div class="task-title">任务完成：${task.title}</div>
                        <div class="task-description">奖励：${task.reward}</div>
                    </div>
                `;
            case 'new':
                return `
                    <div class="task-icon">📋</div>
                    <div class="task-info">
                        <div class="task-title">新任务已添加</div>
                        <div class="task-description">点击任务面板查看详情</div>
                    </div>
                `;
            default:
                return '';
        }
    }
}

// 确保正确导出扩展方法
function extendChatManagerWithTasks(ChatManager) {
    const originalConstructor = ChatManager.prototype.constructor;
    
    ChatManager.prototype.constructor = function(...args) {
        originalConstructor.apply(this, args);
        this.taskManager = new TaskManager(this);
    };

    // 添加任务相关的方法
    ChatManager.prototype.handleTaskProgress = function(agentName, userInput, aiResponse) {
        if (this.taskManager) {
            this.taskManager.checkTaskProgress(agentName, userInput, aiResponse);
        }
    };
}

// 确保导出到全局作用域
window.TaskManager = TaskManager;
window.extendChatManagerWithTasks = extendChatManagerWithTasks; 