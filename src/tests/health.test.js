import { healthIndicator } from '../health';

describe('healthIndicator', () => {
  test('should return "healthy" for health > 50', () => {
    const character = { name: 'Маг', health: 90 };
    expect(healthIndicator(character)).toBe('healthy');
  });

  test('should return "wounded" for health between 15 and 50', () => {
    const character1 = { name: 'Маг', health: 50 };
    const character2 = { name: 'Маг', health: 15 };
    const character3 = { name: 'Маг', health: 30 };

    expect(healthIndicator(character1)).toBe('wounded');
    expect(healthIndicator(character2)).toBe('wounded');
    expect(healthIndicator(character3)).toBe('wounded');
  });

  test('should return "critical" for health < 15', () => {
    const character1 = { name: 'Маг', health: 10 };
    const character2 = { name: 'Маг', health: 0 };
    const character3 = { name: 'Маг', health: 14 };

    expect(healthIndicator(character1)).toBe('critical');
    expect(healthIndicator(character2)).toBe('critical');
    expect(healthIndicator(character3)).toBe('critical');
  });

  test('should handle edge cases', () => {
    expect(healthIndicator({ name: 'Маг', health: 51 })).toBe('healthy');
    expect(healthIndicator({ name: 'Маг', health: 49 })).toBe('wounded');
  });
});