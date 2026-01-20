#!/bin/bash

# setup-project.sh
# Скрипт для создания структуры проекта Defender Game

echo "🚀 Начинаем настройку структуры проекта Defender Game..."

# Создаем основную структуру директорий
echo "📁 Создаем структуру директорий..."
mkdir -p src/styles
mkdir -p src/assets/images
mkdir -p src/assets/sounds
mkdir -p public
mkdir -p dist

# 1. Создаем webpack.config.js
echo "⚙️  Создаем webpack.config.js..."
cat > webpack.config.js << 'CONFIG_EOF'
const path = require('path');
const HtmlWebpackPlugin = require('html-webpack-plugin');

module.exports = {
  entry: './src/index.js',
  output: {
    filename: 'bundle.js',
    path: path.resolve(__dirname, 'dist'),
    clean: true,
  },
  devServer: {
    static: './dist',
    hot: true,
    open: true,
    port: 3000,
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: './public/index.html',
      title: 'Defender Game',
      favicon: './public/favicon.ico',
    }),
  ],
  module: {
    rules: [
      {
        test: /\.css$/i,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(png|svg|jpg|jpeg|gif|webp)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/images/[name][ext]'
        }
      },
      {
        test: /\.(mp3|wav|ogg)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/sounds/[name][ext]'
        }
      },
      {
        test: /\.(woff|woff2|eot|ttf|otf)$/i,
        type: 'asset/resource',
        generator: {
          filename: 'assets/fonts/[name][ext]'
        }
      },
    ],
  },
  resolve: {
    extensions: ['.js', '.json'],
    alias: {
      '@': path.resolve(__dirname, 'src'),
      '@assets': path.resolve(__dirname, 'src/assets'),
      '@styles': path.resolve(__dirname, 'src/styles'),
    }
  },
};
CONFIG_EOF

