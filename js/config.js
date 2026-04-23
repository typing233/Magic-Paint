const CONFIG = {
    CANVAS: {
        WIDTH: 800,
        HEIGHT: 600
    },
    
    BRUSHES: {
        TYPES: ['normal', 'rainbow', 'gradient', 'sparkle', 'eraser'],
        DEFAULT_SIZE: 5,
        MIN_SIZE: 1,
        MAX_SIZE: 50
    },
    
    COLORS: {
        RAINBOW: [
            '#FF0000', '#FF7F00', '#FFFF00', '#00FF00',
            '#0000FF', '#4B0082', '#9400D3'
        ],
        PRESET: [
            '#FF6B6B', '#4ECDC4', '#45B7D1', '#FFD93D',
            '#95E1D3', '#333333', '#FFFFFF'
        ]
    },
    
    PARTICLES: {
        ENABLED: true,
        MAX_COUNT: 100,
        STAR_COUNT: 8,
        SPARKLE_COUNT: 5,
        TRAIL_LENGTH: 15
    },
    
    ANIMATIONS: {
        BUNNY_TRIGGER_PROGRESS: 80,
        FIREWORKS_DURATION: 5000,
        BUNNY_DISPLAY_DURATION: 8000
    },
    
    SOUND: {
        ENABLED: true,
        BRUSH_VOLUME: 0.5,
        FILL_VOLUME: 0.7,
        CELEBRATION_VOLUME: 0.8
    },
    
    THEMES: {
        CURRENT: 'spring',
        AVAILABLE: ['spring', 'summer', 'autumn', 'winter', 'spring-festival', 'mid-autumn']
    },
    
    GALLERY: {
        ITEMS_PER_CATEGORY: 6
    },
    
    AI_GENERATOR: {
        SIMULATION_DELAY: 2000,
        STYLES: ['cartoon', 'realistic', 'sketch', 'anime']
    }
};

