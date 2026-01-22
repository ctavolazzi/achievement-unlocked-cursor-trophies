/**
 * Achievement Tracker - Persistence & Gamerscore
 * Stores unlocked achievements in localStorage
 */

const AchievementTracker = {
    STORAGE_KEY: 'achievement-unlocked-data',
    
    // Get all stored data
    getData() {
        try {
            const data = localStorage.getItem(this.STORAGE_KEY);
            return data ? JSON.parse(data) : this.getDefaultData();
        } catch (e) {
            return this.getDefaultData();
        }
    },
    
    // Default data structure
    getDefaultData() {
        return {
            totalGamerscore: 0,
            unlockedAchievements: [],
            stats: {
                firstUnlock: null,
                lastUnlock: null,
                totalUnlocks: 0
            }
        };
    },
    
    // Save data
    saveData(data) {
        try {
            localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
        } catch (e) {
            console.warn('Could not save achievement data:', e);
        }
    },
    
    // Record an unlocked achievement
    record(achievement) {
        const data = this.getData();
        const { title, gamerscore, description, timestamp } = achievement;
        
        // Check if already unlocked
        const existing = data.unlockedAchievements.find(a => a.title === title);
        if (existing) {
            console.log(`Achievement "${title}" already unlocked!`);
            return false;
        }
        
        // Add to list
        data.unlockedAchievements.push({
            title,
            gamerscore,
            description,
            unlockedAt: timestamp || Date.now()
        });
        
        // Update totals
        data.totalGamerscore += gamerscore;
        data.stats.totalUnlocks++;
        data.stats.lastUnlock = Date.now();
        if (!data.stats.firstUnlock) {
            data.stats.firstUnlock = Date.now();
        }
        
        this.saveData(data);
        
        // Check for meta-achievements
        this.checkMetaAchievements(data);
        
        return true;
    },
    
    // Check for meta-achievements (achievements about achievements)
    checkMetaAchievements(data) {
        // First achievement
        if (data.stats.totalUnlocks === 1 && !this.isUnlocked('First Blood')) {
            setTimeout(() => {
                Achievement.unlock('First Blood', 10, 'Unlocked your first achievement');
            }, 500);
        }
        
        // Century Club - 100G total
        if (data.totalGamerscore >= 100 && !this.isUnlocked('Century Club')) {
            setTimeout(() => {
                Achievement.unlock('Century Club', 100, 'Reached 100G total');
            }, 500);
        }
        
        // High Roller - 500G total
        if (data.totalGamerscore >= 500 && !this.isUnlocked('High Roller')) {
            setTimeout(() => {
                Achievement.unlock('High Roller', 150, 'Reached 500G total');
            }, 500);
        }
    },
    
    // Check if achievement is unlocked
    isUnlocked(title) {
        const data = this.getData();
        return data.unlockedAchievements.some(a => a.title === title);
    },
    
    // Get total gamerscore
    getGamerscore() {
        return this.getData().totalGamerscore;
    },
    
    // Get all unlocked achievements
    getUnlocked() {
        return this.getData().unlockedAchievements;
    },
    
    // Get stats
    getStats() {
        return this.getData().stats;
    },
    
    // Reset all progress (use with caution!)
    reset() {
        this.saveData(this.getDefaultData());
        console.log('Achievement progress reset!');
    },
    
    // Initialize - listen for unlock events
    init() {
        window.addEventListener('achievement-unlocked', (e) => {
            this.record(e.detail);
        });
        console.log('%c🏆 Achievement Tracker initialized!', 'color: #107c10; font-weight: bold;');
        console.log(`Total Gamerscore: ${this.getGamerscore()}G`);
    }
};

// Auto-initialize if in browser
if (typeof window !== 'undefined') {
    window.AchievementTracker = AchievementTracker;
    
    // Auto-init when DOM is ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', () => AchievementTracker.init());
    } else {
        AchievementTracker.init();
    }
}

// ES module export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AchievementTracker;
}