# 2. Создаем public/index.html
echo "🌐 Создаем public/index.html..."
cat > public/index.html << 'HTML_EOF'
<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Defender Game</title>
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Press+Start+2P&family=Orbitron:wght@400;700&display=swap">
</head>
<body>
    <div id="particles"></div>

    <div id="game-container">
        <canvas id="gameCanvas"></canvas>

        <div id="game-ui">
            <div class="ui-panel">
                SCORE: <span id="score" class="ui-value">000000</span>
            </div>
            <div class="ui-panel">
                LIVES: <span id="lives" class="ui-value">❤️❤️❤️</span>
            </div>
            <div class="ui-panel">
                LEVEL: <span id="level" class="ui-value">01</span>
            </div>
        </div>

        <div id="start-screen">
            <h1 id="game-title">DEFENDER</h1>
            <div id="controls">
                <p>🠉 🠈 🠊 🠋 - Move</p>
                <p>SPACE - Shoot</p>
                <p>P - Pause</p>
                <p>R - Restart</p>
            </div>
            <button id="start-button">START MISSION</button>
        </div>
    </div>

    <script>
        // Простые частицы для фона
        const particlesContainer = document.getElementById('particles');
        for (let i = 0; i < 50; i++) {
            const particle = document.createElement('div');
            particle.style.position = 'absolute';
            particle.style.width = Math.random() * 3 + 'px';
            particle.style.height = particle.style.width;
            particle.style.background = Math.random() > 0.5 ? '#00ffcc' : '#ff0066';
            particle.style.borderRadius = '50%';
            particle.style.left = Math.random() * 100 + '%';
            particle.style.top = Math.random() * 100 + '%';
            particle.style.opacity = Math.random() * 0.5 + 0.2;
            particle.style.animation = `float ${Math.random() * 10 + 10}s linear infinite`;
            particlesContainer.appendChild(particle);
        }

        // Добавляем стили для анимации частиц
        const style = document.createElement('style');
        style.textContent = `
            * {
                margin: 0;
                padding: 0;
                box-sizing: border-box;
            }

            body {
                display: flex;
                justify-content: center;
                align-items: center;
                min-height: 100vh;
                background: linear-gradient(135deg, #0a0e17 0%, #1a1f38 50%, #0a0e17 100%);
                font-family: 'Orbitron', sans-serif;
                overflow: hidden;
                position: relative;
            }

            body::before {
                content: '';
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                background:
                    radial-gradient(circle at 20% 30%, rgba(0, 255, 204, 0.1) 0%, transparent 50%),
                    radial-gradient(circle at 80% 70%, rgba(255, 0, 102, 0.1) 0%, transparent 50%);
                pointer-events: none;
            }

            #game-container {
                position: relative;
                border: 4px solid;
                border-image: linear-gradient(45deg, #00ffcc, #ff0066, #00ccff) 1;
                box-shadow:
                    0 0 30px rgba(0, 255, 204, 0.3),
                    0 0 60px rgba(255, 0, 102, 0.2),
                    inset 0 0 20px rgba(0, 204, 255, 0.1);
                overflow: hidden;
            }

            canvas {
                display: block;
                background: #000;
            }

            #game-ui {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                padding: 20px;
                display: flex;
                justify-content: space-between;
                pointer-events: none;
                z-index: 10;
            }

            .ui-panel {
                background: rgba(0, 0, 0, 0.7);
                padding: 15px 25px;
                border: 2px solid #00ffcc;
                border-radius: 8px;
                color: #00ffcc;
                font-family: 'Press Start 2P', cursive;
                font-size: 14px;
                text-shadow: 0 0 10px rgba(0, 255, 204, 0.8);
                backdrop-filter: blur(5px);
            }

            .ui-value {
                color: #ff0066;
                margin-left: 10px;
                text-shadow: 0 0 10px rgba(255, 0, 102, 0.8);
            }

            #start-screen {
                position: absolute;
                top: 50%;
                left: 50%;
                transform: translate(-50%, -50%);
                text-align: center;
                color: #00ffcc;
                z-index: 20;
                background: rgba(10, 14, 23, 0.9);
                padding: 40px;
                border: 3px solid #00ffcc;
                border-radius: 10px;
                backdrop-filter: blur(10px);
            }

            #game-title {
                font-family: 'Press Start 2P', cursive;
                font-size: 3em;
                margin-bottom: 30px;
                text-shadow:
                    0 0 10px #00ffcc,
                    0 0 20px #00ffcc,
                    0 0 30px #00ffcc;
                animation: pulse 2s infinite;
            }

            @keyframes pulse {
                0%, 100% { opacity: 1; }
                50% { opacity: 0.7; }
            }

            #controls {
                margin: 20px 0;
                color: #00ccff;
                line-height: 1.8;
            }

            #start-button {
                background: linear-gradient(45deg, #00ffcc, #00ccff);
                border: none;
                padding: 15px 40px;
                font-family: 'Orbitron', sans-serif;
                font-size: 18px;
                font-weight: bold;
                color: #0a0e17;
                border-radius: 5px;
                cursor: pointer;
                margin-top: 20px;
                transition: all 0.3s;
                text-transform: uppercase;
                letter-spacing: 2px;
            }

            #start-button:hover {
                transform: scale(1.05);
                box-shadow: 0 0 20px rgba(0, 255, 204, 0.5);
            }

            #particles {
                position: absolute;
                top: 0;
                left: 0;
                width: 100%;
                height: 100%;
                pointer-events: none;
                z-index: 1;
            }

            @keyframes float {
                0% { transform: translateY(0) translateX(0); }
                25% { transform: translateY(-20px) translateX(20px); }
                50% { transform: translateY(0) translateX(40px); }
                75% { transform: translateY(20px) translateX(20px); }
                100% { transform: translateY(0) translateX(0); }
            }
        `;
        document.head.appendChild(style);
    </script>
</body>
</html>
HTML_EOF

# 3. Создаем favicon.ico (простой текст файл, так как .ico бинарный)
echo "🖼️  Создаем favicon.ico placeholder..."
cat > public/favicon.ico << 'ICO_EOF'
<!-- Placeholder for favicon.ico -->
<!-- In production, replace with actual .ico file -->
ICO_EOF

# 4. Создаем src/index.js
echo "📦 Создаем src/index.js..."
cat > src/index.js << 'INDEX_EOF'
// Главный файл приложения
import './styles/main.css';
import { Game } from './game/core/Game.js';
import { AssetLoader } from './game/utils/AssetLoader.js';
import { InputHandler } from './game/utils/InputHandler.js';

console.log('🚀 Defender Game initializing...');

// Инициализация при загрузке DOM
document.addEventListener('DOMContentLoaded', async () => {
    console.log('🎮 DOM loaded, starting game...');

    try {
        // Загрузка ресурсов
        console.log('📦 Loading assets...');
        await AssetLoader.loadAll();

        // Инициализация обработчика ввода
        const inputHandler = new InputHandler();

        // Создание и запуск игры
        const game = new Game({
            canvasId: 'gameCanvas',
            width: 800,
            height: 600,
            inputHandler: inputHandler
        });

        // Настройка кнопки старта
        const startButton = document.getElementById('start-button');
        const startScreen = document.getElementById('start-screen');

        startButton.addEventListener('click', () => {
            startScreen.style.display = 'none';
            game.start();
        });

        console.log('✅ Game initialized successfully!');

        // Экспорт для отладки в консоли
        window.game = game;

    } catch (error) {
        console.error('❌ Failed to initialize game:', error);
    }
});

