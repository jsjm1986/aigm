class GameStorage {
    static save(data) {
        localStorage.setItem('gameState', JSON.stringify(data));
    }

    static load() {
        const saved = localStorage.getItem('gameState');
        return saved ? JSON.parse(saved) : null;
    }

    static hasSave() {
        return localStorage.getItem('gameState') !== null;
    }

    static deleteSave() {
        localStorage.removeItem('gameState');
    }
}

// 导出到全局作用域
window.GameStorage = GameStorage; 