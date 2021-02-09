import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import json from '@rollup/plugin-json';
import versionInjector from 'rollup-plugin-version-injector';
import nodePolyfills from 'rollup-plugin-node-polyfills';


const sourceMapsEnabled = true;

const outputMinified = [
    {
        file: 'dist/standalone.min.js',
        format: 'umd',
        plugins: [versionInjector(), terser()],
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
        plugins: [versionInjector()],
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
    plugins: [ commonjs(), nodePolyfills(), nodeResolve(), json(), typescript()],
    external: ['axios'],
};
