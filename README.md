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

### Quick Notification

```javascript
Achievement.unlock("Ship It!", 50, "Deployed to production")
```

### Full CRUD API

```javascript
// CREATE - Define achievements
Achievements.define({ id: 'my-achievement', title: 'My Achievement', score: 50, desc: 'You did it!' })
Achievements.defineMany([...])    // Define multiple
Achievements.loadDefaults()       // Load preset achievements

// READ
Achievements.get('ship-it')       // Get one achievement
Achievements.all()                // Get all achievements
Achievements.unlocked()           // Get unlocked only
Achievements.locked()             // Get locked only
Achievements.score()              // Total gamerscore
Achievements.stats()              // { total, unlocked, locked, score, maxScore }

// UPDATE
Achievements.unlock('ship-it')    // Unlock (shows notification)
Achievements.unlock('id', true)   // Unlock silently (no popup)
Achievements.lock('ship-it')      // Re-lock an achievement

// DELETE
Achievements.remove('custom-id')  // Remove an achievement
Achievements.reset()              // Clear all progress

// IMPORT/EXPORT
Achievements.export()             // Get JSON string
Achievements.import(json)         // Load from JSON
```

### Achievement Definition

```javascript
Achievements.define({
    id: 'unique-id',           // Required: unique identifier
    title: 'Achievement Name', // Required: display name
    score: 50,                 // Gamerscore value (default: 50)
    desc: 'Description',       // Description text
    icon: 'rocket',            // Icon name (trophy, rocket, bug, check, etc.)
    secret: false              // Hidden until unlocked?
})
```

### `AchievementPresets`

Pre-defined developer achievements.

```javascript
AchievementPresets.shipIt()         // 50G - Deployed to production
AchievementPresets.bugSquashed()    // 25G - Fixed a nasty bug
AchievementPresets.allGreen()       // 25G - All tests passing
AchievementPresets.firstCommit()    // 15G - Made your first commit
AchievementPresets.firstBlood()     // 10G - First achievement unlocked
AchievementPresets.merged()         // 25G - PR merged to main
AchievementPresets.documented()     // 20G - Wrote documentation
AchievementPresets.nightOwl()       // 10G - Coding past midnight
AchievementPresets.earlyBird()      // 10G - Coding before 7am
AchievementPresets.streakMaster(7)  // 5G per day - 7 day streak
AchievementPresets.centuryClub()    // 100G - Reach 100G total
AchievementPresets.completionist()  // 200G - Unlock all achievements
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

## Demo Pages

### Gallery (`gallery.html`)
Full achievement gallery with:
- All achievements (locked/unlocked)
- Progress bar and stats
- Filter by status
- Click to unlock/lock
- Export/Import

### Playground (`index.html`)
Quick testing with:
- Custom achievement creator
- Preset buttons
- Unlock history

### Single Achievement (`achievement.html`)
URL-param based notification:
```
achievement.html?title=Ship%20It!&score=50&desc=Deployed
```

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
