// jest.config.js
module.exports = {
  testEnvironment: 'node',
  // setupFilesAfterEnv es la opción correcta (setupFilesAfterFramework no existe)
  setupFilesAfterEnv: ['<rootDir>/src/__tests__/setup.js'],
  testMatch: ['**/__tests__/**/*.test.js'],
  verbose: true,
  forceExit: true,
  testTimeout: 10000  // Dar más tiempo para crear tablas
};