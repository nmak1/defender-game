export class Game {
    constructor(config) {
        this.canvas = document.getElementById(config.canvasId);
        this.ctx = this.canvas.getContext('2d');
        this.width = config.width || 800;
        this.height = config.height || 600;
        this.inputHandler = config.inputHandler;

        // Настройка canvas
        this.canvas.width = this.width;
        this.canvas.height = this.height;

        // Состояние игры
        this.state = {
            score: 0,
            lives: 3,
            level: 1,
            isRunning: false,
            isPaused: false
        };

        // Игровые объекты
        this.player = null;
        this.enemies = [];
        this.bullets = [];
        this.particles = [];

        // Время
        this.lastTime = 0;
        this.deltaTime = 0;

        console.log('🎮 Game instance created');
    }

    start() {
        if (this.state.isRunning) return;

        this.state.isRunning = true;
        this.state.isPaused = false;
        this.lastTime = performance.now();

        // Инициализация игровых объектов
        this.initGameObjects();

        // Запуск игрового цикла
        this.gameLoop();

        console.log('▶️ Game started');
    }

    pause() {
        this.state.isPaused = !this.state.isPaused;
        console.log(this.state.isPaused ? '⏸️ Game paused' : '▶️ Game resumed');
    }

    restart() {
        this.state = {
            score: 0,
            lives: 3,
            level: 1,
            isRunning: true,
            isPaused: false
        };

        this.enemies = [];
        this.bullets = [];
        this.particles = [];

        this.initGameObjects();
        console.log('🔄 Game restarted');
    }

    initGameObjects() {
        // Здесь будет инициализация игрока, врагов и т.д.
        console.log('🔄 Initializing game objects...');
    }

    gameLoop(currentTime = 0) {
        if (!this.state.isRunning) return;

        this.deltaTime = (currentTime - this.lastTime) / 1000;
        this.lastTime = currentTime;

        if (!this.state.isPaused) {
            this.update(this.deltaTime);
            this.render();
        }

        requestAnimationFrame((time) => this.gameLoop(time));
    }

    update(deltaTime) {
        // Обновление игровой логики
        this.updateUI();
    }

    render() {
        // Очистка canvas
        this.ctx.fillStyle = '#000';
        this.ctx.fillRect(0, 0, this.width, this.height);

        // Рендер игровых объектов
        this.renderBackground();

        // Временный рендер для демонстрации
        this.renderDemo();
    }

    renderBackground() {
        // Звездное небо
        this.ctx.fillStyle = '#fff';
        for (let i = 0; i < 100; i++) {
            const x = (i * 7.9) % this.width;
            const y = (i * 6.3) % this.height;
            const size = Math.sin(Date.now() * 0.001 + i) * 0.5 + 1;
            this.ctx.fillRect(x, y, size, size);
        }
    }

    renderDemo() {
        // Демо-графика
        const centerX = this.width / 2;
        const centerY = this.height / 2;
        const time = Date.now() * 0.001;

        // Вращающийся щит
        this.ctx.save();
        this.ctx.translate(centerX, centerY);
        this.ctx.rotate(time);

        this.ctx.strokeStyle = '#00ffcc';
        this.ctx.lineWidth = 3;
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 100, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.strokeStyle = '#ff0066';
        this.ctx.beginPath();
        this.ctx.arc(0, 0, 80, 0, Math.PI * 2);
        this.ctx.stroke();

        this.ctx.restore();

        // Текст
        this.ctx.fillStyle = '#00ccff';
        this.ctx.font = '24px "Press Start 2P"';
        this.ctx.textAlign = 'center';
        this.ctx.fillText('DEFENDER GAME ENGINE', centerX, centerY);
        this.ctx.font = '16px "Press Start 2P"';
        this.ctx.fillText('Ready for development', centerX, centerY + 40);
    }

    updateUI() {
        document.getElementById('score').textContent =
            this.state.score.toString().padStart(6, '0');
        document.getElementById('level').textContent =
            this.state.level.toString().padStart(2, '0');

        // Отображение жизней
        const livesElement = document.getElementById('lives');
        livesElement.innerHTML = '❤️'.repeat(this.state.lives);
    }

    addScore(points) {
        this.state.score += points;
        this.updateUI();
    }

    loseLife() {
        this.state.lives--;
        this.updateUI();

        if (this.state.lives <= 0) {
            this.gameOver();
        }
    }

    gameOver() {
        this.state.isRunning = false;
        console.log('💀 Game Over');

        // Показать экран Game Over
        alert(\`GAME OVER\\nScore: \${this.state.score}\\nLevel: \${this.state.level}\`);
    }
}
