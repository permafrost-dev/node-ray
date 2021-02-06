import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';

const sourceMapsEnabled = false;


const outputMinified = [
    {
        file: 'dist/standalone.min.js',
        format: 'umd',
        plugins: [terser()],
        sourcemap: sourceMapsEnabled,
        exports: 'auto',
        name: 'Ray',
    },
];

const outputUnminified = [
    {
        file: 'dist/standalone.js',
        format: 'umd',
        sourcemap: sourceMapsEnabled,
        exports: 'auto',
        name: 'Ray',
    },
];

export default {
    input: 'src/Ray.ts',
    output: [
        ...outputUnminified,
    ],
    plugins: [nodeResolve(), json(), commonjs(), typescript()],
    external: [], //'axios', 'find-up', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'
};
