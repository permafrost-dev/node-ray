import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';

export default {
    input: 'src/Ray.ts',
    output: [
        {
            file: 'dist/index.cjs',
            format: 'cjs',
            sourcemap: true,
            exports: 'auto',
        },
        {
            file: 'dist/index.min.cjs',
            format: 'cjs',
            plugins: [terser()],
            sourcemap: true,
            exports: 'auto',
        },
        {
            file: 'dist/index.mjs',
            format: 'esm',
            sourcemap: true,
        },
        {
            file: 'dist/index.min.mjs',
            format: 'esm',
            plugins: [terser()],
            sourcemap: true,
        },
    ],
    plugins: [nodeResolve(), commonjs(), typescript()],
    external: ['axios', 'find-up', 'md5', 'pretty-format', 'xml-formatter', 'uuid'],
};
