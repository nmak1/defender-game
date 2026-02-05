// src/oldSortCharacters.js - сохранение старой функциональности
function sortCharacters (characters) {
  if (!Array.isArray(characters)) {
    throw new Error('characters должен быть массивом');
  }
  return [...characters].sort((a, b) => {
    const aIsAlive = a.health > 0;
    const bIsAlive = b.health > 0;
    if (aIsAlive && !bIsAlive) return -1;
    if (!aIsAlive && bIsAlive) return 1;
    return b.health - a.health;
  });
}

function createCharactersFromData (data) {
  if (!Array.isArray(data)) {
    throw new Error('data должен быть массивом');
  }
  const typeMapping = {
    мечник: 'Swordsman',
    маг: 'Magician',
    лучник: 'Bowerman'
  };
  return data.map((item) => {
    const CharacterClass = typeMapping[item.name];
    if (!CharacterClass) {
      throw new Error(`Неизвестный тип персонажа: ${item.name}`);
    }
    return { ...item, type: CharacterClass };
  });
}

const logCharacter = ({ name, health, level = 1 }) => {
  const status = health > 0 ? 'жив' : 'мёртв';
  console.log(`🎮 ${name} | ❤️ ${health}HP | 📊 Уровень ${level} | Статус: ${status}`);
  return { name, health, status };
};

const characters = [
  { name: 'мечник', health: 10 },
  { name: 'маг', health: 100 },
  { name: 'маг', health: 0 },
  { name: 'лучник', health: 0 }
];

const alive = characters.filter(item => item.health > 0);

class GameCharacter {
  constructor (name, health) {
    this.name = name;
    this.health = health;
    this.createdAt = new Date().toISOString();
  }

  isAlive () {
    return this.health > 0;
  }

  get status () {
    return this.isAlive() ? 'жив' : 'мёртв';
  }

  static createHero (name) {
    return new GameCharacter(name, 100);
  }
}

const heroes = characters.map(char => new GameCharacter(char.name, char.health));
const allCharacters = [...characters, ...heroes];

function fetchCharacterDataImpl (id) {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      const mockData = [
        { id: 1, name: 'друид', health: 50 },
        { id: 2, name: 'рыцарь', health: 150 },
        { id: 3, name: 'ведьмак', health: 120 }
      ];

      let found = null;
      for (let i = 0; i < mockData.length; i += 1) {
        if (mockData[i].id === id) {
          found = mockData[i];
          break;
        }
      }

      if (!found) {
        reject(new Error('Персонаж не найден'));
        return;
      }
      resolve(found);
    }, 10);
  });
}

let currentFetchCharacterDataImpl = fetchCharacterDataImpl;

const fetchCharacterData = async id => currentFetchCharacterDataImpl(id);

const validateCharacterData = (data) => {
  const { name, health } = data;
  if (!name || health == null) {
    throw new Error('Некорректные данные персонажа');
  }
};

const processCharacter = async (id) => {
  try {
    const data = await fetchCharacterData(id);
    validateCharacterData(data);
    const character = new GameCharacter(data.name, data.health);
    const log = logCharacter(character);
    return {
      ...data,
      ...log,
      isAlive: character.isAlive(),
      processedAt: new Date().toISOString()
    };
  } catch (error) {
    console.error('Ошибка обработки персонажа:', error.message);
    throw error;
  }
};

function* characterGenerator (data) {
  if (!Array.isArray(data)) {
    throw new Error('data должен быть массивом');
  }
  for (const item of data) {
    yield new GameCharacter(item.name, item.health);
  }
}

let internalDeps = {
  sortCharacters,
  logCharacter,
  GameCharacter,
  characterGenerator
};

const runCharacterExamples = () => {
  console.log('=== Пример работы с персонажами ===\n');
  try {
    console.log('1. Сортировка персонажей:');
    const sorted = internalDeps.sortCharacters(characters);
    for (const char of sorted) {
      internalDeps.logCharacter(char);
    }
    console.log('\n2. Создание игровых персонажей:');
    const gameHeroes = characters.map(char => new internalDeps.GameCharacter(char.name, char.health));
    for (const hero of gameHeroes) {
      console.log(`${hero.name}: ${hero.health}HP (${hero.status})`);
    }
    console.log('\n3. Использование генератора:');
    const gen = internalDeps.characterGenerator(characters);
    for (const char of gen) {
      console.log(`${char.name} создан в ${char.createdAt}`);
    }
    console.log('\n4. Объединение массивов:');
    const combined = [...characters, ...gameHeroes];
    console.log(`Всего персонажей: ${combined.length}`);
    return { sorted, gameHeroes, combined };
  } catch (error) {
    console.error('Ошибка в runCharacterExamples:', error.message);
    return { sorted: [], gameHeroes: [], combined: [] };
  }
};

const __testExports = {
  get fetchCharacterDataImpl () {
    return currentFetchCharacterDataImpl;
  },
  set fetchCharacterDataImpl (impl) {
    currentFetchCharacterDataImpl = impl;
  },
  get originalFetchCharacterDataImpl () {
    return fetchCharacterDataImpl;
  },
  validateCharacterData,
  get internalDeps () {
    return internalDeps;
  },
  set internalDeps (deps) {
    internalDeps = deps;
  }
};

// Экспорт всего как ES6 модуль
export {
  sortCharacters,
  createCharactersFromData,
  GameCharacter,
  characters,
  alive,
  heroes,
  fetchCharacterData,
  processCharacter,
  runCharacterExamples,
  characterGenerator,
  logCharacter,
  allCharacters,
  __testExports
};

// Для CommonJS тестов
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    sortCharacters,
    createCharactersFromData,
    GameCharacter,
    characters,
    alive,
    heroes,
    fetchCharacterData,
    processCharacter,
    runCharacterExamples,
    characterGenerator,
    logCharacter,
    allCharacters,
    __testExports
  };
}
