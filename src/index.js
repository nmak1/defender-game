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
