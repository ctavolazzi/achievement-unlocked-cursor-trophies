/**
 * Achievement API - Dumbfuck Easy CRUD
 * 
 * Achievements.define({ id, title, score, desc, icon })  // Create definition
 * Achievements.unlock('id')                               // Mark unlocked
 * Achievements.lock('id')                                 // Undo unlock
 * Achievements.get('id')                                  // Get one
 * Achievements.all()                                      // Get all
 * Achievements.unlocked()                                 // Get unlocked
 * Achievements.locked()                                   // Get locked
 * Achievements.score()                                    // Total gamerscore
 * Achievements.remove('id')                               // Delete
 * Achievements.reset()                                    // Clear all progress
 * Achievements.export()                                   // JSON export
 * Achievements.import(json)                               // JSON import
 */

const Achievements = {
    STORAGE_KEY: 'achievements-data',
    
    // === INTERNAL ===
    
    _load() {
        try {
            return JSON.parse(localStorage.getItem(this.STORAGE_KEY)) || this._default();
        } catch { return this._default(); }
    },
    
    _save(data) {
        localStorage.setItem(this.STORAGE_KEY, JSON.stringify(data));
    },
    
    _default() {
        return {
            definitions: {},  // All possible achievements
            unlocked: {},     // id -> { unlockedAt, ... }
            stats: { totalScore: 0, totalUnlocks: 0 }
        };
    },
    
    // === CREATE ===
    
    define(achievement) {
        const { id, title, score = 50, desc = '', icon = 'trophy', secret = false } = achievement;
        if (!id || !title) throw new Error('Achievement needs id and title');
        
        const data = this._load();
        data.definitions[id] = { id, title, score, desc, icon, secret, createdAt: Date.now() };
        this._save(data);
        return data.definitions[id];
    },
    
    // Define multiple at once
    defineMany(achievements) {
        return achievements.map(a => this.define(a));
    },
    
    // === READ ===
    
    get(id) {
        const data = this._load();
        const def = data.definitions[id];
        if (!def) return null;
        
        const unlock = data.unlocked[id];
        return { ...def, unlocked: !!unlock, unlockedAt: unlock?.unlockedAt || null };
    },
    
    all() {
        const data = this._load();
        return Object.keys(data.definitions).map(id => this.get(id));
    },
    
    unlocked() {
        return this.all().filter(a => a.unlocked);
    },
    
    locked() {
        return this.all().filter(a => !a.unlocked);
    },
    
    score() {
        return this.unlocked().reduce((sum, a) => sum + a.score, 0);
    },
    
    stats() {
        return {
            total: this.all().length,
            unlocked: this.unlocked().length,
            locked: this.locked().length,
            score: this.score(),
            maxScore: this.all().reduce((sum, a) => sum + a.score, 0)
        };
    },
    
    // === UPDATE ===
    
    unlock(id, silent = false) {
        const data = this._load();
        const def = data.definitions[id];
        
        if (!def) {
            console.warn(`Achievement "${id}" not defined`);
            return false;
        }
        
        if (data.unlocked[id]) {
            console.log(`Achievement "${id}" already unlocked`);
            return false;
        }
        
        data.unlocked[id] = { unlockedAt: Date.now() };
        data.stats.totalUnlocks++;
        data.stats.totalScore += def.score;
        this._save(data);
        
        // Trigger notification unless silent
        if (!silent && typeof Achievement !== 'undefined') {
            Achievement.unlock(def.title, def.score, def.desc);
        }
        
        // Dispatch event
        window.dispatchEvent(new CustomEvent('achievement-change', { detail: { id, action: 'unlock' } }));
        
        return true;
    },
    
    lock(id) {
        const data = this._load();
        const def = data.definitions[id];
        
        if (!data.unlocked[id]) return false;
        
        delete data.unlocked[id];
        data.stats.totalUnlocks--;
        data.stats.totalScore -= def.score;
        this._save(data);
        
        window.dispatchEvent(new CustomEvent('achievement-change', { detail: { id, action: 'lock' } }));
        return true;
    },
    
    // === DELETE ===
    
    remove(id) {
        const data = this._load();
        delete data.definitions[id];
        delete data.unlocked[id];
        this._save(data);
        return true;
    },
    
    reset() {
        this._save(this._default());
        window.dispatchEvent(new CustomEvent('achievement-change', { detail: { action: 'reset' } }));
    },
    
    // === IMPORT/EXPORT ===
    
    export() {
        return JSON.stringify(this._load(), null, 2);
    },
    
    import(json) {
        try {
            const data = typeof json === 'string' ? JSON.parse(json) : json;
            this._save(data);
            window.dispatchEvent(new CustomEvent('achievement-change', { detail: { action: 'import' } }));
            return true;
        } catch (e) {
            console.error('Import failed:', e);
            return false;
        }
    },
    
    // === PRESETS ===
    
    loadDefaults() {
        this.defineMany([
            { id: 'ship-it', title: 'Ship It!', score: 50, desc: 'Deployed to production', icon: 'rocket' },
            { id: 'bug-squasher', title: 'Bug Squasher', score: 25, desc: 'Fixed a nasty bug', icon: 'bug' },
            { id: 'all-green', title: 'All Green', score: 25, desc: 'All tests passing', icon: 'check' },
            { id: 'hello-world', title: 'Hello World', score: 15, desc: 'Made your first commit', icon: 'code' },
            { id: 'merge-master', title: 'Merge Master', score: 25, desc: 'PR merged to main', icon: 'merge' },
            { id: 'documented', title: 'Future You Thanks You', score: 20, desc: 'Wrote documentation', icon: 'book' },
            { id: 'night-owl', title: 'Night Owl', score: 10, desc: 'Coding past midnight', icon: 'moon' },
            { id: 'early-bird', title: 'Early Bird', score: 10, desc: 'Coding before 7am', icon: 'sun' },
            { id: 'weekend-warrior', title: 'Weekend Warrior', score: 15, desc: 'Coding on the weekend', icon: 'calendar' },
            { id: 'first-sale', title: 'First Sale!', score: 100, desc: 'Someone paid real money', icon: 'dollar' },
            { id: 'clean-code', title: 'Clean Code', score: 30, desc: 'Refactored legacy code', icon: 'sparkle' },
            { id: 'streak-7', title: '7 Day Streak', score: 35, desc: '7 consecutive days of commits', icon: 'fire' },
            { id: 'streak-30', title: '30 Day Streak', score: 150, desc: '30 consecutive days of commits', icon: 'fire' },
            { id: 'first-pr', title: 'Contributor', score: 25, desc: 'Opened your first PR', icon: 'git' },
            { id: 'open-source', title: 'Open Sourcerer', score: 50, desc: 'Contributed to open source', icon: 'globe' },
            { id: 'century-club', title: 'Century Club', score: 100, desc: 'Reached 100G total', icon: 'trophy', secret: true },
            { id: 'completionist', title: 'Completionist', score: 500, desc: 'Unlocked all achievements', icon: 'crown', secret: true },
        ]);
        return this.all();
    }
};

// Auto-expose
if (typeof window !== 'undefined') {
    window.Achievements = Achievements;
    
    // Load defaults if empty
    if (Achievements.all().length === 0) {
        Achievements.loadDefaults();
    }
}

if (typeof module !== 'undefined') module.exports = Achievements;
