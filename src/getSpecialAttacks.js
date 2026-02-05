// src/getSpecialAttacks.js
export default function getSpecialAttacks ({ special = [] } = {}) {
  // Проверяем, что special - это массив
  if (!Array.isArray(special)) {
    return [];
  }

  // Проверяем каждый элемент массива
  return special.map((attack) => {
    // Деструктурируем с значениями по умолчанию
    const {
      id = undefined,
      name = undefined,
      icon = undefined,
      description = 'Описание недоступно'
    } = attack || {};

    return {
      id,
      name,
      icon,
      description
    };
  });
}

// Простой CommonJS экспорт без сложных условий
module.exports = getSpecialAttacks;
