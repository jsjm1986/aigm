class ParticleSystem {
    constructor() {
        this.canvas = document.createElement('canvas');
        this.ctx = this.canvas.getContext('2d');
        this.particles = [];
        this.particleCount = 50;
        this.mode = 'normal'; // 粒子效果模式
        this.mousePosition = { x: 0, y: 0 };
        this.isGlitching = false;
        
        this.setupCanvas();
        this.createParticles();
        this.setupEventListeners();
        this.animate();
    }

    setupCanvas() {
        this.canvas.style.position = 'fixed';
        this.canvas.style.top = '0';
        this.canvas.style.left = '0';
        this.canvas.style.width = '100%';
        this.canvas.style.height = '100%';
        this.canvas.style.pointerEvents = 'none';
        this.canvas.style.zIndex = '1';
        
        // 设置画布实际大小
        this.resizeCanvas();
        
        if (!document.body.contains(this.canvas)) {
            document.body.appendChild(this.canvas);
        }

        // 添加窗口大小变化监听
        window.addEventListener('resize', () => this.resizeCanvas());
    }

    resizeCanvas() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    }

    setupEventListeners() {
        // 跟踪鼠标/触摸位置
        const updatePosition = (e) => {
            const touch = e.touches ? e.touches[0] : e;
            this.mousePosition.x = touch.clientX;
            this.mousePosition.y = touch.clientY;
        };

        document.addEventListener('mousemove', updatePosition);
        document.addEventListener('touchmove', updatePosition);
        document.addEventListener('touchstart', updatePosition);
    }

    createParticles() {
        this.particles = [];
        for (let i = 0; i < this.particleCount; i++) {
            this.particles.push(this.createParticle());
        }
    }

    createParticle(x, y) {
        return {
            x: x || Math.random() * this.canvas.width,
            y: y || Math.random() * this.canvas.height,
            size: Math.random() * 3 + 1,
            speedX: Math.random() * 2 - 1,
            speedY: Math.random() * 2 - 1,
            opacity: Math.random() * 0.5 + 0.1,
            color: this.getParticleColor(),
            pulse: 0,
            pulseSpeed: Math.random() * 0.02 + 0.01
        };
    }

    getParticleColor() {
        switch(this.mode) {
            case 'matrix':
                return '#00ff00';
            case 'cyber':
                return ['#00ff00', '#0000ff', '#ff00ff'][Math.floor(Math.random() * 3)];
            case 'glitch':
                return ['#ff0000', '#00ff00', '#0000ff'][Math.floor(Math.random() * 3)];
            case 'quantum':
                return ['#8e44ad', '#2980b9', '#16a085'][Math.floor(Math.random() * 3)];
            default:
                return '#ffffff';
        }
    }

    animate() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        // 更新和绘制粒子
        this.particles.forEach(particle => {
            this.updateParticle(particle);
            this.drawParticle(particle);
        });
        
        // 绘制粒子之间的连接
        this.drawConnections();
        
        // 根据模式添加特殊效果
        if (this.mode === 'glitch' && this.isGlitching) {
            this.drawGlitchEffect();
        }
        
        requestAnimationFrame(() => this.animate());
    }

    updateParticle(particle) {
        // 更新位置
        particle.x += particle.speedX;
        particle.y += particle.speedY;
        
        // 边界检查
        if (particle.x < 0) particle.x = this.canvas.width;
        if (particle.x > this.canvas.width) particle.x = 0;
        if (particle.y < 0) particle.y = this.canvas.height;
        if (particle.y > this.canvas.height) particle.y = 0;
        
        // 鼠标交互
        const dx = this.mousePosition.x - particle.x;
        const dy = this.mousePosition.y - particle.y;
        const distance = Math.sqrt(dx * dx + dy * dy);
        
        if (distance < 100) {
            const force = (100 - distance) / 100;
            particle.x -= dx * force * 0.02;
            particle.y -= dy * force * 0.02;
        }
    }

    drawParticle(particle) {
        this.ctx.beginPath();
        this.ctx.arc(particle.x, particle.y, particle.size, 0, Math.PI * 2);
        this.ctx.fillStyle = `${particle.color}${Math.floor(particle.opacity * 255).toString(16).padStart(2, '0')}`;
        this.ctx.fill();
    }

    drawConnections() {
        this.particles.forEach((p1, i) => {
            this.particles.slice(i + 1).forEach(p2 => {
                const dx = p1.x - p2.x;
                const dy = p1.y - p2.y;
                const distance = Math.sqrt(dx * dx + dy * dy);
                
                if (distance < 100) {
                    this.ctx.beginPath();
                    this.ctx.moveTo(p1.x, p1.y);
                    this.ctx.lineTo(p2.x, p2.y);
                    this.ctx.strokeStyle = `rgba(255,255,255,${0.2 * (1 - distance / 100)})`;
                    this.ctx.stroke();
                }
            });
        });
    }

    drawGlitchEffect() {
        // 创建随机的故障块
        for (let i = 0; i < 10; i++) {
            const x = Math.random() * this.canvas.width;
            const y = Math.random() * this.canvas.height;
            const width = Math.random() * 100 + 50;
            const height = Math.random() * 30 + 10;
            
            this.ctx.fillStyle = `rgba(255,0,${Math.random() * 255},${Math.random() * 0.1})`;
            this.ctx.fillRect(x, y, width, height);
        }
    }

    setMode(mode) {
        this.mode = mode;
        this.particles.forEach(particle => {
            particle.color = this.getParticleColor();
        });
    }

    triggerGlitchEffect() {
        this.setMode('glitch');
        this.isGlitching = true;
        
        // 创建额外的故障粒子
        for (let i = 0; i < 20; i++) {
            this.particles.push(this.createParticle(
                this.mousePosition.x + (Math.random() * 100 - 50),
                this.mousePosition.y + (Math.random() * 100 - 50)
            ));
        }
        
        // 2秒后恢复正常
        setTimeout(() => {
            this.isGlitching = false;
            this.setMode('normal');
            this.particles = this.particles.slice(0, this.particleCount);
        }, 2000);
    }

    addParticlesBurst(x, y, count = 10) {
        for (let i = 0; i < count; i++) {
            const angle = (Math.PI * 2 / count) * i;
            const speed = 2;
            const particle = this.createParticle(x, y);
            particle.speedX = Math.cos(angle) * speed;
            particle.speedY = Math.sin(angle) * speed;
            this.particles.push(particle);
        }
        
        // 1秒后移除额外的粒子
        setTimeout(() => {
            this.particles = this.particles.slice(0, this.particleCount);
        }, 1000);
    }
}

