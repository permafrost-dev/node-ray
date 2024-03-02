module.exports = {
    parser: '@typescript-eslint/parser',
    parserOptions: {
        ecmaVersion: 2020, // Allows for the parsing of modern ECMAScript features
        sourceType: 'module', // Allows for the use of imports
    },
    env: {
        node: true,
        browser: false,
        commonjs: true,
    },
    settings: {},
    extends: ['plugin:@typescript-eslint/recommended', 'eslint:recommended'],
    rules: {
        '@typescript-eslint/explicit-function-return-type': 'off',
        '@typescript-eslint/no-explicit-any': 'off',
        '@typescript-eslint/explicit-module-boundary-types': 'off',
        '@typescript-eslint/no-var-requires': 'off',
        '@typescript-eslint/no-empty-function': 'off',
        // 'newline-per-chained-call': ['error', { ignoreChainWithDepth: 2 }],
        indent: ['error', 4, { SwitchCase: 1 }],
    },
};
