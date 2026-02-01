#!/bin/bash

echo "=========================================="
echo "Запуск ВСЕХ тестов с покрытием 100%"
echo "=========================================="

echo ""
echo "1. Тестируем health.js..."
npx jest src/tests/health.test.js --coverage --collectCoverageFrom=src/health.js --silent

HEALTH_COVERAGE=$?
if [ $HEALTH_COVERAGE -eq 0 ]; then
  echo "✅ health.js: 100% покрытие"
else
  echo "❌ health.js: не достигнуто 100% покрытие"
fi

echo ""
echo "2. Тестируем Character.js..."
npx jest src/tests/Character.test.js src/tests/Character.additional.test.js --coverage --collectCoverageFrom=src/game/entities/Character.js --silent

CHARACTER_COVERAGE=$?
if [ $CHARACTER_COVERAGE -eq 0 ]; then
  echo "✅ Character.js: 100% покрытие"
else
  echo "❌ Character.js: не достигнуто 100% покрытие"
fi

echo ""
echo "3. Тестируем sortCharacters.js..."
npx jest src/tests/sortCharacters.coverage.test.js --coverage --collectCoverageFrom=src/sortCharacters.js --silent

SORT_COVERAGE=$?
if [ $SORT_COVERAGE -eq 0 ]; then
  echo "✅ sortCharacters.js: 100% покрытие"
else
  echo "❌ sortCharacters.js: не достигнуто 100% покрытие"
fi

echo ""
echo "4. Тестируем getLevel.js..."
npx jest src/tests/getLevel.test.js --coverage --collectCoverageFrom=src/getLevel.js --silent

GETLEVEL_COVERAGE=$?
if [ $GETLEVEL_COVERAGE -eq 0 ]; then
  echo "✅ getLevel.js: 100% покрытие"
else
  echo "❌ getLevel.js: не достигнуто 100% покрытие"
fi

echo ""
echo "5. ИТОГОВЫЙ ОТЧЕТ..."
echo "=========================================="

if [ $HEALTH_COVERAGE -eq 0 ] && [ $CHARACTER_COVERAGE -eq 0 ] && [ $SORT_COVERAGE -eq 0 ] && [ $GETLEVEL_COVERAGE -eq 0 ]; then
  echo "🎉 ВСЕ файлы достигли 100% покрытия!"
  echo "✅ health.js"
  echo "✅ Character.js"
  echo "✅ sortCharacters.js"
  echo "✅ getLevel.js"
else
  echo "⚠️  Некоторые файлы не достигли 100% покрытия"
  echo "Откройте coverage/lcov-report/index.html для деталей"
fi

echo "=========================================="