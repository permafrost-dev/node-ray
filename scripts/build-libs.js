/**
 * This script builds the project as a library, creating CommonJS and ESM builds.
 */

const { realpathSync } = require('fs');
const esbuild = require('esbuild');

const buildConfigs = [
    {
        basePath: `${__dirname}/..`,
        bundle: true,
        constants: {},
        entry: 'src/Ray.ts',
        format: 'cjs',
        minify: false,
        outfile: 'dist/test-index.cs.js',
        platform: {
            name: 'node',
            version: 14,
        },
    },
    {
        basePath: `${__dirname}/..`,
        bundle: true,
        constants: {},
        entry: 'src/Ray.ts',
        format: 'esm',
        minify: false,
        outfile: 'dist/test-index.esm.mjs',
        platform: {
            name: 'node',
            version: 14,
        },
    },
];

class Builder {
    config = {
        minify: false,
        production: false,
        verbose: false,
    };

    write(msg) {
        process.stdout.write(`${msg}`.toString());
    }

    writeln(msg) {
        process.stdout.write(`${msg}\n`.toString());
    }

    compile() {
        const results = [];

        buildConfigs.forEach(buildConfig => {
            // get names of package dependencies so they can be marked as external
            const dependencyNames = Object.keys(require(`${buildConfig.basePath}/package.json`)['dependencies'] || []);

            const result = esbuild.buildSync({
                absWorkingDir: buildConfig.basePath,
                allowOverwrite: true,
                bundle: buildConfig.bundle,
                define: {
                    __APP_VERSION__: `'${require(realpathSync(`${buildConfig.basePath}/package.json`, { encoding: 'utf-8' })).version}'`,
                    __COMPILED_AT__: `'${new Date().toUTCString()}'`,
                    ...buildConfig.constants,
                },
                entryPoints: [buildConfig.entry],
                external: dependencyNames,
                format: buildConfig.format,
                keepNames: true,
                logLevel: 'silent',
                metafile: true,
                minify: buildConfig.minify || this.config.minify,
                outfile: buildConfig.outfile,
                platform: buildConfig.platform.name,
                target: `es2015`,
                treeShaking: false,
            });

            const text = esbuild.analyzeMetafileSync(result.metafile, { color: true });

            result['meta'] = text;

            results.push(Object.assign({}, result));
        });

        return results;
    }

    sizeForDisplay(bytes) {
        let size = `${bytes / 1024}`.slice(0, 4);
        if (size.endsWith('.')) {
            size += '0';
        }
        return `${size} kb`;
    }

    async reportCompileResults(results) {
        results.errors.forEach(errorMsg => this.writeln(`* Error: ${errorMsg}`));
        results.warnings.forEach(msg => this.writeln(`* Warning: ${msg}`));

        Object.keys(results.metafile.outputs).forEach(fn => {
            this.writeln(`*   » created '${fn}' (${this.sizeForDisplay(results.metafile.outputs[fn].bytes)})`);
        });
    }

    processArgv() {
        const argMap = {
            '--minify': { name: 'minify', value: false },
            '--prod': { name: 'production', value: true },
            '--production': { name: 'production', value: true },
            '--verbose': { name: 'verbose', value: true },
            '-p': { name: 'production', value: true },
            '-v': { name: 'verbose', value: true },
        };

        process.argv
            .slice(2)
            .map(arg => {
                const hasMappedArg = typeof argMap[arg] === 'undefined';
                return hasMappedArg ? { name: arg.replace(/^-+/, ''), value: true } : argMap[arg];
            })
            .forEach(data => (this.config[data.name] = data.value));
    }

    async run() {
        this.processArgv();

        if (this.config.verbose) {
            this.writeln(`* Using esbuild v${esbuild.version}.`);
        }

        this.write(`* Compiling library...${this.config.verbose ? '\n' : ''}`);

        const startedTs = new Date().getTime();
        const results = await this.compile();
        const finishedTs = new Date().getTime();

        if (this.config.verbose) {
            results.forEach(async result => await this.reportCompileResults(result));
        }

        this.writeln((this.config.verbose ? `* D` : `d`) + `one. (${finishedTs - startedTs} ms)`);

        if (this.config.verbose) {
            for (const result of results) {
                /** @type {String[]} */
                const lines = result.meta.split('\n');

                this.writeln(lines.join('\n'));
            }
        }
    }
}

new Builder().run();
