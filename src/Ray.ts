/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */

import md5 from 'md5';
import { Mixin } from 'ts-mixer';
import { nonCryptoUuidV4, sleep } from './lib/utils';
import { ClearAllPayload } from './Payloads/ClearAllPayload';
import { Client } from './Client';
import { ColorPayload } from './Payloads/ColorPayload';
import { Counters } from './Support/Counters';
import { CreateLockPayload } from './Payloads/CreateLockPayload';
import { CustomPayload } from './Payloads/CustomPayload';
import { DecodedJsonPayload } from './Payloads/DecodedJsonPayload';
import { FileContentsPayload } from './Payloads/FileContentsPayload';
import { HideAppPayload } from './Payloads/HideAppPayload';
import { HidePayload } from './Payloads/HidePayload';
import { HtmlPayload } from './Payloads/HtmlPayload';
import { ImagePayload } from './Payloads/ImagePayload';
import { JsonStringPayload } from './Payloads/JsonStringPayload';
import { LogPayload } from './Payloads/LogPayload';
import { NewScreenPayload } from './Payloads/NewScreenPayload';
import { NotifyPayload } from './Payloads/NotifyPayload';
import { Payload } from './Payloads/Payload';
import { PayloadFactory } from './PayloadFactory';
import { RayColors } from './Concerns/RayColors';
import { RaySizes } from './Concerns/RaySizes';
import { RemovePayload } from './Payloads/RemovePayload';
import { Request } from './Request';
import { Settings } from './Settings/Settings';
import { SettingsFactory } from './Settings/SettingsFactory';
import { ShowAppPayload } from './Payloads/ShowAppPayload';
import { SizePayload } from './Payloads/SizePayload';
import { TablePayload } from './Payloads/TablePayload';
import { XmlPayload } from './Payloads/XmlPayload';
import { OriginData } from './Origin/Origin';
import StackTrace from 'stacktrace-js';
import PACKAGE_VERSION from './version';
import { ErrorPayload } from './Payloads/ErrorPayload';

export type BoolFunction = () => boolean;

export class Ray extends Mixin(RayColors, RaySizes) {

    protected static lockCounter = 0;

    public settings: Settings;

    protected static client: Client;

    public static counters: Counters = new Counters();

    public static fakeUuid: string;

    public uuid: string;

    // @var \Symfony\Component\Stopwatch\Stopwatch[]
    public static stopWatches: Record<string, unknown> = {};

    public static enabled: boolean | null = null;

    public static create(client: Client | null = null, uuid: string | null = null): Ray
    {
        const settings = SettingsFactory.createFromConfigFile();

        return new this(settings, client, uuid);
    }

    public constructor(settings: Settings, client: Client | null = null, uuid: string | null = null)
    {
        super();

        this.settings = settings;

        if (Ray.enabled === null) {
            Ray.enabled = this.settings.enable !== false;
        }

        Ray.client = client ?? Ray.client ?? new Client(this.settings.port, this.settings.host);

        this.uuid = uuid ?? Ray.fakeUuid ?? nonCryptoUuidV4();
    }

    public enable(): this
    {
        Ray.enabled = true;

        return this;
    }

    public disable(): this
    {
        Ray.enabled = false;

        return this;
    }

    public enabled(): boolean
    {
        return <boolean>Ray.enabled;
    }

    public disabled(): boolean
    {
        return ! <boolean>Ray.enabled;
    }

    public static useClient(client: Client): void
    {
        this.client = client;
    }

    public newScreen(name = ''): this
    {
        const payload = new NewScreenPayload(name);

        return this.sendRequest(payload);
    }

    public clearAll(): this
    {
        const payload = new ClearAllPayload();

        return this.sendRequest(payload);
    }

    public clearScreen(): this
    {
        return this.newScreen();
    }

    public color(color: string): this
    {
        const payload = new ColorPayload(color);

        return this.sendRequest(payload);
    }

    public size(size: string): this
    {
        const payload = new SizePayload(size);

        return this.sendRequest(payload);
    }

    public remove(): this
    {
        const payload = new RemovePayload();

        return this.sendRequest(payload);
    }

    public hide(): this
    {
        const payload = new HidePayload();

        return this.sendRequest(payload);
    }

    public notify(text: string): this
    {
        const payload = new NotifyPayload(text);

        return this.sendRequest(payload);
    }

    public toJson(...values: any[]): this
    {
        const payloads = values.map(value => new JsonStringPayload(value));

        return this.sendRequest(payloads);
    }

    public json(...jsons: string[]): this
    {
        const payloads = jsons.map(json => new DecodedJsonPayload(json));

        return this.sendRequest(payloads);
    }

    public file(filename: string): this
    {
        const payload = new FileContentsPayload(filename);

        return this.sendRequest(payload);
    }

    public image(location: string): this
    {
        const payload = new ImagePayload(location);

        return this.sendRequest(payload);
    }

    public die(status = ''): void
    {
        if (status.length) {
            console.error(status);
        }

        process.exit(-1);
    }

    public className(object: any): this
    {
        return this.send(object.constructor.name);
    }

    public error(err: Error): this
    {
        const payload = new ErrorPayload(err, 'Error');

        return this.sendRequest(payload);
    }

