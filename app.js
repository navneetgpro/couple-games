/**
 * Main Application Controller
 */
import dataService from './dataService.js';
import diceModule from './diceModule.js';
import tdModule from './tdModule.js';
import wheelModule from './wheelModule.js';
import cardsModule from './cardsModule.js';

class App {
    constructor() {
        this.init();
    }

    init() {
        // Mood view starts active, others hidden
        console.log('Midnight Romance App Initialized');
    }

    /**
     * Set mood level and initialize game
     */
    async setMood(level) {
        dataService.setLevel(level);

        // Initialize dice module with data
        await diceModule.init();

        // Switch to dice view
        document.getElementById('view-mood').classList.remove('active-view');
        document.getElementById('view-dice').classList.add('active-view');
        document.getElementById('main-nav').style.display = 'flex';
        document.querySelector('nav button').classList.add('active');

        // Show mood selector in header
        document.getElementById('mood-selector').style.display = 'block';
        document.getElementById('mood-dropdown').value = level;
    }

    /**
     * Change mood level during gameplay
     */
    async changeMood(level) {
        dataService.setLevel(level);

        // Reinitialize dice with new level data
        await diceModule.init();

        console.log(`Mood changed to: ${level}`);
    }

    /**
     * Switch between views
     */
    setView(viewId, btn) {
        document.querySelectorAll('main').forEach(el => el.classList.remove('active-view'));
        document.getElementById(viewId).classList.add('active-view');
        document.querySelectorAll('nav button').forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
    }

    /**
     * Roll dice
     */
    rollDice() {
        diceModule.roll();
    }

    /**
     * Get truth or dare
     */
    async doTD(type) {
        await tdModule.display(type);
    }

    /**
     * Spin wheel
     */
    async spinWheel() {
        await wheelModule.spin();
    }

    /**
     * Flip card
     */
    async flipCard() {
        await cardsModule.flip();
    }
}

// Initialize app
const app = new App();

// Expose functions to global scope for HTML onclick handlers
window.setMood = (level) => app.setMood(level);
window.changeMood = (level) => app.changeMood(level);
window.setView = (viewId, btn) => app.setView(viewId, btn);
window.rollDice = () => app.rollDice();
window.doTD = (type) => app.doTD(type);
window.spinWheel = () => app.spinWheel();
window.flipCard = () => app.flipCard();
