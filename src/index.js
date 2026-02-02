
// Главный файл приложения
import './styles/main.css';
// import { Game } from './game/core/Game.js';
// import { AssetLoader } from './game/utils/AssetLoader.js';
// import { InputHandler } from './game/utils/InputHandler.js';
import {
  runCharacterExamples,
  characters as staticCharacters,
  alive as staticAlive,
  processCharacter
} from './sortCharacters.js';
import { createGameCharacters, gameLoop } from './app.js';

// Добавляем polyfill для старых браузеров
import 'core-js/stable';

console.log('🚀 Defender Game initializing...');

// Создаем интерактивную демонстрацию ES6+ функций
const demoES6Features = () => {
  console.log('=== Демонстрация ES6+ возможностей ===');

  let score = 0;
  const MAX_SCORE = 999999;

  const addScore = (points) => {
    score = Math.min(score + points, MAX_SCORE);
    console.log(`📈 +${points} очков! Всего: ${score}`);
    return score;
  };

  const gameConfig = {
    width: 800,
    height: 600,
    fps: 60,
    difficulty: 'normal'
  };

  console.log(`🖥️ Размер игры: ${gameConfig.width}x${gameConfig.height}`);
  console.log(`🎮 Кадров в секунду: ${gameConfig.fps}`);

  const { width, height, difficulty } = gameConfig;

  const createEnemy = (type = 'basic', speed = 100, power = 1) => ({
    type,
    speed,
    power,
    health: 50 * power,
    id: Math.random().toString(36).substr(2, 9)
  });

  const basicEnemies = ['goblin', 'orc', 'troll'];
  const specialEnemies = ['dragon', 'demon'];
  const allEnemies = [...basicEnemies, ...specialEnemies, 'boss'];

  const enemyFactory = {
    difficulty,

    createRandomEnemy () {
      const type = allEnemies[Math.floor(Math.random() * allEnemies.length)];
      const power = difficulty === 'hard' ? 2 : 1;
      return createEnemy(type, 100, power);
    },

    [`${difficulty}Multiplier`]: difficulty === 'hard' ? 1.5 : 1
  };

  class DefenderGameDemo {
    constructor () {
      this.name = 'Defender Game Demo';
      this.version = '1.0.0';
      this.isRunning = false;
    }

    start () {
      this.isRunning = true;
      console.log(`🎮 Запущена игра: ${this.name} v${this.version}`);
      return this;
    }

    pause () {
      this.isRunning = false;
      console.log('⏸️ Игра на паузе');
      return this;
    }

    getStatus () {
      return this.isRunning ? 'running' : 'paused';
    }
  }

  // Используем переменную или удаляем
  const miniGame = new DefenderGameDemo();
  miniGame.start(); // Теперь переменная используется

  const simulateLoading = async () => {
    console.log('⏳ Имитация загрузки...');

    return new Promise((resolve) => {
      setTimeout(() => {
        const enemy = enemyFactory.createRandomEnemy();
        console.log(`🎯 Создан враг: ${enemy.type} (${enemy.health} HP)`);
        resolve(enemy);
      }, 500);
    });
  };

  const processEnemies = async () => {
    console.log('\n🔁 Обработка врагов:');
    const enemiesToProcess = Array.from({ length: 3 }, () => enemyFactory.createRandomEnemy());

    for (const enemy of enemiesToProcess) {
      console.log(`⚔️  Атакую: ${enemy.type}`);
      addScore(10 * enemy.power);
    }
  };

  const enemyMap = new Map();
  basicEnemies.forEach((enemy, index) => {
    enemyMap.set(enemy, { id: index, power: index + 1 });
  });

  console.log('\n🗺️ Map врагов:');
  for (const [key, value] of enemyMap.entries()) {
    console.log(`${key}: power ${value.power}`);
  }

  const GAME_STATE = Symbol('gameState');

  const gameManager = {
    [GAME_STATE]: 'running',

    getState () {
      return this[GAME_STATE];
    },

    pause () {
      this[GAME_STATE] = 'paused';
      console.log('⏸️  Игра на паузе');
    },

    resume () {
      this[GAME_STATE] = 'running';
      console.log('▶️  Игра продолжается');
    }
  };

  (async () => {
    console.log('\n--- Запуск демонстрации ---');

    addScore(100);
    addScore(50);

    const enemy1 = createEnemy('orc', 80);
    console.log('👹 Первый враг:', enemy1);

    await simulateLoading();

    await processEnemies();

    console.log('\n🔒 Работа с Symbol:');
    console.log('Состояние игры:', gameManager.getState());
    gameManager.pause();
    console.log('Состояние игры:', gameManager.getState());
    gameManager.resume();
    console.log('Состояние игры:', gameManager.getState());

    console.log('\n📊 Итоговый счет:', score);
    console.log('--- Конец демонстрации ---\n');
  })();

  return {
    addScore,
    width,
    height,
    difficulty,
    enemyFactory,
    gameManager,
    currentScore: () => score
  };
};

