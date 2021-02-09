/* eslint-disable @typescript-eslint/ban-ts-comment */

import { Ray } from './../Ray';
import { Client } from './../Client';

export interface RaySettings
{
    enable?: boolean;
    host?: string;
    port?: number;
    remote_path?: string | null;
    local_path?: string | null;
    always_send_raw_values?: boolean;
    not_defined?: boolean;
}

export class Settings
{
    set host(value: string)
    {
        this._host = value;
        Ray.useClient(new Client(this.port, this.host));
    }

    get host(): string
    {
        return this._host;
    }

    set port(value: number)
    {
        this._port = value;
        Ray.useClient(new Client(this.port, this.host));
    }

    get port(): number
    {
        return this._port;
    }

    public enable = true;
    protected _host = 'localhost';
    protected _port = 23517;
    public remote_path: string | null = null;
    public local_path: string | null = null;
    public always_send_raw_values = false;

    protected originalSettings: RaySettings;

    constructor(settings: RaySettings)
    {
        this.originalSettings = Object.assign({}, settings);

        for (const prop in settings) {
            // @ts-ignore
            this[prop] = settings[prop];
        }
    }

    public toObject(): RaySettings
    {
        return this.originalSettings;
    }
}
