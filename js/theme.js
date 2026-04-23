const ThemeManager = {
    currentTheme: 'spring',
    themeClassPrefix: '-theme',

    init() {
        const savedTheme = Utils.storage.get('magicPaintTheme', 'spring');
        this.setTheme(savedTheme);
        this.setupEventListeners();
    },

    setupEventListeners() {
        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.addEventListener('click', () => {
                this.setTheme(option.dataset.theme);
                SoundManager.playClickSound();
            });
        });
    },

    setTheme(themeName) {
        if (!CONFIG.THEMES.AVAILABLE.includes(themeName)) {
            console.warn(`Theme "${themeName}" not available`);
            return;
        }

        document.body.classList.remove(
            ...CONFIG.THEMES.AVAILABLE.map(t => t + this.themeClassPrefix)
        );

        document.body.classList.add(themeName + this.themeClassPrefix);

        this.currentTheme = themeName;

        const themeOptions = document.querySelectorAll('.theme-option');
        themeOptions.forEach(option => {
            option.classList.toggle('active', option.dataset.theme === themeName);
        });

        Utils.storage.set('magicPaintTheme', themeName);

        this.updateThemeUI(themeName);
    },

    updateThemeUI(themeName) {
        const root = document.documentElement;
        
        const themeColors = {
            'spring': {
                primary: '#FF6B6B',
                secondary: '#95E1D3',
                accent: '#FFD93D',
                bg: '#FFF5F5'
            },
            'summer': {
                primary: '#4ECDC4',
                secondary: '#45B7D1',
                accent: '#FFD93D',
                bg: '#E8F8F5'
            },
            'autumn': {
                primary: '#FF8C42',
                secondary: '#F9C74F',
                accent: '#F8961E',
                bg: '#FFF8E7'
            },
            'winter': {
                primary: '#74B9FF',
                secondary: '#A29BFE',
                accent: '#DFE6E9',
                bg: '#F8F9FA'
            },
            'spring-festival': {
                primary: '#D32F2F',
                secondary: '#FFD700',
                accent: '#FF5722',
                bg: '#FFF3E0'
            },
            'mid-autumn': {
                primary: '#FF9800',
                secondary: '#FFC107',
                accent: '#FFEB3B',
                bg: '#FFF8E1'
            }
        };

        const colors = themeColors[themeName] || themeColors['spring'];

        root.style.setProperty('--primary-color', colors.primary);
        root.style.setProperty('--secondary-color', colors.secondary);
        root.style.setProperty('--accent-color', colors.accent);
        root.style.setProperty('--bg-color', colors.bg);
    },

    getCurrentTheme() {
        return this.currentTheme;
    },

    getThemeInfo(themeName) {
        const themeInfo = {
            'spring': {
                name: '春天',
                description: '万物复苏，生机盎然',
                icon: '🌸'
            },
            'summer': {
                name: '夏天',
                description: '热情似火，活力四射',
                icon: '☀️'
            },
            'autumn': {
                name: '秋天',
                description: '硕果累累，金色满园',
                icon: '🍂'
            },
            'winter': {
                name: '冬天',
                description: '银装素裹，宁静纯洁',
                icon: '❄️'
            },
            'spring-festival': {
                name: '春节',
                description: '喜庆吉祥，欢度新春',
                icon: '🧧'
            },
            'mid-autumn': {
                name: '中秋',
                description: '花好月圆，阖家团圆',
                icon: '🥮'
            }
        };

        return themeInfo[themeName] || themeInfo['spring'];
    },

    isFestivalTheme(themeName) {
        const festivalThemes = ['spring-festival', 'mid-autumn'];
        return festivalThemes.includes(themeName);
    },

    getSeasonTheme(month = new Date().getMonth()) {
        if (month >= 2 && month <= 4) return 'spring';
        if (month >= 5 && month <= 7) return 'summer';
        if (month >= 8 && month <= 10) return 'autumn';
        return 'winter';
    },

    getFestivalTheme(date = new Date()) {
        const month = date.getMonth() + 1;
        const day = date.getDate();

        if (month === 1 || month === 2) {
            return 'spring-festival';
        }

        if (month === 9 || month === 10) {
            return 'mid-autumn';
        }

        return null;
    },

    suggestTheme() {
        const festivalTheme = this.getFestivalTheme();
        if (festivalTheme) {
            return festivalTheme;
        }
        return this.getSeasonTheme();
    },

    cycleTheme() {
        const currentIndex = CONFIG.THEMES.AVAILABLE.indexOf(this.currentTheme);
        const nextIndex = (currentIndex + 1) % CONFIG.THEMES.AVAILABLE.length;
        this.setTheme(CONFIG.THEMES.AVAILABLE[nextIndex]);
    }
};
