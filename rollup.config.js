import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

const sourceMapsEnabled = false;

const outputMinified = [
    {
        file: 'dist/index.min.cjs',
        format: 'cjs',
        plugins: [terser()],
        sourcemap: sourceMapsEnabled,
        exports: 'auto',
    },
    {
        file: 'dist/index.min.mjs',
        format: 'esm',
        plugins: [terser()],
        sourcemap: sourceMapsEnabled,
    },
];

const outputUnminified = [
    {
        file: 'dist/index.cjs',
        format: 'cjs',
        sourcemap: sourceMapsEnabled,
        exports: 'auto',
    },
    {
        file: 'dist/index.mjs',
        format: 'esm',
        sourcemap: sourceMapsEnabled,
    },
];

export default {
    input: 'src/Ray.ts',
    output: [...outputUnminified],
    plugins: [nodeResolve(), commonjs(), typescript()],
    external: ['axios', 'find-up', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'],
};
