const ParticleSystem = {
    particles: [],
    sparkleParticles: [],
    enabled: true,
    sparkleEnabled: true,
    canvas: null,
    ctx: null,
    animationId: null,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.particles = [];
        this.sparkleParticles = [];
        this.startAnimation();
    },

    startAnimation() {
        const animate = () => {
            this.update();
            this.animationId = requestAnimationFrame(animate);
        };
        animate();
    },

    stopAnimation() {
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
    },

    addParticle(x, y, color, type = 'star') {
        if (!this.enabled) return;
        
        const particleCount = type === 'star' ? 
            CONFIG.PARTICLES.STAR_COUNT : CONFIG.PARTICLES.SPARKLE_COUNT;
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.5;
            const speed = Utils.random(2, 5);
            const size = Utils.random(3, 8);
            
            if (type === 'star') {
                this.particles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed,
                    vy: Math.sin(angle) * speed,
                    size: size,
                    life: 1,
                    decay: Utils.random(0.02, 0.04),
                    color: color,
                    rotation: Math.random() * Math.PI * 2,
                    rotationSpeed: Utils.random(-0.1, 0.1),
                    type: 'star'
                });
            } else {
                this.sparkleParticles.push({
                    x: x,
                    y: y,
                    vx: Math.cos(angle) * speed * 0.5,
                    vy: Math.sin(angle) * speed * 0.5,
                    size: size,
                    life: 1,
                    decay: Utils.random(0.03, 0.05),
                    color: color,
                    type: 'sparkle'
                });
            }
        }
    },

    addTrail(x, y, color) {
        if (!this.enabled) return;
        
        this.particles.push({
            x: x,
            y: y,
            vx: Utils.random(-0.5, 0.5),
            vy: Utils.random(-0.5, 0.5),
            size: Utils.random(2, 5),
            life: 1,
            decay: Utils.random(0.03, 0.06),
            color: color,
            type: 'circle'
        });
    },

    update() {
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            p.rotation += p.rotationSpeed || 0;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            
            if (p.type === 'star') {
                this.ctx.translate(p.x, p.y);
                this.ctx.rotate(p.rotation);
                this.drawStar(0, 0, p.size * p.life);
            } else {
                this.ctx.beginPath();
                this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
                this.ctx.fillStyle = p.color;
                this.ctx.fill();
            }
            
            this.ctx.restore();
        }
        
        for (let i = this.sparkleParticles.length - 1; i >= 0; i--) {
            const p = this.sparkleParticles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.life -= p.decay;
            
            if (p.life <= 0) {
                this.sparkleParticles.splice(i, 1);
                continue;
            }
            
            this.ctx.save();
            this.ctx.globalAlpha = p.life;
            
            const pulseSize = p.size * p.life * (0.8 + Math.sin(Date.now() * 0.01) * 0.2);
            
            const gradient = this.ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, pulseSize * 2);
            gradient.addColorStop(0, 'white');
            gradient.addColorStop(0.3, p.color);
            gradient.addColorStop(1, 'transparent');
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, pulseSize * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = gradient;
            this.ctx.fill();
            
            this.ctx.restore();
        }
    },

    drawStar(x, y, size) {
        const spikes = 5;
        const outerRadius = size;
        const innerRadius = size / 2;
        
        this.ctx.beginPath();
        this.ctx.moveTo(x, y - outerRadius);
        
        for (let i = 0; i < spikes; i++) {
            let outerAngle = (i * Math.PI * 2) / spikes - Math.PI / 2;
            let innerAngle = outerAngle + Math.PI / spikes;
            
            this.ctx.lineTo(
                x + Math.cos(outerAngle) * outerRadius,
                y + Math.sin(outerAngle) * outerRadius
            );
            this.ctx.lineTo(
                x + Math.cos(innerAngle) * innerRadius,
                y + Math.sin(innerAngle) * innerRadius
            );
        }
        
        this.ctx.closePath();
        this.ctx.fillStyle = this.particles.length > 0 ? 
            this.particles[0].color : '#FFD700';
        this.ctx.fill();
    },

    clear() {
        this.particles = [];
        this.sparkleParticles = [];
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    toggle(enabled) {
        this.enabled = enabled;
    },

    toggleSparkle(enabled) {
        this.sparkleEnabled = enabled;
    }
};

