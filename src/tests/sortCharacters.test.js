   import { sortCharacters } from '../sortCharacters';

describe('sortCharacters', () => {
  test('should sort characters by health in descending order', () => {
    const characters = [
      { name: 'мечник', health: 10 },
      { name: 'маг', health: 100 },
      { name: 'лучник', health: 80 },
    ];

    const sorted = sortCharacters(characters);

    expect(sorted).toEqual([
      { name: 'маг', health: 100 },
      { name: 'лучник', health: 80 },
      { name: 'мечник', health: 10 },
    ]);

    // Проверка, что toBe не работает для объектов
    expect(sorted).not.toBe([
      { name: 'маг', health: 100 },
      { name: 'лучник', health: 80 },
      { name: 'мечник', health: 10 },
    ]);
  });

  test('should handle empty array', () => {
    expect(sortCharacters([])).toEqual([]);
  });

  test('should handle single character', () => {
    const characters = [{ name: 'маг', health: 100 }];
    expect(sortCharacters(characters)).toEqual(characters);
  });

  test('should handle equal health values', () => {
    const characters = [
      { name: 'мечник', health: 50 },
      { name: 'маг', health: 50 },
      { name: 'лучник', health: 50 },
    ];

    const sorted = sortCharacters(characters);
    expect(sorted).toHaveLength(3);
    expect(sorted[0].health).toBe(50);
    expect(sorted[1].health).toBe(50);
    expect(sorted[2].health).toBe(50);
  });

  test('should not mutate original array', () => {
    const characters = [
      { name: 'мечник', health: 10 },
      { name: 'маг', health: 100 },
    ];

    const originalCharacters = [...characters];
    sortCharacters(characters);

    expect(characters).toEqual(originalCharacters);
  });
});