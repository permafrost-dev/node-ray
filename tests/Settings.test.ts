/* eslint-disable no-undef */

import { resolve } from 'node:path';
import { SettingsFactory } from './../src/Settings/SettingsFactory';

it('can search a path for a config file', async () => {
    const sf1 = new SettingsFactory();
    const sf2 = new SettingsFactory();
    const thisDir = resolve('./tests');

    expect((await sf1.getSettingsFromConfigFile(`${thisDir}/missing`)).enable).toBeUndefined();
    expect((await sf1.getSettingsFromConfigFile(`${thisDir}/TestData`)).port).toBe(12345);
    expect((await sf1.getSettingsFromConfigFile(`${thisDir}/TestData`)).scheme).toBe('https');
    expect((await sf2.getSettingsFromConfigFile(null)).enable).toBeUndefined();
});
