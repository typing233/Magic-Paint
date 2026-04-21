class ColoringBook {
    constructor() {
        this.canvasWidth = 600;
        this.canvasHeight = 500;
        this.brushSize = 20;
        this.currentColor = '#FF6B6B';
        this.isDrawing = false;
        this.isEraser = false;
        this.lastPosition = null;
        
        this.colorLayer = document.getElementById('colorLayer');
        this.lineArtLayer = document.getElementById('lineArtLayer');
        this.colorCtx = this.colorLayer.getContext('2d');
        this.lineArtCtx = this.lineArtLayer.getContext('2d');
        
        this.maskCanvas = document.createElement('canvas');
        this.maskCanvas.width = this.canvasWidth;
        this.maskCanvas.height = this.canvasHeight;
        this.maskCtx = this.maskCanvas.getContext('2d');
        
        this.fillableAreas = new Set();
        
        this.init();
    }
    
    init() {
        this.setupCanvas();
        this.drawLineArt();
        this.setupEventListeners();
        this.calculateFillableAreas();
    }
    
    setupCanvas() {
        this.colorLayer.width = this.canvasWidth;
        this.colorLayer.height = this.canvasHeight;
        this.lineArtLayer.width = this.canvasWidth;
        this.lineArtLayer.height = this.canvasHeight;
        
        const container = document.getElementById('canvasContainer');
        container.style.width = this.canvasWidth + 30 + 'px';
        container.style.height = this.canvasHeight + 30 + 'px';
    }
    
    drawLineArt() {
        const ctx = this.lineArtCtx;
        const maskCtx = this.maskCtx;
        const lineWidth = 6;
        
        function drawPath(context, commands) {
            context.beginPath();
            commands.forEach(cmd => {
                if (cmd.type === 'move') {
                    context.moveTo(cmd.x, cmd.y);
                } else if (cmd.type === 'line') {
                    context.lineTo(cmd.x, cmd.y);
                } else if (cmd.type === 'arc') {
                    context.arc(cmd.x, cmd.y, cmd.r, cmd.start, cmd.end);
                } else if (cmd.type === 'bezier') {
                    context.bezierCurveTo(cmd.cp1x, cmd.cp1y, cmd.cp2x, cmd.cp2y, cmd.x, cmd.y);
                }
            });
            context.stroke();
        }
        
        [ctx, maskCtx].forEach(context => {
            context.strokeStyle = '#000000';
            context.lineWidth = lineWidth;
            context.lineCap = 'round';
            context.lineJoin = 'round';
            
            context.beginPath();
            context.arc(300, 260, 140, 0, Math.PI * 2);
            context.fillStyle = '#000000';
            context.stroke();
            
            drawPath(context, [
                { type: 'move', x: 180, y: 140 },
                { type: 'line', x: 140, y: 50 },
                { type: 'line', x: 240, y: 110 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 420, y: 140 },
                { type: 'line', x: 460, y: 50 },
                { type: 'line', x: 360, y: 110 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 160, y: 130 },
                { type: 'line', x: 145, y: 70 },
                { type: 'line', x: 220, y: 115 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 440, y: 130 },
                { type: 'line', x: 455, y: 70 },
                { type: 'line', x: 380, y: 115 },
            ]);
            
            context.beginPath();
            context.arc(240, 240, 20, 0, Math.PI * 2);
            context.fillStyle = '#000000';
            context.fill();
            context.stroke();
            
            context.beginPath();
            context.arc(360, 240, 20, 0, Math.PI * 2);
            context.fillStyle = '#000000';
            context.fill();
            context.stroke();
            
            context.beginPath();
            context.arc(248, 233, 7, 0, Math.PI * 2);
            context.fillStyle = '#FFFFFF';
            context.fill();
            
            context.beginPath();
            context.arc(368, 233, 7, 0, Math.PI * 2);
            context.fillStyle = '#FFFFFF';
            context.fill();
            
            context.beginPath();
            context.moveTo(300, 270);
            context.lineTo(290, 290);
            context.lineTo(310, 290);
            context.closePath();
            context.fillStyle = '#FF69B4';
            context.fill();
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.stroke();
            
            context.lineWidth = 4;
            drawPath(context, [
                { type: 'move', x: 300, y: 290 },
                { type: 'line', x: 300, y: 310 },
                { type: 'line', x: 285, y: 330 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 300, y: 310 },
                { type: 'line', x: 315, y: 330 },
            ]);
            
            context.lineWidth = 3;
            drawPath(context, [
                { type: 'move', x: 140, y: 280 },
                { type: 'bezier', cp1x: 180, cp1y: 260, cp2x: 210, cp2y: 270, x: 230, y: 290 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 140, y: 300 },
                { type: 'bezier', cp1x: 180, cp1y: 300, cp2x: 210, cp2y: 305, x: 230, y: 310 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 140, y: 320 },
                { type: 'bezier', cp1x: 180, cp1y: 340, cp2x: 210, cp2y: 335, x: 230, y: 325 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 460, y: 280 },
                { type: 'bezier', cp1x: 420, cp1y: 260, cp2x: 390, cp2y: 270, x: 370, y: 290 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 460, y: 300 },
                { type: 'bezier', cp1x: 420, cp1y: 300, cp2x: 390, cp2y: 305, x: 370, y: 310 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 460, y: 320 },
                { type: 'bezier', cp1x: 420, cp1y: 340, cp2x: 390, cp2y: 335, x: 370, y: 325 },
            ]);
            
            context.lineWidth = 4;
            context.beginPath();
            context.arc(300, 360, 20, 0, Math.PI);
            context.stroke();
            
            context.fillStyle = '#FFFFFF';
            context.beginPath();
            context.moveTo(290, 355);
            context.lineTo(285, 375);
            context.lineTo(295, 365);
            context.closePath();
            context.fill();
            context.strokeStyle = '#000000';
            context.lineWidth = 2;
            context.stroke();
            
            context.beginPath();
            context.moveTo(310, 355);
            context.lineTo(315, 375);
            context.lineTo(305, 365);
            context.closePath();
            context.fill();
            context.stroke();
            
            context.lineWidth = lineWidth;
            context.beginPath();
            context.arc(300, 200, 100, 0.2 * Math.PI, 0.8 * Math.PI);
            context.stroke();
            
            drawPath(context, [
                { type: 'move', x: 210, y: 180 },
                { type: 'arc', x: 200, y: 200, r: 10, start: 0, end: Math.PI * 2 },
            ]);
            
            drawPath(context, [
                { type: 'move', x: 390, y: 180 },
                { type: 'arc', x: 400, y: 200, r: 10, start: 0, end: Math.PI * 2 },
            ]);
        });
    }
    
    calculateFillableAreas() {
        const imageData = this.maskCtx.getImageData(0, 0, this.canvasWidth, this.canvasHeight);
        const data = imageData.data;
        const width = this.canvasWidth;
        const height = this.canvasHeight;
        
        const visited = new Uint8Array(width * height);
        const boundaries = new Set();
        
        for (let i = 0; i < data.length; i += 4) {
            const r = data[i];
            const g = data[i + 1];
            const b = data[i + 2];
            const a = data[i + 3];
            
            if (a > 200 && (r < 50 && g < 50 && b < 50)) {
                const index = i / 4;
                boundaries.add(index);
                visited[index] = 1;
            }
        }
        
        const boundarySet = new Set();
        const expandSize = 3;
        
        boundaries.forEach(index => {
            const x = index % width;
            const y = Math.floor(index / width);
            
            for (let dx = -expandSize; dx <= expandSize; dx++) {
                for (let dy = -expandSize; dy <= expandSize; dy++) {
                    const nx = x + dx;
                    const ny = y + dy;
                    
                    if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                        boundarySet.add(ny * width + nx);
                    }
                }
            }
        });
        
        boundarySet.forEach(idx => visited[idx] = 1);
        
        this.floodFill(visited, 0, 0, width, height, boundarySet);
        
        for (let i = 0; i < width * height; i++) {
            if (visited[i] === 0) {
                this.fillableAreas.add(i);
            }
        }
    }
    
    floodFill(visited, startX, startY, width, height, boundaries) {
        const stack = [[startX, startY]];
        visited[startY * width + startX] = 1;
        
        while (stack.length > 0) {
            const [x, y] = stack.pop();
            
            const neighbors = [
                [x - 1, y], [x + 1, y],
                [x, y - 1], [x, y + 1]
            ];
            
            for (const [nx, ny] of neighbors) {
                if (nx >= 0 && nx < width && ny >= 0 && ny < height) {
                    const idx = ny * width + nx;
                    if (visited[idx] === 0 && !boundaries.has(idx)) {
                        visited[idx] = 1;
                        stack.push([nx, ny]);
                    }
                }
            }
        }
    }
    
    isPointFillable(x, y) {
        const roundedX = Math.round(x);
        const roundedY = Math.round(y);
        
        if (roundedX < 0 || roundedX >= this.canvasWidth || 
            roundedY < 0 || roundedY >= this.canvasHeight) {
            return false;
        }
        
        const index = roundedY * this.canvasWidth + roundedX;
        return this.fillableAreas.has(index);
    }
    
    getCanvasPosition(e) {
        const rect = this.colorLayer.getBoundingClientRect();
        const scaleX = this.canvasWidth / rect.width;
        const scaleY = this.canvasHeight / rect.height;
        
        if (e.touches && e.touches.length > 0) {
            return {
                x: (e.touches[0].clientX - rect.left) * scaleX,
                y: (e.touches[0].clientY - rect.top) * scaleY
            };
        }
        
        return {
            x: (e.clientX - rect.left) * scaleX,
            y: (e.clientY - rect.top) * scaleY
        };
    }
    
    drawAtPosition(x, y) {
        const ctx = this.colorCtx;
        
        if (this.isEraser) {
            const radius = this.brushSize / 2;
            for (let dx = -radius; dx <= radius; dx++) {
                for (let dy = -radius; dy <= radius; dy++) {
                    if (dx * dx + dy * dy <= radius * radius) {
                        const px = x + dx;
                        const py = y + dy;
                        
                        if (this.isPointFillable(px, py)) {
                            ctx.clearRect(px - 1, py - 1, 3, 3);
                        }
                    }
                }
            }
        } else {
            ctx.beginPath();
            ctx.fillStyle = this.currentColor;
            
            for (let angle = 0; angle < Math.PI * 2; angle += 0.1) {
                const px = x + Math.cos(angle) * (this.brushSize / 2);
                const py = y + Math.sin(angle) * (this.brushSize / 2);
                
                if (this.isPointFillable(px, py)) {
                    ctx.beginPath();
                    ctx.arc(px, py, 2, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
            
            for (let i = 0; i < 20; i++) {
                const angle = Math.random() * Math.PI * 2;
                const dist = Math.random() * (this.brushSize / 2);
                const px = x + Math.cos(angle) * dist;
                const py = y + Math.sin(angle) * dist;
                
                if (this.isPointFillable(px, py)) {
                    ctx.beginPath();
                    ctx.arc(px, py, 1.5, 0, Math.PI * 2);
                    ctx.fill();
                }
            }
        }
    }
    
    drawLine(fromX, fromY, toX, toY) {
        const distance = Math.sqrt(
            Math.pow(toX - fromX, 2) + 
            Math.pow(toY - fromY, 2)
        );
        
        const steps = Math.max(1, Math.floor(distance / 2));
        
        for (let i = 0; i <= steps; i++) {
            const t = i / steps;
            const x = fromX + (toX - fromX) * t;
            const y = fromY + (toY - fromY) * t;
            
            this.drawAtPosition(x, y);
        }
    }
    
    setupEventListeners() {
        const canvas = this.colorLayer;
        
        canvas.addEventListener('mousedown', (e) => {
            e.preventDefault();
            this.isDrawing = true;
            this.lastPosition = this.getCanvasPosition(e);
            this.drawAtPosition(this.lastPosition.x, this.lastPosition.y);
        });
        
        canvas.addEventListener('mousemove', (e) => {
            if (!this.isDrawing) return;
            
            const currentPosition = this.getCanvasPosition(e);
            
            if (this.lastPosition) {
                this.drawLine(
                    this.lastPosition.x, this.lastPosition.y,
                    currentPosition.x, currentPosition.y
                );
            }
            
            this.lastPosition = currentPosition;
        });
        
        canvas.addEventListener('mouseup', () => {
            this.isDrawing = false;
            this.lastPosition = null;
        });
        
        canvas.addEventListener('mouseleave', () => {
            this.isDrawing = false;
            this.lastPosition = null;
        });
        
        canvas.addEventListener('touchstart', (e) => {
            e.preventDefault();
            this.isDrawing = true;
            this.lastPosition = this.getCanvasPosition(e);
            this.drawAtPosition(this.lastPosition.x, this.lastPosition.y);
        });
        
        canvas.addEventListener('touchmove', (e) => {
            e.preventDefault();
            if (!this.isDrawing) return;
            
            const currentPosition = this.getCanvasPosition(e);
            
            if (this.lastPosition) {
                this.drawLine(
                    this.lastPosition.x, this.lastPosition.y,
                    currentPosition.x, currentPosition.y
                );
            }
            
            this.lastPosition = currentPosition;
        });
        
        canvas.addEventListener('touchend', () => {
            this.isDrawing = false;
            this.lastPosition = null;
        });
        
        const colorOptions = document.querySelectorAll('.color-option');
        colorOptions.forEach(option => {
            option.addEventListener('click', () => {
                colorOptions.forEach(o => o.classList.remove('selected'));
                option.classList.add('selected');
                
                const color = option.dataset.color;
                if (color === 'eraser') {
                    this.isEraser = true;
                } else {
                    this.isEraser = false;
                    this.currentColor = color;
                }
            });
        });
        
        document.getElementById('clearBtn').addEventListener('click', () => {
            if (confirm('确定要清空所有颜色吗？')) {
                this.colorCtx.clearRect(0, 0, this.canvasWidth, this.canvasHeight);
            }
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ColoringBook();
});
