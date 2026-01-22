# Achievement Unlocked

Pop an Xbox-style achievement notification to celebrate milestones!

## Instructions

1. Use Playwright browser tools to navigate to a page with the achievement system loaded
2. Execute `Achievement.unlock()` with the desired title, score, and description
3. The notification will slide in, play a sound, and auto-dismiss

## Usage Examples

```javascript
// Basic
Achievement.unlock("Ship It!", 50, "Deployed to production")

// Quick presets
AchievementPresets.shipIt()
AchievementPresets.bugSquashed()
AchievementPresets.allGreen()
AchievementPresets.random()

// Custom
Achievement.unlock("{{title}}", {{score}}, "{{description}}")
```

## Default Behavior

If no parameters provided, use:
```javascript
Achievement.unlock("Nice Work!", 50, "Keep it up!")
```

## Quick Test

Navigate to the demo page and trigger an achievement:
```
1. browser_navigate to http://localhost:5050 (or wherever the demo is hosted)
2. browser_evaluate: Achievement.unlock("Test", 10, "It works!")
```
