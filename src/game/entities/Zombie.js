import Character from './Character.js';

export default class Zombie extends Character {
  constructor (name) {
    super(name, 'Zombie');
    this.attack = 40;
    this.defence = 10;
  }
}
