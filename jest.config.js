module.exports = {
    preset: 'ts-jest/presets/js-with-ts',
    testEnvironment: 'node',
    transform: {
        '^.+\\.tsx?$': 'ts-jest',
    },
    testRegex: '(/__test__/.*|/tests/.*|(\\.|/)(test|spec))\\.[tj]sx?$',
    testPathIgnorePatterns: ['/node_modules/', '/dist/', '/build/', '/coverage/'],
    moduleFileExtensions: ['ts', 'tsx', 'js', 'jsx', 'json'],
    coverageDirectory: './coverage',
    coverageReporters: ['html', 'text'],
    collectCoverageFrom: [
        'src/*.ts',
        'src/**/*.{ts,js}',
        '!**/build/**',
        '!**/dist/**',
        "!**/node_modules/**",
        '!**/tests/**',
        "!**/vendor/**",
    ],
};

