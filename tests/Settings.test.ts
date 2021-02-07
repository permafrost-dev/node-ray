/* eslint-disable no-undef */

import { SettingsFactory } from './../src/Settings/SettingsFactory';

it('can search a path for a config file', () =>
{
    const sf1 = new SettingsFactory();
    const sf2 = new SettingsFactory();

    expect(sf1.getSettingsFromConfigFile(`${__dirname}/missing`).enable).toBeUndefined();
    expect(sf1.getSettingsFromConfigFile(`${__dirname}/TestData`).port).toBe(12345);
    expect(sf2.getSettingsFromConfigFile(null).enable).toBeUndefined();
});
