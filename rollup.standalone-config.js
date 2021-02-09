import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import nodePolyfills from 'rollup-plugin-node-polyfills';
import replace from '@rollup/plugin-replace';

const sourceMapsEnabled = true;

const outputMinified = [
    {
        file: 'dist/standalone.min.js',
        format: 'umd',
        plugins: [terser()],
        sourcemap: sourceMapsEnabled,
        exports: 'auto',
        name: 'Ray',
        globals: {'axios': 'axios'},
    },
];

const outputUnminified = [
    {
        file: 'dist/standalone.js',
        format: 'umd',
        plugins: [],
        sourcemap: sourceMapsEnabled,
        exports: 'auto',
        name: 'Ray',
        globals: {'axios': 'axios'},
    },
];

export default {
    input: 'src/Ray.ts',
    output: [
        ...outputUnminified,
        ...outputMinified,
    ],
    plugins: [
        replace({
            __buildDate__: () => (new Date()).toISOString(),
            __buildVersion__: () => require('./package.json').version,
        }),
        commonjs(),
        nodePolyfills(),
        nodeResolve(),
        json(),
        typescript(),
    ],
    external: ['axios'],
};
