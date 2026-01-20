/**
 * Wheel Module - Handles wheel spinning
 */
import dataService from './dataService.js';

class WheelModule {
    constructor() {
        this.wheelData = null;
        this.wheelDeg = 0;
    }

    /**
     * Initialize by loading data
     */
    async init() {
        this.wheelData = await dataService.loadData('wheel');
    }

    /**
     * Spin the wheel
     */
    async spin() {
        // Ensure data is loaded
        if (!this.wheelData) {
            await this.init();
        }

        const levelData = this.wheelData[dataService.currentLevel];
        const result = dataService.getRandomItem('wheel', levelData);

        // Animate wheel
        this.wheelDeg += 1440 + Math.floor(Math.random() * 1440);
        document.getElementById('wheel').style.transform = `rotate(${this.wheelDeg}deg)`;
        document.getElementById('wheel-text').innerText = 'Spinning...';

        // Show result after animation
        setTimeout(() => {
            document.getElementById('wheel-text').innerText = result;
        }, 4000);
    }
}

const wheelModule = new WheelModule();
export default wheelModule;
