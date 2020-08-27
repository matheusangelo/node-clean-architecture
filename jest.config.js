// For a detailed explanation regarding each configuration property, visit:
// https://jestjs.io/docs/en/configuration.html

module.exports = {
    roots: [
        '<rootDir>/src'
    ],
    clearMocks: true,
    collectCoverageFrom: ['<rootDir>/src/**/*.ts'],
    coverageDirectory: "coverage",
    // Indicates which provider should be used to instrument code for coverage
    coverageProvider: "v8",
    testEnvironment: "node",
    transform: {
        '.+\\.ts$': 'ts-jest'
    },
    preset: '@shelf/jest-mongodb'
};