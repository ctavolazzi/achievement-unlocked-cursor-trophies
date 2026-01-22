# Achievement Unlocked - Cursor Trophies

Xbox 360-style achievement notifications for developers. Celebrate your coding milestones with satisfying popups!

![Demo](https://img.shields.io/badge/demo-live-brightgreen)
![License](https://img.shields.io/badge/license-MIT-blue)

## Features

- **Xbox 360-style notifications** - Slide-in animation with sound
- **Gamerscore tracking** - Persistent progress in localStorage
- **Developer presets** - Ship It!, Bug Squasher, All Green, and more
- **Cursor IDE integration** - Use as a Cursor command
- **Fully customizable** - Create your own achievements

## Quick Start

### Browser

```html
<script src="src/achievement.js"></script>
<script src="src/tracker.js"></script>
<script src="src/presets.js"></script>

<script>
  // Unlock an achievement
  Achievement.unlock("Ship It!", 50, "Deployed to production");
  
  // Or use presets
  AchievementPresets.shipIt();
  AchievementPresets.bugSquashed();
  AchievementPresets.random();
</script>
```

### Just the Notification (No Tracking)

```html
<script src="src/achievement.js"></script>
<script>
  Achievement.unlock("Hello World", 10, "Your first achievement!");
</script>
```

## API

### `Achievement.unlock(title, gamerscore, description)`

Shows an achievement notification.

| Parameter | Type | Default | Description |
|-----------|------|---------|-------------|
| title | string | "Achievement Unlocked" | Achievement name |
| gamerscore | number | 50 | Points value (displays as "50G") |
| description | string | "" | Optional description |

### `AchievementTracker`

Tracks unlocked achievements in localStorage.

```javascript
AchievementTracker.getGamerscore()  // Total score
AchievementTracker.getUnlocked()    // Array of unlocked achievements
AchievementTracker.isUnlocked(title) // Check if unlocked
AchievementTracker.reset()          // Clear all progress
```

### `AchievementPresets`

Pre-defined developer achievements.

```javascript
AchievementPresets.shipIt()         // 50G - Deployed to production
AchievementPresets.bugSquashed()    // 25G - Fixed a nasty bug
AchievementPresets.allGreen()       // 25G - All tests passing
AchievementPresets.firstCommit()    // 15G - Made your first commit
AchievementPresets.merged()         // 25G - PR merged to main
AchievementPresets.documented()     // 20G - Wrote documentation
AchievementPresets.nightOwl()       // 10G - Coding past midnight
AchievementPresets.firstSale()      // 100G - Someone paid real money
AchievementPresets.random()         // ???  - Random achievement!

AchievementPresets.list()           // Show all available presets
```

## Cursor IDE Integration

Copy `.cursor/commands/achievement-unlocked.md` to your project's `.cursor/commands/` folder.

Then use Playwright to trigger achievements:

```javascript
// In Cursor with browser tools
Achievement.unlock("Code Review Complete", 25, "Reviewed 5 PRs today");
```

## Demo

Open `index.html` in a browser to try the interactive demo:
- Create custom achievements
- Try preset achievements
- View your unlocked achievements and total Gamerscore

## File Structure

```
achievement-unlocked-cursor-trophies/
├── index.html          # Interactive demo
├── src/
│   ├── achievement.js  # Core notification
│   ├── tracker.js      # Persistence layer
│   └── presets.js      # Developer presets
├── .cursor/
│   └── commands/
│       └── achievement-unlocked.md
└── README.md
```

## Customization

### Change the Sound

Replace the base64 audio in `achievement.js`:

```javascript
Achievement.soundUrl = 'path/to/your/sound.mp3';
```

### Disable Sound

```javascript
Achievement.soundUrl = null;
```

### Custom Styling

The styles are injected as `#xbox-achievement-styles`. Override them in your CSS:

```css
#xbox-achievement {
  background: linear-gradient(180deg, #1a1a1a 0%, #0a0a0a 100%);
}

.achievement-icon {
  background: linear-gradient(135deg, #e91e63 0%, #9c27b0 100%);
}
```

## License

MIT - Do whatever you want with it!

## Credits

Inspired by Xbox 360 achievements and the joy of small celebrations.

Made by [@ctavolazzi](https://github.com/ctavolazzi)
