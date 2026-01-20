/**
 * Dice Module - Handles dice initialization and rolling
 */
import dataService from './dataService.js';

class DiceModule {
    constructor() {
        this.cubeIds = ['cube-0', 'cube-1', 'cube-2'];
        this.diceData = null;
    }

    /**
     * Initialize dice faces with data
     */
    async init() {
        this.diceData = await dataService.loadData('dice');
        if (!this.diceData) return;

        const levelData = this.diceData[dataService.currentLevel];
        this.initDiceFaces('cube-0', dataService.shuffle([...levelData.actions]).slice(0, 6));
        this.initDiceFaces('cube-1', dataService.shuffle([...levelData.parts]).slice(0, 6));
        this.initDiceFaces('cube-2', dataService.shuffle([...levelData.hows]).slice(0, 6));
    }

    /**
     * Create dice faces for a cube
     */
    initDiceFaces(id, values) {
        const el = document.getElementById(id);
        if (!el) return;

        el.innerHTML = '';
        for (let i = 0; i < 6; i++) {
            const face = document.createElement('div');
            face.className = `cube__face face-${i}`;
            face.innerText = values[i % values.length];
            el.appendChild(face);
        }
    }

    /**
     * Roll all dice with animation
     */
    roll() {
        this.cubeIds.forEach(id => {
            const el = document.getElementById(id);
            if (!el) return;

            const r = Math.floor(Math.random() * 6);
            let rx = 0, ry = 0;

            if (r === 1) ry = 180;
            else if (r === 2) ry = -90;
            else if (r === 3) ry = 90;
            else if (r === 4) rx = -90;
            else if (r === 5) rx = 90;

            const extra = 720 + Math.floor(Math.random() * 4) * 360;
            el.style.transform = `rotateX(${rx + extra}deg) rotateY(${ry + extra}deg)`;
        });
    }
}

const diceModule = new DiceModule();
export default diceModule;
