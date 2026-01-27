jest.mock('../http');

const { getLevel } = require('../getLevel');
const fetchData = require('../http');

describe('getLevel', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  test('should return level for successful response', () => {
    fetchData.mockReturnValue({ status: 'ok', level: 5 });

    const result = getLevel(123);

    expect(fetchData).toHaveBeenCalledWith('https://server/user/123');
    expect(result).toBe('Ваш текущий уровень: 5');
  });

  test('should return unavailable message for non-ok status', () => {
    fetchData.mockReturnValue({ status: 'error' });

    const result = getLevel(456);

    expect(fetchData).toHaveBeenCalledWith('https://server/user/456');
    expect(result).toBe('Информация об уровне временно недоступна');
  });

  test('should handle network errors', () => {
    fetchData.mockImplementation(() => {
      throw new Error('Network error');
    });

    const result = getLevel(789);

    expect(fetchData).toHaveBeenCalledWith('https://server/user/789');
    expect(result).toBe('Информация об уровне временно недоступна');
  });
});