import {
  Bowerman,
  Swordsman,
  Magician,
  Daemon
} from './game/entities/index.js';

export function createGameCharacters () {
  const player = new Swordsman('Player');
  const enemy1 = new Bowerman('EnemyArcher');
  const enemy2 = new Daemon('EnemyDaemon');
  const ally = new Magician('AllyMage');

  return { player, enemies: [enemy1, enemy2], ally };
}

export function gameLoop () {
  const { player, enemies } = createGameCharacters();

  console.log('Game started!');
  console.log(player.getInfo());

  // Пример боя
  enemies.forEach((enemy) => {
    console.log(`${player.name} attacks ${enemy.name}!`);
    enemy.damage(player.attack);
    console.log(`${enemy.name} health: ${enemy.health}`);

    if (enemy.health > 0) {
      player.damage(enemy.attack);
      console.log(`${player.name} health: ${player.health}`);
    }
  });

  if (player.health > 0) {
    player.levelUp();
    console.log(`${player.name} leveled up!`);
    console.log(player.getInfo());
  }
}
