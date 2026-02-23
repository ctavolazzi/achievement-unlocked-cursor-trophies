# Achievement Unlocked

Pop an Xbox-style achievement notification to celebrate milestones!

## Quick Usage (Recommended)

Navigate to the standalone achievement page with URL params:

```
browser_navigate to file:///Users/ctavolazzi/Code/achievement-unlocked-cursor-trophies/achievement.html?title=Ship%20It!&score=50&desc=Deployed%20to%20production
```

Or if serving locally:
```
browser_navigate to http://localhost:5051/achievement.html?title=Nice%20Work!&score=25&desc=You%20did%20it!
```

## Direct JS Usage

If the scripts are already loaded on the page, run:

```javascript
Achievement.unlock("Nice!", 50, "You did a thing")
```

Template:

```javascript
Achievement.unlock("{{title}}", {{score}}, "{{description}}")
```

## URL Parameters

| Param | Description | Default |
|-------|-------------|---------|
| title | Achievement name | "Achievement Unlocked" |
| score | Gamerscore value | 50 |
| desc | Description text | (none) |

## Examples

```
# Basic
?title=Ship%20It!&score=50

# With description
?title=Bug%20Squasher&score=25&desc=Fixed%20a%20nasty%20bug

# Celebration
?title=First%20Sale!&score=100&desc=Someone%20paid%20real%20money
```

## Alternative: Full Demo Page

For the interactive demo with tracking:
```
browser_navigate to http://localhost:5051/index.html
```

Then use JavaScript:
```javascript
Achievement.unlock("Title", 50, "Description")
AchievementPresets.shipIt()
AchievementPresets.random()
```
