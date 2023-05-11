import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
//import { terser } from 'rollup-plugin-terser';
import json from '@rollup/plugin-json';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';

const options = {
    sourceMapsEnabled: !true,
    minified: false,
};

const outputs = {
    minified: options.minified
        ? [
            {
                file: 'dist/index.min.cjs.js',
                format: 'cjs',
                plugins: [],
                sourcemap: options.sourceMapsEnabled,
                exports: 'auto',
            },
            {
                file: 'dist/index.esm.min.mjs',
                format: 'esm',
                plugins: [],
                sourcemap: options.sourceMapsEnabled,
            },
        ]
        : [],
    unminified: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
            plugins: [],
        },
        {
            file: 'dist/index.esm.mjs',
            format: 'esm',
            sourcemap: options.sourceMapsEnabled,
            plugins: [],
        },
    ],
    empty: [],
};

export default {
    input: 'src/RayNode.ts',
    output: [...outputs.unminified, ...outputs.minified],
    plugins: [
        replace({
            values: {
                __buildDate__: () => new Date().toISOString(),
                __buildVersion__: () => require('./package.json').version,
            },
            preventAssignment: true,
        }),
        commonjs(),
        nodeResolve(),
        json(),
        typescript(),
    ],
    external: [
        'axios',
        'find-up',
        'dayjs',
        'stopwatch-node',
        'md5',
        '@permafrost-dev/pretty-format',
        'stacktrace-js',
        'xml-formatter',
        'uuid',
    ],
};