// 添加扩展ChatManager的函数
function extendChatManagerWithParticles(ChatManager) {
    const originalConstructor = ChatManager.prototype.constructor;
    
    ChatManager.prototype.constructor = function(...args) {
        originalConstructor.apply(this, args);
        this.particleSystem = new ParticleSystem();
    };

    // 添加粒子效果相关的方法
    ChatManager.prototype.showVisualEffect = function(effectType, position) {
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
        }
    };

    // 添加消息发送时的视觉效果
    const originalHandleUserInput = ChatManager.prototype.handleUserInput;
    ChatManager.prototype.handleUserInput = async function() {
        const result = await originalHandleUserInput.call(this);
        const sendButton = document.querySelector('.send-button');
        if (sendButton) {
            const rect = sendButton.getBoundingClientRect();
            this.showVisualEffect('message_sent', {
                x: rect.left + rect.width / 2,
                y: rect.top + rect.height / 2
            });
        }
        return result;
    };

    // 添加角色切换时的视觉效果
    const originalSetCurrentAgent = ChatManager.prototype.setCurrentAgent;
    ChatManager.prototype.setCurrentAgent = function(agentName) {
        originalSetCurrentAgent.call(this, agentName);
        // 根据不同角色显示不同的视觉效果
        switch(agentName) {
            case 'Eve':
                this.showVisualEffect('glitch', {});
                break;
            case 'System':
                this.showVisualEffect('matrix', {});
                break;
            case 'Quantum':
                this.showVisualEffect('quantum', {});
                break;
            case 'Shadow':
                this.showVisualEffect('cyber', {});
                break;
        }
    };
}

// 导出到全局作用域
window.ParticleSystem = ParticleSystem;
window.extendChatManagerWithParticles = extendChatManagerWithParticles; 