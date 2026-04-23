const AIGenerator = {
    currentMode: 'text',
    currentStyle: 'cartoon',
    uploadedImage: null,
    resultCanvas: null,
    resultCtx: null,

    init(resultCanvas) {
        this.resultCanvas = resultCanvas;
        this.resultCtx = resultCanvas.getContext('2d');
        
        this.setupEventListeners();
    },

    setupEventListeners() {
        const aiTabs = document.querySelectorAll('.ai-tab');
        aiTabs.forEach(tab => {
            tab.addEventListener('click', () => {
                this.setMode(tab.dataset.mode);
                SoundManager.playClickSound();
            });
        });

        const styleButtons = document.querySelectorAll('.style-btn');
        styleButtons.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setStyle(btn.dataset.style);
                SoundManager.playClickSound();
            });
        });

        const generateBtn = document.getElementById('generateBtn');
        if (generateBtn) {
            generateBtn.addEventListener('click', () => {
                this.generateFromText();
            });
        }

        const convertBtn = document.getElementById('convertBtn');
        if (convertBtn) {
            convertBtn.addEventListener('click', () => {
                this.convertToLineart();
            });
        }

        const uploadArea = document.getElementById('uploadArea');
        const imageUpload = document.getElementById('imageUpload');
        
        if (uploadArea) {
            uploadArea.addEventListener('click', () => {
                if (imageUpload) {
                    imageUpload.click();
                }
            });
            
            uploadArea.addEventListener('dragover', (e) => {
                e.preventDefault();
                uploadArea.classList.add('dragover');
            });
            
            uploadArea.addEventListener('dragleave', () => {
                uploadArea.classList.remove('dragover');
            });
            
            uploadArea.addEventListener('drop', (e) => {
                e.preventDefault();
                uploadArea.classList.remove('dragover');
                const files = e.dataTransfer.files;
                if (files.length > 0) {
                    this.handleImageUpload(files[0]);
                }
            });
        }

        if (imageUpload) {
            imageUpload.addEventListener('change', (e) => {
                if (e.target.files.length > 0) {
                    this.handleImageUpload(e.target.files[0]);
                }
            });
        }

        const removeImage = document.getElementById('removeImage');
        if (removeImage) {
            removeImage.addEventListener('click', (e) => {
                e.stopPropagation();
                this.clearUpload();
                SoundManager.playClickSound();
            });
        }

        const useLineartBtn = document.getElementById('useLineartBtn');
        if (useLineartBtn) {
            useLineartBtn.addEventListener('click', () => {
                this.useGeneratedLineart();
            });
        }

        const regenerateBtn = document.getElementById('regenerateBtn');
        if (regenerateBtn) {
            regenerateBtn.addEventListener('click', () => {
                if (this.currentMode === 'text') {
                    this.generateFromText();
                } else {
                    this.convertToLineart();
                }
            });
        }
    },

    setMode(mode) {
        this.currentMode = mode;
        
        const tabs = document.querySelectorAll('.ai-tab');
        tabs.forEach(tab => {
            tab.classList.toggle('active', tab.dataset.mode === mode);
        });

        const textMode = document.getElementById('textMode');
        const imageMode = document.getElementById('imageMode');
        
        if (textMode) {
            textMode.classList.toggle('active', mode === 'text');
        }
        if (imageMode) {
            imageMode.classList.toggle('active', mode === 'image');
        }
    },

    setStyle(style) {
        this.currentStyle = style;
        
        const buttons = document.querySelectorAll('.style-btn');
        buttons.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.style === style);
        });
    },

    handleImageUpload(file) {
        if (!file.type.startsWith('image/')) {
            alert('请上传图片文件');
            return;
        }

        const reader = new FileReader();
        reader.onload = (e) => {
            const img = new Image();
            img.onload = () => {
                this.uploadedImage = img;
                
                const previewImage = document.getElementById('previewImage');
                const uploadPreview = document.getElementById('uploadPreview');
                const convertBtn = document.getElementById('convertBtn');
                const uploadArea = document.getElementById('uploadArea');
                
                if (previewImage) {
                    previewImage.src = e.target.result;
                }
                if (uploadPreview) {
                    uploadPreview.classList.remove('hidden');
                }
                if (uploadArea) {
                    uploadArea.classList.add('hidden');
                }
                if (convertBtn) {
                    convertBtn.classList.remove('disabled');
                }
            };
            img.src = e.target.result;
        };
        reader.readAsDataURL(file);
    },

    clearUpload() {
        this.uploadedImage = null;
        
        const uploadPreview = document.getElementById('uploadPreview');
        const uploadArea = document.getElementById('uploadArea');
        const convertBtn = document.getElementById('convertBtn');
        const imageUpload = document.getElementById('imageUpload');
        
        if (uploadPreview) {
            uploadPreview.classList.add('hidden');
        }
        if (uploadArea) {
            uploadArea.classList.remove('hidden');
        }
        if (convertBtn) {
            convertBtn.classList.add('disabled');
        }
        if (imageUpload) {
            imageUpload.value = '';
        }
    },

    generateFromText() {
        const promptInput = document.getElementById('promptInput');
        const prompt = promptInput ? promptInput.value.trim() : '';
        
        if (!prompt) {
            alert('请输入文字描述');
            return;
        }

        this.showLoading();

        setTimeout(() => {
            this.generateRandomLineart();
            this.hideLoading();
            this.showResult();
        }, CONFIG.AI_GENERATOR.SIMULATION_DELAY);
    },

    convertToLineart() {
        if (!this.uploadedImage) {
            return;
        }

        this.showLoading();

        setTimeout(() => {
            this.convertImageToLineart();
            this.hideLoading();
            this.showResult();
        }, CONFIG.AI_GENERATOR.SIMULATION_DELAY);
    },

    generateRandomLineart() {
        const lineartKeys = Object.keys(DEFAULT_LINEARTS);
        const randomKey = lineartKeys[Math.floor(Math.random() * lineartKeys.length)];
        const lineart = DEFAULT_LINEARTS[randomKey];
        
        this.resultCtx.clearRect(0, 0, this.resultCanvas.width, this.resultCanvas.height);
        this.resultCtx.fillStyle = '#FFFFFF';
        this.resultCtx.fillRect(0, 0, this.resultCanvas.width, this.resultCanvas.height);
        
        lineart.draw(this.resultCtx, this.resultCanvas.width, this.resultCanvas.height);
        
        this.generatedLineartKey = randomKey;
    },

    convertImageToLineart() {
        if (!this.uploadedImage) return;
        
        const tempCanvas = Utils.createCanvas(this.resultCanvas.width, this.resultCanvas.height);
        const tempCtx = tempCanvas.getContext('2d');
        
        const scale = Math.min(
            tempCanvas.width / this.uploadedImage.width,
            tempCanvas.height / this.uploadedImage.height
        );
        const x = (tempCanvas.width - this.uploadedImage.width * scale) / 2;
        const y = (tempCanvas.height - this.uploadedImage.height * scale) / 2;
        
        tempCtx.fillStyle = '#FFFFFF';
        tempCtx.fillRect(0, 0, tempCanvas.width, tempCanvas.height);
        tempCtx.drawImage(this.uploadedImage, x, y, this.uploadedImage.width * scale, this.uploadedImage.height * scale);
        
        Utils.grayscale(tempCanvas);
        Utils.toLineArt(tempCanvas, 80);
        
        this.resultCtx.clearRect(0, 0, this.resultCanvas.width, this.resultCanvas.height);
        this.resultCtx.drawImage(tempCanvas, 0, 0);
        
        this.generatedLineartKey = null;
    },

    useGeneratedLineart() {
        if (this.generatedLineartKey && DEFAULT_LINEARTS[this.generatedLineartKey]) {
            CanvasManager.loadGalleryItem(this.generatedLineartKey);
        } else {
            CanvasManager.loadLineart(this.resultCanvas);
        }
        
        SoundManager.playClickSound();
        this.switchToPaintTab();
    },

    switchToPaintTab() {
        const navBtns = document.querySelectorAll('.nav-btn');
        navBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.tab === 'paint');
        });
        
        const panels = document.querySelectorAll('.panel');
        panels.forEach(panel => {
            panel.classList.toggle('active', panel.id === 'paintPanel');
        });
    },

    showLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.remove('hidden');
        }
    },

    hideLoading() {
        const overlay = document.getElementById('loadingOverlay');
        if (overlay) {
            overlay.classList.add('hidden');
        }
    },

    showResult() {
        const resultSection = document.getElementById('resultSection');
        if (resultSection) {
            resultSection.classList.remove('hidden');
        }
    },

    hideResult() {
        const resultSection = document.getElementById('resultSection');
        if (resultSection) {
            resultSection.classList.add('hidden');
        }
    }
};
