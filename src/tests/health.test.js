const { healthIndicator } = require('../health');

describe('healthIndicator', () => {
  test('should return "healthy" for health > 50', () => {
    const character = { name: 'Маг', health: 90 };
    expect(healthIndicator(character)).toBe('healthy');
  });

  test('should return "wounded" for health between 15 and 50', () => {
    expect(healthIndicator({ name: 'Маг', health: 50 })).toBe('wounded');
    expect(healthIndicator({ name: 'Маг', health: 15 })).toBe('wounded');
    expect(healthIndicator({ name: 'Маг', health: 30 })).toBe('wounded');
  });

  test('should return "critical" for health < 15', () => {
    expect(healthIndicator({ name: 'Маг', health: 10 })).toBe('critical');
    expect(healthIndicator({ name: 'Маг', health: 0 })).toBe('critical');
    expect(healthIndicator({ name: 'Маг', health: 14 })).toBe('critical');
  });
});