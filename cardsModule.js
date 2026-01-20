/**
 * Cards Module - Handles card flipping
 */
import dataService from './dataService.js';

class CardsModule {
    constructor() {
        this.cardsData = null;
        this.isFlipped = false;
    }

    /**
     * Initialize by loading data
     */
    async init() {
        this.cardsData = await dataService.loadData('cards');
    }

    /**
     * Flip the card
     */
    async flip() {
        const card = document.getElementById('myCard');
        const txtEl = document.getElementById('cardText');

        if (!this.isFlipped) {
            // Ensure data is loaded
            if (!this.cardsData) {
                await this.init();
            }

            const levelData = this.cardsData[dataService.currentLevel];
            const text = dataService.getRandomItem('cards', levelData);

            txtEl.innerText = text;
            card.classList.add('is-flipped');
            this.isFlipped = true;
        } else {
            card.classList.remove('is-flipped');
            setTimeout(() => {
                txtEl.innerText = 'Tap to reveal your intimate challenge...';
            }, 400);
            this.isFlipped = false;
        }
    }
}

const cardsModule = new CardsModule();
export default cardsModule;
