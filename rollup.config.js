import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import versionInjector from 'rollup-plugin-version-injector';

const options = {
    sourceMapsEnabled: !true,
    minified: false,
};

const versionInject = versionInjector({
    //injectInComments: {
    //    fileRegexp: /\.(cjs|mjs|js)$/,
    //    tag: 'Version: {version} - {date}',
    //    dateFormat: 'mmmm d, yyyy HH:MM:ss'
    //},
    injectInTags: {
        fileRegexp: /\.(cjs|mjs|js)$/,
        tagId: 'VI',
        dateFormat: 'mmmm d, yyyy HH:MM:ss'
    }
});

const outputs = {
    minified: options.minified ? [
        {
            file: 'dist/index.min.cjs.js',
            format: 'cjs',
            plugins: [versionInject, terser()],
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
        },
        {
            file: 'dist/index.esm.min.js',
            format: 'esm',
            plugins: [versionInject, terser()],
            sourcemap: options.sourceMapsEnabled,
        },
    ] : [],
    unminified: [
        {
            file: 'dist/index.cjs.js',
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
            plugins: [versionInject]
        },
        {
            file: 'dist/index.esm.js',
            format: 'esm',
            sourcemap: options.sourceMapsEnabled,
            plugins: [versionInject]
        },
    ],
    empty: [],
};

export default {
    input: 'src/RayNode.ts',
    output: [
        ...outputs.unminified,
        ...outputs.minified,
    ],
    plugins: [commonjs(), nodeResolve(), typescript()],
    external: ['axios', 'find-up', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'],
};
