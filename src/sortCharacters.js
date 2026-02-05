// src/sortCharacters.js
export function orderByProps (obj, order) {
  // Проверка входных данных - должен быть обычный объект, не массив и не функция
  if (typeof obj !== 'object' || obj === null || Array.isArray(obj) || typeof obj === 'function') {
    throw new Error('Первый аргумент должен быть объектом');
  }

  if (!Array.isArray(order)) {
    throw new Error('Второй аргумент должен быть массивом');
  }

  const result = [];
  const remainingProps = [];
  const usedKeys = new Set();

  // Используем for...in для перебора свойств объекта
  // Сначала собираем свойства в порядке, указанном в массиве
  for (const key of order) {
    if (key in obj && !usedKeys.has(key)) {
      result.push({ key, value: obj[key] });
      usedKeys.add(key);
    }
  }

  // Затем собираем все оставшиеся свойства
  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key) && !usedKeys.has(key)) {
      remainingProps.push({ key, value: obj[key] });
    }
  }

  // Сортируем оставшиеся свойства по алфавиту
  remainingProps.sort((a, b) => a.key.localeCompare(b.key));

  return [...result, ...remainingProps];
}

// Простой CommonJS экспорт без сложных условий
module.exports = { orderByProps };
