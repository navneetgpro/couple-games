/**
 * Truth or Dare Module
 */
import dataService from './dataService.js';

class TDModule {
    constructor() {
        this.truthsData = null;
        this.daresData = null;
    }

    /**
     * Initialize by loading data
     */
    async init() {
        this.truthsData = await dataService.loadData('truths');
        this.daresData = await dataService.loadData('dares');
    }

    /**
     * Get a truth or dare
     */
    async get(type) {
        // Ensure data is loaded
        if (!this.truthsData || !this.daresData) {
            await this.init();
        }

        const data = type === 'truth' ? this.truthsData : this.daresData;
        const levelData = data[dataService.currentLevel];
        const item = dataService.getRandomItem(type === 'truth' ? 'truths' : 'dares', levelData);

        return item;
    }

    /**
     * Display truth or dare with animation
     */
    async display(type) {
        const item = await this.get(type);
        const el = document.getElementById('td-result');

        el.style.opacity = 0;
        setTimeout(() => {
            el.innerText = item;
            el.style.opacity = 1;
        }, 300);
    }
}

const tdModule = new TDModule();
export default tdModule;
