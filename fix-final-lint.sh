#!/bin/bash

echo "Финальное исправление ESLint..."

# Очищаем файлы от всех пустых строк
sed -i -e :a -e '/^\n*$/d;N;ba' src/tests/mocks/fileMock.js
sed -i -e :a -e '/^\n*$/d;N;ba' src/tests/mocks/styleMock.js

# Добавляем правильное содержимое без пустых строк
echo -n 'module.exports = "test-file-stub";' > src/tests/mocks/fileMock.js
echo -n 'module.exports = {};' > src/tests/mocks/styleMock.js

echo "✅ Файлы исправлены"
