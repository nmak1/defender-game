export default class Player {
  constructor (name) {
    this.name = name;
    this.health = 100;
  }

  takeDamage (damage) {
    this.health -= damage;
    if (this.health < 0) this.health = 0;
  }
}
