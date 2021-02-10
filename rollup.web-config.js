import commonjs from '@rollup/plugin-commonjs';
import { nodeResolve } from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import typescript from '@rollup/plugin-typescript';
import replace from '@rollup/plugin-replace';

const options = {
    sourceMapsEnabled: !true,
    minified: false,
};

const outputs = {
    minified: options.minified
        ? [
              {
                  file: 'dist/web.cjs.min.js',
                  format: 'cjs',
                  plugins: [terser()],
                  sourcemap: options.sourceMapsEnabled,
                  exports: 'auto',
              },
              {
                  file: 'dist/web.esm.min.mjs',
                  format: 'esm',
                  plugins: [terser()],
                  sourcemap: options.sourceMapsEnabled,
              },
          ]
        : [],
    unminified: [
        {
            file: 'dist/web.cjs.js',
            format: 'cjs',
            sourcemap: options.sourceMapsEnabled,
            exports: 'auto',
            plugins: [],
        },
        {
            file: 'dist/web.esm.mjs',
            format: 'esm',
            sourcemap: options.sourceMapsEnabled,
            plugins: [],
        },
    ],
    empty: [],
};

export default {
    input: 'src/Ray.ts',
    output: [...outputs.unminified, ...outputs.minified],
    plugins: [
        replace({
            __buildDate__: () => new Date().toISOString(),
            __buildVersion__: () => require('./package.json').version,
        }),
        commonjs(),
        nodeResolve(),
        typescript(),
    ],
    external: ['axios', 'md5', 'pretty-format', 'stacktrace-js', 'xml-formatter', 'uuid'],
};
