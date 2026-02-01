const testBabel = async () => {
  // ES6+ возможности
  const promise = new Promise((resolve) => {
    setTimeout(() => resolve('Babel работает!'), 100);
  });

  const result = await promise;
  console.log(result);

  // Стрелочные функции
  const multiply = (a, b) => a * b;

  // Template literals
  const name = 'Defender';
  console.log(`Игра: ${name}`);

  // Деструктуризация
  const game = { title: 'Defender', version: '1.0.0' };
  const { title, version } = game;

  return { multiply, title, version };
};

testBabel();
