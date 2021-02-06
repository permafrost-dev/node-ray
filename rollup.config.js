import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import versionInjector from 'rollup-plugin-version-injector';

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

export default {
    input: 'src/Ray.ts',
    output: [...outputUnminified],
    plugins: [nodeResolve(), commonjs(), versionInject, typescript()],
    external: ['axios', 'find-up', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'],
};
