module.exports = {
  testEnvironment: 'node',
  roots: ['<rootDir>/src'],
  testMatch: ['**/__tests__/**/*.js', '**/?(*.)+(spec|test).js'],
  coverageDirectory: 'coverage',
  collectCoverageFrom: [
    'src/**/*.js',
    '!src/config/**/*.js',
    '!src/app.js',
    '!src/index.js'
  ],
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  verbose: true,
};