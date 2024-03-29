import { Client } from '@/Client';
import { HostnameNode } from '@/Origin/HostnameNode';
import { OriginData } from '@/Origin/Origin';
import { PayloadFactory } from '@/PayloadFactory';
import { FileContentsPayload } from '@/Payloads/FileContentsPayload';
import { ImagePayload } from '@/Payloads/ImagePayload';
import { NodeInfoPayload } from '@/Payloads/NodeInfoPayload';
import { NodeMeasurePayload } from '@/Payloads/NodeMeasurePayload';
import { Ray as BaseRay } from '@/Ray';
import { SettingsFactory } from '@/Settings/SettingsFactory';
import { NodeStopwatch } from '@/Stopwatch/NodeStopwatch';
import { existsSync } from 'node:fs';

// @ts-ignore
export class Ray extends BaseRay {
    public static async create(client: Client | null = null, uuid: string | null = null): Promise<Ray> {
        const settings = await SettingsFactory.createFromConfigFile();

        return new this(settings, client, uuid);
    }

    public die(status = ''): void {
        if (status.length) {
            console.error(status);
        }

        process.exit(-1);
    }

    public file(filename: string): this {
        const payload = new FileContentsPayload(filename);

        return this.sendRequest(payload);
    }

    public image(location: string): this {
        if (existsSync(location)) {
            location = `file://${location}`;
        }

        const payload = new ImagePayload(location);

        return this.sendRequest(payload);
    }

    protected getStopwatch(name: string): NodeStopwatch {
        return new NodeStopwatch(name);
    }

    protected getMeasurePayload(name: string, event: any): any {
        return new NodeMeasurePayload(name, event);
    }

    public nodeinfo(...properties: string[]): this {
        const payload = new NodeInfoPayload(...properties);

        return this.sendRequest(payload);
    }

    async getOriginData() {
        const frame = await this.getOriginFrame();

        return <OriginData>{
            function_name: frame?.getFunctionName(),
            file: frame?.getFileName(),
            line_number: frame?.getLineNumber(),
            hostname: HostnameNode.get(),
        };
    }

    public send(...args: any[]): this {
        if (!args.length) {
            return this;
        }

        if (process.env.NODE_ENV === 'production' || process.env.NODE_ENV === 'staging') {
            return this;
        }

        if (this.settings.always_send_raw_values) {
            return this.raw(...args);
        }

        const payloads = PayloadFactory.createForValues(args);

        return this.sendRequest(payloads);
    }
}

export const ray = (...args: any[]) => {
    return Ray.create().then(r => r.send(...args));
};
