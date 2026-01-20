# Midnight Romance 🌹

A romantic and intimate game app with multiple intensity levels and game modes.

## Features

- **3 Intensity Levels**: Mild 🌹, Hot 🔥, Wild 😈
- **4 Game Modes**: 
  - 🎲 Action Dice - Random romantic actions
  - 🔥 Truth or Dare - Intimate questions and challenges
  - 🎡 Romance Wheel - Spin for surprises
  - ❤️ Intimate Cards - Flip for challenges
- **Dynamic Mood Switching**: Change intensity level anytime during gameplay
- **Anti-Repeat System**: Ensures variety by tracking used content
- **Lazy Loading**: Data loads only when needed for optimal performance

## Project Structure

```
spicy-app/
├── index.html          # Main HTML structure (4.5KB)
├── styles.css          # All styling (5.8KB)
├── app.js              # Main application controller (2.5KB)
├── dataService.js      # Data loading & caching service (2.3KB)
├── diceModule.js       # Dice game logic (1.9KB)
├── tdModule.js         # Truth or Dare logic (1.2KB)
├── wheelModule.js      # Wheel spinning logic (1.1KB)
├── cardsModule.js      # Card flipping logic (1.2KB)
├── data/
│   ├── dice.json       # Dice content (2.7KB)
│   ├── truths.json     # Truth questions (10KB)
│   ├── dares.json      # Dare challenges (9KB)
│   ├── wheel.json      # Wheel results (6.6KB)
│   └── cards.json      # Card challenges (6.9KB)
├── start-server.sh     # Server launcher script
└── README.md           # This file
```

**Total Size**: ~54KB (vs original 47KB monolithic file)
**Initial Load**: ~5KB HTML + CSS (data loads on demand)

## How to Run

### Option 1: Using the Launcher Script (Recommended)
```bash
./start-server.sh
```

Then open your browser to: **http://localhost:8000**

### Option 2: Manual Server Setup

**Python 3:**
```bash
python3 -m http.server 8000
```

**Python 2:**
```bash
python -m SimpleHTTPServer 8000
```

**Node.js:**
```bash
npx http-server -p 8000
```

**PHP:**
```bash
php -S localhost:8000
```

## Why a Server is Required

This app uses ES6 modules and the Fetch API, which require a proper HTTP server due to browser CORS security policies. Opening `index.html` directly with `file://` protocol will not work.

## Architecture Highlights

### Separation of Concerns
- **HTML**: Structure only
- **CSS**: All styling in external file
- **JavaScript**: Modular, feature-based organization
- **Data**: External JSON files for easy content updates

### Lazy Loading
Data files are loaded only when:
1. User selects a mood level (initial load)
2. User changes mood level (dynamic reload)
3. User switches to a specific game mode

### Performance Benefits
- **Smaller initial bundle**: Only ~5KB loads initially
- **Cached data**: After first load, data is cached in memory
- **Async loading**: Data loading doesn't block UI
- **Modular code**: Easy to debug and extend

## Development

### Adding New Content
Simply edit the JSON files in the `data/` folder. No code changes needed!

### Adding New Game Modes
1. Create a new module file (e.g., `newGameModule.js`)
2. Add data file in `data/` folder
3. Import and initialize in `app.js`
4. Add UI elements in `index.html`

### Modifying Styles
All styles are in `styles.css` using CSS variables for easy theming.

## Browser Compatibility

- Modern browsers with ES6 module support
- Chrome 61+
- Firefox 60+
- Safari 11+
- Edge 16+

## License

Private project - All rights reserved.
