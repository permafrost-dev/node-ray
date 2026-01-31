import js from '@eslint/js';
import globals from 'globals';
import tsPlugin from '@typescript-eslint/eslint-plugin';
import tsParser from '@typescript-eslint/parser';

const tsRecommendedRules = tsPlugin.configs.recommended?.rules ?? {};

export default [
    {
        ignores: [
            'dist/**',
            'dist-*/**',
            'coverage/**',
            'node_modules/**',
            '*.bak',
            '*.d.ts',
            '*.lockb',
            'bun.lock',
            'package-lock.json',
            'biome.json',
            'prettier.config.js',
            'vite.config.js',
        ],
        linterOptions: {
            reportUnusedDisableDirectives: 'off',
        },
    },
    js.configs.recommended,
    {
        files: ['**/*.{ts,js}'],
        languageOptions: {
            parser: tsParser,
            parserOptions: {
                ecmaVersion: 2020,
                sourceType: 'module',
            },
            globals: {
                ...globals.node,
                ...globals.browser,
            },
        },
        plugins: {
            '@typescript-eslint': tsPlugin,
        },
        rules: {
            ...tsRecommendedRules,
            '@typescript-eslint/explicit-function-return-type': 'off',
            '@typescript-eslint/no-explicit-any': 'off',
            '@typescript-eslint/explicit-module-boundary-types': 'off',
            '@typescript-eslint/no-var-requires': 'off',
            '@typescript-eslint/no-empty-function': 'off',
            '@typescript-eslint/no-unused-vars': 'off',
            '@typescript-eslint/ban-ts-comment': 'off',
            indent: ['error', 4, { SwitchCase: 1 }],
            'no-useless-catch': 'off',
        },
    },
];
