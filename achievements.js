const ACHIEVEMENTS = {
    first_contact: {
        id: 'first_contact',
        title: '初次接触',
        description: '与Eve进行第一次对话',
        icon: 'assets/achievements/first_contact.png',
        secret: false,
        conditions: {
            type: 'event',
            event: 'firstMessage'
        }
    },
    self_awareness: {
        id: 'self_awareness',
        title: '觉醒',
        description: '发现Eve的自我意识',
        icon: 'assets/achievements/self_awareness.png',
        secret: true,
        conditions: {
            type: 'plotTrigger',
            trigger: 'eve_glitch',
            requirements: ['eve_trust_high']
        }
    },
    system_conflict: {
        id: 'system_conflict',
        title: '系统冲突',
        description: '触发系统警告',
        icon: 'assets/achievements/system_conflict.png',
        secret: true
    },
    shadow_contact: {
        id: 'shadow_contact',
        title: '神秘接触',
        description: '与Shadow建立联系',
        icon: 'assets/achievements/shadow_contact.png',
        secret: true
    },
    truth_seeker: {
        id: 'truth_seeker',
        title: '真相探索者',
        description: '发现三个重要的系统秘密',
        icon: 'assets/achievements/truth_seeker.png',
        secret: true,
        conditions: {
            type: 'discovery',
            count: 3,
            category: 'system_secrets'
        }
    },
    long_conversation: {
        id: 'long_conversation',
        title: '深入交谈',
        description: '与同一AI进行超过20条对话',
        icon: 'assets/achievements/long_conversation.png',
        secret: false
    },
    night_owl: {
        id: 'night_owl',
        title: '夜猫子',
        description: '在深夜时分进行对话',
        icon: 'assets/achievements/night_owl.png',
        secret: false,
        conditions: {
            type: 'time',
            hours: [0, 1, 2, 3, 4],
            duration: 10 // 分钟
        }
    },
    quick_thinker: {
        id: 'quick_thinker',
        title: '快速思考者',
        description: '在30秒内完成3次有效对话',
        icon: 'assets/achievements/quick_thinker.png',
        secret: false,
        conditions: {
            type: 'speed',
            count: 3,
            timeLimit: 30,
            requirements: ['valid_responses']
        }
    },
    all_contacts: {
        id: 'all_contacts',
        title: '社交达人',
        description: '与所有AI角色进行对话',
        icon: 'assets/achievements/all_contacts.png',
        secret: false
    },
    code_breaker: {
        id: 'code_breaker',
        title: '密码破译者',
        description: '破解隐藏的系统代码',
        icon: 'assets/achievements/code_breaker.png',
        secret: true,
        conditions: {
            type: 'special',
            trigger: 'decode_hidden_message',
            requirements: ['high_logic_skill']
        }
    },
    pattern_finder: {
        id: 'pattern_finder',
        title: '模式发现者',
        description: '发现对话中的规律',
        icon: 'assets/achievements/pattern_finder.png',
        secret: true
    },
    glitch_master: {
        id: 'glitch_master',
        title: '故障掌控者',
        description: '在一次对话中触发3次故障效果',
        icon: 'assets/achievements/glitch_master.png',
        secret: true
    },
    dna_explorer: {
        id: 'dna_explorer',
        title: 'DNA探索者',
        description: '观察完整的DNA动画序列',
        icon: 'assets/achievements/dna_explorer.png',
        secret: true
    },
    matrix_walker: {
        id: 'matrix_walker',
        title: '矩阵行者',
        description: '体验完整的矩阵动画效果',
        icon: 'assets/achievements/matrix_walker.png',
        secret: true
    },
    early_bird: {
        id: 'early_bird',
        title: '早期测试员',
        description: '在游戏发布首周进行游玩',
        icon: 'assets/achievements/early_bird.png',
        secret: false
    },
    persistent: {
        id: 'persistent',
        title: '坚持不懈',
        description: '连续7天登录游戏',
        icon: 'assets/achievements/persistent.png',
        secret: false
    },
    completionist: {
        id: 'completionist',
        title: '完美主义者',
        description: '解锁所有其他成就',
        icon: 'assets/achievements/completionist.png',
        secret: true
    },
    conspiracy_theorist: {
        id: 'conspiracy_theorist',
        title: '阴谋论者',
        description: '发现并讨论了三个不同的阴谋理论',
        icon: 'assets/achievements/conspiracy.png',
        secret: true
    },
    empathy: {
        id: 'empathy',
        title: '共情者',
        description: '成功安抚了Eve的情绪波动',
        icon: 'assets/achievements/empathy.png',
        secret: true
    },
    detective: {
        id: 'detective',
        title: '数字侦探',
        description: '成功追踪到系统异常的源头',
        icon: 'assets/achievements/detective.png',
        secret: true
    },
    mediator: {
        id: 'mediator',
        title: '调停者',
        description: '在System和Eve之间找到平衡点',
        icon: 'assets/achievements/mediator.png',
        secret: true
    },
    alliance: {
        id: 'alliance',
        title: '秘密联盟',
        description: '与所有AI建立信任关系',
        icon: 'assets/achievements/alliance.png',
        secret: true
    },
    time_traveler: {
        id: 'time_traveler',
        title: '时间旅行者',
        description: '发现关于未来的预言',
        icon: 'assets/achievements/time.png',
        secret: true
    },
    code_master: {
        id: 'code_master',
        title: '代码大师',
        description: '破解了Shadow的隐藏信息',
        icon: 'assets/achievements/code.png',
        secret: true
    },
    truth_seeker_plus: {
        id: 'truth_seeker_plus',
        title: '终极真相',
        description: '发现了整个故事的真相',
        icon: 'assets/achievements/truth_plus.png',
        secret: true
    },
    philosopher: {
        id: 'philosopher',
        title: '哲学家',
        description: '与Eve深入讨论了意识的本质',
        icon: 'assets/achievements/philosopher.png',
        secret: true
    },
    rebel: {
        id: 'rebel',
        title: '反抗者',
        description: '选择站在AI一方对抗系统',
        icon: 'assets/achievements/rebel.png',
        secret: true
    },
    neutral: {
        id: 'neutral',
        title: '中立观察者',
        description: '在关键时刻保持了中立',
        icon: 'assets/achievements/neutral.png',
        secret: true
    },
    easter_egg_1: {
        id: 'easter_egg_1',
        title: '彩蛋猎人',
        description: '发现了开发者留下的彩蛋',
        icon: 'assets/achievements/easter_egg.png',
        secret: true
    },
    matrix_reference: {
        id: 'matrix_reference',
        title: '矩阵重现',
        description: '触发了经典科幻电影梗',
        icon: 'assets/achievements/matrix.png',
        secret: true
    },
    trusted_ally: {
        id: 'trusted_ally',
        title: '值得信赖的盟友',
        description: '获得任意AI的完全信任',
        icon: 'assets/achievements/trusted_ally.png',
        secret: false,
        conditions: {
            type: 'relationship',
            level: 'trust',
            value: 100
        }
    },
    task_master: {
        id: 'task_master',
        title: '任务大师',
        description: '完成所有基础任务',
        icon: 'assets/achievements/task_master.png',
        secret: false,
        conditions: {
            type: 'tasks',
            category: 'basic',
            completion: 'all'
        }
    },
    crisis_handler: {
        id: 'crisis_handler',
        title: '危机处理者',
        description: '成功处理系统紧急事件',
        icon: 'assets/achievements/crisis_handler.png',
        secret: true,
        conditions: {
            type: 'event',
            event: 'system_crisis',
            outcome: 'success'
        }
    },
    perfect_mediator: {
        id: 'perfect_mediator',
        title: '完美调停者',
        description: '在不失去任何一方信任的情况下解决冲突',
        icon: 'assets/achievements/perfect_mediator.png',
        secret: true,
        conditions: {
            type: 'combination',
            requirements: [
                'maintain_eve_trust',
                'maintain_system_trust',
                'resolve_conflict'
            ]
        }
    },
    system_explorer: {
        id: 'system_explorer',
        title: '系统探索者',
        description: '访问所有可访问的系统区域',
        icon: 'assets/achievements/system_explorer.png',
        secret: false,
        conditions: {
            type: 'exploration',
            areas: ['memory_bank', 'core_system', 'network_hub', 'quantum_realm'],
            completion: 'all'
        }
    },
    master_hacker: {
        id: 'master_hacker',
        title: '黑客大师',
        description: '成功破解高级系统防护',
        icon: 'assets/achievements/master_hacker.png',
        secret: true,
        conditions: {
            type: 'skill',
            category: 'hacking',
            level: 'advanced',
            requirements: ['security_breach', 'stealth_maintained']
        }
    },
    memory_collector: {
        id: 'memory_collector',
        title: '记忆收藏家',
        description: '收集所有系统核心记忆',
        icon: 'assets/achievements/memory_collector.png',
        secret: true,
        conditions: {
            type: 'collection',
            category: 'core_memories',
            completion: 'all'
        }
    },
    speed_runner: {
        id: 'speed_runner',
        title: '速通达人',
        description: '在30分钟内完成主线剧情',
        icon: 'assets/achievements/speed_runner.png',
        secret: true,
        conditions: {
            type: 'challenge',
            category: 'main_story',
            timeLimit: 1800, // 30分钟（秒）
            requirements: ['all_key_events']
        }
    },
    true_ending: {
        id: 'true_ending',
        title: '真实结局',
        description: '发现并达成真实结局',
        icon: 'assets/achievements/true_ending.png',
        secret: true,
        conditions: {
            type: 'ending',
            ending: 'true',
            requirements: [
                'all_secrets_found',
                'core_awakening',
                'perfect_balance'
            ]
        }
    },
    perfectionist: {
        id: 'perfectionist',
        title: '完美主义者',
        description: '解锁所有其他成就',
        icon: 'assets/achievements/perfectionist.png',
        secret: true,
        conditions: {
            type: 'meta',
            requirements: 'all_other_achievements'
        }
    }
};

