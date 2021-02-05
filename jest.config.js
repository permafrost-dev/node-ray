module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__test__/.*|/tests/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],

    coverageDirectory: './coverage',
    coverageReporters: ['html', 'text'],
    collectCoverageFrom: [
        'src/**/*.{ts,js}',
        "!**/node_modules/**",
        "!**/vendor/**",
        '!**/dist/**',
        '!**/tests/**',
    ],
};

