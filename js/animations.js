const AnimationManager = {
    bunnyLayer: null,
    fireworksLayer: null,
    fireworksCanvas: null,
    bunnyTimer: null,
    fireworksTimer: null,
    bunnyEnabled: true,
    celebrationEnabled: true,

    init() {
        this.bunnyLayer = document.getElementById('bunnyLayer');
        this.fireworksLayer = document.getElementById('fireworksLayer');
        this.fireworksCanvas = document.getElementById('fireworksCanvas');
        
        if (this.fireworksCanvas) {
            FireworkSystem.init(this.fireworksCanvas);
        }
        
        window.AnimationManager = this;
    },

    showBunny() {
        if (!this.bunnyEnabled || !this.bunnyLayer) return;
        
        this.bunnyLayer.classList.remove('hidden');
        
        SoundManager.playFillSound();
        
        if (this.bunnyTimer) {
            clearTimeout(this.bunnyTimer);
        }
        
        this.bunnyTimer = setTimeout(() => {
            this.hideBunny();
        }, CONFIG.ANIMATIONS.BUNNY_DISPLAY_DURATION);
        
        if (this.bunnyLayer) {
            this.bunnyLayer.addEventListener('click', () => {
                this.hideBunny();
            }, { once: true });
        }
    },

    hideBunny() {
        if (!this.bunnyLayer) return;
        
        this.bunnyLayer.classList.add('hidden');
        
        if (this.bunnyTimer) {
            clearTimeout(this.bunnyTimer);
            this.bunnyTimer = null;
        }
    },

    showFireworks() {
        if (!this.celebrationEnabled) return;
        
        if (this.fireworksLayer) {
            this.fireworksLayer.classList.remove('hidden');
        }
        
        FireworkSystem.start();
        SoundManager.playCelebrationSound();
        
        if (this.fireworksTimer) {
            clearTimeout(this.fireworksTimer);
        }
        
        this.fireworksTimer = setTimeout(() => {
            this.hideFireworks();
        }, CONFIG.ANIMATIONS.FIREWORKS_DURATION);
        
        if (this.fireworksLayer) {
            this.fireworksLayer.addEventListener('click', () => {
                this.hideFireworks();
            }, { once: true });
        }
    },

    hideFireworks() {
        FireworkSystem.stop();
        
        if (this.fireworksLayer) {
            this.fireworksLayer.classList.add('hidden');
        }
        
        if (this.fireworksTimer) {
            clearTimeout(this.fireworksTimer);
            this.fireworksTimer = null;
        }
    },

    toggleBunny(enabled) {
        this.bunnyEnabled = enabled;
        if (!enabled) {
            this.hideBunny();
        }
    },

    toggleCelebration(enabled) {
        this.celebrationEnabled = enabled;
        if (!enabled) {
            this.hideFireworks();
        }
    },

    showProgressAnimation(progress) {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.transition = 'width 0.5s ease-out';
        }
    },

    createConfetti(x, y, count = 30) {
        const colors = ['#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D', '#95E1D3', '#FF69B4'];
        
        for (let i = 0; i < count; i++) {
            const confetti = document.createElement('div');
            confetti.style.cssText = `
                position: fixed;
                width: ${Utils.randomInt(5, 12)}px;
                height: ${Utils.randomInt(5, 12)}px;
                background: ${colors[Math.floor(Math.random() * colors.length)]};
                left: ${x}px;
                top: ${y}px;
                pointer-events: none;
                z-index: 1000;
                border-radius: ${Math.random() > 0.5 ? '50%' : '2px'};
                transform: rotate(${Utils.randomInt(0, 360)}deg);
            `;
            
            document.body.appendChild(confetti);
            
            const duration = Utils.randomInt(1000, 2000);
            const tx = Utils.randomInt(-200, 200);
            const ty = Utils.randomInt(200, 400);
            const rotation = Utils.randomInt(-720, 720);
            
            confetti.animate([
                { transform: `translate(0, 0) rotate(0deg)`, opacity: 1 },
                { transform: `translate(${tx}px, ${ty}px) rotate(${rotation}deg)`, opacity: 0 }
            ], {
                duration: duration,
                easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)'
            }).onfinish = () => {
                confetti.remove();
            };
        }
    },

    shakeElement(element, intensity = 5, duration = 500) {
        const originalTransform = element.style.transform || '';
        const startTime = Date.now();
        
        const shake = () => {
            const elapsed = Date.now() - startTime;
            if (elapsed < duration) {
                const intensityFactor = 1 - (elapsed / duration);
                const x = (Math.random() - 0.5) * intensity * intensityFactor * 2;
                const y = (Math.random() - 0.5) * intensity * intensityFactor * 2;
                
                element.style.transform = `${originalTransform} translate(${x}px, ${y}px)`;
                
                requestAnimationFrame(shake);
            } else {
                element.style.transform = originalTransform;
            }
        };
        
        shake();
    },

    pulseElement(element, duration = 1000) {
        element.animate([
            { transform: 'scale(1)', opacity: 1 },
            { transform: 'scale(1.1)', opacity: 0.8 },
            { transform: 'scale(1)', opacity: 1 }
        ], {
            duration: duration,
            easing: 'ease-in-out',
            iterations: Infinity
        });
    },

    fadeIn(element, duration = 300) {
        element.style.opacity = '0';
        element.style.display = '';
        
        return element.animate([
            { opacity: 0 },
            { opacity: 1 }
        ], {
            duration: duration,
            easing: 'ease-out'
        }).onfinish = () => {
            element.style.opacity = '1';
        };
    },

    fadeOut(element, duration = 300) {
        return element.animate([
            { opacity: 1 },
            { opacity: 0 }
        ], {
            duration: duration,
            easing: 'ease-in'
        }).onfinish = () => {
            element.style.display = 'none';
            element.style.opacity = '1';
        };
    },

    slideIn(element, direction = 'bottom', duration = 300) {
        const keyframes = {
            start: {},
            end: { transform: 'translate(0, 0)', opacity: 1 }
        };
        
        switch (direction) {
            case 'top':
                keyframes.start = { transform: 'translateY(-100%)', opacity: 0 };
                break;
            case 'bottom':
                keyframes.start = { transform: 'translateY(100%)', opacity: 0 };
                break;
            case 'left':
                keyframes.start = { transform: 'translateX(-100%)', opacity: 0 };
                break;
            case 'right':
                keyframes.start = { transform: 'translateX(100%)', opacity: 0 };
                break;
        }
        
        element.style.display = '';
        
        return element.animate([keyframes.start, keyframes.end], {
            duration: duration,
            easing: 'ease-out'
        });
    },

    slideOut(element, direction = 'bottom', duration = 300) {
        const keyframes = {
            start: { transform: 'translate(0, 0)', opacity: 1 },
            end: {}
        };
        
        switch (direction) {
            case 'top':
                keyframes.end = { transform: 'translateY(-100%)', opacity: 0 };
                break;
            case 'bottom':
                keyframes.end = { transform: 'translateY(100%)', opacity: 0 };
                break;
            case 'left':
                keyframes.end = { transform: 'translateX(-100%)', opacity: 0 };
                break;
            case 'right':
                keyframes.end = { transform: 'translateX(100%)', opacity: 0 };
                break;
        }
        
        return element.animate([keyframes.start, keyframes.end], {
            duration: duration,
            easing: 'ease-in'
        }).onfinish = () => {
            element.style.display = 'none';
        };
    },

    typeWriter(element, text, speed = 50) {
        let index = 0;
        element.textContent = '';
        
        return new Promise((resolve) => {
            const type = () => {
                if (index < text.length) {
                    element.textContent += text.charAt(index);
                    index++;
                    setTimeout(type, speed);
                } else {
                    resolve();
                }
            };
            type();
        });
    },

    highlightText(element, color = '#FFD93D', duration = 1000) {
        const originalColor = element.style.backgroundColor;
        const originalTextColor = element.style.color;
        
        element.animate([
            { backgroundColor: color, color: '#333', transform: 'scale(1.05)' },
            { backgroundColor: originalColor, color: originalTextColor, transform: 'scale(1)' }
        ], {
            duration: duration,
            easing: 'ease-in-out'
        });
    },

    spinElement(element, rotations = 1, duration = 1000) {
        return element.animate([
            { transform: 'rotate(0deg)' },
            { transform: `rotate(${rotations * 360}deg)` }
        ], {
            duration: duration,
            easing: 'ease-in-out'
        });
    },

    bounceElement(element, height = 20, duration = 500) {
        return element.animate([
            { transform: 'translateY(0)' },
            { transform: `translateY(-${height}px)` },
            { transform: 'translateY(0)' }
        ], {
            duration: duration,
            easing: 'ease-in-out'
        });
    }
};
