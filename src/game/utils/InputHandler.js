export class InputHandler {
    constructor() {
        this.keys = {};
        this.setupEventListeners();
        console.log('🎮 Input handler initialized');
    }

    setupEventListeners() {
        // Клавиши клавиатуры
        window.addEventListener('keydown', (e) => {
            this.keys[e.key.toLowerCase()] = true;
            this.handleKeyPress(e.key);
        });

        window.addEventListener('keyup', (e) => {
            this.keys[e.key.toLowerCase()] = false;
        });

        // Кнопки мыши
        window.addEventListener('mousedown', (e) => {
            this.keys[\`mouse\${e.button}\`] = true;
        });

        window.addEventListener('mouseup', (e) => {
            this.keys[\`mouse\${e.button}\`] = false;
        });

        // Предотвращаем контекстное меню на правый клик
        window.addEventListener('contextmenu', (e) => {
            e.preventDefault();
        });
    }

    handleKeyPress(key) {
        switch(key.toLowerCase()) {
            case 'p':
                // Пауза игры
                if (window.game) {
                    window.game.pause();
                }
                break;
            case 'r':
                // Рестарт игры
                if (window.game && confirm('Restart game?')) {
                    window.game.restart();
                }
                break;
            case ' ':
                // Стрельба
                console.log('🔫 Fire!');
                break;
        }
    }

    isKeyPressed(key) {
        return !!this.keys[key.toLowerCase()];
    }

    isMousePressed(button = 0) {
        return !!this.keys[\`mouse\${button}\`];
    }

    getMousePosition(canvas, event) {
        const rect = canvas.getBoundingClientRect();
        return {
            x: event.clientX - rect.left,
            y: event.clientY - rect.top
        };
    }
}
