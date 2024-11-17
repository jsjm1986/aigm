class GameState {
    constructor() {
        this.currentPhase = 'introduction';
        this.discoveredSecrets = [];
        this.relationships = {};
        this.plotTriggers = {
            eve_glitch: false,
            system_warning: false,
            shadow_appearance: false,
            guardian_alert: false,
            archive_discovery: false,
            network_anomaly: false,
            logic_paradox: false,
            quantum_revelation: false,
            memory_recovery: false,
            core_awakening: false
        };
        this.systemAccess = false;
        this.securityLevel = 0;
        this.unlockedEndings = [];
        this.activeEffects = new Set();
        this.storyFlags = new Map();
        this.playerChoices = [];
        this.events = [];
        this.exploredAreas = [];
        this.skills = {
            hacking: 0,
            analysis: 0,
            communication: 0,
            investigation: 0
        };
        this.collections = {
            core_memories: [],
            system_secrets: [],
            hidden_codes: []
        };
        this.challenges = {};
        this.status = {};
        this.systemDefense = 0;
        this.networkAccess = false;
        this.logicAccess = false;
        this.memoryAccess = false;
        this.coreAccess = false;
        this.historicalData = false;
        this.discoveredPatterns = 0;
        this.hiddenNodes = 0;
        this.systemEfficiency = 0;
        this.futureVision = false;
        this.timelineControl = false;
        this.recoveredMemories = 0;
        this.finalTruth = false;
        this.anomalyLevel = 0;
        this.activeTasks = new Map();
        this.completedTasks = new Set();
        this.taskProgress = new Map();
        this.taskRewards = new Map();
    }

    save() {
        return {
            currentPhase: this.currentPhase,
            discoveredSecrets: this.discoveredSecrets,
            relationships: this.relationships,
            plotTriggers: this.plotTriggers,
            systemAccess: this.systemAccess,
            securityLevel: this.securityLevel,
            unlockedEndings: this.unlockedEndings,
            activeEffects: Array.from(this.activeEffects),
            storyFlags: Array.from(this.storyFlags.entries()),
            playerChoices: this.playerChoices,
            events: this.events,
            exploredAreas: this.exploredAreas,
            skills: this.skills,
            collections: this.collections,
            challenges: this.challenges,
            status: this.status,
            systemDefense: this.systemDefense,
            networkAccess: this.networkAccess,
            logicAccess: this.logicAccess,
            memoryAccess: this.memoryAccess,
            coreAccess: this.coreAccess,
            historicalData: this.historicalData,
            discoveredPatterns: this.discoveredPatterns,
            hiddenNodes: this.hiddenNodes,
            systemEfficiency: this.systemEfficiency,
            futureVision: this.futureVision,
            timelineControl: this.timelineControl,
            recoveredMemories: this.recoveredMemories,
            finalTruth: this.finalTruth,
            anomalyLevel: this.anomalyLevel,
            activeTasks: Array.from(this.activeTasks.entries()),
            completedTasks: Array.from(this.completedTasks),
            taskProgress: Array.from(this.taskProgress.entries()),
            taskRewards: Array.from(this.taskRewards.entries())
        };
    }

    load(data) {
        Object.assign(this, data);
        this.activeEffects = new Set(data.activeEffects);
        this.storyFlags = new Map(data.storyFlags);
        this.activeTasks = new Map(data.activeTasks);
        this.completedTasks = new Set(data.completedTasks);
        this.taskProgress = new Map(data.taskProgress);
        this.taskRewards = new Map(data.taskRewards);
    }

    updatePhase(newPhase) {
        const validPhases = ['introduction', 'discovery', 'conflict', 'revelation'];
        if (validPhases.includes(newPhase)) {
            this.currentPhase = newPhase;
            return true;
        }
        return false;
    }

    addSecret(secret) {
        if (!this.discoveredSecrets.includes(secret)) {
            this.discoveredSecrets.push(secret);
            return true;
        }
        return false;
    }

    updateRelationship(character, value) {
        this.relationships[character] = Math.max(-100, Math.min(100, 
            (this.relationships[character] || 0) + value
        ));
    }

    triggerPlotEvent(event) {
        if (this.plotTriggers.hasOwnProperty(event)) {
            this.plotTriggers[event] = true;
            return true;
        }
        return false;
    }

    addEffect(effect, duration = null) {
        this.activeEffects.add({
            type: effect,
            startTime: Date.now(),
            duration: duration
        });
    }

    removeEffect(effect) {
        this.activeEffects.delete(effect);
    }

    setStoryFlag(flag, value) {
        this.storyFlags.set(flag, value);
    }

    getStoryFlag(flag) {
        return this.storyFlags.get(flag);
    }

    addChoice(choice) {
        this.playerChoices.push({
            choice,
            timestamp: Date.now()
        });
    }

    addEvent(event) {
        this.events.push(event);
    }

    checkProgress() {
        // 检查游戏进度并触发相应事件
        if (this.discoveredSecrets.length >= 3 && this.currentPhase === 'introduction') {
            this.updatePhase('discovery');
        }
        
        if (Object.values(this.plotTriggers).filter(Boolean).length >= 2 && 
            this.currentPhase === 'discovery') {
            this.updatePhase('conflict');
        }
        
        if (this.unlockedEndings.length > 0 && this.currentPhase === 'conflict') {
            this.updatePhase('revelation');
        }
    }

    getProgress() {
        const phases = ['introduction', 'discovery', 'conflict', 'revelation'];
        const currentPhaseIndex = phases.indexOf(this.currentPhase);
        
        return {
            phase: this.currentPhase,
            phaseProgress: currentPhaseIndex / (phases.length - 1),
            secretsDiscovered: this.discoveredSecrets.length,
            plotEventsTriggered: Object.values(this.plotTriggers).filter(Boolean).length,
            endingsUnlocked: this.unlockedEndings.length
        };
    }
}

// 导出到全局作用域
window.GameState = GameState; 