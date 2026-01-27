const { sortCharacters } = require('../sortCharacters');

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
  });

  test('should handle empty array', () => {
    expect(sortCharacters([])).toEqual([]);
  });

  test('should handle single character', () => {
    const characters = [{ name: 'маг', health: 100 }];
    expect(sortCharacters(characters)).toEqual([{ name: 'маг', health: 100 }]);
  });

  test('should handle characters with equal health', () => {
    const characters = [
      { name: 'воин', health: 50 },
      { name: 'маг', health: 50 },
      { name: 'лучник', health: 50 },
    ];

    const sorted = sortCharacters(characters);

    expect(sorted).toHaveLength(3);
    expect(sorted.every(char => char.health === 50)).toBe(true);
  });

  test('should not mutate original array', () => {
    const original = [
      { name: 'мечник', health: 10 },
      { name: 'маг', health: 100 },
    ];

    const originalCopy = [...original];
    const sorted = sortCharacters(original);

    expect(original).toEqual(originalCopy);
    expect(sorted).toEqual([
      { name: 'маг', health: 100 },
      { name: 'мечник', health: 10 },
    ]);
  });
});