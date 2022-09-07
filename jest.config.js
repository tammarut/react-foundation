module.exports = {
  preset: 'ts-jest',
  testMatch: ['**/src/**/?(*.)+(spec|test).[jt]s?(x)'],
  setupFilesAfterEnv: ['<rootDir>/src/setupTests.ts'],
  moduleNameMapper: {
    '\\.(jpg|jpeg|png|gif|eot|otf|webp|svg|ttf|woff|woff2|mp4|webm|wav|mp3|m4a|aac|oga)$':
      '<rootDir>/__mocks__/fileMock.js',
    '\\.(css|less|scss|sass)$': 'identity-obj-proxy',
  },
  testEnvironment: 'jest-environment-jsdom',
  coverageDirectory: 'coverage',
  collectCoverageFrom: ['src/**/*.(ts|tsx)', '!src/**/*.d.ts'],
  verbose: true,
}
