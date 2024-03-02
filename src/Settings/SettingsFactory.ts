import { existsSync } from 'fs';
import { RaySettings, Settings } from './Settings';
import findUp from 'find-up';

const findUpSync = findUp.findUpSync;
const settingsFactoryCache: Record<string, string> = {};

export class SettingsFactory {
    get cache(): Record<string, string> {
        return settingsFactoryCache;
    }

    public static createFromConfigFile(configDirectory: string | null = null): Settings {
        const settingValues = new this().getSettingsFromConfigFile(configDirectory);

        return new Settings(settingValues);
    }

    public getSettingsFromConfigFile(configDirectory: string | null = null): RaySettings {
        const configFilePath = this.searchConfigFiles(configDirectory);

        if (!existsSync(configFilePath)) {
            return {};
        }

        let options;

        try {
            options = require(configFilePath);
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
        const configFn = findUpSync('ray.config.js', {
            type: 'file',
            cwd: configDirectory ?? process.cwd(),
        });

        if (configFn) {
            return configFn;
        }

        return '';
    }
}
