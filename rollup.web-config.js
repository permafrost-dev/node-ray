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
    injectInTags: {
        fileRegexp: /\.(cjs|mjs|js)$/,
        tagId: 'VI',
        dateFormat: 'mmmm d, yyyy HH:MM:ss'
    }
});

const outputs = {
    minified: options.minified ? [
        {
            file: 'dist/web.cjs.min.js',
            format: 'cjs',
            plugins: [versionInject, terser()],
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
        },
        {
            file: 'dist/web.esm.min.mjs',
            format: 'esm',
            plugins: [versionInject, terser()],
            sourcemap: options.sourceMapsEnabled,
        },
    ] : [],
    unminified: [
        {
            file: 'dist/web.cjs.js',
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
            plugins: [versionInject]
        },
        {
            file: 'dist/web.esm.mjs',
            format: 'esm',
            sourcemap:  options.sourceMapsEnabled,
            plugins: [versionInject]
        },
    ],
    empty: []
}

export default {
    input: 'src/Ray.ts',
    output: [
        ...outputs.unminified,
        ...outputs.minified,
    ],
    plugins: [nodeResolve(), commonjs(), typescript()],
    external: ['axios', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'],
};
