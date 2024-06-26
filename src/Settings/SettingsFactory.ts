import { RaySettings, Settings } from '@/Settings/Settings';
import { findUp } from '@/lib/findUp';
import { stat } from 'node:fs/promises';

const exists = async (file: string): Promise<boolean> => {
    try {
        const s = await stat(file);
        return s.isDirectory() || s.isFile() || s.isSymbolicLink();
    } catch {
        return false;
    }
};

const settingsFactoryCache: Record<string, string> = {};

export class SettingsFactory {
    get cache(): Record<string, string> {
        return settingsFactoryCache;
    }

    public static async createFromConfigFile(configDirectory: string | null = null): Promise<Settings> {
        const settingValues = await new this().getSettingsFromConfigFile(configDirectory);

        return new Settings(settingValues);
    }

    public async getSettingsFromConfigFile(configDirectory: string | null = null) {
        const configFilePath = this.searchConfigFiles(configDirectory);

        if (!(await exists(configFilePath))) {
            return {};
        }

        let options;

        try {
            options = await import(configFilePath);
            options = options.default || options;
        } catch (err) {
            // error loading config
        }

        return options as RaySettings;
    }

    protected searchConfigFiles(configDirectory: string | null = null): string {
        if (configDirectory === null) {
            configDirectory = '';
        }

        if (typeof this.cache[configDirectory] === 'undefined') {
            this.cache[configDirectory] = this.searchConfigFilesOnDisk(configDirectory);
        }

        return this.cache[configDirectory];
    }

    protected searchConfigFilesOnDisk(configDirectory: string | null = null): string {
        const configFn = findUp('ray.config.js', {
            type: 'file',
            cwd: configDirectory ?? process.cwd(),
        });

        return configFn ? configFn : '';
    }
}