const FireworkSystem = {
    canvas: null,
    ctx: null,
    fireworks: [],
    particles: [],
    animationId: null,
    isRunning: false,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
        this.resize();
        window.addEventListener('resize', () => this.resize());
    },

    resize() {
        this.canvas.width = window.innerWidth;
        this.canvas.height = window.innerHeight;
    },

    start() {
        if (this.isRunning) return;
        this.isRunning = true;
        this.fireworks = [];
        this.particles = [];
        this.animate();
    },

    stop() {
        this.isRunning = false;
        if (this.animationId) {
            cancelAnimationFrame(this.animationId);
        }
        if (this.ctx) {
            this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        }
    },

    animate() {
        if (!this.isRunning) return;
        
        this.ctx.globalCompositeOperation = 'destination-out';
        this.ctx.fillStyle = 'rgba(0, 0, 0, 0.1)';
        this.ctx.fillRect(0, 0, this.canvas.width, this.canvas.height);
        this.ctx.globalCompositeOperation = 'lighter';
        
        if (Math.random() < 0.05) {
            this.launchFirework();
        }
        
        for (let i = this.fireworks.length - 1; i >= 0; i--) {
            const fw = this.fireworks[i];
            
            fw.x += fw.vx;
            fw.y += fw.vy;
            fw.vy += 0.05;
            
            this.ctx.beginPath();
            this.ctx.arc(fw.x, fw.y, 3, 0, Math.PI * 2);
            this.ctx.fillStyle = fw.color;
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(fw.x, fw.y, 5, 0, Math.PI * 2);
            this.ctx.fillStyle = 'rgba(255, 255, 255, 0.3)';
            this.ctx.fill();
            
            if (fw.vy >= 0 || fw.y < this.canvas.height * 0.3) {
                this.explode(fw);
                this.fireworks.splice(i, 1);
            }
        }
        
        for (let i = this.particles.length - 1; i >= 0; i--) {
            const p = this.particles[i];
            
            p.x += p.vx;
            p.y += p.vy;
            p.vy += 0.03;
            p.life -= 0.015;
            
            if (p.life <= 0) {
                this.particles.splice(i, 1);
                continue;
            }
            
            this.ctx.globalAlpha = p.life;
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color;
            this.ctx.fill();
            
            this.ctx.beginPath();
            this.ctx.arc(p.x, p.y, p.size * p.life * 2, 0, Math.PI * 2);
            this.ctx.fillStyle = p.color.replace(')', ', 0.3)').replace('rgb', 'rgba');
            this.ctx.fill();
        }
        
        this.ctx.globalAlpha = 1;
        this.animationId = requestAnimationFrame(() => this.animate());
    },

    launchFirework() {
        const colors = [
            'rgb(255, 100, 100)',
            'rgb(100, 255, 100)',
            'rgb(100, 100, 255)',
            'rgb(255, 255, 100)',
            'rgb(255, 100, 255)',
            'rgb(100, 255, 255)',
            'rgb(255, 200, 100)',
            'rgb(255, 255, 255)'
        ];
        
        this.fireworks.push({
            x: Utils.random(this.canvas.width * 0.2, this.canvas.width * 0.8),
            y: this.canvas.height,
            vx: Utils.random(-2, 2),
            vy: Utils.random(-8, -12),
            color: colors[Math.floor(Math.random() * colors.length)]
        });
    },

    explode(firework) {
        const particleCount = Utils.randomInt(50, 100);
        const explosionColors = [
            firework.color,
            this.getComplementaryColor(firework.color),
            'rgb(255, 255, 255)'
        ];
        
        for (let i = 0; i < particleCount; i++) {
            const angle = (Math.PI * 2 * i) / particleCount + Math.random() * 0.3;
            const speed = Utils.random(2, 6);
            
            this.particles.push({
                x: firework.x,
                y: firework.y,
                vx: Math.cos(angle) * speed + Utils.random(-0.5, 0.5),
                vy: Math.sin(angle) * speed + Utils.random(-0.5, 0.5),
                size: Utils.random(2, 5),
                life: 1,
                color: explosionColors[Math.floor(Math.random() * explosionColors.length)]
            });
        }
        
        for (let i = 0; i < 20; i++) {
            const angle = Math.random() * Math.PI * 2;
            const speed = Utils.random(1, 3);
            
            this.particles.push({
                x: firework.x,
                y: firework.y,
                vx: Math.cos(angle) * speed,
                vy: Math.sin(angle) * speed,
                size: Utils.random(1, 2),
                life: 1,
                color: 'rgb(255, 255, 200)',
                isSparkle: true
            });
        }
    },

    getComplementaryColor(color) {
        const match = color.match(/rgb\((\d+),\s*(\d+),\s*(\d+)\)/);
        if (!match) return 'rgb(255, 255, 255)';
        
        const r = 255 - parseInt(match[1]);
        const g = 255 - parseInt(match[2]);
        const b = 255 - parseInt(match[3]);
        
        return `rgb(${r}, ${g}, ${b})`;
    }
};