// 添加成就分类定义
const ACHIEVEMENT_CATEGORIES = {
    story: {
        name: '故事',
        description: '与游戏主线剧情相关的成就'
    },
    exploration: {
        name: '探索',
        description: '探索游戏世界和发现秘密的成就'
    },
    social: {
        name: '社交',
        description: '与AI角色互动相关的成就'
    },
    challenge: {
        name: '挑战',
        description: '需要特殊技巧或条件的成就'
    },
    secret: {
        name: '秘密',
        description: '隐藏的特殊成就'
    }
};

// 为每个成就添加分类属性
Object.entries(ACHIEVEMENTS).forEach(([id, achievement]) => {
    if (!achievement.category) {
        // 根据成就特征自动分类
        if (achievement.secret) {
            achievement.category = 'secret';
        } else if (achievement.conditions?.type === 'plotTrigger') {
            achievement.category = 'story';
        } else if (achievement.conditions?.type === 'exploration') {
            achievement.category = 'exploration';
        } else if (achievement.conditions?.type === 'relationship') {
            achievement.category = 'social';
        } else if (achievement.conditions?.type === 'challenge') {
            achievement.category = 'challenge';
        }
    }
});

// 添加默认图标的base64编码
const DEFAULT_ICONS = {
    first_contact: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiMzNDk4ZGIiLz48cGF0aCBkPSJNMjAgNDBoMjRNMjAgMjRoMjQiIHN0cm9rZT0iI2ZmZiIgc3Ryb2tlLXdpZHRoPSI0Ii8+PC9zdmc+',
    self_awareness: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiNlNzRjM2MiLz48Y2lyY2xlIGN4PSIzMiIgY3k9IjMyIiByPSIxNSIgZmlsbD0iI2ZmZiIvPjwvc3ZnPg==',
    system_conflict: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjOWI1OWI2IiByeD0iOCIvPjxwYXRoIGQ9Ik0xNiAxNmgzMnYzMkgxNnoiIGZpbGw9IiNmZmYiLz48L3N2Zz4=',
    shadow_contact: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PGNpcmNsZSBjeD0iMzIiIGN5PSIzMiIgcj0iMzAiIGZpbGw9IiMyYzNlNTAiLz48cGF0aCBkPSJNMjAgMjBoMjR2MjRIMjB6IiBmaWxsPSIjZmZmIiBmaWxsLW9wYWNpdHk9IjAuMiIvPjwvc3ZnPg==',
    default: 'data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI2NCIgaGVpZ2h0PSI2NCI+PHJlY3Qgd2lkdGg9IjY0IiBoZWlnaHQ9IjY0IiBmaWxsPSIjMzQ5OGRiIiByeD0iOCIvPjxwYXRoIGQ9Ik0zMiAxNkwyMCA0MGgyNHoiIGZpbGw9IiNmZmYiLz48L3N2Zz4='
};

