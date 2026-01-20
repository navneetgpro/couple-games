/**
 * Data Service - Handles lazy loading and caching of game data
 */
class DataService {
    constructor() {
        this.cache = {};
        this.currentLevel = '';
        this.usedItems = {
            truths: new Set(),
            dares: new Set(),
            wheel: new Set(),
            cards: new Set()
        };
    }

    /**
     * Set the current mood level
     */
    setLevel(level) {
        this.currentLevel = level;
    }

    /**
     * Load data from JSON file with caching
     */
    async loadData(dataType) {
        if (this.cache[dataType]) {
            return this.cache[dataType];
        }

        try {
            const response = await fetch(`data/${dataType}.json`);
            if (!response.ok) {
                throw new Error(`Failed to load ${dataType} data`);
            }
            const data = await response.json();
            this.cache[dataType] = data;
            return data;
        } catch (error) {
            console.error(`Error loading ${dataType}:`, error);
            return null;
        }
    }

    /**
     * Get random item from array with anti-repeat logic
     */
    getRandomItem(dataType, itemArray) {
        const usedSet = this.usedItems[dataType];
        let available = itemArray.filter((_, i) => !usedSet.has(i));
        
        // Reset if all items have been used
        if (available.length === 0) {
            usedSet.clear();
            available = itemArray;
        }

        const idx = Math.floor(Math.random() * available.length);
        const item = available[idx];
        const globalIdx = itemArray.indexOf(item);
        usedSet.add(globalIdx);
        
        return item;
    }

    /**
     * Shuffle array helper
     */
    shuffle(array) {
        return array.sort(() => Math.random() - 0.5);
    }

    /**
     * Reset used items for a specific data type
     */
    resetUsed(dataType) {
        if (this.usedItems[dataType]) {
            this.usedItems[dataType].clear();
        }
    }

    /**
     * Clear all cache and reset
     */
    clearAll() {
        this.cache = {};
        Object.keys(this.usedItems).forEach(key => {
            this.usedItems[key].clear();
        });
    }
}

// Export singleton instance
const dataService = new DataService();
export default dataService;
