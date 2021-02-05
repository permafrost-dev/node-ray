import { existsSync } from 'fs';
import { RaySettings, Settings } from './Settings';

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
            return <RaySettings>{};
        }

        const options = require(configFilePath).default;

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
        console.log(configDirectory);

        const configNames = ['ray.php'];

        configNames.forEach(fn => {
            console.log(fn);
        });

        return '';
    }
}
