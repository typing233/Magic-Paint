const GalleryManager = {
    currentCategory: 'all',
    gridElement: null,

    init() {
        this.gridElement = document.getElementById('galleryGrid');
        this.setupEventListeners();
        this.render();
    },

    setupEventListeners() {
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                this.setCategory(btn.dataset.category);
                SoundManager.playClickSound();
            });
        });
    },

    setCategory(category) {
        this.currentCategory = category;
        
        const categoryBtns = document.querySelectorAll('.category-btn');
        categoryBtns.forEach(btn => {
            btn.classList.toggle('active', btn.dataset.category === category);
        });
        
        this.render();
    },

    render() {
        if (!this.gridElement) return;
        
        this.gridElement.innerHTML = '';
        
        const items = this.getFilteredItems();
        
        items.forEach((key, index) => {
            const lineart = DEFAULT_LINEARTS[key];
            const item = this.createGalleryItem(key, lineart, index);
            this.gridElement.appendChild(item);
        });
    },

    getFilteredItems() {
        const allKeys = Object.keys(DEFAULT_LINEARTS);
        
        if (this.currentCategory === 'all') {
            return allKeys;
        }
        
        return allKeys.filter(key => {
            const lineart = DEFAULT_LINEARTS[key];
            return lineart.category === this.currentCategory;
        });
    },

    createGalleryItem(key, lineart, index) {
        const item = document.createElement('div');
        item.className = 'gallery-item';
        item.dataset.key = key;
        
        const canvas = document.createElement('canvas');
        canvas.width = 200;
        canvas.height = 200;
        
        const ctx = canvas.getContext('2d');
        ctx.fillStyle = '#FFFFFF';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        const scale = Math.min(canvas.width / 800, canvas.height / 600);
        ctx.save();
        ctx.scale(scale, scale);
        
        lineart.draw(ctx, 800, 600);
        ctx.restore();
        
        const info = document.createElement('div');
        info.className = 'gallery-item-info';
        info.innerHTML = `
            <h4>${lineart.name}</h4>
            <p>${this.getCategoryName(lineart.category)}</p>
        `;
        
        item.appendChild(canvas);
        item.appendChild(info);
        
        item.addEventListener('click', () => {
            this.selectItem(key);
        });
        
        item.style.animationDelay = `${index * 0.05}s`;
        
        return item;
    },

    getCategoryName(category) {
        const names = {
            'animals': '动物',
            'nature': '自然',
            'food': '食物',
            'festival': '节日',
            'solar': '节气'
        };
        return names[category] || category;
    },

    selectItem(key) {
        const lineart = DEFAULT_LINEARTS[key];
        if (!lineart) return;
        
        CanvasManager.loadGalleryItem(key);
        
        this.switchToPaintTab();
        
        const items = document.querySelectorAll('.gallery-item');
        items.forEach(item => {
            item.classList.toggle('selected', item.dataset.key === key);
        });
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

    getGalleryStats() {
        const allKeys = Object.keys(DEFAULT_LINEARTS);
        const stats = {
            total: allKeys.length,
            categories: {}
        };
        
        allKeys.forEach(key => {
            const lineart = DEFAULT_LINEARTS[key];
            if (!stats.categories[lineart.category]) {
                stats.categories[lineart.category] = 0;
            }
            stats.categories[lineart.category]++;
        });
        
        return stats;
    }
};
