const BrushManager = {
    currentBrush: 'normal',
    currentColor: '#FF6B6B',
    currentSize: 5,
    rainbowHue: 0,
    gradientStart: '#FF6B6B',
    gradientEnd: '#4ECDC4',
    lastX: 0,
    lastY: 0,
    isDrawing: false,

    init() {
        this.rainbowHue = 0;
    },

    setBrush(brushType) {
        this.currentBrush = brushType;
    },

    setColor(color) {
        this.currentColor = color;
    },

    setSize(size) {
        this.currentSize = size;
    },

    startDrawing(x, y) {
        this.isDrawing = true;
        this.lastX = x;
        this.lastY = y;
        return this.getStroke(x, y, x, y);
    },

    continueDrawing(x, y) {
        if (!this.isDrawing) return null;
        
        const stroke = this.getStroke(this.lastX, this.lastY, x, y);
        this.lastX = x;
        this.lastY = y;
        return stroke;
    },

    endDrawing() {
        this.isDrawing = false;
    },

    getStroke(x1, y1, x2, y2) {
        const self = this;
        
        return {
            brush: this.currentBrush,
            x1, y1, x2, y2,
            color: this.currentColor,
            size: this.currentSize,
            rainbowHue: this.rainbowHue,
            
            render(ctx) {
                switch (this.brush) {
                    case 'normal':
                        self.renderNormal(ctx, this);
                        break;
                    case 'rainbow':
                        self.renderRainbow(ctx, this);
                        break;
                    case 'gradient':
                        self.renderGradient(ctx, this);
                        break;
                    case 'sparkle':
                        self.renderSparkle(ctx, this);
                        break;
                    case 'eraser':
                        self.renderEraser(ctx, this);
                        break;
                }
            },
            
            getParticleColor() {
                if (this.brush === 'rainbow') {
                    const hue = (this.rainbowHue + (Date.now() % 3600) / 10) % 360;
                    const rgb = Utils.hslToRgb(hue / 360, 1, 0.5);
                    return Utils.rgbToHex(rgb.r, rgb.g, rgb.b);
                }
                return this.color;
            },
            
            shouldSpawnParticles() {
                return this.brush !== 'eraser';
            }
        };
    },

    renderNormal(ctx, stroke) {
        ctx.beginPath();
        ctx.moveTo(stroke.x1, stroke.y1);
        ctx.lineTo(stroke.x2, stroke.y2);
        ctx.strokeStyle = stroke.color;
        ctx.lineWidth = stroke.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
    },

    renderRainbow(ctx, stroke) {
        const distance = Utils.distance(stroke.x1, stroke.y1, stroke.x2, stroke.y2);
        const steps = Math.max(1, Math.floor(distance / 2));
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = Utils.lerp(stroke.x1, stroke.x2, t);
            const y = Utils.lerp(stroke.y1, stroke.y2, t);
            
            const hue = (this.rainbowHue + t * 60 + (Date.now() % 3600) / 10) % 360;
            const rgb = Utils.hslToRgb(hue / 360, 1, 0.5);
            
            ctx.beginPath();
            ctx.arc(x, y, stroke.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = `rgb(${rgb.r}, ${rgb.g}, ${rgb.b})`;
            ctx.fill();
        }
        
        this.rainbowHue = (this.rainbowHue + 2) % 360;
    },

    renderGradient(ctx, stroke) {
        const gradient = ctx.createLinearGradient(
            stroke.x1, stroke.y1,
            stroke.x2, stroke.y2
        );
        
        const startRgb = Utils.hexToRgb(this.gradientStart);
        const endRgb = Utils.hexToRgb(this.gradientEnd);
        
        const currentRgb = Utils.hexToRgb(stroke.color);
        const hueShift = (Date.now() % 3600) / 3600;
        
        const hsl1 = this.rgbToHsl(startRgb.r, startRgb.g, startRgb.b);
        const hsl2 = this.rgbToHsl(endRgb.r, endRgb.g, endRgb.b);
        
        const newHsl1 = {
            h: (hsl1.h + hueShift) % 1,
            s: hsl1.s,
            l: hsl1.l
        };
        const newHsl2 = {
            h: (hsl2.h + hueShift) % 1,
            s: hsl2.s,
            l: hsl2.l
        };
        
        const newRgb1 = Utils.hslToRgb(newHsl1.h, newHsl1.s, newHsl1.l);
        const newRgb2 = Utils.hslToRgb(newHsl2.h, newHsl2.s, newHsl2.l);
        
        gradient.addColorStop(0, `rgb(${newRgb1.r}, ${newRgb1.g}, ${newRgb1.b})`);
        gradient.addColorStop(0.5, stroke.color);
        gradient.addColorStop(1, `rgb(${newRgb2.r}, ${newRgb2.g}, ${newRgb2.b})`);
        
        ctx.beginPath();
        ctx.moveTo(stroke.x1, stroke.y1);
        ctx.lineTo(stroke.x2, stroke.y2);
        ctx.strokeStyle = gradient;
        ctx.lineWidth = stroke.size;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        
        this.gradientStart = `rgb(${newRgb1.r}, ${newRgb1.g}, ${newRgb1.b})`;
        this.gradientEnd = `rgb(${newRgb2.r}, ${newRgb2.g}, ${newRgb2.b})`;
    },

    renderSparkle(ctx, stroke) {
        const distance = Utils.distance(stroke.x1, stroke.y1, stroke.x2, stroke.y2);
        const steps = Math.max(1, Math.floor(distance / (stroke.size / 2)));
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = Utils.lerp(stroke.x1, stroke.x2, t);
            const y = Utils.lerp(stroke.y1, stroke.y2, t);
            
            ctx.beginPath();
            ctx.arc(x, y, stroke.size / 2, 0, Math.PI * 2);
            ctx.fillStyle = stroke.color;
            ctx.fill();
            
            const glowSize = stroke.size * 1.5;
            const gradient = ctx.createRadialGradient(x, y, 0, x, y, glowSize);
            gradient.addColorStop(0, stroke.color + '80');
            gradient.addColorStop(1, stroke.color + '00');
            
            ctx.beginPath();
            ctx.arc(x, y, glowSize, 0, Math.PI * 2);
            ctx.fillStyle = gradient;
            ctx.fill();
            
            if (Math.random() < 0.3) {
                const sparkX = x + (Math.random() - 0.5) * stroke.size * 2;
                const sparkY = y + (Math.random() - 0.5) * stroke.size * 2;
                
                ctx.beginPath();
                ctx.arc(sparkX, sparkY, 2, 0, Math.PI * 2);
                ctx.fillStyle = 'white';
                ctx.fill();
            }
        }
    },

    renderEraser(ctx, stroke) {
        ctx.save();
        ctx.globalCompositeOperation = 'destination-out';
        ctx.beginPath();
        ctx.moveTo(stroke.x1, stroke.y1);
        ctx.lineTo(stroke.x2, stroke.y2);
        ctx.strokeStyle = 'rgba(255, 255, 255, 1)';
        ctx.lineWidth = stroke.size * 2;
        ctx.lineCap = 'round';
        ctx.lineJoin = 'round';
        ctx.stroke();
        ctx.restore();
    },

    rgbToHsl(r, g, b) {
        r /= 255;
        g /= 255;
        b /= 255;
        
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        let h, s, l = (max + min) / 2;
        
        if (max === min) {
            h = s = 0;
        } else {
            const d = max - min;
            s = l > 0.5 ? d / (2 - max - min) : d / (max + min);
            
            switch (max) {
                case r: h = ((g - b) / d + (g < b ? 6 : 0)) / 6; break;
                case g: h = ((b - r) / d + 2) / 6; break;
                case b: h = ((r - g) / d + 4) / 6; break;
            }
        }
        
        return { h, s, l };
    }
};