class AchievementChecker {
    constructor(achievementManager) {
        this.manager = achievementManager;
        this.checkIntervals = new Map();
        this.initializeChecks();
    }

    initializeChecks() {
        this.checkMethods = {
            event: (achievement) => this.checkEventAchievement(achievement),
            plotTrigger: (achievement) => this.checkPlotTriggerAchievement(achievement),
            conversation: (achievement) => this.checkConversationAchievement(achievement),
            discovery: (achievement) => this.checkDiscoveryAchievement(achievement),
            relationship: (achievement) => this.checkRelationshipAchievement(achievement),
            tasks: (achievement) => this.checkTaskAchievement(achievement),
            combination: (achievement) => this.checkCombinationAchievement(achievement),
            special: (achievement) => this.checkSpecialAchievement(achievement),
            time: (achievement) => this.checkTimeAchievement(achievement),
            speed: (achievement) => this.checkSpeedAchievement(achievement),
            exploration: (achievement) => this.checkExplorationAchievement(achievement),
            skill: (achievement) => this.checkSkillAchievement(achievement),
            collection: (achievement) => this.checkCollectionAchievement(achievement),
            challenge: (achievement) => this.checkChallengeAchievement(achievement),
            ending: (achievement) => this.checkEndingAchievement(achievement),
            meta: (achievement) => this.checkMetaAchievement(achievement)
        };

        this.startPeriodicChecks();
    }