    public showWhen(booleanOrCallable: boolean | BoolFunction): this
    {
        if (typeof booleanOrCallable === 'function') {
            booleanOrCallable = (booleanOrCallable as BoolFunction)();
        }

        if (!booleanOrCallable) {
            this.remove();
        }

        return this;
    }

    public showIf(booleanOrCallable: boolean | BoolFunction): this
    {
        return this.showWhen(booleanOrCallable);
    }

    public removeWhen(booleanOrCallable: boolean | BoolFunction): this
    {
        if (typeof booleanOrCallable === 'function') {
            booleanOrCallable = (booleanOrCallable as BoolFunction)();
        }

        if (booleanOrCallable) {
            this.remove();
        }

        return this;
    }

    public removeIf(booleanOrCallable: boolean | BoolFunction): this
    {
        return this.removeWhen(booleanOrCallable);
    }

    public ban(): this
    {
        return this.send('🕶');
    }

    public charles(): this
    {
        return this.send('🎶 🎹 🎷 🕺');
    }

    public table(values: any[], label = 'Table'): this
    {
        const payload = new TablePayload(values, label);

        return this.sendRequest(payload);
    }

    public count(name: string | null = null): this
    {
        const fingerprint = md5(`${<string>this.getCaller()?.getFileName()}${this.getCaller()?.getLineNumber()}`);

        const [ray, times] = Ray.counters.increment(name ?? fingerprint ?? 'none');

        let message = `Called `;

        if (name) {
            message += `'${name}' `;
        }

        message += `${times} ${times === 1 ? 'time' : 'times'}.`;

        ray.sendCustom(message, 'Count');

        return ray;
    }

    public clearCounters(): this
    {
        Ray.counters.clear();

        return this;
    }

    public async pause()
    {
        Ray.lockCounter++;

        const lockName = md5(`${new Date().getTime()}-${Ray.lockCounter}`);
        const payload = new CreateLockPayload(lockName);

        this.sendRequest(payload);

        let exists: any;

        do {
            sleep(1);
            try {
                exists = await Ray.client.lockExists(lockName);
            } catch (err) {
                return false;
            }

            if (exists !== true && exists && exists.stop_execution) {
                return false;
            }
        } while (exists.active);

        return this;
    }

    public xml(xml: string): this
    {
        const payload = new XmlPayload(xml);

        return this.sendRequest(payload);
    }

    public html(html = ''): this
    {
        const payload = new HtmlPayload(html);

        return this.sendRequest(payload);
    }

    public raw(...args: any[]): this
    {
        if (!args.length) {
            return this;
        }

        const payloads = args.map(arg => LogPayload.createForArguments([arg]));

        return this.sendRequest(payloads);
    }

    public send(...args: any[]): this
    {
        if (!args.length) {
            return this;
        }

        if (this.settings.always_send_raw_values) {
            return this.raw(...args);
        }

        const payloads = PayloadFactory.createForValues(args);

        return this.sendRequest(payloads);
    }

    public pass(argument: any): any
    {
        this.send(argument);

        return argument;
    }

    public showApp(): this
    {
        const payload = new ShowAppPayload();

        return this.sendRequest(payload);
    }

    public hideApp(): this
    {
        const payload = new HideAppPayload();

        return this.sendRequest(payload);
    }

    public sendCustom(content: string, label = ''): this
    {
        const payload = new CustomPayload(content, label);

        return this.sendRequest(payload);
    }

    getOriginFrame()
    {
        const st = StackTrace.getSync();

        let startFrameIndex = st.findIndex(frame => frame.functionName === 'Ray.sendRequest');

        if (startFrameIndex === -1) {
            startFrameIndex = 0;
        }

        const callerFrames = st
            .slice(startFrameIndex)
            .filter(frame => frame.functionName?.includes('Ray.'));

        if (callerFrames.length === 1) {
            return callerFrames.shift();
        }

        return callerFrames.slice(1).shift();
    }

    getCaller()
    {
        const st = StackTrace.getSync();

        let startFrameIndex = st.findIndex(frame => frame.functionName === 'Ray.getCaller');

        if (startFrameIndex === -1) {
            startFrameIndex = 0;
        }

        const callerFrames = st
            .slice(startFrameIndex);

        if (callerFrames.length === 1) {
            return callerFrames.shift();
        }

        return callerFrames.slice(2).shift();
    }

    getOriginData()
    {
        const frame = this.getOriginFrame();

        return <OriginData>{
            function_name: frame?.getFunctionName(),
            file: frame?.getFileName(),
            line_number: frame?.getLineNumber()
        };
    }

    public sendRequest(payloads: Payload | Payload[], meta: any[] = []): this
    {
        if (!this.enabled()) {
            return this;
        }

        if (!Array.isArray(payloads)) {
            payloads = [payloads];
        }

        const allMeta = Object.assign({}, {
            node_ray_package_version: PACKAGE_VERSION,
        }, meta);

        payloads.forEach(payload =>
        {
            payload.data.origin = this.getOriginData();
            payload.remotePath = this.settings.remote_path;
            payload.localPath = this.settings.local_path;
        });

        const request = new Request(this.uuid, payloads, allMeta);

        Ray.client?.send(request);

        return this;
    }
}

export const ray = (...args: any[]) =>
{
    return Ray.create().send(...args);
};
