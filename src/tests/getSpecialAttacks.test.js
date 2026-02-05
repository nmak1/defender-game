// src/tests/getSpecialAttacks.test.js
const getSpecialAttacks = require('../getSpecialAttacks.js');

describe('getSpecialAttacks function', () => {
  test('should extract attacks with description', () => {
    const character = {
      name: 'Лучник',
      type: 'Bowman',
      health: 50,
      level: 3,
      attack: 40,
      defence: 10,
      special: [
        {
          id: 8,
          name: 'Двойной выстрел',
          icon: 'http://...',
          description: 'Двойной выстрел наносит двойной урон'
        },
        {
          id: 9,
          name: 'Нокаутирующий удар',
          icon: 'http://...'
        }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 8,
        name: 'Двойной выстрел',
        icon: 'http://...',
        description: 'Двойной выстрел наносит двойной урон'
      },
      {
        id: 9,
        name: 'Нокаутирующий удар',
        icon: 'http://...',
        description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle empty special array', () => {
    const character = {
      name: 'Лучник',
      special: []
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([]);
  });

  test('should handle undefined special property', () => {
    const character = {
      name: 'Лучник'
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([]);
  });

  test('should handle null character object', () => {
    const result = getSpecialAttacks({});

    expect(result).toEqual([]);
  });

  test('should handle multiple attacks with missing descriptions', () => {
    const character = {
      special: [
        { id: 1, name: 'Атака 1', icon: 'icon1' },
        {
          id: 2, name: 'Атака 2', icon: 'icon2', description: 'Описание 2'
        },
        { id: 3, name: 'Атака 3', icon: 'icon3' }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1, name: 'Атака 1', icon: 'icon1', description: 'Описание недоступно'
      },
      {
        id: 2, name: 'Атака 2', icon: 'icon2', description: 'Описание 2'
      },
      {
        id: 3, name: 'Атака 3', icon: 'icon3', description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle attacks with all fields present', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака',
          icon: 'icon',
          description: 'Полное описание'
        }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Атака',
        icon: 'icon',
        description: 'Полное описание'
      }
    ]);
  });

  test('should not mutate original object', () => {
    const character = {
      special: [
        { id: 1, name: 'Атака', icon: 'icon' }
      ]
    };

    const original = JSON.parse(JSON.stringify(character));
    getSpecialAttacks(character);

    expect(character).toEqual(original);
  });

  test('should handle attacks with null description', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака',
          icon: 'icon',
          description: null
        }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Атака',
        icon: 'icon',
        description: null
      }
    ]);
  });

  test('should handle attacks with empty string description', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака',
          icon: 'icon',
          description: ''
        }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Атака',
        icon: 'icon',
        description: ''
      }
    ]);
  });

  test('should handle attacks with false description', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака',
          icon: 'icon',
          description: false
        }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Атака',
        icon: 'icon',
        description: false
      }
    ]);
  });

  test('should handle attacks with 0 description', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака',
          icon: 'icon',
          description: 0
        }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Атака',
        icon: 'icon',
        description: 0
      }
    ]);
  });

  test('should handle missing id field', () => {
    const character = {
      special: [
        {
          name: 'Атака',
          icon: 'icon'
        }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: undefined,
        name: 'Атака',
        icon: 'icon',
        description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle missing name field', () => {
    const character = {
      special: [
        {
          id: 1,
          icon: 'icon'
        }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1,
        name: undefined,
        icon: 'icon',
        description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle missing icon field', () => {
    const character = {
      special: [
        {
          id: 1,
          name: 'Атака'
        }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Атака',
        icon: undefined,
        description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle undefined character object', () => {
    const result = getSpecialAttacks();

    expect(result).toEqual([]);
  });

  test('should handle character with only special property', () => {
    const character = {
      special: [
        { id: 1, name: 'Атака', icon: 'icon' }
      ]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1, name: 'Атака', icon: 'icon', description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle special with null value', () => {
    const character = {
      special: null
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([]);
  });

  test('should handle special with non-array value', () => {
    const character = {
      special: 'not an array'
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([]);
  });

  // Дополнительные тесты для 100% покрытия
  test('should handle special with undefined element', () => {
    const character = {
      special: [undefined]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: undefined,
        name: undefined,
        icon: undefined,
        description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle special with null element', () => {
    const character = {
      special: [null]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: undefined,
        name: undefined,
        icon: undefined,
        description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle special with empty object element', () => {
    const character = {
      special: [{}]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: undefined,
        name: undefined,
        icon: undefined,
        description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle special with partially defined object', () => {
    const character = {
      special: [{ id: 1, name: 'Test' }]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: 1,
        name: 'Test',
        icon: undefined,
        description: 'Описание недоступно'
      }
    ]);
  });

  test('should handle attack with all undefined values explicitly', () => {
    const character = {
      special: [{
        id: undefined,
        name: undefined,
        icon: undefined,
        description: undefined
      }]
    };

    const result = getSpecialAttacks(character);

    expect(result).toEqual([
      {
        id: undefined,
        name: undefined,
        icon: undefined,
        description: 'Описание недоступно'
      }
    ]);
  });

  // Тесты для покрытия CommonJS условий экспорта
  describe('CommonJS export coverage', () => {
    let originalModule;
    let originalExports;

    beforeEach(() => {
      // Сохраняем оригинальные значения
      originalModule = global.module;
      originalExports = global.module?.exports;
    });

    afterEach(() => {
      // Восстанавливаем оригинальные значения
      if (originalModule !== undefined) {
        global.module = originalModule;
      } else {
        delete global.module;
      }

      if (originalExports !== undefined) {
        if (global.module) {
          global.module.exports = originalExports;
        }
      }
    });

    test('should work when module is undefined', () => {
      // Удаляем module из global
      delete global.module;

      // Перезагружаем модуль в новом контексте
      jest.resetModules();
      const freshModule = require('../getSpecialAttacks.js');

      // Проверяем что функция работает
      const character = {
        special: [{ id: 1, name: 'Test' }]
      };
      const result = freshModule(character);

      expect(result).toEqual([
        {
          id: 1, name: 'Test', icon: undefined, description: 'Описание недоступно'
        }
      ]);
    });

    test('should work when module exists but module.exports is undefined', () => {
      // Устанавливаем module без exports
      global.module = {};

      // Перезагружаем модуль
      jest.resetModules();
      const freshModule = require('../getSpecialAttacks.js');

      // Проверяем что функция работает
      const character = {
        special: [{ id: 2, name: 'Test 2', description: 'Custom' }]
      };
      const result = freshModule(character);

      expect(result).toEqual([
        {
          id: 2, name: 'Test 2', icon: undefined, description: 'Custom'
        }
      ]);
    });

    test('should export correctly when module.exports exists', () => {
      // module и module.exports уже существуют в Node.js окружении
      // Этот тест проверяет нормальную работу
      const character = {
        special: [{ id: 3, name: 'Test 3', icon: 'icon3' }]
      };
      const result = getSpecialAttacks(character);

      expect(result).toEqual([
        {
          id: 3, name: 'Test 3', icon: 'icon3', description: 'Описание недоступно'
        }
      ]);
    });
  });
});
