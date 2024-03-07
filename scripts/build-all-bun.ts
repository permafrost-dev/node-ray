import { basename, dirname, resolve } from 'node:path';
import { fileURLToPath } from 'node:url';

const dependencyNames: string[] = [
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

const getDependencyNames = (isStandaloneBuild: boolean = false): string[] => {
    return isStandaloneBuild
        ? []
        : dependencyNames.concat(['fs', 'node:fs', 'node:fs/promises', 'node:os', 'node:path', 'node:process', 'os', 'path']);
};

const globalConfig = {
    outDir: resolve(dirname(fileURLToPath(import.meta.url)), '../dist-test'),
    basePath: resolve(dirname(fileURLToPath(import.meta.url)), '..'),
};

interface BuildConfig {
    entry: string;
    outfile: string;
    target: string | 'browser' | 'node';
    basePath?: string;
    bundle?: boolean;
    minify?: boolean;
    standalone?: boolean;
    format?: string;
    platform?: {
        name: string;
        version: string;
    };
}

const buildConfigs: BuildConfig[] = [
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
]
    .map((config: BuildConfig) => {
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
    })
    .filter((config: BuildConfig) => {
        return !config.standalone && config.format === 'esm';
    });

class Builder {
    config = {
        production: false,
        verbose: false,
    };

    write(msg: string) {
        process.stdout.write(`${msg}`);
    }

    writeln(msg: string) {
        process.stdout.write(`${msg}\n`);
    }

    async compile() {
        // Note: Adjust this section based on Bun's actual bundling API and capabilities
        for (const buildConfig of buildConfigs) {
            // Example Bun compile call (this is a placeholder and needs to be adjusted)
            const result = await Bun.build({
                entryPoints: [resolve(buildConfig.basePath as string, buildConfig.entry)],
                outdir: dirname(buildConfig.outfile),
                format: buildConfig.format,
                target: (buildConfig.platform as any).name,
                external: getDependencyNames(false),
                sourcemap: 'external',
                minify: false,
                naming: {
                    entry: basename(buildConfig.outfile),
                },
            });

            if (!result.success) {
                this.writeln(`*   » failed to compile '${buildConfig.outfile}'`);
                for (const message of result.logs) {
                    this.writeln(`*   » ${message}`);
                }
                continue;
            }

            this.writeln(`*   » created '${buildConfig.outfile}'`);
        }

        this.writeln(`*   » done.`);
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
            this.writeln(`* Using Bun for bundling.`);
        }

        this.write(`* Compiling library...${this.config.verbose ? '\n' : ''}`);

        const startedTs = new Date().getTime();
        await this.compile();
        const finishedTs = new Date().getTime();

        this.writeln(`${this.config.verbose ? '* D' : 'd'}one. (${finishedTs - startedTs} ms)`);
    }
}

// class TypeGenerator {
//     // Type generation logic remains the same
//     // ...
// }

async function main() {
    await new Builder().run();
}

main();
