export default class Character {
  constructor (name, type) {
    if (typeof name !== 'string' || name.length < 2 || name.length > 10) {
      throw new Error('Имя должно быть строкой от 2 до 10 символов');
    }

    const types = ['Bowerman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
    if (!types.includes(type)) {
      throw new Error('Некорректный тип персонажа');
    }

    this.name = name;
    this.type = type;
    this.health = 100;
    this.level = 1;
    this.attack = undefined;
    this.defence = undefined;
  }

  levelUp () {
    if (this.health <= 0) {
      throw new Error('Нельзя повысить уровень умершего персонажа');
    }

    this.level += 1;
    this.attack = Math.round(this.attack * 1.2);
    this.defence = Math.round(this.defence * 1.2);
    this.health = 100;
  }

  damage (points) {
    if (this.health <= 0) return;

    // Если points отрицательное или 0, ничего не делаем
    if (points <= 0) return;

    const damage = points * (1 - this.defence / 100);
    this.health -= damage;

    if (this.health < 0) {
      this.health = 0;
    }
  }

  getInfo () {
    return `${this.name} (${this.type}), Уровень: ${this.level}, Здоровье: ${this.health}, Атака: ${this.attack}, Защита: ${this.defence}`;
  }
}
