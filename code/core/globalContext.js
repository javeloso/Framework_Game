// Global context to store global variables using singleton pattern

class GlobalContext {
    constructor() {
        if (!GlobalContext.instance) {
            this.store = {};
            this.update = {};
            GlobalContext.instance = this;
        }

        return GlobalContext.instance;
    }

    set(key, value) {
        this.store[key] = value;
    }

    get(key) {
        return this.store[key];
    }

    remove(key) {
        delete this.store[key];
    }

    setUpdate(key, value) {
        this.update[key] = value;
    }

    getUpdate() {
        return this.update || {}; // Si 'this.update' es undefined, devolvemos un objeto vacío
    }

    removeUpdate(key) {
        delete this.update[key];
    }
}

const contextInstance = new GlobalContext();
Object.freeze(contextInstance);

export default contextInstance;
