const App = {
    isInitialized: false,

    init() {
        if (this.isInitialized) return;
        
        console.log('🎨 Magic Paint initializing...');
        
        SoundManager.init();
        
        BrushManager.init();
        
        const mainCanvas = document.getElementById('mainCanvas');
        const particleCanvas = document.getElementById('particleCanvas');
        const lineartCanvas = document.getElementById('lineartCanvas');
        
        if (particleCanvas) {
            ParticleSystem.init(particleCanvas);
        }
        
        if (mainCanvas && lineartCanvas) {
            CanvasManager.init(mainCanvas, lineartCanvas);
            
            CanvasManager.onComplete = () => {
                this.handleDrawingComplete();
            };
        }
        
        const resultCanvas = document.getElementById('resultCanvas');
        if (resultCanvas) {
            AIGenerator.init(resultCanvas);
        }
        
        GalleryManager.init();
        
        AnimationManager.init();
        
        ThemeManager.init();
        
        this.setupEventListeners();
        
        this.isInitialized = true;
        console.log('🎨 Magic Paint initialized successfully!');
    },

    setupEventListeners() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.switchTab(btn.dataset.tab);
                SoundManager.playClickSound();
            });
        });

        const brushBtns = document.querySelectorAll('.brush-btn');
        brushBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setBrush(btn.dataset.brush);
                SoundManager.playClickSound();
            });
        });

        const colorPicker = document.getElementById('colorPicker');
        if (colorPicker) {
            colorPicker.addEventListener('input', (e) => {
                this.setColor(e.target.value);
            });
        }

        const presetColors = document.querySelectorAll('.preset-color');
        presetColors.forEach(color => {
            color.addEventListener('click', () => {
                this.setColor(color.dataset.color);
                SoundManager.playClickSound();
            });
        });

        const brushSize = document.getElementById('brushSize');
        const sizeValue = document.getElementById('sizeValue');
        if (brushSize && sizeValue) {
            brushSize.addEventListener('input', (e) => {
                const size = parseInt(e.target.value);
                this.setBrushSize(size);
                sizeValue.textContent = size;
            });
        }

        const particleToggle = document.getElementById('particleEffect');
        if (particleToggle) {
            particleToggle.addEventListener('change', (e) => {
                ParticleSystem.toggle(e.target.checked);
                SoundManager.playClickSound();
            });
        }

        const sparkleToggle = document.getElementById('sparkleEffect');
        if (sparkleToggle) {
            sparkleToggle.addEventListener('change', (e) => {
                ParticleSystem.toggleSparkle(e.target.checked);
                SoundManager.playClickSound();
            });
        }

        const soundToggle = document.getElementById('soundEnabled');
        if (soundToggle) {
            soundToggle.addEventListener('change', (e) => {
                SoundManager.toggle(e.target.checked);
                SoundManager.playClickSound();
            });
        }

        const undoBtn = document.getElementById('undoBtn');
        if (undoBtn) {
            undoBtn.addEventListener('click', () => {
                CanvasManager.undo();
                SoundManager.playClickSound();
            });
        }

        const redoBtn = document.getElementById('redoBtn');
        if (redoBtn) {
            redoBtn.addEventListener('click', () => {
                CanvasManager.redo();
                SoundManager.playClickSound();
            });
        }

        const clearBtn = document.getElementById('clearBtn');
        if (clearBtn) {
            clearBtn.addEventListener('click', () => {
                if (confirm('确定要清空画板吗？')) {
                    CanvasManager.clear();
                    SoundManager.playClickSound();
                }
            });
        }

        const saveBtn = document.getElementById('saveBtn');
        if (saveBtn) {
            saveBtn.addEventListener('click', () => {
                CanvasManager.save();
            });
        }

        const settingsParticleToggle = document.getElementById('particleToggle');
        if (settingsParticleToggle) {
            settingsParticleToggle.addEventListener('change', (e) => {
                ParticleSystem.toggle(e.target.checked);
                SoundManager.playClickSound();
            });
        }

        const celebrationToggle = document.getElementById('celebrationToggle');
        if (celebrationToggle) {
            celebrationToggle.addEventListener('change', (e) => {
                AnimationManager.toggleCelebration(e.target.checked);
                SoundManager.playClickSound();
            });
        }

        const bunnyToggle = document.getElementById('bunnyToggle');
        if (bunnyToggle) {
            bunnyToggle.addEventListener('change', (e) => {
                AnimationManager.toggleBunny(e.target.checked);
                SoundManager.playClickSound();
            });
        }

        const brushVolume = document.getElementById('brushVolume');
        if (brushVolume) {
            brushVolume.addEventListener('input', (e) => {
                const volume = parseInt(e.target.value);
                SoundManager.setBrushVolume(volume);
                const valueDisplay = e.target.parentElement.querySelector('.volume-value');
                if (valueDisplay) {
                    valueDisplay.textContent = volume + '%';
                }
            });
        }

        const fillVolume = document.getElementById('fillVolume');
        if (fillVolume) {
            fillVolume.addEventListener('input', (e) => {
                const volume = parseInt(e.target.value);
                SoundManager.setFillVolume(volume);
                const valueDisplay = e.target.parentElement.querySelector('.volume-value');
                if (valueDisplay) {
                    valueDisplay.textContent = volume + '%';
                }
            });
        }

        document.addEventListener('keydown', (e) => {
            if (e.ctrlKey || e.metaKey) {
                switch (e.key) {
                    case 'z':
                        e.preventDefault();
                        if (e.shiftKey) {
                            CanvasManager.redo();
                        } else {
                            CanvasManager.undo();
                        }
                        break;
                    case 's':
                        e.preventDefault();
                        CanvasManager.save();
                        break;
                }
            }
            
            if (e.key === 'Escape') {
                AnimationManager.hideBunny();
                AnimationManager.hideFireworks();
            }
        });

        this.setupTouchGestures();
    },

    setupTouchGestures() {
        let lastTap = 0;
        
        document.addEventListener('touchend', (e) => {
            const currentTime = new Date().getTime();
            const tapLength = currentTime - lastTap;
            
            if (tapLength < 300 && tapLength > 0) {
                e.preventDefault();
            }
            
            lastTap = currentTime;
        });
    },

    switchTab(tabName) {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === tabName);
        });

        const tabs = {
            'paint': 'paintPanel',
            'ai-generator': 'aiGeneratorPanel',
            'gallery': 'galleryPanel',
            'settings': 'settingsPanel'
        };

        const panelId = tabs[tabName];
        const panels = document.querySelectorAll('.panel');
        panels.forEach(panel => {
            panel.classList.toggle('active', panel.id === panelId);
        });
    },

    setBrush(brushType) {
        BrushManager.setBrush(brushType);
        
        const brushBtns = document.querySelectorAll('.brush-btn');
        brushBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.brush === brushType);
        });
    },

    setColor(color) {
        BrushManager.setColor(color);
        
        const colorPicker = document.getElementById('colorPicker');
        if (colorPicker) {
            colorPicker.value = color;
        }
        
        const presetColors = document.querySelectorAll('.preset-color');
        presetColors.forEach(c => {
            c.classList.toggle('active', c.dataset.color === color);
        });
    },

    setBrushSize(size) {
        BrushManager.setSize(size);
        
        const brushSize = document.getElementById('brushSize');
        if (brushSize) {
            brushSize.value = size;
        }
        
        const sizeValue = document.getElementById('sizeValue');
        if (sizeValue) {
            sizeValue.textContent = size;
        }
    },

    handleDrawingComplete() {
        console.log('🎉 Drawing complete!');
        
        AnimationManager.showFireworks();
        
        AnimationManager.createConfetti(
            window.innerWidth / 2,
            window.innerHeight / 2,
            100
        );
        
        SoundManager.playCelebrationSound();
    },

    showNotification(message, type = 'info') {
        const notification = document.createElement('div');
        notification.className = `notification notification-${type}`;
        notification.textContent = message;
        notification.style.cssText = `
            position: fixed;
            top: 80px;
            right: 20px;
            padding: 15px 25px;
            background: white;
            border-radius: 10px;
            box-shadow: 0 4px 20px rgba(0,0,0,0.15);
            z-index: 1000;
            animation: slideInRight 0.3s ease-out;
            font-size: 14px;
        `;
        
        document.body.appendChild(notification);
        
        setTimeout(() => {
            notification.style.animation = 'slideOutRight 0.3s ease-in';
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    },

    getVersion() {
        return '1.0.0';
    },

    getStats() {
        return {
            galleryItems: GalleryManager.getGalleryStats(),
            currentTheme: ThemeManager.getCurrentTheme(),
            version: this.getVersion()
        };
    }
};

const style = document.createElement('style');
style.textContent = `
    @keyframes slideInRight {
        from {
            transform: translateX(100%);
            opacity: 0;
        }
        to {
            transform: translateX(0);
            opacity: 1;
        }
    }
    
    @keyframes slideOutRight {
        from {
            transform: translateX(0);
            opacity: 1;
        }
        to {
            transform: translateX(100%);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);

document.addEventListener('DOMContentLoaded', () => {
    App.init();
});

if (document.readyState === 'complete' || document.readyState === 'interactive') {
    if (!App.isInitialized) {
        App.init();
    }
}
