// Настройки для тестов Jest

// Моки для тестирования
global.console = {
  ...console,
  log: jest.fn(),
  error: jest.fn(),
  warn: jest.fn()
};
