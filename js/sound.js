const SoundManager = {
    audioContext: null,
    enabled: true,
    brushVolume: 0.5,
    fillVolume: 0.7,
    celebrationVolume: 0.8,
    isPlaying: false,
    brushOscillator: null,
    brushGain: null,

    init() {
        try {
            this.audioContext = new (window.AudioContext || window.webkitAudioContext)();
        } catch (e) {
            console.warn('Web Audio API not supported:', e);
            this.enabled = false;
        }
    },

    resumeContext() {
        if (this.audioContext && this.audioContext.state === 'suspended') {
            this.audioContext.resume();
        }
    },

    setBrushVolume(volume) {
        this.brushVolume = volume / 100;
    },

    setFillVolume(volume) {
        this.fillVolume = volume / 100;
    },

    startBrushSound() {
        if (!this.enabled || !this.audioContext || this.isPlaying) return;
        
        this.resumeContext();
        
        this.brushOscillator = this.audioContext.createOscillator();
        this.brushGain = this.audioContext.createGain();
        
        const noiseBuffer = this.createNoiseBuffer();
        const noiseSource = this.audioContext.createBufferSource();
        noiseSource.buffer = noiseBuffer;
        
        const filter = this.audioContext.createBiquadFilter();
        filter.type = 'highpass';
        filter.frequency.value = 2000;
        
        const volume = this.audioContext.createGain();
        volume.gain.value = this.brushVolume * 0.3;
        
        noiseSource.connect(filter);
        filter.connect(volume);
        volume.connect(this.audioContext.destination);
        
        noiseSource.loop = true;
        noiseSource.start();
        
        this.isPlaying = true;
        this.noiseSource = noiseSource;
        this.volumeNode = volume;
    },

    stopBrushSound() {
        if (!this.enabled || !this.isPlaying) return;
        
        if (this.volumeNode) {
            this.volumeNode.gain.exponentialRampToValueAtTime(0.001, this.audioContext.currentTime + 0.1);
        }
        
        if (this.noiseSource) {
            setTimeout(() => {
                try {
                    this.noiseSource.stop();
                } catch (e) {}
            }, 150);
        }
        
        this.isPlaying = false;
    },

    createNoiseBuffer() {
        const bufferSize = 2 * this.audioContext.sampleRate;
        const noiseBuffer = this.audioContext.createBuffer(1, bufferSize, this.audioContext.sampleRate);
        const output = noiseBuffer.getChannelData(0);
        
        for (let i = 0; i < bufferSize; i++) {
            output[i] = Math.random() * 2 - 1;
        }
        
        return noiseBuffer;
    },

    playFillSound() {
        if (!this.enabled || !this.audioContext) return;
        
        this.resumeContext();
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(523.25, this.audioContext.currentTime);
        oscillator.frequency.setValueAtTime(659.25, this.audioContext.currentTime + 0.1);
        oscillator.frequency.setValueAtTime(783.99, this.audioContext.currentTime + 0.2);
        
        gainNode.gain.setValueAtTime(this.fillVolume * 0.5, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.5);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.5);
    },

    playCelebrationSound() {
        if (!this.enabled || !this.audioContext) return;
        
        this.resumeContext();
        
        const notes = [523.25, 659.25, 783.99, 1046.50];
        
        notes.forEach((freq, index) => {
            setTimeout(() => {
                const oscillator = this.audioContext.createOscillator();
                const gainNode = this.audioContext.createGain();
                
                oscillator.type = 'sine';
                oscillator.frequency.setValueAtTime(freq, this.audioContext.currentTime);
                
                gainNode.gain.setValueAtTime(this.celebrationVolume * 0.4, this.audioContext.currentTime);
                gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.8);
                
                oscillator.connect(gainNode);
                gainNode.connect(this.audioContext.destination);
                
                oscillator.start(this.audioContext.currentTime);
                oscillator.stop(this.audioContext.currentTime + 0.8);
            }, index * 150);
        });
    },

    playClickSound() {
        if (!this.enabled || !this.audioContext) return;
        
        this.resumeContext();
        
        const oscillator = this.audioContext.createOscillator();
        const gainNode = this.audioContext.createGain();
        
        oscillator.type = 'sine';
        oscillator.frequency.setValueAtTime(800, this.audioContext.currentTime);
        
        gainNode.gain.setValueAtTime(0.1, this.audioContext.currentTime);
        gainNode.gain.exponentialRampToValueAtTime(0.01, this.audioContext.currentTime + 0.1);
        
        oscillator.connect(gainNode);
        gainNode.connect(this.audioContext.destination);
        
        oscillator.start(this.audioContext.currentTime);
        oscillator.stop(this.audioContext.currentTime + 0.1);
    },

    toggle(enabled) {
        this.enabled = enabled;
        if (!enabled && this.isPlaying) {
            this.stopBrushSound();
        }
    }
};
