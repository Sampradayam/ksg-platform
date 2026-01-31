module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  // Run tests from both src and compiled JS, but ignore compiled files under dist
  testMatch: ['**/?(*.)+(spec|test).[jt]s?(x)'],
  testPathIgnorePatterns: ['/node_modules/', '/dist/'],
};
