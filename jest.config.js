/** @typedef {import('ts-jest')} */
/** @type {import('@jest/types').Config.InitialOptions} */
module.exports = {
  displayName: 'test',
  preset: 'ts-jest',
  testEnvironment: 'jsdom',
  coverageReporters: ['lcov', 'text'],
  transform: {
    '^.+\\.ts?$': 'ts-jest',
  },
  coveragePathIgnorePatterns: ['<rootDir>/dist/', '<rootDir>/example/', '<rootDir>/node_modules/'],
};
