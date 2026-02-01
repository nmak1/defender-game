// Простой мок для http запросов
export default function fetchData (url) {
  // Это заглушка для тестов
  // В реальной игре здесь будет fetch или XMLHttpRequest
  console.log(`Fetching data from: ${url}`);
  return { status: 'ok', level: 1 };
}

// Для CommonJS тестов
if (typeof module !== 'undefined' && module.exports) {
  module.exports = fetchData;
}
