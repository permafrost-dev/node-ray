import { Client } from '@/Client';
import { Payload } from '@/Payloads/Payload';
import { Ray } from '@/Ray';

export type RayEnabledCallback = () => boolean;
export type RayAfterPayloadSentCallback = (rayInstance: Ray) => void; // eslint-disable-line no-unused-vars
export type RayBeforePayloadSentCallback = (rayInstance: Ray, payloads: Payload[]) => void; // eslint-disable-line no-unused-vars

export interface RaySettings {
    enable?: boolean;
    host?: string;
    port?: number;
    scheme?: string;
    remote_path?: string | null;
    local_path?: string | null;
    always_send_raw_values?: boolean;
    not_defined?: boolean;
    intercept_console_log?: boolean;
    enabled_callback?: RayEnabledCallback | null;
    sent_payload_callback?: RayAfterPayloadSentCallback | null;
    sending_payload_callback?: RayBeforePayloadSentCallback | null;
}

export class Settings {
    set host(value: string) {
        this._host = value;
        Ray.useClient(new Client(this.port, this.host, this.scheme));
    }

    get host(): string {
        return this._host;
    }

    set port(value: number) {
        this._port = value;
        Ray.useClient(new Client(this.port, this.host, this.scheme));
    }

    get port(): number {
        return this._port;
    }

    get scheme(): string {
        return this._scheme;
    }

    set scheme(value: string) {
        this._scheme = value;
        Ray.useClient(new Client(this.port, this.host, this.scheme));
    }

    public enable = true;
    protected _host = 'localhost';
    protected _port = 23517;
    protected _scheme = 'http';
    public remote_path: string | null = null;
    public local_path: string | null = null;
    public always_send_raw_values = false;
    public intercept_console_log = false;
    public enabled_callback: RayEnabledCallback | null = null;
    public sent_payload_callback: RayAfterPayloadSentCallback | null = null;
    public sending_payload_callback: RayBeforePayloadSentCallback | null = null;

    protected originalSettings: RaySettings;

    constructor(settings: RaySettings) {
        this.originalSettings = Object.assign({}, settings);

        for (const prop in settings) {
            // @ts-ignore
            this[prop] = settings[prop];
        }
    }

    public toObject(): RaySettings {
        return this.originalSettings;
    }
}