const BrushPreview = {
    canvas: null,
    ctx: null,

    init(canvas) {
        this.canvas = canvas;
        this.ctx = canvas.getContext('2d');
    },

    update(brushType, color, size) {
        if (!this.ctx) return;
        
        this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
        
        const centerX = this.canvas.width / 2;
        const centerY = this.canvas.height / 2;
        
        this.ctx.beginPath();
        this.ctx.arc(centerX, centerY, size / 2, 0, Math.PI * 2);
        
        switch (brushType) {
            case 'normal':
                this.ctx.fillStyle = color;
                this.ctx.fill();
                break;
                
            case 'rainbow':
                const gradient = this.ctx.createConicGradient
                    ? this.ctx.createConicGradient(0, centerX, centerY)
                    : this.ctx.createLinearGradient(0, 0, this.canvas.width, this.canvas.height);
                
                if (this.ctx.createConicGradient) {
                    gradient.addColorStop(0, '#FF0000');
                    gradient.addColorStop(0.17, '#FF7F00');
                    gradient.addColorStop(0.33, '#FFFF00');
                    gradient.addColorStop(0.5, '#00FF00');
                    gradient.addColorStop(0.67, '#0000FF');
                    gradient.addColorStop(0.83, '#4B0082');
                    gradient.addColorStop(1, '#9400D3');
                } else {
                    gradient.addColorStop(0, '#FF0000');
                    gradient.addColorStop(0.5, '#00FF00');
                    gradient.addColorStop(1, '#0000FF');
                }
                
                this.ctx.fillStyle = gradient;
                this.ctx.fill();
                break;
                
            case 'gradient':
                const gradGradient = this.ctx.createLinearGradient(
                    centerX - size / 2, centerY,
                    centerX + size / 2, centerY
                );
                gradGradient.addColorStop(0, '#FF6B6B');
                gradGradient.addColorStop(0.5, color);
                gradGradient.addColorStop(1, '#4ECDC4');
                
                this.ctx.fillStyle = gradGradient;
                this.ctx.fill();
                break;
                
            case 'sparkle':
                this.ctx.fillStyle = color;
                this.ctx.fill();
                
                const glowGradient = this.ctx.createRadialGradient(
                    centerX, centerY, 0,
                    centerX, centerY, size
                );
                glowGradient.addColorStop(0, color + '80');
                glowGradient.addColorStop(1, color + '00');
                
                this.ctx.beginPath();
                this.ctx.arc(centerX, centerY, size, 0, Math.PI * 2);
                this.ctx.fillStyle = glowGradient;
                this.ctx.fill();
                break;
                
            case 'eraser':
                this.ctx.strokeStyle = '#999';
                this.ctx.lineWidth = 2;
                this.ctx.setLineDash([5, 3]);
                this.ctx.stroke();
                this.ctx.setLineDash([]);
                
                this.ctx.beginPath();
                this.ctx.moveTo(centerX - size / 4, centerY - size / 4);
                this.ctx.lineTo(centerX + size / 4, centerY + size / 4);
                this.ctx.moveTo(centerX + size / 4, centerY - size / 4);
                this.ctx.lineTo(centerX - size / 4, centerY + size / 4);
                this.ctx.strokeStyle = '#999';
                this.ctx.lineWidth = 2;
                this.ctx.stroke();
                break;
        }
    }
};
