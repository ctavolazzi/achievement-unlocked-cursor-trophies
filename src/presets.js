/**
 * Achievement Presets - Developer-focused achievements
 * Call these directly or use them as templates
 */

const AchievementPresets = {
    // === Development Milestones ===
    
    shipIt() {
        Achievement.unlock("Ship It!", 50, "Deployed to production");
    },
    
    bugSquashed() {
        Achievement.unlock("Bug Squasher", 25, "Fixed a nasty bug");
    },
    
    allGreen() {
        Achievement.unlock("All Green", 25, "All tests passing");
    },
    
    firstCommit() {
        Achievement.unlock("Hello World", 15, "Made your first commit");
    },
    
    refactored() {
        Achievement.unlock("Clean Code", 30, "Refactored legacy code");
    },
    
    documented() {
        Achievement.unlock("Future You Thanks You", 20, "Wrote documentation");
    },
    
    codeReview() {
        Achievement.unlock("Fresh Eyes", 15, "Completed a code review");
    },
    
    merged() {
        Achievement.unlock("Merge Master", 25, "PR merged to main");
    },
    
    // === Time-based ===
    
    nightOwl() {
        const hour = new Date().getHours();
        if (hour >= 0 && hour < 5) {
            Achievement.unlock("Night Owl", 10, "Coding past midnight");
        } else {
            console.log("It's not late enough for Night Owl (midnight-5am)");
        }
    },
    
    earlyBird() {
        const hour = new Date().getHours();
        if (hour >= 5 && hour < 7) {
            Achievement.unlock("Early Bird", 10, "Coding before 7am");
        } else {
            console.log("It's not early enough for Early Bird (5am-7am)");
        }
    },
    
    weekendWarrior() {
        const day = new Date().getDay();
        if (day === 0 || day === 6) {
            Achievement.unlock("Weekend Warrior", 15, "Coding on the weekend");
        } else {
            console.log("It's not the weekend!");
        }
    },
    
    // === Streaks ===
    
    streak(days) {
        const score = Math.min(days * 5, 100);
        Achievement.unlock(`${days} Day Streak`, score, `${days} consecutive days of commits`);
    },
    
    // === Fun / Celebration ===
    
    firstSale() {
        Achievement.unlock("First Sale!", 100, "Someone paid real money");
    },
    
    viralPost() {
        Achievement.unlock("Going Viral", 75, "Your post blew up");
    },
    
    tenThousandUsers() {
        Achievement.unlock("10K Club", 150, "Reached 10,000 users");
    },
    
    oneYearAnniversary() {
        Achievement.unlock("Veteran", 100, "One year on the project");
    },
    
    // === Learning ===
    
    newLanguage() {
        Achievement.unlock("Polyglot", 40, "Learned a new programming language");
    },
    
    tutorialComplete() {
        Achievement.unlock("Student", 20, "Completed a tutorial");
    },
    
    certification() {
        Achievement.unlock("Certified", 75, "Earned a certification");
    },
    
    // === Collaboration ===
    
    firstPR() {
        Achievement.unlock("Contributor", 25, "Opened your first PR");
    },
    
    openSourceContrib() {
        Achievement.unlock("Open Sourcerer", 50, "Contributed to open source");
    },
    
    helpedSomeone() {
        Achievement.unlock("Good Samaritan", 15, "Helped another developer");
    },
    
    pairProgramming() {
        Achievement.unlock("Dynamic Duo", 20, "Pair programming session complete");
    },
    
    // === Custom ===
    
    custom(title, gamerscore = 50, description = "") {
        Achievement.unlock(title, gamerscore, description);
    },
    
    // === Random for fun ===
    
    random() {
        const achievements = [
            ["Lucky Roll", 25, "Random achievement unlocked!"],
            ["Mystery Box", 30, "What's inside?"],
            ["Surprise!", 20, "Unexpected achievement"],
            ["Plot Twist", 35, "Didn't see that coming"],
            ["Easter Egg", 50, "You found a secret!"],
        ];
        const pick = achievements[Math.floor(Math.random() * achievements.length)];
        Achievement.unlock(...pick);
    },
    
    // List all available presets
    list() {
        const presets = [
            "shipIt()", "bugSquashed()", "allGreen()", "firstCommit()",
            "refactored()", "documented()", "codeReview()", "merged()",
            "nightOwl()", "earlyBird()", "weekendWarrior()", "streak(days)",
            "firstSale()", "viralPost()", "tenThousandUsers()", "oneYearAnniversary()",
            "newLanguage()", "tutorialComplete()", "certification()",
            "firstPR()", "openSourceContrib()", "helpedSomeone()", "pairProgramming()",
            "custom(title, score, desc)", "random()"
        ];
        console.log("%c🏆 Available Achievement Presets:", "color: #107c10; font-weight: bold;");
        presets.forEach(p => console.log(`  AchievementPresets.${p}`));
        return presets;
    }
};

// Expose globally
if (typeof window !== 'undefined') {
    window.AchievementPresets = AchievementPresets;
}

// ES module export
if (typeof module !== 'undefined' && module.exports) {
    module.exports = AchievementPresets;
}