const DEFAULT_LINEARTS = {
    cat: {
        name: '可爱小猫',
        category: 'animals',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.ellipse(w/2, h/2 + 50, 80, 60, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 40, 60, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 40, h/2 - 80);
            ctx.lineTo(w/2 - 55, h/2 - 130);
            ctx.lineTo(w/2 - 25, h/2 - 95);
            ctx.closePath();
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 + 40, h/2 - 80);
            ctx.lineTo(w/2 + 55, h/2 - 130);
            ctx.lineTo(w/2 + 25, h/2 - 95);
            ctx.closePath();
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 25, h/2 - 50, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 25, h/2 - 50, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.ellipse(w/2, h/2 - 30, 6, 5, 0, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(w/2, h/2 - 25);
            ctx.lineTo(w/2 - 15, h/2 - 15);
            ctx.moveTo(w/2, h/2 - 25);
            ctx.lineTo(w/2 + 15, h/2 - 15);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 60, h/2 - 30);
            ctx.lineTo(w/2 - 25, h/2 - 28);
            ctx.moveTo(w/2 - 60, h/2 - 20);
            ctx.lineTo(w/2 - 25, h/2 - 20);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 + 60, h/2 - 30);
            ctx.lineTo(w/2 + 25, h/2 - 28);
            ctx.moveTo(w/2 + 60, h/2 - 20);
            ctx.lineTo(w/2 + 25, h/2 - 20);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 - 70, h/2 + 80, 20, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(w/2 + 70, h/2 + 80, 20, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 + 80, h/2 + 30);
            ctx.quadraticCurveTo(w/2 + 150, h/2, w/2 + 120, h/2 - 50);
            ctx.stroke();
        }
    },
    bear: {
        name: '萌萌小熊',
        category: 'animals',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.arc(w/2 - 70, h/2 - 120, 35, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(w/2 + 70, h/2 - 120, 35, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 - 70, h/2 - 120, 15, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(w/2 + 70, h/2 - 120, 15, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 40, 80, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 30, h/2 - 55, 12, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 30, h/2 - 55, 12, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 30, h/2 - 55, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 30, h/2 - 55, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 25, 15, 12, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 8, h/2 - 15);
            ctx.lineTo(w/2, h/2 - 10);
            ctx.lineTo(w/2 + 8, h/2 - 15);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 + 60, 100, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 50, 40, 30, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 - 70, h/2 + 100, 25, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(w/2 + 70, h/2 + 100, 25, 0, Math.PI * 2);
            ctx.stroke();
        }
    },
    dog: {
        name: '忠诚小狗',
        category: 'animals',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 60, h/2 - 50);
            ctx.lineTo(w/2 - 90, h/2 - 120);
            ctx.lineTo(w/2 - 40, h/2 - 80);
            ctx.closePath();
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 + 60, h/2 - 50);
            ctx.lineTo(w/2 + 90, h/2 - 120);
            ctx.lineTo(w/2 + 40, h/2 - 80);
            ctx.closePath();
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 30, 70, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 25, h/2 - 45, 10, 12, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 25, h/2 - 45, 10, 12, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 25, h/2 - 45, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 25, h/2 - 45, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 10, 12, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = '#333';
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(w/2, h/2);
            ctx.lineTo(w/2, h/2 + 15);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(w/2 - 15, h/2 + 15, 15, 0, Math.PI);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 80, 60, 45, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 40, h/2 + 110, 12, 20, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 40, h/2 + 110, 12, 20, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 60, h/2 + 60);
            ctx.quadraticCurveTo(w/2 - 120, h/2 + 30, w/2 - 100, h/2 - 20);
            ctx.stroke();
        }
    },
    rabbit: {
        name: '可爱兔子',
        category: 'animals',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 30, h/2 - 130, 15, 50, -0.2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 - 30, h/2 - 130, 8, 35, -0.2, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 + 30, h/2 - 130, 15, 50, 0.2, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 30, h/2 - 130, 8, 35, 0.2, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 40, 60, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 25, h/2 - 50, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 25, h/2 - 50, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 25, h/2 - 50, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 25, h/2 - 50, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 28, 5, 4, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = '#333';
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(w/2, h/2 - 24);
            ctx.lineTo(w/2 - 10, h/2 - 15);
            ctx.moveTo(w/2, h/2 - 24);
            ctx.lineTo(w/2 + 10, h/2 - 15);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 50, 50, 40, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 30, h/2 + 80, 12, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 30, h/2 + 80, 12, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 - 50, h/2 + 50, 15, 0, Math.PI * 2);
            ctx.stroke();
        }
    },
    flower: {
        name: '美丽花朵',
        category: 'nature',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.moveTo(w/2, h/2 + 100);
            ctx.quadraticCurveTo(w/2 - 20, h/2 + 20, w/2, h/2 - 50);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 40, h/2 + 20, 30, 15, -0.5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 40, h/2 + 50, 30, 15, 0.5, 0, Math.PI * 2);
            ctx.stroke();
            
            for (let i = 0; i < 6; i++) {
                const angle = (i * Math.PI * 2) / 6;
                const petalX = w/2 + Math.cos(angle) * 30;
                const petalY = h/2 - 80 + Math.sin(angle) * 30;
                
                ctx.beginPath();
                ctx.ellipse(petalX, petalY, 25, 15, angle, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 80, 15, 0, Math.PI * 2);
            ctx.stroke();
            
            for (let i = 0; i < 8; i++) {
                const dotAngle = (i * Math.PI * 2) / 8;
                ctx.beginPath();
                ctx.arc(
                    w/2 + Math.cos(dotAngle) * 8,
                    h/2 - 80 + Math.sin(dotAngle) * 8,
                    2, 0, Math.PI * 2
                );
                ctx.fillStyle = '#333';
                ctx.fill();
            }
        }
    },
    tree: {
        name: '大树',
        category: 'nature',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 40, h/2 + 150);
            ctx.lineTo(w/2 - 30, h/2);
            ctx.lineTo(w/2 + 30, h/2);
            ctx.lineTo(w/2 + 40, h/2 + 150);
            ctx.closePath();
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 20, h/2 + 80);
            ctx.lineTo(w/2 - 80, h/2 + 30);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w/2 + 20, h/2 + 80);
            ctx.lineTo(w/2 + 80, h/2 + 50);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 60, 90, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 - 70, h/2 - 40, 50, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 + 70, h/2 - 40, 50, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 140, 60, 0, Math.PI * 2);
            ctx.stroke();
            
            for (let i = 0; i < 8; i++) {
                const x = Math.random() * 160 + w/2 - 80;
                const y = Math.random() * 100 + h/2 - 120;
                ctx.beginPath();
                ctx.arc(x, y, Math.random() * 15 + 5, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    },
    sun: {
        name: '太阳',
        category: 'nature',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 30, 60, 0, Math.PI * 2);
            ctx.stroke();
            
            for (let i = 0; i < 12; i++) {
                const angle = (i * Math.PI * 2) / 12;
                const innerX = w/2 + Math.cos(angle) * 70;
                const innerY = h/2 - 30 + Math.sin(angle) * 70;
                const outerX = w/2 + Math.cos(angle) * 100;
                const outerY = h/2 - 30 + Math.sin(angle) * 100;
                
                ctx.beginPath();
                ctx.moveTo(innerX, innerY);
                ctx.lineTo(outerX, outerY);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 20, h/2 - 40, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 20, h/2 - 40, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 20, h/2 - 40, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 20, h/2 - 40, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 15, 20, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 45, h/2 - 20, 15, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 45, h/2 - 20, 15, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
    },
    cloud: {
        name: '云朵',
        category: 'nature',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.arc(w/2 - 80, h/2, 40, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 - 40, h/2 - 30, 50, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 + 30, h/2 - 30, 55, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 + 80, h/2, 45, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 + 10, 50, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 30, h/2 - 35, 5, 6, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 30, h/2 - 35, 5, 6, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 - 30, h/2 - 35, 2, 0, Math.PI * 2);
            ctx.fillStyle = '#333';
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 30, h/2 - 35, 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 15, h/2 - 10);
            ctx.lineTo(w/2, h/2 - 5);
            ctx.lineTo(w/2 + 15, h/2 - 10);
            ctx.stroke();
        }
    },
    hamburger: {
        name: '汉堡包',
        category: 'food',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 80, 80, 25, 0, Math.PI, 0);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 55, 80, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            for (let i = 0; i < 6; i++) {
                const sx = w/2 - 60 + i * 25;
                ctx.beginPath();
                ctx.moveTo(sx, h/2 - 55);
                ctx.lineTo(sx + 10, h/2 - 45);
                ctx.lineTo(sx + 20, h/2 - 55);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 35, 80, 8, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 10, 80, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 15, 80, 8, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 40, 80, 20, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 65, 80, 20, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 - 30, h/2, 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 5, 5, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(w/2 + 30, h/2, 5, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 70, h/2 - 55);
            ctx.lineTo(w/2 - 70, h/2 + 65);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w/2 + 70, h/2 - 55);
            ctx.lineTo(w/2 + 70, h/2 + 65);
            ctx.stroke();
        }
    },
    icecream: {
        name: '冰淇淋',
        category: 'food',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 50, h/2 - 30);
            ctx.lineTo(w/2 - 30, h/2 + 100);
            ctx.lineTo(w/2 + 30, h/2 + 100);
            ctx.lineTo(w/2 + 50, h/2 - 30);
            ctx.closePath();
            ctx.stroke();
            
            for (let i = 0; i < 5; i++) {
                const ly = h/2 + 10 + i * 20;
                ctx.beginPath();
                ctx.moveTo(w/2 - 45 + i * 5, ly);
                ctx.lineTo(w/2 + 45 - i * 5, ly);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 80, 45, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 40, h/2 - 90);
            ctx.quadraticCurveTo(w/2 - 20, h/2 - 110, w/2, h/2 - 95);
            ctx.quadraticCurveTo(w/2 + 20, h/2 - 80, w/2 + 40, h/2 - 90);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 20, h/2 - 80, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 20, h/2 - 80, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 20, h/2 - 80, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 20, h/2 - 80, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 60, 10, 0, Math.PI);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2, h/2 - 125);
            ctx.lineTo(w/2, h/2 - 150);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 125, 8, 0, Math.PI * 2);
            ctx.stroke();
        }
    },
    cake: {
        name: '生日蛋糕',
        category: 'food',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 80, 100, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.rect(w/2 - 100, h/2 + 30, 200, 50);
            ctx.stroke();
            
            for (let i = 0; i < 10; i++) {
                const wx = w/2 - 90 + i * 20;
                ctx.beginPath();
                ctx.moveTo(wx, h/2 + 30);
                ctx.quadraticCurveTo(wx + 5, h/2 + 20, wx + 10, h/2 + 30);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 10, 80, 12, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.rect(w/2 - 80, h/2 - 30, 160, 40);
            ctx.stroke();
            
            for (let i = 0; i < 8; i++) {
                const wx = w/2 - 70 + i * 20;
                ctx.beginPath();
                ctx.moveTo(wx, h/2 - 30);
                ctx.quadraticCurveTo(wx + 5, h/2 - 40, wx + 10, h/2 - 30);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 35, 60, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.rect(w/2 - 60, h/2 - 75, 120, 40);
            ctx.stroke();
            
            for (let i = 0; i < 6; i++) {
                const wx = w/2 - 50 + i * 20;
                ctx.beginPath();
                ctx.moveTo(wx, h/2 - 75);
                ctx.quadraticCurveTo(wx + 5, h/2 - 85, wx + 10, h/2 - 75);
                ctx.stroke();
            }
            
            for (let i = 0; i < 5; i++) {
                const cx = w/2 - 40 + i * 20;
                ctx.beginPath();
                ctx.moveTo(cx, h/2 - 75);
                ctx.lineTo(cx, h/2 - 100);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.ellipse(cx, h/2 - 105, 4, 6, 0, 0, Math.PI * 2);
                ctx.stroke();
                
                ctx.beginPath();
                ctx.moveTo(cx, h/2 - 105);
                ctx.quadraticCurveTo(cx - 5, h/2 - 115, cx, h/2 - 120);
                ctx.quadraticCurveTo(cx + 5, h/2 - 115, cx, h/2 - 105);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 40, h/2 - 55, 6, 8, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 40, h/2 - 55, 6, 8, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 40, h/2 - 55, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 40, h/2 - 55, 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 45, 8, 0, Math.PI);
            ctx.stroke();
        }
    },
    pizza: {
        name: '披萨',
        category: 'food',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2, 100, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2, 90, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2, h/2 - 90);
            ctx.lineTo(w/2, h/2 + 90);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w/2 - 78, h/2 - 45);
            ctx.lineTo(w/2 + 78, h/2 + 45);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w/2 + 78, h/2 - 45);
            ctx.lineTo(w/2 - 78, h/2 + 45);
            ctx.stroke();
            
            const toppings = [
                [w/2 - 30, h/2 - 50],
                [w/2 + 40, h/2 - 30],
                [w/2 - 50, h/2 + 20],
                [w/2 + 20, h/2 + 50],
                [w/2 - 10, h/2 - 10],
                [w/2 + 60, h/2 + 10],
                [w/2 - 60, h/2 - 20],
                [w/2 + 10, h/2 - 60],
                [w/2 - 20, h/2 + 60],
                [w/2 + 50, h/2 - 60]
            ];
            
            toppings.forEach(([tx, ty], i) => {
                if (i % 2 === 0) {
                    ctx.beginPath();
                    ctx.ellipse(tx, ty, 10, 8, Math.random(), 0, Math.PI * 2);
                    ctx.stroke();
                } else {
                    ctx.beginPath();
                    ctx.arc(tx, ty, 8, 0, Math.PI * 2);
                    ctx.stroke();
                }
            });
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 30, h/2 - 30, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 30, h/2 - 30, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 30, h/2 - 30, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 30, h/2 - 30, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 + 10, 20, 0.2 * Math.PI, 0.8 * Math.PI);
            ctx.stroke();
        }
    },
    lantern: {
        name: '节日灯笼',
        category: 'festival',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.moveTo(w/2, h/2 - 120);
            ctx.lineTo(w/2, h/2 - 100);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 100, 30, 8, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 20, 60, 80, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 60, h/2 - 20);
            ctx.lineTo(w/2 - 60, h/2 + 60);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w/2 + 60, h/2 - 20);
            ctx.lineTo(w/2 + 60, h/2 + 60);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 20, 60, 0, Math.PI);
            ctx.stroke();
            ctx.beginPath();
            ctx.arc(w/2, h/2 + 60, 60, Math.PI, 0);
            ctx.stroke();
            
            for (let i = 0; i < 3; i++) {
                ctx.beginPath();
                ctx.moveTo(w/2 - 40 + i * 40, h/2 - 100);
                ctx.quadraticCurveTo(w/2 - 30 + i * 40, h/2 - 20, w/2 - 40 + i * 40, h/2 + 60);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 60, 30, 8, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2, h/2 + 68);
            ctx.lineTo(w/2, h/2 + 120);
            ctx.stroke();
            
            for (let i = 0; i < 5; i++) {
                const sx = w/2 - 20 + i * 10;
                ctx.beginPath();
                ctx.moveTo(sx, h/2 + 80);
                ctx.quadraticCurveTo(sx + 5, h/2 + 100, sx, h/2 + 120);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 20, h/2 - 30, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 20, h/2 - 30, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 20, h/2 - 30, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 20, h/2 - 30, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 + 10, 15, 0, Math.PI);
            ctx.stroke();
        }
    },
    firework: {
        name: '节日烟花',
        category: 'festival',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const centers = [
                [w/2 - 100, h/2 - 80],
                [w/2 + 80, h/2 - 60],
                [w/2, h/2 + 20]
            ];
            
            const sizes = [40, 35, 50];
            
            centers.forEach(([cx, cy], idx) => {
                const size = sizes[idx];
                
                for (let i = 0; i < 8; i++) {
                    const angle = (i * Math.PI * 2) / 8;
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    const midX = cx + Math.cos(angle) * size * 0.6;
                    const midY = cy + Math.sin(angle) * size * 0.6;
                    const endX = cx + Math.cos(angle) * size;
                    const endY = cy + Math.sin(angle) * size;
                    ctx.quadraticCurveTo(midX + 5, midY + 5, endX, endY);
                    ctx.stroke();
                    
                    ctx.beginPath();
                    ctx.arc(endX, endY, 3, 0, Math.PI * 2);
                    ctx.stroke();
                }
                
                ctx.beginPath();
                ctx.arc(cx, cy, 10, 0, Math.PI * 2);
                ctx.stroke();
            });
            
            ctx.beginPath();
            ctx.moveTo(w/2 + 80, h/2 + 100);
            ctx.lineTo(w/2 + 100, h/2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.arc(w/2 + 100, h/2, 5, 0, Math.PI * 2);
            ctx.stroke();
            
            for (let i = 0; i < 15; i++) {
                const sx = Math.random() * w;
                const sy = Math.random() * (h/2);
                ctx.beginPath();
                ctx.arc(sx, sy, 1, 0, Math.PI * 2);
                ctx.stroke();
            }
        }
    },
    dumpling: {
        name: '春节饺子',
        category: 'festival',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 80, 100, 25, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 15, h/2 - 10, 35, 25, -0.3, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 50, h/2 - 10);
            ctx.quadraticCurveTo(w/2 - 30, h/2 - 40, w/2, h/2 - 35);
            ctx.quadraticCurveTo(w/2 + 30, h/2 - 40, w/2 + 50, h/2 - 10);
            ctx.stroke();
            
            for (let i = 0; i < 5; i++) {
                const px = w/2 - 40 + i * 20;
                ctx.beginPath();
                ctx.moveTo(px, h/2 - 15);
                ctx.lineTo(px + 10, h/2 - 25);
                ctx.lineTo(px + 20, h/2 - 15);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 80, h/2 + 30, 30, 20, 0.2, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 - 105, h/2 + 30);
            ctx.quadraticCurveTo(w/2 - 90, h/2 + 5, w/2 - 70, h/2 + 10);
            ctx.quadraticCurveTo(w/2 - 50, h/2 + 15, w/2 - 55, h/2 + 30);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 + 80, h/2 + 30, 30, 20, -0.2, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.moveTo(w/2 + 55, h/2 + 30);
            ctx.quadraticCurveTo(w/2 + 70, h/2 + 5, w/2 + 90, h/2 + 10);
            ctx.quadraticCurveTo(w/2 + 110, h/2 + 15, w/2 + 105, h/2 + 30);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 25, h/2 - 15, 6, 8, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 15, h/2 - 15, 6, 8, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 25, h/2 - 15, 3, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 15, h/2 - 15, 3, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(w/2 - 5, h/2 + 5, 10, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.stroke();
        }
    },
    mooncake: {
        name: '中秋月饼',
        category: 'solar',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2, 100, 70, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2, 90, 60, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2, 70, 45, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2, 50, 35, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            const patterns = [
                [w/2 - 60, h/2 - 40, '云'],
                [w/2 + 60, h/2 - 40, '云'],
                [w/2, h/2 - 50, '月'],
                [w/2 - 40, h/2 + 10, '花'],
                [w/2 + 40, h/2 + 10, '花'],
                [w/2, h/2 + 20, '纹']
            ];
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 35, 15, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 55, h/2 - 40, 15, 8, -0.3, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 + 55, h/2 - 40, 15, 8, 0.3, 0, Math.PI * 2);
            ctx.stroke();
            
            for (let i = 0; i < 12; i++) {
                const angle = (i * Math.PI * 2) / 12;
                const outerX = w/2 + Math.cos(angle) * 90;
                const outerY = h/2 + Math.sin(angle) * 60;
                const innerX = w/2 + Math.cos(angle) * 70;
                const innerY = h/2 + Math.sin(angle) * 45;
                
                ctx.beginPath();
                ctx.moveTo(outerX, outerY);
                ctx.lineTo(innerX, innerY);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 20, h/2 - 20, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 20, h/2 - 20, 8, 10, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 20, h/2 - 20, 4, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 20, h/2 - 20, 4, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 + 5, 12, 0, Math.PI);
            ctx.stroke();
        }
    },
    moon: {
        name: '中秋月亮',
        category: 'solar',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 30, 120, 0, Math.PI * 2);
            ctx.stroke();
            
            for (let i = 0; i < 30; i++) {
                const sx = Math.random() * w;
                const sy = Math.random() * h;
                ctx.beginPath();
                ctx.arc(sx, sy, Math.random() * 2 + 0.5, 0, Math.PI * 2);
                ctx.stroke();
            }
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 40, h/2 - 80, 12, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 40, h/2 - 80, 12, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 40, h/2 - 80, 6, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 40, h/2 - 80, 6, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.fillStyle = 'white';
            ctx.arc(w/2 - 38, h/2 - 82, 2, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 42, h/2 - 82, 2, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 - 45, 15, 12, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.fillStyle = '#333';
            ctx.fill();
            
            ctx.beginPath();
            ctx.arc(w/2, h/2 - 10, 30, 0.1 * Math.PI, 0.9 * Math.PI);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 70, h/2 - 50, 20, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 70, h/2 - 50, 20, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2, h/2 + 40, 40, 25, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            for (let i = 0; i < 5; i++) {
                ctx.beginPath();
                ctx.moveTo(w/2 - 30 + i * 15, h/2 + 40);
                ctx.quadraticCurveTo(w/2 - 25 + i * 15, h/2 + 60, w/2 - 30 + i * 15, h/2 + 80);
                ctx.stroke();
            }
        }
    },
    snowflake: {
        name: '冬日雪花',
        category: 'solar',
        draw: (ctx, w, h) => {
            ctx.strokeStyle = '#333';
            ctx.lineWidth = 2;
            ctx.beginPath();
            
            const drawSnowflake = (cx, cy, size) => {
                for (let i = 0; i < 6; i++) {
                    const angle = (i * Math.PI * 2) / 6;
                    const endX = cx + Math.cos(angle) * size;
                    const endY = cy + Math.sin(angle) * size;
                    
                    ctx.beginPath();
                    ctx.moveTo(cx, cy);
                    ctx.lineTo(endX, endY);
                    ctx.stroke();
                    
                    const midX = cx + Math.cos(angle) * (size * 0.6);
                    const midY = cy + Math.sin(angle) * (size * 0.6);
                    const branchAngle1 = angle + 0.5;
                    const branchAngle2 = angle - 0.5;
                    
                    ctx.beginPath();
                    ctx.moveTo(midX, midY);
                    ctx.lineTo(
                        midX + Math.cos(branchAngle1) * (size * 0.3),
                        midY + Math.sin(branchAngle1) * (size * 0.3)
                    );
                    ctx.stroke();
                    
                    ctx.beginPath();
                    ctx.moveTo(midX, midY);
                    ctx.lineTo(
                        midX + Math.cos(branchAngle2) * (size * 0.3),
                        midY + Math.sin(branchAngle2) * (size * 0.3)
                    );
                    ctx.stroke();
                }
                
                ctx.beginPath();
                ctx.arc(cx, cy, size * 0.1, 0, Math.PI * 2);
                ctx.stroke();
            };
            
            drawSnowflake(w/2, h/2 - 20, 100);
            
            const otherFlakes = [
                [w/2 - 150, h/2 - 100, 40],
                [w/2 + 150, h/2 - 80, 50],
                [w/2 - 120, h/2 + 80, 35],
                [w/2 + 130, h/2 + 60, 45],
                [w/2 - 180, h/2, 30],
                [w/2 + 180, h/2 + 30, 38]
            ];
            
            otherFlakes.forEach(([x, y, size]) => {
                drawSnowflake(x, y, size);
            });
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 30, h/2 - 35, 10, 12, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 30, h/2 - 35, 10, 12, 0, 0, Math.PI * 2);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.fillStyle = '#333';
            ctx.arc(w/2 - 30, h/2 - 35, 5, 0, Math.PI * 2);
            ctx.fill();
            ctx.beginPath();
            ctx.arc(w/2 + 30, h/2 - 35, 5, 0, Math.PI * 2);
            ctx.fill();
            
            ctx.beginPath();
            ctx.moveTo(w/2, h/2 - 5);
            ctx.lineTo(w/2, h/2 + 15);
            ctx.stroke();
            ctx.beginPath();
            ctx.moveTo(w/2 - 15, h/2 + 5);
            ctx.lineTo(w/2 + 15, h/2 + 5);
            ctx.stroke();
            
            ctx.beginPath();
            ctx.ellipse(w/2 - 60, h/2 - 10, 20, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
            ctx.beginPath();
            ctx.ellipse(w/2 + 60, h/2 - 10, 20, 15, 0, 0, Math.PI * 2);
            ctx.stroke();
        }
    }
};
