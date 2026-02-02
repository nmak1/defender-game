import {
  Character,
  Bowerman,
  Swordsman,
  Magician,
  Daemon,
  Undead,
  Zombie
} from '../game/entities/index.js';

describe('Character Classes Tests', () => {
  describe('Character base class', () => {
    test('should create character with correct properties', () => {
      const character = new Character('John', 'Swordsman');
      expect(character.name).toBe('John');
      expect(character.type).toBe('Swordsman');
      expect(character.health).toBe(100);
      expect(character.level).toBe(1);
      expect(character.attack).toBeUndefined();
      expect(character.defence).toBeUndefined();
    });

    test('should throw error for invalid name length - less than 2', () => {
      expect(() => new Character('J', 'Swordsman')).toThrow('Имя должно быть строкой от 2 до 10 символов');
    });

    test('should throw error for invalid name length - more than 10', () => {
      const longName = 'VeryLongNameHere';
      expect(() => new Character(longName, 'Swordsman')).toThrow('Имя должно быть строкой от 2 до 10 символов');
    });

    test('should throw error for invalid name type - number', () => {
      expect(() => new Character(123, 'Swordsman')).toThrow('Имя должно быть строкой от 2 до 10 символов');
    });

    test('should throw error for invalid name type - null', () => {
      expect(() => new Character(null, 'Swordsman')).toThrow('Имя должно быть строкой от 2 до 10 символов');
    });

    test('should throw error for invalid name type - undefined', () => {
      expect(() => new Character(undefined, 'Swordsman')).toThrow('Имя должно быть строкой от 2 до 10 символов');
    });

    test('should throw error for invalid name type - object', () => {
      expect(() => new Character({}, 'Swordsman')).toThrow('Имя должно быть строкой от 2 до 10 символов');
    });

    test('should throw error for invalid character type', () => {
      expect(() => new Character('John', 'InvalidType')).toThrow('Некорректный тип персонажа');
    });

    test('should throw error for empty character type', () => {
      expect(() => new Character('John', '')).toThrow('Некорректный тип персонажа');
    });

    test('should create character with minimum name length', () => {
      const character = new Character('Jo', 'Swordsman');
      expect(character.name).toBe('Jo');
      expect(character.type).toBe('Swordsman');
    });

    test('should create character with maximum name length', () => {
      const character = new Character('JohnSmith1', 'Swordsman');
      expect(character.name).toBe('JohnSmith1');
      expect(character.type).toBe('Swordsman');
    });

    test('levelUp should increase level and stats when health > 0', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.health = 50;

      character.levelUp();

      expect(character.level).toBe(2);
      expect(character.attack).toBe(Math.round(40 * 1.2));
      expect(character.defence).toBe(Math.round(10 * 1.2));
      expect(character.health).toBe(100);
    });

    test('levelUp should throw error when health is 0', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.health = 0;
      expect(() => character.levelUp()).toThrow('Нельзя повысить уровень умершего персонажа');
    });

    test('levelUp should throw error when health is negative', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.health = -10;
      expect(() => character.levelUp()).toThrow('Нельзя повысить уровень умершего персонажа');
    });

    test('damage should reduce health correctly with positive defence', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      const initialHealth = character.health;
      character.damage(20);
      const expectedDamage = 20 * (1 - 10 / 100);
      expect(character.health).toBe(initialHealth - expectedDamage);
    });

    test('damage should reduce health correctly with 0 defence', () => {
      const character = new Character('Test', 'Magician');
      character.attack = 10;
      character.defence = 0;
      const initialHealth = character.health;
      character.damage(20);
      expect(character.health).toBe(initialHealth - 20);
    });

    test('damage should reduce health correctly with 100 defence', () => {
      const character = new Character('Test', 'Magician');
      character.attack = 10;
      character.defence = 100;
      const initialHealth = character.health;
      character.damage(20);
      expect(character.health).toBe(initialHealth);
    });

    test('damage should not reduce health below 0', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.damage(1000);
      expect(character.health).toBe(0);
    });

    test('damage should do nothing when health is already 0', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.health = 0;
      character.damage(20);
      expect(character.health).toBe(0);
    });

    test('damage should do nothing when health is negative', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.health = -10;
      character.damage(20);
      expect(character.health).toBe(-10);
    });

    test('damage should handle floating point numbers', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      const initialHealth = character.health;
      character.damage(33.33);
      expect(character.health).toBeLessThan(initialHealth);
      expect(character.health).toBeGreaterThan(0);
    });

    test('damage should do nothing with 0 points', () => {
      const character = new Character('Test', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      const initialHealth = character.health;
      character.damage(0);
      expect(character.health).toBe(initialHealth);
    });

    test('damage should do nothing with negative points', () => {
      const character = new Character('Test', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      const initialHealth = character.health;
      character.damage(-10);
      expect(character.health).toBe(initialHealth);
    });

    test('getInfo should return correct format', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.level = 2;
      character.health = 80;
      const info = character.getInfo();

      expect(info).toContain('Arthur');
      expect(info).toContain('Swordsman');
      expect(info).toContain('Уровень: 2');
      expect(info).toContain('Здоровье: 80');
      expect(info).toContain('Атака: 40');
      expect(info).toContain('Защита: 10');
    });

    test('getInfo should work with default values', () => {
      const character = new Character('Test', 'Swordsman');
      const info = character.getInfo();
      expect(info).toContain('Уровень: 1');
      expect(info).toContain('Здоровье: 100');
    });

    test('multiple levelUps increase stats correctly', () => {
      const character = new Character('Test', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.levelUp();
      expect(character.level).toBe(2);
      expect(character.attack).toBe(Math.round(40 * 1.2));
      expect(character.defence).toBe(Math.round(10 * 1.2));

      character.levelUp();
      expect(character.level).toBe(3);
      const expectedAttack = Math.round(Math.round(40 * 1.2) * 1.2);
      const expectedDefence = Math.round(Math.round(10 * 1.2) * 1.2);
      expect(character.attack).toBe(expectedAttack);
      expect(character.defence).toBe(expectedDefence);
    });

    test('health should be set to 100 after levelUp', () => {
      const character = new Character('Test', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.health = 1;
      character.levelUp();
      expect(character.health).toBe(100);
    });

    test('levelUp should work when health is exactly 1', () => {
      const character = new Character('Test', 'Swordsman');
      character.attack = 40;
      character.defence = 10;
      character.health = 1;
      expect(() => character.levelUp()).not.toThrow();
      expect(character.health).toBe(100);
    });
  });

  describe('Bowerman class', () => {
    test('should create Bowerman with correct type', () => {
      const bowerman = new Bowerman('Legolas');
      expect(bowerman.type).toBe('Bowerman');
    });

    test('should have correct attack for Bowerman', () => {
      const bowerman = new Bowerman('Legolas');
      expect(bowerman.attack).toBe(25);
    });

    test('should have correct defence for Bowerman', () => {
      const bowerman = new Bowerman('Legolas');
      expect(bowerman.defence).toBe(25);
    });

    test('should set attack and defence in constructor', () => {
      const bowerman = new Bowerman('Legolas');
      expect(bowerman.attack).toBe(25);
      expect(bowerman.defence).toBe(25);
    });

    test('should inherit levelUp method for Bowerman', () => {
      const bowerman = new Bowerman('Legolas');
      bowerman.health = 50;
      const initialAttack = bowerman.attack;
      const initialDefence = bowerman.defence;

      bowerman.levelUp();

      expect(bowerman.level).toBe(2);
      expect(bowerman.attack).toBe(Math.round(initialAttack * 1.2));
      expect(bowerman.defence).toBe(Math.round(initialDefence * 1.2));
      expect(bowerman.health).toBe(100);
    });

    test('should inherit damage method for Bowerman', () => {
      const bowerman = new Bowerman('Legolas');
      const initialHealth = bowerman.health;
      bowerman.damage(20);
      expect(bowerman.health).toBeLessThan(initialHealth);
    });

    test('should inherit getInfo method for Bowerman', () => {
      const bowerman = new Bowerman('Legolas');
      const info = bowerman.getInfo();
      expect(info).toContain('Legolas');
      expect(info).toContain('Bowerman');
      expect(info).toContain('Атака: 25');
      expect(info).toContain('Защита: 25');
    });

    test('should be instance of Character', () => {
      const bowerman = new Bowerman('Legolas');
      expect(bowerman).toBeInstanceOf(Character);
    });
  });

  describe('Swordsman class', () => {
    test('should create Swordsman with correct type', () => {
      const swordsman = new Swordsman('Aragorn');
      expect(swordsman.type).toBe('Swordsman');
    });

    test('should have correct attack for Swordsman', () => {
      const swordsman = new Swordsman('Aragorn');
      expect(swordsman.attack).toBe(40);
    });

    test('should have correct defence for Swordsman', () => {
      const swordsman = new Swordsman('Aragorn');
      expect(swordsman.defence).toBe(10);
    });

    test('should set attack and defence in constructor', () => {
      const swordsman = new Swordsman('Aragorn');
      expect(swordsman.attack).toBe(40);
      expect(swordsman.defence).toBe(10);
    });

    test('should inherit levelUp method for Swordsman', () => {
      const swordsman = new Swordsman('Aragorn');
      swordsman.health = 50;
      const initialAttack = swordsman.attack;
      const initialDefence = swordsman.defence;

      swordsman.levelUp();

      expect(swordsman.level).toBe(2);
      expect(swordsman.attack).toBe(Math.round(initialAttack * 1.2));
      expect(swordsman.defence).toBe(Math.round(initialDefence * 1.2));
    });

    test('should be instance of Character', () => {
      const swordsman = new Swordsman('Aragorn');
      expect(swordsman).toBeInstanceOf(Character);
    });
  });

  describe('Magician class', () => {
    test('should create Magician with correct type', () => {
      const magician = new Magician('Gandalf');
      expect(magician.type).toBe('Magician');
    });

    test('should have correct attack for Magician', () => {
      const magician = new Magician('Gandalf');
      expect(magician.attack).toBe(10);
    });

    test('should have correct defence for Magician', () => {
      const magician = new Magician('Gandalf');
      expect(magician.defence).toBe(40);
    });

    test('should set attack and defence in constructor', () => {
      const magician = new Magician('Gandalf');
      expect(magician.attack).toBe(10);
      expect(magician.defence).toBe(40);
    });

    test('should inherit damage method correctly', () => {
      const magician = new Magician('Gandalf');
      const initialHealth = magician.health;
      magician.damage(50);
      // С defence 40, урон будет 50 * (1 - 40/100) = 50 * 0.6 = 30
      expect(magician.health).toBe(initialHealth - 30);
    });

    test('should be instance of Character', () => {
      const magician = new Magician('Gandalf');
      expect(magician).toBeInstanceOf(Character);
    });
  });

  describe('Daemon class', () => {
    test('should create Daemon with correct type', () => {
      const daemon = new Daemon('Balrog');
      expect(daemon.type).toBe('Daemon');
    });

    test('should have correct attack for Daemon', () => {
      const daemon = new Daemon('Balrog');
      expect(daemon.attack).toBe(10);
    });

    test('should have correct defence for Daemon', () => {
      const daemon = new Daemon('Balrog');
      expect(daemon.defence).toBe(40);
    });

    test('should set attack and defence in constructor', () => {
      const daemon = new Daemon('Balrog');
      expect(daemon.attack).toBe(10);
      expect(daemon.defence).toBe(40);
    });

    test('should inherit all Character methods', () => {
      const daemon = new Daemon('Balrog');
      expect(typeof daemon.levelUp).toBe('function');
      expect(typeof daemon.damage).toBe('function');
      expect(typeof daemon.getInfo).toBe('function');
    });

    test('should be instance of Character', () => {
      const daemon = new Daemon('Balrog');
      expect(daemon).toBeInstanceOf(Character);
    });
  });

  describe('Undead class', () => {
    test('should create Undead with correct type', () => {
      const undead = new Undead('Lich');
      expect(undead.type).toBe('Undead');
    });

    test('should have correct attack for Undead', () => {
      const undead = new Undead('Lich');
      expect(undead.attack).toBe(25);
    });

    test('should have correct defence for Undead', () => {
      const undead = new Undead('Lich');
      expect(undead.defence).toBe(25);
    });

    test('should set attack and defence in constructor', () => {
      const undead = new Undead('Lich');
      expect(undead.attack).toBe(25);
      expect(undead.defence).toBe(25);
    });

    test('should handle damage calculation correctly', () => {
      const undead = new Undead('Lich');
      const initialHealth = undead.health;
      undead.damage(40);
      // С defence 25, урон будет 40 * (1 - 25/100) = 40 * 0.75 = 30
      expect(undead.health).toBe(initialHealth - 30);
    });

    test('should be instance of Character', () => {
      const undead = new Undead('Lich');
      expect(undead).toBeInstanceOf(Character);
    });
  });

  describe('Zombie class', () => {
    test('should create Zombie with correct type', () => {
      const zombie = new Zombie('Walker');
      expect(zombie.type).toBe('Zombie');
    });

    test('should have correct attack for Zombie', () => {
      const zombie = new Zombie('Walker');
      expect(zombie.attack).toBe(40);
    });

    test('should have correct defence for Zombie', () => {
      const zombie = new Zombie('Walker');
      expect(zombie.defence).toBe(10);
    });

    test('should set attack and defence in constructor', () => {
      const zombie = new Zombie('Walker');
      expect(zombie.attack).toBe(40);
      expect(zombie.defence).toBe(10);
    });

    test('should handle multiple damages correctly', () => {
      const zombie = new Zombie('Walker');
      const healthAfterFirst = zombie.health;
      zombie.damage(20);
      const healthAfterSecond = zombie.health;
      zombie.damage(20);
      expect(zombie.health).toBeLessThan(healthAfterSecond);
      expect(zombie.health).toBeLessThan(healthAfterFirst);
    });

    test('should be instance of Character', () => {
      const zombie = new Zombie('Walker');
      expect(zombie).toBeInstanceOf(Character);
    });
  });

  describe('Edge cases and inheritance', () => {
    test('all character types should be creatable', () => {
      const types = ['Bowerman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
      types.forEach((type) => {
        const character = new Character('Test', type);
        expect(character.type).toBe(type);
      });
    });

    test('child classes should have different stats', () => {
      const bowerman = new Bowerman('B1');
      const swordsman = new Swordsman('S1');
      const magician = new Magician('M1');

      expect(bowerman.attack).not.toBe(swordsman.attack);
      expect(bowerman.defence).not.toBe(magician.defence);
      expect(swordsman.attack).toBe(40);
      expect(magician.defence).toBe(40);
    });

    test('inheritance chain should work correctly', () => {
      const zombie = new Zombie('Zombie1');

      // Проверяем что методы доступны
      expect(typeof zombie.levelUp).toBe('function');
      expect(typeof zombie.damage).toBe('function');
      expect(typeof zombie.getInfo).toBe('function');

      // Проверяем что свойства установлены
      expect(zombie.name).toBe('Zombie1');
      expect(zombie.type).toBe('Zombie');
      expect(zombie.health).toBe(100);
      expect(zombie.level).toBe(1);
      expect(zombie.attack).toBe(40);
      expect(zombie.defence).toBe(10);
    });

    test('levelUp should work correctly for all child classes', () => {
      const classes = [Bowerman, Swordsman, Magician, Daemon, Undead, Zombie];

      classes.forEach((Class) => {
        const character = new Class('Test');
        const initialAttack = character.attack;
        const initialDefence = character.defence;

        character.levelUp();

        expect(character.level).toBe(2);
        expect(character.attack).toBe(Math.round(initialAttack * 1.2));
        expect(character.defence).toBe(Math.round(initialDefence * 1.2));
        expect(character.health).toBe(100);
      });
    });
  });
});
