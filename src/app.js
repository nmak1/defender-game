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
const livingHeroes = heroes.filter(hero => hero.isAlive());

// Стрелочные функции, template strings, деструктуризация
const logCharacter = ({name, health}) => {
  console.log(`Персонаж: ${name}, Здоровье: ${health}`);
};

characters.forEach(logCharacter);

// Spread оператор
const allCharacters = [...characters, ...heroes];

// Async/await пример
async function fetchCharacterData() {
  return new Promise(resolve => {
    setTimeout(() => {
      resolve({name: 'друид', health: 50});
    }, 1000);
  });
}

// Экспорт для использования в других модулях
export { characters, alive, Character, heroes };
export default Character;