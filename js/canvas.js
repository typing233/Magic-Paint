const CanvasManager = {
    mainCanvas: null,
    mainCtx: null,
    lineartCanvas: null,
    lineartCtx: null,
    history: [],
    historyIndex: -1,
    maxHistory: 50,
    currentPath: [],
    isDrawing: false,
    progress: 0,
    onProgressChange: null,
    onComplete: null,
    bunnyTriggered: false,

    init(mainCanvas, lineartCanvas) {
        this.mainCanvas = mainCanvas;
        this.mainCtx = mainCanvas.getContext('2d');
        this.lineartCanvas = lineartCanvas;
        this.lineartCtx = lineartCanvas.getContext('2d');
        
        this.mainCtx.lineCap = 'round';
        this.mainCtx.lineJoin = 'round';
        
        this.clear();
        this.saveState();
        
        this.setupEventListeners();
    },

    setupEventListeners() {
        const canvas = this.mainCanvas;
        
        canvas.addEventListener('mousedown', (e) => this.handleMouseDown(e));
        canvas.addEventListener('mousemove', (e) => this.handleMouseMove(e));
        canvas.addEventListener('mouseup', (e) => this.handleMouseUp(e));
        canvas.addEventListener('mouseleave', (e) => this.handleMouseUp(e));
        
        canvas.addEventListener('touchstart', (e) => this.handleTouchStart(e), { passive: false });
        canvas.addEventListener('touchmove', (e) => this.handleTouchMove(e), { passive: false });
        canvas.addEventListener('touchend', (e) => this.handleTouchEnd(e));
        
        canvas.addEventListener('contextmenu', (e) => e.preventDefault());
    },

    handleMouseDown(e) {
        if (e.button !== 0) return;
        
        const pos = Utils.getMousePos(this.mainCanvas, e);
        this.startDrawing(pos.x, pos.y);
    },

    handleMouseMove(e) {
        if (!this.isDrawing) return;
        
        const pos = Utils.getMousePos(this.mainCanvas, e);
        this.continueDrawing(pos.x, pos.y);
    },

    handleMouseUp(e) {
        this.endDrawing();
    },

    handleTouchStart(e) {
        e.preventDefault();
        
        const pos = Utils.getTouchPos(this.mainCanvas, e);
        if (pos) {
            this.startDrawing(pos.x, pos.y);
        }
    },

    handleTouchMove(e) {
        e.preventDefault();
        
        if (!this.isDrawing) return;
        
        const pos = Utils.getTouchPos(this.mainCanvas, e);
        if (pos) {
            this.continueDrawing(pos.x, pos.y);
        }
    },

    handleTouchEnd(e) {
        this.endDrawing();
    },

    startDrawing(x, y) {
        this.isDrawing = true;
        this.currentPath = [];
        
        const stroke = BrushManager.startDrawing(x, y);
        if (stroke) {
            this.currentPath.push(stroke);
            stroke.render(this.mainCtx);
            
            if (ParticleSystem.enabled && stroke.shouldSpawnParticles()) {
                ParticleSystem.addParticle(x, y, stroke.getParticleColor(), 'star');
                ParticleSystem.addTrail(x, y, stroke.getParticleColor());
            }
            
            if (ParticleSystem.sparkleEnabled) {
                ParticleSystem.addParticle(x, y, stroke.getParticleColor(), 'sparkle');
            }
        }
        
        SoundManager.startBrushSound();
    },

    continueDrawing(x, y) {
        const stroke = BrushManager.continueDrawing(x, y);
        if (stroke) {
            this.currentPath.push(stroke);
            stroke.render(this.mainCtx);
            
            if (ParticleSystem.enabled && stroke.shouldSpawnParticles()) {
                if (Math.random() < 0.3) {
                    ParticleSystem.addParticle(x, y, stroke.getParticleColor(), 'star');
                }
                ParticleSystem.addTrail(x, y, stroke.getParticleColor());
            }
            
            if (ParticleSystem.sparkleEnabled && Math.random() < 0.15) {
                ParticleSystem.addParticle(x, y, stroke.getParticleColor(), 'sparkle');
            }
        }
    },

    endDrawing() {
        if (!this.isDrawing) return;
        
        this.isDrawing = false;
        BrushManager.endDrawing();
        
        if (this.currentPath.length > 0) {
            this.saveState();
            this.updateProgress();
        }
        
        SoundManager.stopBrushSound();
    },

    saveState() {
        this.history = this.history.slice(0, this.historyIndex + 1);
        
        const canvasData = this.mainCanvas.toDataURL();
        this.history.push(canvasData);
        
        if (this.history.length > this.maxHistory) {
            this.history.shift();
        } else {
            this.historyIndex++;
        }
    },

    undo() {
        if (this.historyIndex > 0) {
            this.historyIndex--;
            this.restoreState();
            this.updateProgress();
        }
    },

    redo() {
        if (this.historyIndex < this.history.length - 1) {
            this.historyIndex++;
            this.restoreState();
            this.updateProgress();
        }
    },

    restoreState() {
        const image = new Image();
        image.onload = () => {
            this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
            this.mainCtx.drawImage(image, 0, 0);
        };
        image.src = this.history[this.historyIndex];
    },

    clear() {
        this.mainCtx.clearRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.lineartCtx.clearRect(0, 0, this.lineartCanvas.width, this.lineartCanvas.height);
        
        this.fillWithColor('#FFFFFF');
        
        this.history = [];
        this.historyIndex = -1;
        this.progress = 0;
        this.bunnyTriggered = false;
        
        this.saveState();
        this.updateProgressUI();
    },

    fillWithColor(color) {
        this.mainCtx.save();
        this.mainCtx.fillStyle = color;
        this.mainCtx.fillRect(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        this.mainCtx.restore();
    },

    loadLineart(imageData) {
        this.lineartCtx.clearRect(0, 0, this.lineartCanvas.width, this.lineartCanvas.height);
        
        if (typeof imageData === 'string') {
            const img = new Image();
            img.onload = () => {
                this.lineartCtx.drawImage(img, 0, 0);
                this.clear();
            };
            img.src = imageData;
        } else if (imageData instanceof HTMLCanvasElement) {
            this.lineartCtx.drawImage(imageData, 0, 0);
            this.clear();
        }
    },

    loadGalleryItem(lineartKey) {
        const lineart = DEFAULT_LINEARTS[lineartKey];
        if (lineart) {
            this.lineartCtx.clearRect(0, 0, this.lineartCanvas.width, this.lineartCanvas.height);
            lineart.draw(this.lineartCtx, this.lineartCanvas.width, this.lineartCanvas.height);
            this.clear();
            
            SoundManager.playClickSound();
        }
    },

    updateProgress() {
        const imageData = this.mainCtx.getImageData(0, 0, this.mainCanvas.width, this.mainCanvas.height);
        const data = imageData.data;
        
        let coloredPixels = 0;
        let totalPixels = 0;
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            if (a > 0) {
                totalPixels++;
                
                if (!(r === 255 && g === 255 && b === 255)) {
                    coloredPixels++;
                }
            }
        }
        
        const lineartData = this.lineartCtx.getImageData(0, 0, this.lineartCanvas.width, this.lineartCanvas.height);
        const ld = lineartData.data;
        
        let lineartPixels = 0;
        for (let i = 0; i < ld.length; i += 4) {
            if (ld[i] === 0 && ld[i + 1] === 0 && ld[i + 2] === 0 && ld[i + 3] > 0) {
                lineartPixels++;
            }
        }
        
        if (lineartPixels > 0) {
            this.progress = Math.min(100, Math.round((coloredPixels / (lineartPixels * 3)) * 100));
        } else {
            this.progress = Math.min(100, Math.round((coloredPixels / (this.mainCanvas.width * this.mainCanvas.height * 0.3)) * 100));
        }
        
        this.updateProgressUI();
        this.checkProgressTriggers();
    },

    updateProgressUI() {
        const progressFill = document.getElementById('progressFill');
        const progressText = document.getElementById('progressText');
        
        if (progressFill) {
            progressFill.style.width = this.progress + '%';
        }
        if (progressText) {
            progressText.textContent = this.progress + '%';
        }
        
        if (this.onProgressChange) {
            this.onProgressChange(this.progress);
        }
    },

    checkProgressTriggers() {
        if (this.progress >= 100 && this.onComplete) {
            this.onComplete();
        }
        
        if (this.progress >= CONFIG.ANIMATIONS.BUNNY_TRIGGER_PROGRESS && !this.bunnyTriggered) {
            this.bunnyTriggered = true;
            if (window.AnimationManager) {
                window.AnimationManager.showBunny();
            }
        }
    },

    save() {
        const tempCanvas = Utils.createCanvas(this.mainCanvas.width, this.mainCanvas.height);
        const tempCtx = tempCanvas.getContext('2d');
        
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        
        tempCtx.drawImage(this.lineartCanvas, 0, 0);
        
        tempCtx.drawImage(this.mainCanvas, 0, 0);
        
        const link = document.createElement('a');
        link.download = 'magic-paint-' + Date.now() + '.png';
        link.href = tempCanvas.toDataURL('image/png');
        link.click();
        
        SoundManager.playClickSound();
    },

    getMainContext() {
        return this.mainCtx;
    },

    getLineartContext() {
        return this.lineartCtx;
    }
};
