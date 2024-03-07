import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, build as viteBuild } from 'vite';

const dependencyNames = [
    '@permafrost-dev/pretty-format',
    'axios',
    'dayjs',
    'error-stack-parser',
    'find-up',
    'md5',
    'stacktrace-js',
    'stopwatch-node',
    'uuid',
    'xml-formatter',
];

const getDependencyNames = (isStandaloneBuild = false) => {
    return isStandaloneBuild
        ? []
        : dependencyNames.concat(['fs', 'node:fs', 'node:fs/promises', 'node:os', 'node:path', 'node:process', 'os', 'path']);
};

const globalConfig = {
    outDir: resolve(dirname(fileURLToPath(import.meta.url)), '../dist-test-2'),
    basePath: resolve(dirname(fileURLToPath(import.meta.url)), '..'),
    libraryName: 'Ray',
};

const buildConfigs = [
    {
        entry: 'src/Ray.ts',
        outfile: 'web.cjs',
        target: 'browser',
    },
    {
        entry: 'src/Ray.ts',
        outfile: 'web.js',
        target: 'browser',
    },
    {
        entry: 'src/RayNode.ts',
        outfile: 'index.cjs',
        target: 'node',
    },
    {
        entry: 'src/RayNode.ts',
        outfile: 'index.js',
        target: 'node',
    },
    // Standalone builds are typically IIFE or UMD format for browsers
    {
        entry: 'src/Ray.ts',
        outfile: 'standalone.js',
        target: 'browser',
    },
    {
        entry: 'src/Ray.ts',
        outfile: 'standalone.min.js',
        target: 'browser',
    },
].map(config => {
    config.minify = config.outfile.includes('.min.');
    config.standalone = config.outfile.includes('standalone');
    config.format = config.outfile.endsWith('.js') ? 'es' : 'cjs';
    if (config.standalone) {
        config.format = 'iife';
    }

    return config;
});

async function buildWithVite(config) {
    await viteBuild(
        defineConfig({
            define: {
                __BUILDING_STANDALONE_LIB__: config.standalone ? 'true' : 'false',
            },
            build: {
                lib: {
                    entry: resolve(globalConfig.basePath, config.entry),
                    name: globalConfig.libraryName,
                    formats: [config.format],
                    fileName: () => config.outfile,
                },
                emptyOutDir: false,
                outDir: globalConfig.outDir,
                minify: config.minify || false,
                sourcemap: true,
                rollupOptions: {
                    external: getDependencyNames(config.standalone),
                    treeshake: false,
                },
                terserOptions: {
                    keep_fnames: true,
                    keep_classnames: true,
                    mangle: false,
                    ecma: config.target === 'browser' ? 6 : 2018,
                },
                target: config.target === 'browser' ? 'chrome70' : 'node18',
            },
            resolve: {
                extensions: ['.ts', '.js'],
                alias: {
                    '@': `${globalConfig.basePath}/src`,
                },
            },
        }),
    );
}

async function runBuilds() {
    await Promise.all(buildConfigs.map(async config => buildWithVite(config)));
}

async function main() {
    await runBuilds();
    console.log('All builds completed');
}

main();
