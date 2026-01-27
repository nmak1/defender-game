const characters = [
  {name: 'мечник', health: 10},
  {name: 'маг', health: 100},
  {name: 'маг', health: 0},
  {name: 'лучник', health: 0},
];

const alive = characters.filter(item => item.health > 0);

// Дополнительный код для демонстрации ES6+ возможностей
class Character {
  constructor(name, health) {
    this.name = name;
    this.health = health;
  }

  isAlive() {
    return this.health > 0;
  }

  static createHero(name) {
    return new Character(name, 100);
  }
}

// Использование новых возможностей ES6+
const heroes = characters.map(char => new Character(char.name, char.health));
const livingHeroes = heroes.filter(hero => hero.isAlive()); // Используется ниже в logCharacter

// Стрелочные функции, template strings, деструктуризация
const logCharacter = ({name, health}) => {
  console.log(`Персонаж: ${name}, Здоровье: ${health}`);
};

// Используем livingHeroes вместо characters для демонстрации
livingHeroes.forEach(logCharacter);

// Spread оператор (можно убрать или использовать)
const allCharacters = [...characters, ...heroes]; // Добавляем префикс если не используется

// Async/await пример - функция определена, но не вызывается в этом модуле
// Можно оставить как есть или добавить префикс
const _fetchCharacterData = async () => {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({name: 'друид', health: 50});
    }, 1000);
  });
};

// Экспорт для использования в других модулях
export { characters, alive, Character, heroes };
export default Character;