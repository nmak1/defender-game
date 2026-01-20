// Главный файл приложения
import './styles/main.css';
import { Game } from './game/core/Game.js';
import { AssetLoader } from './game/utils/AssetLoader.js';
import { InputHandler } from './game/utils/InputHandler.js';
import Character, { characters, alive } from './app.js';

// Добавляем polyfill для старых браузеров
import 'core-js/stable';
// Убрать эту строку: import 'regenerator-runtime/runtime';

console.log('🚀 Defender Game initializing...');
console.log('Персонажи:', characters);
console.log('Живые персонажи:', alive);

// Демонстрация работы Babel
const demoES6Features = () => {
  // Let/const
  let score = 0;
  const MAX_SCORE = 999999;

  // Arrow function
  const addScore = (points) => {
    score = Math.min(score + points, MAX_SCORE);
    return score;
  };

  // Template literals
  console.log(`Начальный счет: ${score}`);

  // Destructuring
  const gameConfig = { width: 800, height: 600, fps: 60 };
  const { width, height } = gameConfig;

  // Default parameters
  const createEnemy = (type = 'basic', speed = 100) => ({
    type,
    speed,
    health: 50
  });

  // Rest/Spread
  const enemyTypes = ['basic', 'fast', 'tank'];
  const allEnemies = [...enemyTypes, 'boss'];

  return { addScore, width, height };
};

demoES6Features();

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