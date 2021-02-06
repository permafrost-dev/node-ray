/* eslint-disable no-undef */
/* eslint-disable no-useless-catch */

import md5 from 'md5';
import { v4 as uuidv4, v1 as uuidv1 } from 'uuid';
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
import randomInt from 'random-int';


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

    public static enabled = true;

    public static create(client: Client | null = null, uuid: string | null = null): Ray
    {
        const settings = SettingsFactory.createFromConfigFile();

        return new this(settings, client, uuid);
    }

    public constructor(settings: Settings, client: Client | null = null, uuid: string | null = null)
    {
        super();

        this.settings = settings;

        Ray.client = client ?? Ray.client ?? new Client(this.settings.port, this.settings.host);

        this.uuid = uuid ?? Ray.fakeUuid ?? nonCryptoUuidV4();

        Ray.enabled = this.settings.enable !== false;
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
        return Ray.enabled;
    }

    public disabled(): boolean
    {
        return !Ray.enabled;
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

    public getOrigin(): any
    {
        // const frames = StackTrace.getSync().filter(frame =>
        // {
        //     return frame.getFileName().includes('Ray');
        // });


        // console.log(frames);

    }

    /**
     * @param string|callable stopwatchName
     *
     * @return this
     *
    public measure(stopwatchName = 'default'): this
    {
        if (stopwatchName instanceof Closure) {
            return this.measureClosure(stopwatchName);
        }

        if (typeof this.stopWatches[stopwatchName] === 'undefined') {
            stopwatch = new Stopwatch(true);
            this.stopWatches[stopwatchName] = stopwatch;

            event = stopwatch.start(stopwatchName);
            const payload = new MeasurePayload(stopwatchName, event);
            payload.concernsNewTimer();

            return this.sendRequest(payload);
        }

        stopwatch = this.stopWatches[stopwatchName];
        event = stopwatch.lap(stopwatchName);
        const payload = new MeasurePayload(stopwatchName, event);

        return this.sendRequest(payload);
    }

    public trace(?Closure startingFromFrame = null): this
    {
        backtrace = Backtrace::create();

        if (class_exists(LaravelRay::class) && function_exists('base_path')) {
            backtrace.applicationPath(base_path());
        }

        if (startingFromFrame) {
            backtrace.startingFromFrame(startingFromFrame);
        }

        const payload = new TracePayload(backtrace.frames());

        return this.sendRequest(payload);
    }

    public backtrace(?Closure startingFromFrame = null): this
    {
        return this.trace(startingFromFrame);
    }

    public caller(): this
    {
        backtrace = Backtrace::create();

        payload = (new CallerPayload(backtrace.frames()));

        return this.sendRequest(payload);
    }

    protected measureClosure(Closure closure): this
    {
        stopwatch = new Stopwatch(true);

        stopwatch.start('closure');

        closure();

        event = stopwatch.stop('closure');

        const payload = new MeasurePayload('closure', event);

        return this.sendRequest(payload);
    }

    */

    public stopTime(stopwatchName = ''): this
    {
        if (stopwatchName === '') {
            Ray.stopWatches = {};

            return this;
        }

        if (typeof Ray.stopWatches[stopwatchName] !== 'undefined') {
            delete Ray.stopWatches[stopwatchName];
        }

        return this;
    }

    public notify(text: string): this
    {
        const payload = new NotifyPayload(text);

        return this.sendRequest(payload);
    }

    public toJson(...values: any[]): this
    {
        const payloads = values.map(value =>
        {
            return new JsonStringPayload(value);
        });

        return this.sendRequest(payloads);
    }

    public json(...jsons: string[]): this
    {
        const payloads = jsons.map(json =>
        {
            return new DecodedJsonPayload(json);
        });

        return this.sendRequest(payloads);
    }

    public file(filename: string): this
    {
        const payload = new FileContentsPayload(filename);

        return this.sendRequest(payload);
    }

    public image(location: string): this
    {
        return this.sendRequest(new ImagePayload(location));
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
        const fingerprint = ''; //(new DefaultOriginFactory()).getOrigin().fingerPrnumber();

        const [ray, times] = Ray.counters.increment(name || fingerprint);

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
        const payload = new XmlPayload(`<a>${xml}</a>`);

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

        const payloads = args.map(argument =>
        {
            return LogPayload.createForArguments([argument]);
        });

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

    public sendRequest(payloads: Payload | Payload[], meta: any[] = []): this
    {
        if (!this.enabled()) {
            return this;
        }

        if (!Array.isArray(payloads)) {
            payloads = [payloads];
        }

        const allMeta = Object.assign({}, {
            node_version: process.versions.node
        }, meta);

        payloads.forEach(payload =>
        {
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
