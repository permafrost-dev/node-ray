import { generateDtsBundle } from 'dts-bundle-generator';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';
import { defineConfig, build as viteBuild } from 'vite';

const outputDir = process.env.BUILD_ENV !== 'production' ? 'dist-test-2' : 'dist';

export const globalConfig = {
    libraryName: 'Ray',
    outDir: resolve(dirname(fileURLToPath(import.meta.url)), '../' + outputDir),
    basePath: resolve(dirname(fileURLToPath(import.meta.url)), '..'),
    builds: [
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
        {
            entry: 'src/Ray.ts',
            outfile: 'standalone-slim.min.js',
            target: 'browser',
        },
    ],
    /** @type Record<string, any>|null */
    pkg: null, // assigned in init()
    getDependencies(config) {
        if (config.standalone && config.outfile.includes('slim')) return ['axios'];
        if (config.standalone) return [];

        return Object.keys(this.pkg.dependencies).concat([
            'node:fs',
            'node:fs/promises',
            'node:os',
            'node:path',
            'node:process',
            'node:url',
            'fs',
            'os',
            'process',
        ]);
    },
    async init() {
        this.pkg = JSON.parse(await readFile(resolve(this.basePath, 'package.json')));

        this.builds = this.builds.map(config => {
            config.entry = resolve(globalConfig.basePath, config.entry);
            config.minify = config.outfile.includes('.min.');
            config.standalone = config.outfile.includes('standalone');
            config.format = config.outfile.endsWith('.js') ? 'es' : 'cjs';
            if (config.standalone) {
                config.format = 'iife';
            }

            return config;
        });
    },
};

async function buildTypeDefinitions() {
    async function generateTypesForEntry(info) {
        const dts = generateDtsBundle([{ filePath: info.entry }])
            .pop()
            .replaceAll('export {};', '')
            .replaceAll(/\n{2,}/g, '\n')
            .replaceAll(/\t/g, '    ')
            .trim();

        const baseFn = info.outfile;

        await writeFile(outputDir + '/' + baseFn, dts, 'utf8');

        console.log(`Compiled ${outputDir}/${baseFn}`);
    }

    const entries = [
        { entry: 'src/Ray.ts', outfile: 'web.d.ts' },
        { entry: 'src/RayNode.ts', outfile: 'index.d.ts' },
    ];

    await Promise.all(entries.map(e => generateTypesForEntry(e)));
}

async function buildWithVite(config) {
    await viteBuild(
        defineConfig({
            define: {
                __BUILDING_STANDALONE_LIB__: config.standalone ? 'true' : 'false',
                __BUILD_VERSION__: JSON.stringify(globalConfig.pkg.version),
            },
            build: {
                lib: {
                    entry: config.entry,
                    name: globalConfig.libraryName,
                    formats: [config.format],
                    fileName: () => config.outfile,
                },
                emptyOutDir: false,
                outDir: globalConfig.outDir,
                minify: config.minify || false,
                sourcemap: true,
                rollupOptions: {
                    external: globalConfig.getDependencies(config),
                    treeshake: false,
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

async function main() {
    await globalConfig.init();
    await Promise.all(globalConfig.builds.map(config => buildWithVite(config)));
    console.log('All library file builds complete.');

    console.log('Building type definitions...');
    await buildTypeDefinitions();
    console.log('All type definitions created.');
}

main();
