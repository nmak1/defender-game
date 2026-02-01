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
      expect(character.attack).toBe(40);
      expect(character.defence).toBe(10);
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
      character.health = 50;
      const initialAttack = character.attack;
      const initialDefence = character.defence;

      character.levelUp();

      expect(character.level).toBe(2);
      expect(character.attack).toBe(Math.round(initialAttack * 1.2));
      expect(character.defence).toBe(Math.round(initialDefence * 1.2));
      expect(character.health).toBe(100);
    });

    test('levelUp should throw error when health is 0', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.health = 0;
      expect(() => character.levelUp()).toThrow('Нельзя повысить уровень умершего персонажа');
    });

    test('levelUp should throw error when health is negative', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.health = -10;
      expect(() => character.levelUp()).toThrow('Нельзя повысить уровень умершего персонажа');
    });

    test('damage should reduce health correctly with positive defence', () => {
      const character = new Character('Arthur', 'Swordsman');
      const initialHealth = character.health;
      character.damage(20);
      const expectedDamage = 20 * (1 - 10 / 100);
      expect(character.health).toBe(initialHealth - expectedDamage);
    });

    test('damage should reduce health correctly with 0 defence', () => {
      const character = new Character('Test', 'Magician');
      character.defence = 0;
      const initialHealth = character.health;
      character.damage(20);
      expect(character.health).toBe(initialHealth - 20);
    });

    test('damage should reduce health correctly with 100 defence', () => {
      const character = new Character('Test', 'Magician');
      character.defence = 100;
      const initialHealth = character.health;
      character.damage(20);
      expect(character.health).toBe(initialHealth);
    });

    test('damage should not reduce health below 0', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.damage(1000);
      expect(character.health).toBe(0);
    });

    test('damage should do nothing when health is already 0', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.health = 0;
      character.damage(20);
      expect(character.health).toBe(0);
    });

    test('damage should do nothing when health is negative', () => {
      const character = new Character('Arthur', 'Swordsman');
      character.health = -10;
      character.damage(20);
      expect(character.health).toBe(-10);
    });

    test('damage should handle floating point numbers', () => {
      const character = new Character('Arthur', 'Swordsman');
      const initialHealth = character.health;
      character.damage(33.33);
      expect(character.health).toBeLessThan(initialHealth);
      expect(character.health).toBeGreaterThan(0);
    });

    test('damage should do nothing with 0 points', () => {
      const character = new Character('Test', 'Swordsman');
      const initialHealth = character.health;
      character.damage(0);
      expect(character.health).toBe(initialHealth);
    });

    test('damage should do nothing with negative points', () => {
      const character = new Character('Test', 'Swordsman');
      const initialHealth = character.health;
      character.damage(-10);
      expect(character.health).toBe(initialHealth);
    });

    test('getInfo should return correct format', () => {
      const character = new Character('Arthur', 'Swordsman');
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

    test('setBaseStats should be called on construction', () => {
      const character = new Character('Test', 'Swordsman');
      expect(character.attack).toBe(40);
      expect(character.defence).toBe(10);
    });

    test('multiple levelUps increase stats correctly', () => {
      const character = new Character('Test', 'Swordsman');
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
      character.health = 1;
      character.levelUp();
      expect(character.health).toBe(100);
    });

    test('levelUp should work when health is exactly 1', () => {
      const character = new Character('Test', 'Swordsman');
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

    test('should inherit levelUp method for Bowerman', () => {
      const bowerman = new Bowerman('Legolas');
      bowerman.health = 50;
      bowerman.levelUp();
      expect(bowerman.level).toBe(2);
      expect(bowerman.attack).toBe(Math.round(25 * 1.2));
    });

    test('should inherit damage method for Bowerman', () => {
      const bowerman = new Bowerman('Legolas');
      bowerman.damage(20);
      expect(bowerman.health).toBeLessThan(100);
    });

    test('should inherit getInfo method for Bowerman', () => {
      const bowerman = new Bowerman('Legolas');
      const info = bowerman.getInfo();
      expect(info).toContain('Legolas');
      expect(info).toContain('Bowerman');
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

    test('should inherit levelUp method for Swordsman', () => {
      const swordsman = new Swordsman('Aragorn');
      swordsman.health = 50;
      swordsman.levelUp();
      expect(swordsman.level).toBe(2);
      expect(swordsman.attack).toBe(Math.round(40 * 1.2));
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
  });

  describe('Edge cases', () => {
    test('character should be created with all valid types', () => {
      const types = ['Bowerman', 'Swordsman', 'Magician', 'Daemon', 'Undead', 'Zombie'];
      types.forEach((type) => {
        const character = new Character('Test', type);
        expect(character.type).toBe(type);
      });
    });

    test('character should handle multiple damages', () => {
      const character = new Character('Test', 'Swordsman');
      character.damage(10);
      const healthAfterFirst = character.health;
      character.damage(10);
      expect(character.health).toBeLessThan(healthAfterFirst);
      expect(character.health).toBeGreaterThan(0);
    });
  });
});
