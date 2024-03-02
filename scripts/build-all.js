/**
 * This script builds the project as a library, creating CommonJS, ESM and standalone builds.
 * ESBuild is used to transpile and bundle the source files.
 */
import esbuild from 'esbuild';
import { execSync } from 'node:child_process';
import { readFile, writeFile } from 'node:fs/promises';
import { dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

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
    return isStandaloneBuild ? [] : dependencyNames.concat(['fs', 'node:fs', 'node:os', 'node:path', 'node:process', 'os', 'path']);
};

const globalConfig = {
    outDir: './dist-test',
    basePath: resolve(dirname(fileURLToPath(import.meta.url)), '..'),
};

/** @type {Array<{entry: string, outfile: string, target: 'browser' | 'node'}>} */
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
    config.outfile = `${globalConfig.outDir}/${config.outfile}`;
    config.basePath = globalConfig.basePath;
    config.bundle = true;
    config.minify = config.outfile.includes('.min.');
    config.standalone = config.outfile.includes('standalone');
    config.format = config.outfile.endsWith('.js') ? 'esm' : 'cjs';
    if (config.standalone) {
        config.format = 'iife';
    }

    config.platform = {
        name: config.target,
        version: config.target === 'browser' ? 'chrome70' : 'node18',
    };

    return config;
});

class Builder {
    config = {
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

        for (const buildConfig of buildConfigs) {
            const result = esbuild.buildSync({
                absWorkingDir: buildConfig.basePath,
                allowOverwrite: true,
                bundle: buildConfig.bundle,
                define: {
                    __COMPILED_AT__: `'${new Date().toUTCString()}'`,
                    __BUILDING_STANDALONE_LIB__: buildConfig.standalone ? '"true"' : '"false"',
                },
                entryPoints: [buildConfig.entry],
                external: getDependencyNames(buildConfig.standalone),
                format: buildConfig.format,
                keepNames: true,
                logLevel: 'silent',
                metafile: true,
                minify: buildConfig.minify,
                outfile: buildConfig.outfile,
                platform: buildConfig.platform.name,
                target: buildConfig.platform.version,
                treeShaking: false,
                sourcemap: true,
            });

            const text = esbuild.analyzeMetafileSync(result.metafile, { color: true });

            result.meta = text;

            results.push(Object.assign({}, result));
        }

        return results;
    }

    sizeForDisplay(bytes) {
        let size = `${bytes / 1024}`.slice(0, 4);
        if (size.endsWith('.')) {
            size += '0';
        }
        return `${size} kb`;
    }

    reportCompileResults(results) {
        for (const result of results) {
            result.errors.forEach(errorMsg => this.writeln(`* Error: ${errorMsg}`));
            result.warnings.forEach(msg => this.writeln(`* Warning: ${msg}`));

            Object.keys(result.metafile.outputs).forEach(fn => {
                this.writeln(`*   » created '${fn}' (${this.sizeForDisplay(result.metafile.outputs[fn].bytes)})`);
            });
        }
    }

    processArgv() {
        const args = process.argv.slice(2).map(arg => ({ name: arg.replace(/^-+/, ''), value: true }));

        for (const data of args) {
            this.config[data.name] = data.value;
        }
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
            this.reportCompileResults(results);
        }

        this.writeln(`${this.config.verbose ? '* D' : 'd'}one. (${finishedTs - startedTs} ms)`);

        if (this.config.verbose) {
            for (const result of results) {
                /** @type {String[]} */
                const lines = result.meta.split('\n');

                this.writeln(lines.join('\n'));
            }
        }
    }
}

class TypeGenerator {
    async run() {
        const contents = await readFile(new URL('../package.json', import.meta.url));
        const pkg = JSON.parse(contents);

        await Promise.all([this.buildTypes(pkg, 'node', 'src/RayNode.ts'), this.buildTypes(pkg, 'web', 'src/Ray.ts')]);
    }

    async buildTypes(pkg, moduleName, entryFile) {
        const relativeTargetFile = `${globalConfig.outDir}/${moduleName}.d.ts`;
        const targetFile = `${globalConfig.basePath}/${relativeTargetFile}`;
        const fullModuleName = `${pkg.name}/${moduleName}`;

        execSync(`node ./node_modules/.bin/dts-bundle-generator -o ./${globalConfig.outDir}/${moduleName}.d.ts ./${entryFile}`, {
            cwd: globalConfig.basePath,
            encoding: 'utf-8',
            stdio: 'inherit',
        });

        const contents = await readFile(targetFile, { encoding: 'utf-8' });
        const newContents = `declare module '${fullModuleName}' {\n${contents}\n}`;

        await writeFile(targetFile, newContents, { encoding: 'utf-8' });

        console.log(`Generated typescript declaration for module '${fullModuleName}' in '${relativeTargetFile}'.`);
    }
}

async function main() {
    await new Builder().run();
    await new TypeGenerator().run();
}

main();
