module.exports = {
  testEnvironment: 'jsdom',
  collectCoverageFrom: [
    'src/game/entities/Character.js',
    'src/game/entities/Bowerman.js',
    'src/game/entities/Swordsman.js',
    'src/game/entities/Magician.js',
    'src/game/entities/Daemon.js',
    'src/game/entities/Undead.js',
    'src/game/entities/Zombie.js',
    '!src/**/*.test.js',
    '!src/tests/**',
    '!src/assets/**',
    '!public/**',
    '!coverage/**',
    '!node_modules/**'
  ],
  coverageThreshold: {
    'src/game/entities/Character.js': {
      branches: 100,
      functions: 100,
      lines: 100,
      statements: 100
    }
  },
  moduleNameMapper: {
    '\\.(css|less|scss|sass)$': '<rootDir>/src/tests/mocks/styleMock.js',
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/src/tests/mocks/fileMock.js'
  }
};