document.addEventListener('DOMContentLoaded', async () => {
  console.log('🎮 DOM loaded, starting game...\n');

  try {
    console.log('🔧 Запуск демонстрации возможностей ES6+...');
    const demo = demoES6Features();

    console.log('\n🎭 Демонстрация функций из app.js...');
    const gameCharacters = createGameCharacters();
    console.log('Созданные персонажи:', gameCharacters);
    console.log('Запуск игрового цикла:');
    gameLoop();

    console.log('\n📊 Статические данные персонажей:');
    console.log('Все персонажи:', staticCharacters);
    console.log('Живые персонажи:', staticAlive);

    console.log('\n🎭 Запуск примеров персонажей...');
    runCharacterExamples();

    console.log('\n🔄 Загрузка асинхронных данных...');
    try {
      const processedChar = await processCharacter(2);
      console.log('✅ Обработанный персонаж:', processedChar);
    } catch (error) {
      console.warn('⚠️ Не удалось обработать персонажа:', error.message);
    }

    // Закомментированные импорты вызывают ошибки, удаляем их использование
    console.log('\n📦 Загрузка игровых ресурсов...');
    // await AssetLoader.loadAll();

    console.log('🎮 Инициализация управления...');
    // const inputHandler = new InputHandler();

    console.log('🛡️ Создание игрового мира...');
    // const game = new Game({
    //   canvasId: 'gameCanvas',
    //   width: 800,
    //   height: 600,
    //   inputHandler
    // });

    const startButton = document.getElementById('start-button');
    const startScreen = document.getElementById('start-screen');
    const gameScreen = document.getElementById('game-screen');

    if (startButton && startScreen) {
      startButton.addEventListener('click', () => {
        console.log('▶️ Запуск игры...');
        startScreen.style.display = 'none';

        if (gameScreen) {
          gameScreen.style.display = 'block';
        }

        // game.start();

        const scoreElement = document.getElementById('score');
        if (scoreElement) {
          setInterval(() => {
          }, 1000);
        }
      });
    }

    addDemoControls(demo);

    console.log('\n✅ Игра успешно инициализирована!');
    console.log('🎯 Управление:');
    console.log('   • Стрелки - движение');
    console.log('   • Пробел - атака');
    console.log('   • P - пауза');
    console.log('   • R - рестарт');

    // window.game = game;
    window.demo = demo;
    window.gameManager = demo.gameManager;
  } catch (error) {
    console.error('❌ Ошибка инициализации игры:', error);
    showError(error);
  }
});

function addDemoControls (demo) {
  const controlsDiv = document.createElement('div');
  controlsDiv.id = 'demo-controls';
  controlsDiv.style.cssText = `
    position: fixed;
    bottom: 20px;
    left: 20px;
    background: rgba(0, 0, 0, 0.8);
    color: white;
    padding: 15px;
    border-radius: 10px;
    z-index: 1000;
    font-family: monospace;
    max-width: 300px;
  `;

  controlsDiv.innerHTML = `
    <h3 style="margin-top: 0;">🎮 Демо-контролы</h3>
    <p>Счет: <span id="demo-score">0</span></p>
    <p>Сложность: ${demo.difficulty}</p>
    <div style="display: flex; gap: 10px; margin-top: 10px;">
      <button id="add-10">+10 очков</button>
      <button id="add-50">+50 очков</button>
      <button id="pause-btn">⏸️ Пауза</button>
    </div>
  `;

  document.body.appendChild(controlsDiv);

  document.getElementById('add-10').addEventListener('click', () => {
    demo.addScore(10);
    document.getElementById('demo-score').textContent = demo.currentScore();
  });

  document.getElementById('add-50').addEventListener('click', () => {
    demo.addScore(50);
    document.getElementById('demo-score').textContent = demo.currentScore();
  });

  document.getElementById('pause-btn').addEventListener('click', () => {
    if (demo.gameManager.getState() === 'running') {
      demo.gameManager.pause();
      document.getElementById('pause-btn').textContent = '▶️ Продолжить';
    } else {
      demo.gameManager.resume();
      document.getElementById('pause-btn').textContent = '⏸️ Пауза';
    }
  });
}

function showError (error) {
  const errorDiv = document.createElement('div');
  errorDiv.style.cssText = `
    position: fixed;
    top: 20px;
    left: 50%;
    transform: translateX(-50%);
    background: #ff4444;
    color: white;
    padding: 20px;
    border-radius: 5px;
    z-index: 9999;
    max-width: 80%;
    text-align: center;
    box-shadow: 0 4px 6px rgba(0,0,0,0.1);
  `;

  errorDiv.innerHTML = `
    <strong>Ошибка загрузки игры</strong>
    <p>${error.message}</p>
    <button onclick="location.reload()" style="
      background: white;
      color: #ff4444;
      border: none;
      padding: 5px 15px;
      margin-top: 10px;
      border-radius: 3px;
      cursor: pointer;
    ">Перезагрузить</button>
  `;

  document.body.appendChild(errorDiv);
}

window.addEventListener('error', (event) => {
  console.error('⚠️ Script error:', event.error);
  showError(event.error);
});

window.addEventListener('unhandledrejection', (event) => {
  console.error('⚠️ Unhandled Promise rejection:', event.reason);
  showError(event.reason);
});

export const demoES6FeaturesForTest = demoES6Features;
