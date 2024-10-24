/**
 * @type {Partial<jest.InitialOptions>}
 */
const config = {
  preset: 'ts-jest',
  rootDir: '..',
  testMatch: [
    '<rootDir>/src/**/__tests__/**/*.ts?(x)',
    '<rootDir>/src/**/?(*.)+(spec|test).ts?(x)',
    '<rootDir>/src/__tests__/file-parser.spec.ts',
    '<rootDir>/src/__tests__/dependency-analyzer.spec.ts',
    '<rootDir>/src/__tests__/data-storage.spec.ts',
    '<rootDir>/src/__tests__/repository-manager.spec.ts',
    '<rootDir>/src/__tests__/query-interface.spec.ts',
    '<rootDir>/src/__tests__/rollup-config.spec.ts',
    '<rootDir>/src/__tests__/build.spec.ts',
    '<rootDir>/src/__tests__/copy.spec.ts',
  ],
  testPathIgnorePatterns: ['dist'],
  coverageThreshold: {
    global: {
      branches: 80,
      functions: 80,
      lines: 80,
      statements: 80,
    },
  },
  setupFiles: ['<rootDir>/config/setup-tests.js'],
  watchPlugins: [
    'jest-watch-typeahead/filename',
    'jest-watch-typeahead/testname',
  ],
}

module.exports = config
