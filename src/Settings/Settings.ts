/* eslint-disable @typescript-eslint/ban-ts-comment */
export interface RaySettings {
    enable?: boolean;
    host?: string;
    port?: number;
    remote_path?: string | null;
    local_path?: string | null;
    always_send_raw_values?: boolean;
}

export class Settings {
    public enable = true;
    public host = 'localhost';
    public port = 23517;
    public remote_path: string | null = null;
    public local_path: string | null = null;
    public always_send_raw_values = false;

    constructor(settings: RaySettings) {
        for (const prop in settings) {
            // @ts-ignore
            this[prop] = settings[prop];
        }
    }
}