// Обработка ошибок загрузки модулей
window.addEventListener('error', (event) => {
    console.error('⚠️ Script error:', event.error);
});
INDEX_EOF

# 5. Создаем src/styles/main.css
echo "🎨 Создаем src/styles/main.css..."
cat > src/styles/main.css << 'CSS_EOF'
/* Основные стили игры */
:root {
    --primary-color: #00ffcc;
    --secondary-color: #ff0066;
    --accent-color: #00ccff;
    --dark-bg: #0a0e17;
    --darker-bg: #050811;
    --text-glow: 0 0 10px currentColor;
}

/* Сброс стилей */
* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: 'Orbitron', sans-serif;
    background-color: var(--dark-bg);
    color: var(--primary-color);
    overflow: hidden;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
}

/* Анимации */
@keyframes fadeIn {
    from { opacity: 0; }
    to { opacity: 1; }
}

@keyframes slideUp {
    from { transform: translateY(20px); opacity: 0; }
    to { transform: translateY(0); opacity: 1; }
}

@keyframes glow {
    0%, 100% { text-shadow: var(--text-glow); }
    50% { text-shadow: 0 0 20px var(--primary-color); }
}

/* Классы утилиты */
.fade-in {
    animation: fadeIn 0.5s ease-out;
}

.slide-up {
    animation: slideUp 0.3s ease-out;
}

.glow-text {
    animation: glow 2s infinite;
}

/* Адаптивность */
@media (max-width: 768px) {
    #game-container {
        transform: scale(0.8);
    }

    .ui-panel {
        font-size: 10px;
        padding: 8px 15px;
    }
}

/* Состояния загрузки */
.loading {
    display: flex;
    justify-content: center;
    align-items: center;
    height: 100vh;
    font-size: 24px;
}

.loading::after {
    content: '';
    width: 40px;
    height: 40px;
    margin-left: 15px;
    border: 4px solid var(--primary-color);
    border-top-color: transparent;
    border-radius: 50%;
    animation: spin 1s linear infinite;
}

@keyframes spin {
    to { transform: rotate(360deg); }
}
CSS_EOF

# 6. Создаем базовую структуру игровых модулей
echo "🎮 Создаем игровые модули..."

# Создаем директории
mkdir -p src/game/core
mkdir -p src/game/utils
mkdir -p src/game/entities

# Ядро игры
cat > src/game/core/Game.js << 'GAME_EOF'
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
GAME_EOF

# Утилиты - AssetLoader
cat > src/game/utils/AssetLoader.js << 'ASSET_EOF'
export class AssetLoader {
    static async loadAll() {
        console.log('📦 Loading game assets...');

        // Здесь будет загрузка изображений, звуков и т.д.
        const assets = {
            images: {},
            sounds: {},
            fonts: {}
        };

        // Симуляция загрузки
        await new Promise(resolve => setTimeout(resolve, 500));

        console.log('✅ Assets loaded successfully');
        return assets;
    }

    static loadImage(url) {
        return new Promise((resolve, reject) => {
            const img = new Image();
            img.onload = () => resolve(img);
            img.onerror = reject;
            img.src = url;
        });
    }

    static loadSound(url) {
        return new Promise((resolve, reject) => {
            const audio = new Audio();
            audio.oncanplaythrough = () => resolve(audio);
            audio.onerror = reject;
            audio.src = url;
        });
    }
}
ASSET_EOF

# Утилиты - InputHandler
cat > src/game/utils/InputHandler.js << 'INPUT_EOF'
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
INPUT_EOF

# Сущности игры - Player
cat > src/game/entities/Player.js << 'PLAYER_EOF'
export class Player {
    constructor(game) {
        this.game = game;
        this.width = 40;
        this.height = 60;
        this.x = game.width / 2 - this.width / 2;
        this.y = game.height - this.height - 20;
        this.speed = 300;
        this.color = '#00ffcc';
    }

    update(deltaTime) {
        // Движение
        if (this.game.inputHandler.isKeyPressed('arrowleft')) {
            this.x -= this.speed * deltaTime;
        }
        if (this.game.inputHandler.isKeyPressed('arrowright')) {
            this.x += this.speed * deltaTime;
        }
        if (this.game.inputHandler.isKeyPressed('arrowup')) {
            this.y -= this.speed * deltaTime;
        }
        if (this.game.inputHandler.isKeyPressed('arrowdown')) {
            this.y += this.speed * deltaTime;
        }

        // Границы экрана
        this.x = Math.max(0, Math.min(this.game.width - this.width, this.x));
        this.y = Math.max(0, Math.min(this.game.height - this.height, this.y));
    }

