const module = require('../sortCharacters.js');

describe('sortCharacters.js - 100% Coverage Tests', () => {
  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(console, 'log').mockImplementation(() => {});
    jest.spyOn(console, 'error').mockImplementation(() => {});
  });

  afterEach(() => {
    jest.restoreAllMocks();
    // Восстанавливаем оригинальную реализацию после каждого теста
    module.__testExports.fetchCharacterDataImpl = module.__testExports.originalFetchCharacterDataImpl;
  });

  // Базовые тесты экспорта
  test('модуль экспортирует все функции', () => {
    expect(typeof module.sortCharacters).toBe('function');
    expect(typeof module.createCharactersFromData).toBe('function');
    expect(typeof module.GameCharacter).toBe('function');
    expect(typeof module.fetchCharacterData).toBe('function');
    expect(typeof module.processCharacter).toBe('function');
    expect(typeof module.runCharacterExamples).toBe('function');
    expect(typeof module.characterGenerator).toBe('function');
    expect(typeof module.logCharacter).toBe('function');
    expect(typeof module.__testExports).toBe('object');
  });

  test('модуль экспортирует константы', () => {
    expect(Array.isArray(module.characters)).toBe(true);
    expect(Array.isArray(module.alive)).toBe(true);
    expect(Array.isArray(module.heroes)).toBe(true);
    expect(Array.isArray(module.allCharacters)).toBe(true);
  });

  // sortCharacters function tests
  test('sortCharacters сортирует по убыванию здоровья', () => {
    const result = module.sortCharacters(module.characters);
    expect(result[0].health).toBe(100);
    expect(result[1].health).toBe(10);
    expect(result[2].health).toBe(0);
    expect(result[3].health).toBe(0);
  });

  test('sortCharacters живые перед мертвыми', () => {
    const testCharacters = [
      { name: 'мертвый', health: 0 },
      { name: 'живой', health: 50 }
    ];
    const result = module.sortCharacters(testCharacters);
    expect(result[0].name).toBe('живой');
    expect(result[1].name).toBe('мертвый');
  });

  test('sortCharacters ошибка при не-массиве', () => {
    expect(() => module.sortCharacters(null)).toThrow('characters должен быть массивом');
    expect(() => module.sortCharacters(undefined)).toThrow('characters должен быть массивом');
    expect(() => module.sortCharacters('string')).toThrow('characters должен быть массивом');
    expect(() => module.sortCharacters(123)).toThrow('characters должен быть массивом');
    expect(() => module.sortCharacters({})).toThrow('characters должен быть массивом');
  });

  // createCharactersFromData function tests
  test('createCharactersFromData преобразует данные', () => {
    const data = [
      { name: 'мечник', health: 10 },
      { name: 'маг', health: 100 }
    ];
    const result = module.createCharactersFromData(data);
    expect(result[0].type).toBe('Swordsman');
    expect(result[1].type).toBe('Magician');
  });

  test('createCharactersFromData ошибка при не-массиве', () => {
    expect(() => module.createCharactersFromData(null)).toThrow('data должен быть массивом');
    expect(() => module.createCharactersFromData(undefined)).toThrow('data должен быть массивом');
    expect(() => module.createCharactersFromData('string')).toThrow('data должен быть массивом');
    expect(() => module.createCharactersFromData(123)).toThrow('data должен быть массивом');
    expect(() => module.createCharactersFromData({})).toThrow('data должен быть массивом');
  });

  test('createCharactersFromData ошибка при неизвестном типе', () => {
    expect(() => module.createCharactersFromData([{ name: 'неизвестный', health: 10 }]))
      .toThrow('Неизвестный тип персонажа: неизвестный');
  });

  // GameCharacter class tests
  test('GameCharacter создает экземпляр', () => {
    const char = new module.GameCharacter('тест', 50);
    expect(char.name).toBe('тест');
    expect(char.health).toBe(50);
    expect(char.createdAt).toBeDefined();
    expect(char.isAlive()).toBe(true);
    expect(char.status).toBe('жив');
  });

  test('GameCharacter статический метод createHero', () => {
    const hero = module.GameCharacter.createHero('герой');
    expect(hero.name).toBe('герой');
    expect(hero.health).toBe(100);
  });

  test('GameCharacter разные значения здоровья', () => {
    expect(new module.GameCharacter('1', 1).isAlive()).toBe(true);
    expect(new module.GameCharacter('0', 0).isAlive()).toBe(false);
    expect(new module.GameCharacter('-1', -1).isAlive()).toBe(false);
    expect(new module.GameCharacter('null', null).isAlive()).toBe(false);
    expect(new module.GameCharacter('undefined', undefined).isAlive()).toBe(false);
  });

  // logCharacter function tests
  test('logCharacter логирует персонажа', () => {
    const result = module.logCharacter({ name: 'тест', health: 50, level: 2 });
    expect(result).toEqual({ name: 'тест', health: 50, status: 'жив' });
    expect(console.log).toHaveBeenCalled();
  });

  test('logCharacter с разными значениями здоровья', () => {
    module.logCharacter({ name: 'живой', health: 1 });
    module.logCharacter({ name: 'мертвый', health: 0 });
    module.logCharacter({ name: 'отрицательный', health: -1 });
    module.logCharacter({ name: 'null', health: null });
    module.logCharacter({ name: 'undefined', health: undefined });
    expect(console.log).toHaveBeenCalledTimes(5);
  });

  // characterGenerator function tests
  test('characterGenerator создает генератор', () => {
    const data = [{ name: 'тест', health: 50 }];
    const gen = module.characterGenerator(data);
    const result = gen.next();
    expect(result.value.name).toBe('тест');
    expect(result.done).toBe(false);
  });

  test('characterGenerator ошибка при не-массиве', () => {
    expect(() => {
      const gen = module.characterGenerator(null);
      gen.next();
    }).toThrow('data должен быть массивом');
  });

  test('characterGenerator с пустым массивом', () => {
    const gen = module.characterGenerator([]);
    const result = gen.next();
    expect(result.value).toBeUndefined();
    expect(result.done).toBe(true);
  });

  // Константы tests
  test('allCharacters содержит корректные данные', () => {
    expect(module.allCharacters).toHaveLength(8);
    expect(module.allCharacters[0]).toEqual({ name: 'мечник', health: 10 });
    expect(module.allCharacters[4]).toBeInstanceOf(module.GameCharacter);
    expect(module.allCharacters[4].name).toBe('мечник');
  });

  test('alive содержит только живых персонажей', () => {
    expect(module.alive).toHaveLength(2);
    expect(module.alive.every(c => c.health > 0)).toBe(true);
  });

  // КРИТИЧЕСКИ ВАЖНЫЕ ТЕСТЫ для полного покрытия fetchCharacterDataImpl
  describe('fetchCharacterDataImpl полное покрытие', () => {
    beforeEach(() => {
      jest.useFakeTimers();
    });

    afterEach(() => {
      jest.useRealTimers();
    });

    test('успешный resolve для id=1', async () => {
      const promise = module.fetchCharacterData(1);
      jest.advanceTimersByTime(10);
      const result = await promise;
      expect(result).toEqual({ id: 1, name: 'друид', health: 50 });
    });

    test('успешный resolve для id=2', async () => {
      const promise = module.fetchCharacterData(2);
      jest.advanceTimersByTime(10);
      const result = await promise;
      expect(result).toEqual({ id: 2, name: 'рыцарь', health: 150 });
    });

    test('успешный resolve для id=3', async () => {
      const promise = module.fetchCharacterData(3);
      jest.advanceTimersByTime(10);
      const result = await promise;
      expect(result).toEqual({ id: 3, name: 'ведьмак', health: 120 });
    });

    test('reject для несуществующего id', async () => {
      const promise = module.fetchCharacterData(999);
      jest.advanceTimersByTime(10);
      await expect(promise).rejects.toThrow('Персонаж не найден');
    });
  });

  // Асинхронные функции
  describe('Асинхронные функции', () => {
    test('fetchCharacterData возвращает промис', () => {
      jest.useFakeTimers();
      const promise = module.fetchCharacterData(1);
      expect(promise).toBeInstanceOf(Promise);
      jest.advanceTimersByTime(10);
      return promise.then((result) => {
        expect(result).toEqual({ id: 1, name: 'друид', health: 50 });
        jest.useRealTimers();
      });
    });

    test('fetchCharacterData работает', async () => {
      jest.useFakeTimers();
      const promise = module.fetchCharacterData(1);
      jest.advanceTimersByTime(10);
      const result = await promise;
      expect(result).toEqual({ id: 1, name: 'друид', health: 50 });
      jest.useRealTimers();
    });

    test('fetchCharacterData работает для всех id', async () => {
      jest.useFakeTimers();
      // Используем один промис за раз с продвижением таймеров
      const promise1 = module.fetchCharacterData(1);
      jest.advanceTimersByTime(10);
      const result1 = await promise1;
      expect(result1.id).toBe(1);

      const promise2 = module.fetchCharacterData(2);
      jest.advanceTimersByTime(10);
      const result2 = await promise2;
      expect(result2.id).toBe(2);

      const promise3 = module.fetchCharacterData(3);
      jest.advanceTimersByTime(10);
      const result3 = await promise3;
      expect(result3.id).toBe(3);
      jest.useRealTimers();
    });

    test('fetchCharacterData reject при несуществующем id', async () => {
      jest.useFakeTimers();
      const promise = module.fetchCharacterData(999);
      jest.advanceTimersByTime(10);
      await expect(promise).rejects.toThrow('Персонаж не найден');
      jest.useRealTimers();
    });

    // Тесты для validateCharacterData
    test('validateCharacterData проходит валидацию при корректных данных', () => {
      expect(() => module.__testExports.validateCharacterData({
        name: 'тест',
        health: 50
      })).not.toThrow();
    });

    test('validateCharacterData выбрасывает ошибку при пустом имени', () => {
      expect(() => module.__testExports.validateCharacterData({
        name: '',
        health: 50
      })).toThrow('Некорректные данные персонажа');
    });

    test('validateCharacterData выбрасывает ошибку при отсутствии имени', () => {
      expect(() => module.__testExports.validateCharacterData({
        health: 50
      })).toThrow('Некорректные данные персонажа');
    });

    test('validateCharacterData выбрасывает ошибку при null health', () => {
      expect(() => module.__testExports.validateCharacterData({
        name: 'тест',
        health: null
      })).toThrow('Некорректные данные персонажа');
    });

    test('validateCharacterData выбрасывает ошибку при undefined health', () => {
      expect(() => module.__testExports.validateCharacterData({
        name: 'тест',
        health: undefined
      })).toThrow('Некорректные данные персонажа');
    });

    test('validateCharacterData выбрасывает ошибку при отсутствии health', () => {
      expect(() => module.__testExports.validateCharacterData({
        name: 'тест'
      })).toThrow('Некорректные данные персонажа');
    });

    // Тесты для processCharacter
    test('processCharacter с валидными данными', async () => {
      jest.useFakeTimers();
      const promise = module.processCharacter(2);
      jest.advanceTimersByTime(10);
      const result = await promise;
      expect(result.name).toBe('рыцарь');
      expect(result.health).toBe(150);
      expect(result.isAlive).toBe(true);
      jest.useRealTimers();
    });

    test('processCharacter возвращает все поля', async () => {
      jest.useFakeTimers();
      const promise = module.processCharacter(1);
      jest.advanceTimersByTime(10);

      const result = await promise;

      expect(result).toHaveProperty('id', 1);
      expect(result).toHaveProperty('name', 'друид');
      expect(result).toHaveProperty('health', 50);
      expect(result).toHaveProperty('status', 'жив');
      expect(result).toHaveProperty('isAlive', true);
      expect(result).toHaveProperty('processedAt');
      jest.useRealTimers();
    });

    test('processCharacter catch блок полностью покрыт', async () => {
      // Сохраняем оригинальную реализацию
      const originalImpl = module.__testExports.fetchCharacterDataImpl;

      try {
        // Создаем mock, который сразу выбрасывает ошибку
        const mockError = new Error('Тестовая ошибка в fetch');
        const mockImpl = jest.fn().mockRejectedValue(mockError);

        // Устанавливаем mock
        module.__testExports.fetchCharacterDataImpl = mockImpl;

        // Вызываем processCharacter и ожидаем ошибку
        await expect(module.processCharacter(1)).rejects.toThrow('Тестовая ошибка в fetch');

        // Проверяем, что console.error был вызван
        expect(console.error).toHaveBeenCalledWith(
          'Ошибка обработки персонажа:',
          'Тестовая ошибка в fetch'
        );

        // Проверяем, что mock был вызван с правильным аргументом
        expect(mockImpl).toHaveBeenCalledWith(1);
      } finally {
        // Восстанавливаем оригинальную функцию
        module.__testExports.fetchCharacterDataImpl = originalImpl;
      }
    });

    test('processCharacter catch блок с ошибкой валидации', async () => {
      jest.useFakeTimers();

      // Сохраняем оригинальную реализацию
      const originalImpl = module.__testExports.fetchCharacterDataImpl;

      try {
        // Мокаем fetchCharacterDataImpl, чтобы возвращать данные, которые не пройдут валидацию
        const mockImpl = jest.fn().mockResolvedValue({ name: 'тест', health: null });
        module.__testExports.fetchCharacterDataImpl = mockImpl;

        // Вызываем processCharacter и ожидаем ошибку валидации
        const promise = module.processCharacter(1);
        jest.advanceTimersByTime(10);

        await expect(promise).rejects.toThrow('Некорректные данные персонажа');

        // Проверяем, что console.error был вызван
        expect(console.error).toHaveBeenCalledWith(
          'Ошибка обработки персонажа:',
          'Некорректные данные персонажа'
        );
      } finally {
        // Восстанавливаем
        module.__testExports.fetchCharacterDataImpl = originalImpl;
        jest.useRealTimers();
      }
    });
  });

  // runCharacterExamples function tests
  describe('runCharacterExamples function', () => {
    test('работает без ошибок', () => {
      const results = module.runCharacterExamples();
      expect(results.sorted).toHaveLength(4);
      expect(results.gameHeroes).toHaveLength(4);
      expect(results.combined).toHaveLength(8);
    });

    test('обрабатывает ошибку в sortCharacters', () => {
      const originalDeps = module.__testExports.internalDeps;
      try {
        module.__testExports.internalDeps = {
          ...originalDeps,
          sortCharacters: jest.fn(() => {
            throw new Error('Тестовая ошибка в sortCharacters');
          })
        };
        const results = module.runCharacterExamples();
        expect(results.sorted).toEqual([]);
        expect(results.gameHeroes).toEqual([]);
        expect(results.combined).toEqual([]);
      } finally {
        module.__testExports.internalDeps = originalDeps;
      }
    });

    test('обрабатывает ошибку в logCharacter внутри цикла', () => {
      const originalDeps = module.__testExports.internalDeps;
      try {
        let callCount = 0;
        module.__testExports.internalDeps = {
          ...originalDeps,
          logCharacter: jest.fn(() => {
            callCount += 1;
            if (callCount === 1) {
              throw new Error('Тестовая ошибка в logCharacter');
            }
            return { name: 'тест', health: 10, status: 'жив' };
          })
        };
        const results = module.runCharacterExamples();
        expect(results.sorted).toEqual([]);
        expect(results.gameHeroes).toEqual([]);
        expect(results.combined).toEqual([]);
      } finally {
        module.__testExports.internalDeps = originalDeps;
      }
    });

    test('обрабатывает ошибку в map при создании gameHeroes', () => {
      const originalMap = Array.prototype.map;
      try {
        Array.prototype.map = function mockMap () {
          throw new Error('Тестовая ошибка в map');
        };
        const results = module.runCharacterExamples();
        expect(results.sorted).toEqual([]);
        expect(results.gameHeroes).toEqual([]);
        expect(results.combined).toEqual([]);
      } finally {
        Array.prototype.map = originalMap;
      }
    });
  });

  // Тест для проверки __testExports getters/setters
  test('__testExports позволяет мокировать функции', () => {
    // Проверяем, что getter работает
    const originalImpl = module.__testExports.fetchCharacterDataImpl;
    expect(typeof originalImpl).toBe('function');

    // Проверяем, что setter работает
    const mockImpl = jest.fn();
    module.__testExports.fetchCharacterDataImpl = mockImpl;
    expect(module.__testExports.fetchCharacterDataImpl).toBe(mockImpl);

    // Восстанавливаем
    module.__testExports.fetchCharacterDataImpl = originalImpl;
  });

  // Тест для проверки internalDeps getters/setters
  test('__testExports позволяет мокировать internalDeps', () => {
    const originalDeps = module.__testExports.internalDeps;
    const mockDeps = {
      sortCharacters: jest.fn(),
      logCharacter: jest.fn(),
      GameCharacter: class MockCharacter {},
      characterGenerator: jest.fn()
    };

    try {
      module.__testExports.internalDeps = mockDeps;
      expect(module.__testExports.internalDeps).toBe(mockDeps);
    } finally {
      module.__testExports.internalDeps = originalDeps;
    }
  });

  // Дополнительные тесты для полного покрытия
  test('characterGenerator полностью покрыт', () => {
    const data = [{ name: 'тест1', health: 50 }, { name: 'тест2', health: 30 }];
    const gen = module.characterGenerator(data);

    const result1 = gen.next();
    expect(result1.value.name).toBe('тест1');
    expect(result1.done).toBe(false);

    const result2 = gen.next();
    expect(result2.value.name).toBe('тест2');
    expect(result2.done).toBe(false);

    const result3 = gen.next();
    expect(result3.value).toBeUndefined();
    expect(result3.done).toBe(true);
  });

  test('logCharacter с полными данными', () => {
    const char = {
      name: 'тест', health: 75, level: 5, extra: 'field'
    };
    const result = module.logCharacter(char);
    expect(result).toEqual({ name: 'тест', health: 75, status: 'жив' });
  });

  test('sortCharacters с одинаковым здоровьем', () => {
    const testChars = [
      { name: 'первый', health: 50 },
      { name: 'второй', health: 50 },
      { name: 'третий', health: 30 }
    ];
    const result = module.sortCharacters(testChars);
    expect(result[0].health).toBe(50);
    expect(result[1].health).toBe(50);
    expect(result[2].health).toBe(30);
  });

  // Тест для проверки, что оригинальная реализация сохранена
  test('originalFetchCharacterDataImpl доступен', () => {
    expect(typeof module.__testExports.originalFetchCharacterDataImpl).toBe('function');
  });
});