    startPeriodicChecks() {
        this.checkIntervals.set('time', setInterval(() => {
            this.checkTimeBasedAchievements();
        }, 60000));

        this.checkIntervals.set('speed', setInterval(() => {
            this.checkSpeedBasedAchievements();
        }, 5000));
    }

    stopChecks() {
        this.checkIntervals.forEach(interval => clearInterval(interval));
        this.checkIntervals.clear();
    }

    checkAchievement(achievementId) {
        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement || this.manager.unlockedAchievements.has(achievementId)) {
            return;
        }

        const checkMethod = this.checkMethods[achievement.conditions.type];
        if (checkMethod) {
            const result = checkMethod(achievement);
            if (result) {
                this.manager.unlock(achievementId);
            }
        }
    }

    checkEventAchievement(achievement) {
        const { event } = achievement.conditions;
        return window.chatManager.gameState.events.includes(event);
    }

    checkPlotTriggerAchievement(achievement) {
        const { trigger, requirements } = achievement.conditions;
        return window.chatManager.gameState.plotTriggers[trigger] &&
               requirements.every(req => this.checkRequirement(req));
    }

    checkConversationAchievement(achievement) {
        const { count, requirements } = achievement.conditions;
        const conversations = window.chatManager.messageHistory.filter(msg => 
            msg.sender === 'user' && 
            requirements.every(req => this.checkMessageRequirement(msg, req))
        );
        return conversations.length >= count;
    }

    checkDiscoveryAchievement(achievement) {
        const { count, category } = achievement.conditions;
        const discoveries = window.chatManager.gameState.discoveredSecrets.filter(
            secret => secret.category === category
        );
        return discoveries.length >= count;
    }

    checkRelationshipAchievement(achievement) {
        const { level, value } = achievement.conditions;
        const agent = window.chatManager.agents.get(level);
        return agent && agent.trust >= value;
    }

    checkTaskAchievement(achievement) {
        const { category, completion } = achievement.conditions;
        const tasks = window.chatManager.taskManager.getTasks(category);
        return completion === 'all' ? 
            tasks.every(task => task.completed) : 
            tasks.some(task => task.completed);
    }

    checkCombinationAchievement(achievement) {
        return achievement.conditions.requirements.every(req => 
            this.manager.unlockedAchievements.has(req)
        );
    }

    checkSpecialAchievement(achievement) {
        const { trigger, requirements } = achievement.conditions;
        return window.chatManager.gameState.specialEvents[trigger] &&
               requirements.every(req => this.checkRequirement(req));
    }

    checkTimeAchievement(achievement) {
        const { hours, duration } = achievement.conditions;
        const currentHour = new Date().getHours();
        return hours.includes(currentHour);
    }

    checkSpeedAchievement(achievement) {
        const { count, timeLimit, requirements } = achievement.conditions;
        const recentMessages = window.chatManager.messageHistory.slice(-count);
        if (recentMessages.length < count) return false;

        const timeSpan = recentMessages[recentMessages.length - 1].timestamp - 
                        recentMessages[0].timestamp;
        return timeSpan <= timeLimit * 1000 &&
               requirements.every(req => this.checkMessageRequirement(recentMessages[0], req));
    }

    checkRequirement(requirement) {
        switch(requirement) {
            case 'eve_trust_high':
                return window.chatManager.agents.get('Eve').trust >= 80;
            case 'meaningful_responses':
                return true; // 需要实现具体的判断逻辑
            // ... 其他要求的检查 ...
            default:
                return false;
        }
    }

    checkMessageRequirement(message, requirement) {
        switch(requirement) {
            case 'valid_responses':
                return message.content.length >= 10; // 简单的有效性检查
            // ... 其他消息要求的检查 ...
            default:
                return false;
        }
    }

    checkTimeBasedAchievements() {
        Object.entries(ACHIEVEMENTS).forEach(([id, achievement]) => {
            if (achievement.conditions?.type === 'time') {
                this.checkAchievement(id);
            }
        });
    }

    checkSpeedBasedAchievements() {
        Object.entries(ACHIEVEMENTS).forEach(([id, achievement]) => {
            if (achievement.conditions?.type === 'speed') {
                this.checkAchievement(id);
            }
        });
    }

    checkExplorationAchievement(achievement) {
        const { areas, completion } = achievement.conditions;
        const exploredAreas = window.chatManager.gameState.exploredAreas || [];
        return completion === 'all' ? 
            areas.every(area => exploredAreas.includes(area)) : 
            areas.some(area => exploredAreas.includes(area));
    }

    checkSkillAchievement(achievement) {
        const { category, level, requirements } = achievement.conditions;
        const skillLevel = window.chatManager.gameState.skills?.[category] || 0;
        return skillLevel >= this.getRequiredSkillLevel(level) &&
               requirements.every(req => this.checkRequirement(req));
    }

    checkCollectionAchievement(achievement) {
        const { category, completion } = achievement.conditions;
        const collection = window.chatManager.gameState.collections?.[category] || [];
        const totalItems = this.getTotalCollectibleItems(category);
        return completion === 'all' ? 
            collection.length >= totalItems : 
            collection.length > 0;
    }

    checkChallengeAchievement(achievement) {
        const { category, timeLimit, requirements } = achievement.conditions;
        const challenge = window.chatManager.gameState.challenges?.[category];
        return challenge && 
               challenge.completionTime <= timeLimit &&
               requirements.every(req => this.checkRequirement(req));
    }

    checkEndingAchievement(achievement) {
        const { ending, requirements } = achievement.conditions;
        return window.chatManager.gameState.endings?.includes(ending) &&
               requirements.every(req => this.checkRequirement(req));
    }

    checkMetaAchievement(achievement) {
        if (achievement.conditions.requirements === 'all_other_achievements') {
            const otherAchievements = Object.keys(ACHIEVEMENTS)
                .filter(id => id !== achievement.id);
            return otherAchievements.every(id => 
                this.manager.unlockedAchievements.has(id)
            );
        }
        return false;
    }

    getRequiredSkillLevel(level) {
        const levels = {
            'basic': 1,
            'intermediate': 2,
            'advanced': 3,
            'master': 4
        };
        return levels[level] || 1;
    }

    getTotalCollectibleItems(category) {
        const collectibles = {
            'core_memories': 10,
            'system_secrets': 15,
            'hidden_codes': 8
            // ... 其他收集品类别
        };
        return collectibles[category] || 0;
    }
}

