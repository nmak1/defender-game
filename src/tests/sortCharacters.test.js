// src/tests/sortCharacters.test.js
const { orderByProps } = require('../sortCharacters.js');

describe('orderByProps function', () => {
  const obj = {
    name: 'мечник',
    health: 10,
    level: 2,
    attack: 80,
    defence: 40
  };

  test('should sort properties according to given order', () => {
    const order = ['name', 'level'];
    const result = orderByProps(obj, order);

    expect(result).toEqual([
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 }
    ]);
  });

  test('should handle empty order array', () => {
    const result = orderByProps(obj, []);

    expect(result).toEqual([
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 },
      { key: 'level', value: 2 },
      { key: 'name', value: 'мечник' }
    ]);
  });

  test('should handle order with non-existent keys', () => {
    const order = ['name', 'nonExistent', 'level'];
    const result = orderByProps(obj, order);

    expect(result).toEqual([
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 }
    ]);
  });

  test('should throw error if first argument is not object', () => {
    expect(() => orderByProps(null, [])).toThrow('Первый аргумент должен быть объектом');
    expect(() => orderByProps(undefined, [])).toThrow('Первый аргумент должен быть объектом');
    expect(() => orderByProps('string', [])).toThrow('Первый аргумент должен быть объектом');
    expect(() => orderByProps(123, [])).toThrow('Первый аргумент должен быть объектом');
    expect(() => orderByProps([], [])).toThrow('Первый аргумент должен быть объектом');
    expect(() => orderByProps(() => {}, [])).toThrow('Первый аргумент должен быть объектом');
  });

  test('should throw error if second argument is not array', () => {
    expect(() => orderByProps({}, null)).toThrow('Второй аргумент должен быть массивом');
    expect(() => orderByProps({}, 'string')).toThrow('Второй аргумент должен быть массивом');
    expect(() => orderByProps({}, 123)).toThrow('Второй аргумент должен быть массивом');
    expect(() => orderByProps({}, {})).toThrow('Второй аргумент должен быть массивом');
    expect(() => orderByProps({}, () => {})).toThrow('Второй аргумент должен быть массивом');
  });

  test('should handle object with only some ordered properties', () => {
    const smallObj = { name: 'test', health: 100 };
    const result = orderByProps(smallObj, ['health', 'name', 'level']);

    expect(result).toEqual([
      { key: 'health', value: 100 },
      { key: 'name', value: 'test' }
    ]);
  });

  test('should sort remaining properties alphabetically', () => {
    const testObj = { z: 1, a: 2, m: 3 };
    const result = orderByProps(testObj, []);

    expect(result).toEqual([
      { key: 'a', value: 2 },
      { key: 'm', value: 3 },
      { key: 'z', value: 1 }
    ]);
  });

  test('should preserve original object', () => {
    const original = { ...obj };
    orderByProps(obj, ['name']);

    expect(obj).toEqual(original);
  });

  test('should handle object with inherited properties', () => {
    const parent = { inherited: 'parent' };
    const child = Object.create(parent);
    child.own = 'child';

    const result = orderByProps(child, []);

    // Должен учитывать только собственные свойства
    expect(result).toEqual([
      { key: 'own', value: 'child' }
    ]);
  });

  test('should handle order with duplicate keys', () => {
    const order = ['name', 'name', 'level'];
    const result = orderByProps(obj, order);

    // Дубликаты не должны создавать дублирующиеся записи
    expect(result).toEqual([
      { key: 'name', value: 'мечник' },
      { key: 'level', value: 2 },
      { key: 'attack', value: 80 },
      { key: 'defence', value: 40 },
      { key: 'health', value: 10 }
    ]);
  });

  test('should handle complex object with different value types', () => {
    const complexObj = {
      z: null,
      a: undefined,
      m: { nested: 'object' },
      b: [1, 2, 3],
      c () {},
      d: 123,
      e: 'string'
    };

    const result = orderByProps(complexObj, ['c', 'e']);

    expect(result).toEqual([
      { key: 'c', value: expect.any(Function) },
      { key: 'e', value: 'string' },
      { key: 'a', value: undefined },
      { key: 'b', value: [1, 2, 3] },
      { key: 'd', value: 123 },
      { key: 'm', value: { nested: 'object' } },
      { key: 'z', value: null }
    ]);
  });

  test('should handle empty object', () => {
    const result = orderByProps({}, ['key1', 'key2']);

    expect(result).toEqual([]);
  });

  test('should handle object with only ordered properties', () => {
    const testObj = { a: 1, b: 2, c: 3 };
    const result = orderByProps(testObj, ['c', 'a', 'b']);

    expect(result).toEqual([
      { key: 'c', value: 3 },
      { key: 'a', value: 1 },
      { key: 'b', value: 2 }
    ]);
  });

  test('should use for...in loop (check for own properties)', () => {
    const testObj = { a: 1, b: 2 };
    const spy = jest.spyOn(Object.prototype, 'hasOwnProperty');

    orderByProps(testObj, []);

    // Проверяем, что hasOwnProperty вызывается для каждого свойства
    expect(spy).toHaveBeenCalledTimes(2);
    spy.mockRestore();
  });

  // Дополнительные тесты для 100% покрытия
  test('should handle Symbol properties', () => {
    const sym = Symbol('test');
    const testObj = {
      [sym]: 'symbol value',
      regular: 'regular value'
    };

    const result = orderByProps(testObj, ['regular']);

    // Symbol свойства должны игнорироваться
    expect(result).toEqual([
      { key: 'regular', value: 'regular value' }
    ]);
  });

  test('should handle object with only Symbol properties', () => {
    const sym = Symbol('test');
    const testObj = {
      [sym]: 'symbol value'
    };

    const result = orderByProps(testObj, []);

    // Symbol свойства должны игнорироваться
    expect(result).toEqual([]);
  });

  test('should handle object with getter properties', () => {
    const testObj = {
      a: 1,
      get b () {
        return this.a * 2;
      }
    };

    const result = orderByProps(testObj, ['b', 'a']);

    expect(result).toEqual([
      { key: 'b', value: 2 },
      { key: 'a', value: 1 }
    ]);
  });

  test('should handle object with non-enumerable properties', () => {
    const testObj = { a: 1 };
    Object.defineProperty(testObj, 'hidden', {
      value: 'hidden value',
      enumerable: false
    });

    const result = orderByProps(testObj, ['a']);

    // Неперечисляемые свойства должны игнорироваться
    expect(result).toEqual([
      { key: 'a', value: 1 }
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
      const freshModule = require('../sortCharacters.js');

      // Проверяем что функция работает
      const result = freshModule.orderByProps({ a: 1 }, ['a']);
      expect(result).toEqual([{ key: 'a', value: 1 }]);
    });

    test('should work when module exists but module.exports is undefined', () => {
      // Устанавливаем module без exports
      global.module = {};

      // Перезагружаем модуль
      jest.resetModules();
      const freshModule = require('../sortCharacters.js');

      // Проверяем что функция работает
      const result = freshModule.orderByProps({ a: 1, b: 2 }, ['b']);
      expect(result).toEqual([
        { key: 'b', value: 2 },
        { key: 'a', value: 1 }
      ]);
    });

    test('should export correctly when module.exports exists', () => {
      // module и module.exports уже существуют в Node.js окружении
      // Этот тест проверяет нормальную работу
      const result = orderByProps({ x: 10, y: 20 }, ['y']);
      expect(result).toEqual([
        { key: 'y', value: 20 },
        { key: 'x', value: 10 }
      ]);
    });
  });
});
