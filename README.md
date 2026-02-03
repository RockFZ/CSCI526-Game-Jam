# CSCI526-Game-Jam

## Gravity Flip - A Platformer with a Twist

### 🎮 Play the Game
**[Play Now on GitHub Pages](https://rockfz.github.io/CSCI526-Game-Jam/)**

### 📋 Game Overview
**Genre:** Platformer  
**Twist:** Gravity Manipulation

Gravity Flip is a platformer where players can flip gravity on demand, allowing them to walk on both the floor and ceiling. This mechanic creates unique spatial puzzles and challenges traditional platformer navigation.

### 🎯 Game Mechanic
The core mechanic is **gravity flipping**. Players can press the spacebar to instantly reverse gravity, making the player fall upward instead of downward. This requires:
- Spatial awareness to navigate platforms on both the ceiling and floor
- Timing to flip gravity at the right moment
- Strategic thinking to collect all stars in each level

### 🕹️ Controls
- **Arrow Keys / WASD** - Move left and right
- **SPACE** - Flip gravity (core mechanic)
- **R** - Restart the current level

### 🎓 Design Document

#### Core Mechanic Analysis
**Gravity Flip** transforms traditional platformer movement by adding a vertical dimension to navigation:
1. **Challenge:** Players must think in both orientations (normal and inverted)
2. **Skill Expression:** Timing gravity flips while moving requires coordination
3. **Puzzle Elements:** Platform layouts require specific gravity orientations to traverse
4. **Risk/Reward:** Flipping gravity mid-air adds risk but enables shortcuts

#### Level Design
- **Level 1:** Introduction to the mechanic with simple platforming
- **Level 2:** More complex platform arrangements requiring multiple gravity flips
- **Level 3:** Expert challenge with precise timing requirements

#### Win Condition
Collect all stars in each level to progress to the next level. Complete all 3 levels to win.

### 🛠️ Technical Implementation
- Pure HTML5 Canvas and JavaScript (WebGL-compatible)
- No external dependencies required
- Collision detection system
- Physics simulation with variable gravity
- Progressive difficulty system

### 📦 Repository Structure
```
/
├── index.html    # Main game page
├── game.js       # Game logic and mechanics
├── style.css     # Styling and UI
└── README.md     # Documentation
```

### 🚀 Local Development
1. Clone the repository
2. Open `index.html` in a web browser
3. Start playing!

No build process or dependencies required - it's pure vanilla JavaScript!

### 👥 Team
CSCI526 Game Development Course - Game Jam Project

### 📝 Assignment Requirements
✅ Simple prototype with one mechanic  
✅ Genre + Twist framework (Platformer + Gravity Manipulation)  
✅ Playable via hosted WebGL link  
✅ Hosted on GitHub Pages