    render(ctx) {
        ctx.save();

        // Корпус корабля
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // Кабина
        ctx.fillStyle = '#00ccff';
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.height / 3,
            this.width / 4,
            0,
            Math.PI * 2
        );
        ctx.fill();

        // Двигатели
        ctx.fillStyle = '#ff0066';
        ctx.fillRect(this.x + this.width / 4, this.y + this.height, this.width / 4, 10);
        ctx.fillRect(this.x + this.width * 2/4, this.y + this.height, this.width / 4, 10);

        // Свечение двигателей
        const time = Date.now() * 0.01;
        const flameHeight = 15 + Math.sin(time) * 5;

        ctx.fillStyle = '#ff9900';
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 4, this.y + this.height + 10);
        ctx.lineTo(this.x + this.width / 4 + this.width / 8, this.y + this.height + 10 + flameHeight);
        ctx.lineTo(this.x + this.width / 4 - this.width / 8, this.y + this.height + 10 + flameHeight);
        ctx.closePath();
        ctx.fill();

        ctx.beginPath();
        ctx.moveTo(this.x + this.width * 2/4, this.y + this.height + 10);
        ctx.lineTo(this.x + this.width * 2/4 + this.width / 8, this.y + this.height + 10 + flameHeight);
        ctx.lineTo(this.x + this.width * 2/4 - this.width / 8, this.y + this.height + 10 + flameHeight);
        ctx.closePath();
        ctx.fill();

        ctx.restore();
    }

    shoot() {
        console.log('🔫 Player shooting');
        // Здесь будет создание пуль
    }
}
PLAYER_EOF

# Сущности игры - Enemy
cat > src/game/entities/Enemy.js << 'ENEMY_EOF'
export class Enemy {
    constructor(game, x, y) {
        this.game = game;
        this.x = x;
        this.y = y;
        this.width = 30;
        this.height = 30;
        this.speed = 100;
        this.color = '#ff0066';
        this.health = 1;
    }

    update(deltaTime) {
        this.y += this.speed * deltaTime;

        // Проверка выхода за границы
        if (this.y > this.game.height) {
            this.health = 0; // Пометить для удаления
        }
    }

    render(ctx) {
        ctx.save();

        // Тело врага
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.x + this.width / 2, this.y);
        ctx.lineTo(this.x + this.width, this.y + this.height);
        ctx.lineTo(this.x, this.y + this.height);
        ctx.closePath();
        ctx.fill();

        // Глаз
        ctx.fillStyle = '#fff';
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.height / 3,
            this.width / 6,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.fillStyle = '#000';
        ctx.beginPath();
        ctx.arc(
            this.x + this.width / 2,
            this.y + this.height / 3,
            this.width / 12,
            0,
            Math.PI * 2
        );
        ctx.fill();

        ctx.restore();
    }

    takeDamage(amount = 1) {
        this.health -= amount;
        return this.health <= 0;
    }
}
ENEMY_EOF

# 7. Создаем .gitignore
echo "🔒 Создаем .gitignore..."
cat > .gitignore << 'GITIGNORE_EOF'
# Dependencies
node_modules/
npm-debug.log*
yarn-debug.log*
yarn-error.log*
package-lock.json
yarn.lock

# Build outputs
dist/
build/
*.tmp
*.temp

# IDE files
.idea/
.vscode/
*.swp
*.swo
*~
.DS_Store
Thumbs.db

# Environment variables
.env
.env.local
.env.*.local

# Logs
logs
*.log

# Coverage
coverage/
.nyc_output

# OS files
*.orig
.cache/
.sass-cache/

# Temporary files
tmp/
temp/
GITIGNORE_EOF

# 8. Создаем README.md
echo "📖 Создаем README.md..."
cat > README.md << 'README_EOF'
# 🎮 Defender Game

![Game Preview](https://img.shields.io/badge/status-in%20development-blue)
![License](https://img.shields.io/badge/license-ISC-green)
![Version](https://img.shields.io/badge/version-1.0.0-orange)

Космический шутер в стиле ретро, созданный с использованием современного JavaScript стека.

## ✨ Особенности

- ⚡ Современный игровой движок на чистом JavaScript
- 🎨 Стильная пиксель-арт графика с неоновыми эффектами
- 🔊 Пространственный звук и эффекты
- 🎯 Продвинутая система врагов и боссов
- 📊 Система очков и достижений
- 🎮 Поддержка геймпада и клавиатуры

## 🚀 Быстрый старт

### Предварительные требования
- Node.js 16+
- npm 8+

### Установка

```bash
# Клонирование репозитория
git clone https://github.com/yourusername/defender-game.git
cd defender-game

# Установка зависимостей
npm install

# Запуск в режиме разработки
npm start

# Сборка для продакшена
npm run build