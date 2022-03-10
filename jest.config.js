const { pathsToModuleNameMapper } = require('ts-jest/utils');

const tsConfigPaths = {
    '@/*': ['src/*'],
};

module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },

    extensionsToTreatAsEsm: ['.ts'],
    testRegex: '(/__test__/.*|/tests/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/tests/TestData/', '/tests/TestClasses/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    moduleNameMapper: pathsToModuleNameMapper(tsConfigPaths, { prefix: `${__dirname}/` }),

    coverageDirectory: './coverage',
    coverageReporters: ['html', 'text'],
    collectCoverageFrom: [
        'src/*.ts',
        'src/**/*.{ts,js}',
        '!**/build/**',
        '!**/dist/**',
        '!**/node_modules/**',
        '!**/tests/**',
        '!**/vendor/**',
    ],
};