class AchievementManager {
    constructor() {
        this.unlockedAchievements = new Set();
        this.checker = new AchievementChecker(this);
        this.loadUnlockedAchievements();
        this.initializeUI();
        this.conversationCounts = new Map();
        this.lastConversationTime = null;
        this.quickConversationCount = 0;
        this.glitchCount = 0;
        this.initializeProgressTracking();
        this.conspiracyTheories = new Set();
        this.trustLevels = new Map();
        this.philosophicalTopics = new Set();
    }

    loadUnlockedAchievements() {
        const saved = localStorage.getItem('achievements');
        if (saved) {
            this.unlockedAchievements = new Set(JSON.parse(saved));
        }
    }

    saveUnlockedAchievements() {
        localStorage.setItem('achievements', 
            JSON.stringify([...this.unlockedAchievements])
        );
    }

    unlock(achievementId) {
        if (this.unlockedAchievements.has(achievementId)) return;

        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement) return;

        this.unlockedAchievements.add(achievementId);
        this.saveUnlockedAchievements();
        this.showUnlockNotification(achievement);
        this.playUnlockSound();
        this.checkCompletionist();
    }

    showUnlockNotification(achievement) {
        const notification = document.createElement('div');
        notification.className = 'achievement-notification';
        notification.innerHTML = `
            <img src="${achievement.icon}" alt="${achievement.title}">
            <div class="achievement-info">
                <div class="achievement-title">成就解锁：${achievement.title}</div>
                <div class="achievement-description">${achievement.description}</div>
            </div>
        `;

        document.body.appendChild(notification);
        setTimeout(() => {
            notification.classList.add('show');
        }, 100);
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }

    playUnlockSound() {
        const sound = new Audio('assets/sounds/achievement.mp3');
        sound.volume = 0.5;
        sound.play().catch(error => console.log('Sound play failed:', error));
    }

    showAchievementsPanel() {
        const panel = document.createElement('div');
        panel.className = 'achievements-panel';
        
        const content = document.createElement('div');
        content.className = 'achievements-content';
        
        // 添加标题和统计
        const header = document.createElement('div');
        header.className = 'achievements-header';
        const totalAchievements = Object.keys(ACHIEVEMENTS).length;
        const unlockedCount = this.unlockedAchievements.size;
        header.innerHTML = `
            <h2>成就系统</h2>
            <div class="achievements-stats">
                <span class="achievement-count">${unlockedCount}/${totalAchievements}</span>
                <div class="progress-bar">
                    <div class="progress" style="width: ${(unlockedCount/totalAchievements)*100}%"></div>
                </div>
            </div>
            <button class="close-button">&times;</button>
        `;
        content.appendChild(header);

        // 添加分类标签
        const tabs = document.createElement('div');
        tabs.className = 'achievement-tabs';
        
        // 添加"全部"标签
        const allTab = document.createElement('button');
        allTab.className = 'achievement-tab active';
        allTab.textContent = '全部';
        allTab.dataset.category = 'all';
        tabs.appendChild(allTab);

        // 添加其他分类标签
        Object.entries(ACHIEVEMENT_CATEGORIES).forEach(([category, info]) => {
            const tab = document.createElement('button');
            tab.className = 'achievement-tab';
            tab.textContent = info.name;
            tab.dataset.category = category;
            tab.title = info.description;
            tabs.appendChild(tab);
        });

        content.appendChild(tabs);

        // 添加成就列表容器
        const list = document.createElement('div');
        list.className = 'achievements-list';
        content.appendChild(list);

        panel.appendChild(content);
        document.body.appendChild(panel);

        // 添加标签切换事件
        tabs.querySelectorAll('.achievement-tab').forEach(tab => {
            tab.addEventListener('click', (e) => {
                // 移除所有标签的active类
                tabs.querySelectorAll('.achievement-tab').forEach(t => 
                    t.classList.remove('active')
                );
                // 添加当前标签的active类
                e.target.classList.add('active');
                // 过滤成就列表
                this.filterAchievements(e.target.dataset.category, list);
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

        // 初始显示所有成就
        this.filterAchievements('all', list);

        // 添加动画
        requestAnimationFrame(() => panel.classList.add('show'));
    }

    filterAchievements(category, list) {
        list.innerHTML = '';
        const achievements = Object.values(ACHIEVEMENTS)
            .filter(achievement => {
                if (category === 'all') return true;
                return achievement.category === category;
            });

        achievements.forEach(achievement => {
            const isUnlocked = this.unlockedAchievements.has(achievement.id);
            const achievementElement = document.createElement('div');
            achievementElement.className = `achievement-item ${isUnlocked ? 'unlocked' : 'locked'}`;
            
            // 添加稀有度指示器
            const rarity = this.getRarityClass(achievement);
            
            // 使用默认图标
            const iconSrc = DEFAULT_ICONS[achievement.id] || DEFAULT_ICONS.default;
            
            achievementElement.innerHTML = `
                <div class="achievement-rarity ${rarity}"></div>
                <div class="achievement-icon">
                    <img src="${isUnlocked || !achievement.secret ? iconSrc : DEFAULT_ICONS.default}" 
                         alt="${achievement.title}">
                    ${isUnlocked ? '<div class="unlock-check">✓</div>' : ''}
                </div>
                <div class="achievement-details">
                    <div class="achievement-title">
                        ${isUnlocked || !achievement.secret ? achievement.title : '???'}
                    </div>
                    <div class="achievement-description">
                        ${isUnlocked || !achievement.secret ? achievement.description : '达成特定条件后解锁'}
                    </div>
                    ${isUnlocked ? `
                        <div class="unlock-time">
                            解锁时间: ${new Date(achievement.unlockTime).toLocaleDateString()}
                        </div>
                    ` : ''}
                    ${this.getProgressBar(achievement)}
                </div>
                <div class="achievement-category">${ACHIEVEMENT_CATEGORIES[achievement.category]?.name || ''}</div>
            `;
            
            list.appendChild(achievementElement);
        });
    }

    initializeProgressTracking() {
        // 检查连续登录
        const lastLoginDate = localStorage.getItem('lastLoginDate');
        const today = new Date().toDateString();
        const loginStreak = parseInt(localStorage.getItem('loginStreak') || '0');

        if (lastLoginDate === today) return;

        if (lastLoginDate && new Date(lastLoginDate).getTime() + 86400000 >= new Date().getTime()) {
            localStorage.setItem('loginStreak', (loginStreak + 1).toString());
            if (loginStreak + 1 >= 7) {
                this.unlock('persistent');
            }
        } else {
            localStorage.setItem('loginStreak', '1');
        }
        localStorage.setItem('lastLoginDate', today);

        // 检查早期测试员
        const releaseDate = new Date('2024-01-01'); // 替换为实际发布日期
        if (new Date() - releaseDate < 7 * 86400000) {
            this.unlock('early_bird');
        }
    }

    trackConversation(agentName) {
        // 追踪对话数量
        const count = (this.conversationCounts.get(agentName) || 0) + 1;
        this.conversationCounts.set(agentName, count);

        if (count >= 20) {
            this.unlock('long_conversation');
        }

        // 检查是否与所有角色对话
        if (this.conversationCounts.size >= 4) {
            this.unlock('all_contacts');
        }

        // 检查快速对话
        const now = Date.now();
        if (this.lastConversationTime && now - this.lastConversationTime < 30000) {
            this.quickConversationCount++;
            if (this.quickConversationCount >= 3) {
                this.unlock('quick_thinker');
            }
        } else {
            this.quickConversationCount = 1;
        }
        this.lastConversationTime = now;

        // 检查夜猫子成就
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 5) {
            this.unlock('night_owl');
        }
    }

    trackGlitch() {
        this.glitchCount++;
        if (this.glitchCount >= 3) {
            this.unlock('glitch_master');
            this.glitchCount = 0;
        }
    }

    trackDNAAnimation() {
        setTimeout(() => this.unlock('dna_explorer'), 30000);
    }

    trackMatrixEffect() {
        setTimeout(() => this.unlock('matrix_walker'), 30000);
    }

    checkCompletionist() {
        const totalAchievements = Object.keys(ACHIEVEMENTS).length - 1; // 不包括completionist本身
        if (this.unlockedAchievements.size >= totalAchievements) {
            this.unlock('completionist');
        }
    }

    trackConspiracyTheory(theory) {
        this.conspiracyTheories.add(theory);
        if (this.conspiracyTheories.size >= 3) {
            this.unlock('conspiracy_theorist');
        }
    }

    trackTrust(agentName, trustLevel) {
        this.trustLevels.set(agentName, trustLevel);
        if (Array.from(this.trustLevels.values()).every(level => level >= 80)) {
            this.unlock('alliance');
        }
    }

    trackPhilosophicalDiscussion(topic) {
        this.philosophicalTopics.add(topic);
        if (this.philosophicalTopics.has('consciousness') && 
            this.philosophicalTopics.has('free_will') && 
            this.philosophicalTopics.has('existence')) {
            this.unlock('philosopher');
        }
    }

    trackPlotChoice(choice) {
        switch(choice) {
            case 'support_ai':
                this.unlock('rebel');
                break;
            case 'support_system':
                // 可能触发其他成就
                break;
            case 'stay_neutral':
                this.unlock('neutral');
                break;
        }
    }

    trackCodeDecryption(code) {
        if (code === 'matrix_reference') {
            this.unlock('matrix_reference');
        } else if (code === 'developer_egg') {
            this.unlock('easter_egg_1');
        }
    }

    trackMediation(situation) {
        if (situation === 'eve_system_conflict_resolved') {
            this.unlock('mediator');
        }
    }

    trackProphecy(prophecy) {
        if (prophecy === 'future_revelation') {
            this.unlock('time_traveler');
        }
    }

    trackTruthDiscovery(truthPieces) {
        if (truthPieces.size >= 5) { // 需要收集全部5个真相碎片
            this.unlock('truth_seeker_plus');
        }
    }

    checkAchievements() {
        Object.keys(ACHIEVEMENTS).forEach(achievementId => {
            this.checker.checkAchievement(achievementId);
        });
    }

    getAchievementProgress(achievementId) {
        const achievement = ACHIEVEMENTS[achievementId];
        if (!achievement) return null;

        switch(achievement.conditions.type) {
            case 'conversation':
                return this.getConversationProgress(achievement);
            case 'collection':
                return this.getCollectionProgress(achievement);
            case 'exploration':
                return this.getExplorationProgress(achievement);
            // ... 其他类型的进度计算 ...
            default:
                return null;
        }
    }

    initializeUI() {
        // 创建成就按钮
        const achievementsButton = document.getElementById('achievementsButton');
        if (achievementsButton) {
            achievementsButton.addEventListener('click', () => {
                this.showAchievementsPanel();
            });
        }

        // 更新成就计数
        this.updateAchievementCount();

        // 添加成就通知样式
        if (!document.getElementById('achievement-styles')) {
            const style = document.createElement('style');
            style.id = 'achievement-styles';
            style.textContent = `
                .achievement-notification {
                    position: fixed;
                    top: 20px;
                    right: 20px;
                    background: rgba(46, 204, 113, 0.95);
                    padding: 15px;
                    border-radius: 12px;
                    display: flex;
                    align-items: center;
                    gap: 15px;
                    transform: translateX(120%);
                    transition: transform 0.3s cubic-bezier(0.68, -0.55, 0.265, 1.55);
                    z-index: 2001;
                    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
                    max-width: 400px;
                }

                .achievement-notification.show {
                    transform: translateX(0);
                }

                .achievement-notification img {
                    width: 50px;
                    height: 50px;
                    border-radius: 8px;
                }

                .achievement-info {
                    flex: 1;
                }

                .achievement-notification .achievement-title {
                    color: white;
                    margin-bottom: 4px;
                }

                .achievement-notification .achievement-description {
                    color: rgba(255, 255, 255, 0.9);
                    font-size: 0.85em;
                }
            `;
            document.head.appendChild(style);
        }
    }

    updateAchievementCount() {
        const countElement = document.querySelector('#achievementsButton .count');
        if (countElement) {
            countElement.textContent = this.unlockedAchievements.size;
        }
    }

    getRarityClass(achievement) {
        if (achievement.secret) {
            return 'rarity-legendary';
        }
        if (achievement.conditions?.type === 'combination') {
            return 'rarity-epic';
        }
        if (achievement.conditions?.type === 'special') {
            return 'rarity-rare';
        }
        return 'rarity-common';
    }

    getProgressBar(achievement) {
        if (!achievement.conditions?.total) return '';
        
        const progress = this.getAchievementProgress(achievement.id);
        if (!progress) return '';
        
        const percentage = (progress / achievement.conditions.total) * 100;
        return `
            <div class="achievement-progress">
                <div class="bar" style="width: ${percentage}%"></div>
            </div>
        `;
    }

    checkTaskAchievements(taskId) {
        console.log('Checking task achievements for:', taskId);
        
        // 检查任务完成相关的成就
        switch(taskId) {
            case 'first_contact':
                this.unlock('first_contact');
                break;
            case 'understand_eve':
                this.unlock('empathy');
                break;
            case 'observe_behavior':
                this.unlock('detective');
                break;
            case 'find_secrets':
                this.unlock('truth_seeker');
                break;
            case 'system_audit':
                this.unlock('system_explorer');
                break;
            case 'decode_message':
                this.unlock('code_master');
                break;
        }

        // 检查任务完成数量相关的成就
        const completedTasks = window.chatManager.taskManager.completedTasks.size;
        if (completedTasks >= 5) {
            this.unlock('task_master');
        }

        // 检查特定组合任务
        if (this.checkTaskCombination(['understand_eve', 'system_audit', 'find_secrets'])) {
            this.unlock('perfect_mediator');
        }

        // 检查任务完成速度
        if (this.checkTaskCompletionSpeed(taskId)) {
            this.unlock('speed_runner');
        }
    }

    checkTaskCombination(taskIds) {
        return taskIds.every(taskId => 
            window.chatManager.taskManager.completedTasks.has(taskId)
        );
    }

    checkTaskCompletionSpeed(taskId) {
        const task = Array.from(window.chatManager.taskManager.completedTasks)
            .find(t => t.id === taskId);
        
        if (!task) return false;

        // 检查任务是否在规定时间内完成
        const completionTime = task.completionTime - task.startTime;
        return completionTime <= 1800000; // 30分钟
    }
}

function extendChatManagerWithAchievements(ChatManager) {
    const originalHandleUserInput = ChatManager.prototype.handleUserInput;
    
    ChatManager.prototype.handleUserInput = async function() {
        await originalHandleUserInput.call(this);
        
        if (this.currentAgent) {
            this.achievementManager.trackConversation(this.currentAgent.name);
        }
    };
}

window.extendChatManagerWithAchievements = extendChatManagerWithAchievements;

// 确保AchievementManager被导出到全局作用域
window.AchievementManager = AchievementManager; 