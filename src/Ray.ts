/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

import { Client } from '@/Client';
import { RayColors } from '@/Concerns/RayColors';
import { RayScreenColors } from '@/Concerns/RayScreenColors';
import { RaySizes } from '@/Concerns/RaySizes';
import { RemovesRayFrames } from '@/Concerns/RemovesRayFrames';
import { ConsoleInterceptor } from '@/ConsoleInterceptor';
import { Hostname } from '@/Origin/Hostname';
import { OriginData } from '@/Origin/Origin';
import { PayloadFactory } from '@/PayloadFactory';
import { CallerPayload } from '@/Payloads/CallerPayload';
import { ClearAllPayload } from '@/Payloads/ClearAllPayload';
import { ColorPayload } from '@/Payloads/ColorPayload';
import { ConfettiPayload } from '@/Payloads/ConfettiPayload';
import { CreateLockPayload } from '@/Payloads/CreateLockPayload';
import { CustomPayload } from '@/Payloads/CustomPayload';
import { DatePayload } from '@/Payloads/DatePayload';
import { DecodedJsonPayload } from '@/Payloads/DecodedJsonPayload';
import { ErrorPayload } from '@/Payloads/ErrorPayload';
import { EventPayload } from '@/Payloads/EventPayload';
import { ExceptionPayload } from '@/Payloads/ExceptionPayload';
import { HideAppPayload } from '@/Payloads/HideAppPayload';
import { HidePayload } from '@/Payloads/HidePayload';
import { HtmlMarkupOptions, HtmlMarkupPayload } from '@/Payloads/HtmlMarkupPayload';
import { HtmlPayload } from '@/Payloads/HtmlPayload';
import { ImagePayload } from '@/Payloads/ImagePayload';
import { JsonStringPayload } from '@/Payloads/JsonStringPayload';
import { LabelPayload } from '@/Payloads/LabelPayload';
import { LogPayload } from '@/Payloads/LogPayload';
import { MeasurePayload } from '@/Payloads/MeasurePayload';
import { NewScreenPayload } from '@/Payloads/NewScreenPayload';
import { NotifyPayload } from '@/Payloads/NotifyPayload';
import { Payload } from '@/Payloads/Payload';
import { RemovePayload } from '@/Payloads/RemovePayload';
import { ScreenColorPayload } from '@/Payloads/ScreenColorPayload';
import { SeparatorPayload } from '@/Payloads/SeparatorPayload';
import { ShowAppPayload } from '@/Payloads/ShowAppPayload';
import { SizePayload } from '@/Payloads/SizePayload';
import { TablePayload } from '@/Payloads/TablePayload';
import { TextPayload } from '@/Payloads/TextPayload';
import { TracePayload } from '@/Payloads/TracePayload';
import { XmlPayload } from '@/Payloads/XmlPayload';
import { Request } from '@/Request';
import { RaySettings, Settings } from '@/Settings/Settings';
import { Stopwatch } from '@/Stopwatch/Stopwatch';
import { Counters } from '@/Support/Counters';
import { Limiters } from '@/Support/Limiters';
import { RateLimiter } from '@/Support/RateLimiter';
import { RayCallback, SendRequestCallbackType } from '@/lib/types';
import { nonCryptoUuidV4, sleep } from '@/lib/utils';
import { PACKAGE_VERSION } from '@/lib/version';
import { md5 } from '@/lib/utils';
import Stacktrace from 'stacktrace-js';
import { Mixin } from 'ts-mixer';

export class Ray extends Mixin(RayColors, RaySizes, RayScreenColors) {
    protected static lockCounter = 0;

    protected inCallback = false;

    public settings: Settings;

    public static defaultSettings: RaySettings = { not_defined: true };

    public static client: Client;

    public static projectName = '';

    public static counters: Counters = new Counters();

    public static limiters: Limiters = new Limiters();

    public static interceptor: ConsoleInterceptor = new ConsoleInterceptor();

    public static fakeUuid: string;

    public uuid: string;

    public static stopWatches: Record<string, Stopwatch> = {};

    public static enabled: boolean | null = null;

    public static macros: Record<string, unknown> = {};

    public limitOrigin: OriginData | null = null;

    public canSendPayload = true;

    protected chaining = false;

    protected chainedPayloads: Payload[] = [];

    [macroName: string]: any;

    public static _rateLimiter: RateLimiter = RateLimiter.disabled();

    public static create(client: Client | null = null, uuid: string | null = null): Ray {
        if (Ray.defaultSettings.not_defined === true) {
            Ray.defaultSettings = {
                enable: true,
                host: 'localhost',
                port: 23517,
                scheme: 'http',
                local_path: null,
                remote_path: null,
                always_send_raw_values: false,
                not_defined: false,
                intercept_console_log: false,
                enabled_callback: null,
                sending_payload_callback: null,
                sent_payload_callback: null,
            };
        }

        const settings = new Settings(Ray.defaultSettings);

        return new this(settings, client, uuid);
    }

    public constructor(settings: Settings, client: Client | null = null, uuid: string | null = null, inCallback = false) {
        super();

        if (Ray.defaultSettings.not_defined === true) {
            Ray.defaultSettings = {
                enable: true,
                host: 'localhost',
                port: 23517,
                scheme: 'http',
                local_path: null,
                remote_path: null,
                always_send_raw_values: false,
                enabled_callback: null,
                sending_payload_callback: null,
                sent_payload_callback: null,
                not_defined: false,
            };
        }

        Ray.defaultSettings = Object.assign({}, Ray.defaultSettings, settings.toObject());

        this.inCallback = inCallback;
        this.settings = new Settings(Ray.defaultSettings);

        if (Ray.enabled === null) {
            Ray.enabled = this.settings.enable !== false;
        }

        Ray.client = client ?? Ray.client ?? new Client(this.settings.port, this.settings.host);
        Ray._rateLimiter = Ray._rateLimiter ?? RateLimiter.disabled();
        this.uuid = uuid ?? Ray.fakeUuid ?? nonCryptoUuidV4();

        if (this.settings.intercept_console_log && !this.interceptor().active()) {
            this.interceptor().enable();
        }

        this.loadMacros();
    }

    public static useDefaultSettings(settings: RaySettings) {
        if (Ray.defaultSettings.not_defined === true) {
            Ray.defaultSettings = {
                enable: true,
                host: 'localhost',
                port: 23517,
                scheme: 'http',
                local_path: null,
                remote_path: null,
                always_send_raw_values: false,
                enabled_callback: null,
                sending_payload_callback: null,
                sent_payload_callback: null,
                not_defined: false,
            };
        }

        Ray.defaultSettings = Object.assign({}, Ray.defaultSettings, settings);
        Ray.defaultSettings.not_defined = false;

        Ray.client = new Client(this.defaultSettings.port, this.defaultSettings.host);

        return this;
    }

    protected loadMacros(): this {
        for (const name in Ray.macros) {
            const handler: any = Ray.macros[name];
            this[name] = handler.bind(this);
        }

        return this;
    }

    public interceptor(): ConsoleInterceptor {
        return Ray.interceptor;
    }

    public client(): Client {
        return Ray.client;
    }

    public enable(): this {
        Ray.enabled = true;

        return this;
    }

    public disable(): this {
        Ray.enabled = false;

        return this;
    }

    public enabled(): boolean {
        if (typeof this.settings.enabled_callback === 'function') {
            // @ts-ignore
            return <boolean>Ray.enabled && this.settings.enabled_callback();
        }

        return <boolean>Ray.enabled;
    }

    public disabled(): boolean {
        return !this.enabled();
    }

    public static useClient(client: Client): void {
        this.client = client;
    }

    public project(projectName: string): this {
        Ray.projectName = projectName;

        return this;
    }

    public newScreen(name = ''): this {
        const payload = new NewScreenPayload(name);

        return this.sendRequest(payload);
    }

    public clearAll(): this {
        const payload = new ClearAllPayload();

        return this.sendRequest(payload);
    }

    public clearScreen(): this {
        return this.newScreen();
    }

    public color(color: string): this {
        const payload = new ColorPayload(color);

        return this.sendRequest(payload);
    }

    public confetti(): this {
        const payload = new ConfettiPayload();

        return this.sendRequest(payload);
    }

    public screenColor(color: string): this {
        const payload = new ScreenColorPayload(color);

        return this.sendRequest(payload);
    }

    public label(label: string): this {
        const payload = new LabelPayload(label);

        return this.sendRequest(payload);
    }

    public size(size: string): this {
        const payload = new SizePayload(size);

        return this.sendRequest(payload);
    }

    public remove(): this {
        const payload = new RemovePayload();

        return this.sendRequest(payload);
    }

    public hide(): this {
        const payload = new HidePayload();

        return this.sendRequest(payload);
    }

    public notify(text: string): this {
        const payload = new NotifyPayload(text);

        return this.sendRequest(payload);
    }

    public toJson(...values: any[]): this {
        const payloads = values.map(value => new JsonStringPayload(value));

        return this.sendRequest(payloads);
    }

    public json(...jsons: string[]): this {
        const payloads = jsons.map(json => new DecodedJsonPayload(json));

        return this.sendRequest(payloads);
    }

    public file(filename: string): this {
        throw new Error('file() unsupported on node-ray/web.');
    }

    public image(location: string): this {
        const payload = new ImagePayload(location);

        return this.sendRequest(payload);
    }

    public die(status = ''): void {
        throw new Error(`Ray.die() called: ${status ? status : 'no message'}`);
    }

    public className(object: any): this {
        return this.send(object.constructor.name);
    }

    public error(err: Error): this {
        const payload = new ErrorPayload(err, 'Error');

        return this.sendRequest(payload).red();
    }

    public event(eventName: string, data: any[] = []): this {
        const payload = new EventPayload(eventName, data);

        return this.sendRequest(payload);
    }

    public async exception(err: Error, meta: Record<string, unknown> = {}) {
        const payload = await ExceptionPayload.make(err, meta);

        return await this.sendRequest(payload).red();
    }

    public ban(): this {
        return this.send('🕶');
    }

    public charles(): this {
        return this.send('🎶 🎹 🎷 🕺');
    }

    public table(values: Record<string | number, unknown> | any[], label = 'Table'): this {
        const payload = new TablePayload(values, label);

        return this.sendRequest(payload);
    }

    public async count(name: string | null = null): Promise<Ray> {
        const caller = await this.getCaller();
        const fingerprint = md5(`${caller?.getFileName()}${caller?.getLineNumber()}`);

        const [r, times] = await Ray.counters.increment(name ?? fingerprint ?? 'none');

        let message = 'Called ';

        if (name) {
            message += `'${name}' `;
        }

        message += `${times} ${times === 1 ? 'time' : 'times'}.`;

        r.sendCustom(message, 'Count');

        return r;
    }

    public clearCounters(): this {
        Ray.counters.clear();

        return this;
    }

    public async pause() {
        Ray.lockCounter++;

        const lockName = md5(`${new Date().getTime()}-${Ray.lockCounter}`);
        const payload = new CreateLockPayload(lockName);

        this.sendRequest(payload);

        // eslint-disable-next-line no-async-promise-executor
        return new Promise(async (resolve, reject) => {
            let exists: any;

            do {
                sleep(1);
                try {
                    exists = await Ray.client.lockExists(lockName);
                } catch (err) {
                    reject(err);
                    return false;
                }

                if (exists !== true && exists && exists.stop_execution) {
                    reject(false);
                    return false;
                }
            } while (exists.active);

            resolve(this);
        });
    }

    public stopTime(stopwatchName = ''): this {
        if (stopwatchName === '') {
            Ray.stopWatches = {};

            return this;
        }

        if (typeof Ray.stopWatches[stopwatchName] !== 'undefined') {
            delete Ray.stopWatches[stopwatchName];
        }

        return this;
    }

    public async caller() {
        const backtrace = await Stacktrace.get();

        const payload = new CallerPayload(backtrace);

        return this.sendRequest(payload);
    }

    public async trace() {
        const backtrace = await Stacktrace.get();

        return this.sendRequest(new TracePayload(backtrace));
    }

    public measure(stopwatchName: CallableFunction | string = 'default'): this {
        if (stopwatchName instanceof Function) {
            return this.measureClosure(stopwatchName);
        }

        if (typeof Ray.stopWatches[stopwatchName] === 'undefined') {
            const stopwatch = this.getStopwatch(stopwatchName);
            Ray.stopWatches[stopwatchName] = stopwatch;

            const event = stopwatch.start(stopwatchName);
            const payload = this.getMeasurePayload(stopwatchName, event);
            payload.concernsNewTimer();

            return this.sendRequest(payload);
        }

        const stopwatch = Ray.stopWatches[stopwatchName];
        const event = stopwatch.lap();
        const payload = this.getMeasurePayload(stopwatchName, event);

        return this.sendRequest(payload);
    }

    protected measureClosure(closure: CallableFunction): this {
        const stopwatch = this.getStopwatch('closure');

        stopwatch.start('closure');

        closure();

        const event = stopwatch.stop();

        const payload = this.getMeasurePayload('closure', event);

        return this.sendRequest(payload);
    }

    protected getStopwatch(name: string): Stopwatch {
        return new Stopwatch(name);
    }

    protected getMeasurePayload(name: string, event: any): any {
        return new MeasurePayload(name, event);
    }

    public separator(): this {
        const payload = new SeparatorPayload();

        return this.sendRequest(payload);
    }

    public xml(xml: string): this {
        const payload = new XmlPayload(xml);

        return this.sendRequest(payload);
    }

    public html(html = ''): this {
        const payload = new HtmlPayload(html);

        return this.sendRequest(payload);
    }

    public text(text = ''): this {
        const payload = new TextPayload(text);

        return this.sendRequest(payload);
    }

    public date(date: Date): this {
        const payload = new DatePayload(date);

        return this.sendRequest(payload);
    }

    public raw(...args: any[]): this {
        if (!args.length) {
            return this;
        }

        const payloads = args.map(arg => LogPayload.createForArguments([arg]));

        return this.sendRequest(payloads);
    }

    public send(...args: any[]): this {
        if (!args.length) {
            return this;
        }

        if (this.settings.always_send_raw_values) {
            return this.raw(...args);
        }

        const payloads = PayloadFactory.createForValues(args);

        return this.sendRequest(payloads);
    }

    public pass(argument: any): any {
        this.send(argument);

        return argument;
    }

    public showApp(): this {
        const payload = new ShowAppPayload();

        return this.sendRequest(payload);
    }

    public hideApp(): this {
        const payload = new HideAppPayload();

        return this.sendRequest(payload);
    }

    public macro(name: string, handler: CallableFunction): this {
        Ray.macros[name] = handler;

        this[name] = handler.bind(this);

        return this;
    }

    public htmlMarkup(html: string, options: HtmlMarkupOptions = {}): this {
        const payload = new HtmlMarkupPayload(html, options);

        return this.sendRequest(payload);
    }

    public if(boolOrCallable: CallableFunction | boolean, callback: CallableFunction | null = null): this {
        if (typeof boolOrCallable === 'function') {
            boolOrCallable = <boolean>boolOrCallable();
        }

        if (boolOrCallable && callback !== null) {
            callback(this);
        }

        if (callback === null) {
            this.canSendPayload = boolOrCallable;
        }

        return this;
    }

    public async limit(count: number) {
        const frame = await this.getCaller();

        this.limitOrigin = <any>{
            function_name: frame?.getFunctionName(),
            file: frame?.getFileName(),
            line_number: frame?.getLineNumber(),
            hostname: Hostname.get(),
        };

        Ray.limiters.initialize(this.limitOrigin as OriginData, count);

        return this;
    }

    public async once(...args: any[]) {
        const frame = await this.getCaller();

        this.limitOrigin = <any>{
            function_name: frame?.getFunctionName(),
            file: frame?.getFileName(),
            line_number: frame?.getLineNumber(),
            hostname: Hostname.get(),
        };

        Ray.limiters.initialize(this.limitOrigin as OriginData, 1);

        if (args.length > 0) {
            return this.send(...args);
        }

        return this;
    }

    public chain(callback: RayCallback): this {
        this.chaining = true;

        callback(this);

        this.chaining = false;
        this.sendRequest(this.chainedPayloads.slice(0));
        this.chainedPayloads = [];

        return this;
    }

    public sendCustom(content: string, label = ''): this {
        const payload = new CustomPayload(content, label);

        return this.sendRequest(payload);
    }

    async getOriginFrame() {
        const st = await Stacktrace.get();

        let startFrameIndex = st.findIndex(frame => frame.functionName?.includes('Ray.sendRequest'));

        if (startFrameIndex === -1) {
            startFrameIndex = 0;
        }

        const callerFrames = RemovesRayFrames.removeRayFrames(st.slice(startFrameIndex));

        return callerFrames.slice(0).shift();
    }

    async getCaller() {
        const st = await Stacktrace.get();

        let startFrameIndex = st.findIndex(frame => frame.functionName?.includes('Ray.getCaller'));

        if (startFrameIndex === -1) {
            startFrameIndex = 0;
        }

        const callerFrames = st.slice(startFrameIndex);

        if (callerFrames.length === 1) {
            return callerFrames.shift();
        }

        return callerFrames.slice(2).shift();
    }

    async getOriginData() {
        const frame = await this.getOriginFrame();

        return <any>{
            function_name: frame?.getFunctionName(),
            file: frame?.getFileName(),
            line_number: frame?.getLineNumber(),
            hostname: Hostname.get(),
        };
    }

    protected prepareMeta(meta: Record<string, any>) {
        return Object.assign(
            {},
            {
                node_ray_package_version: PACKAGE_VERSION ?? 'unknown',
                project_name: Ray.projectName,
            },
            meta,
        );
    }

    protected executePayloadCallback(callbackType: SendRequestCallbackType, args: any = []) {
        if (this.inCallback) return;

        this.inCallback = true;

        try {
            if (callbackType === SendRequestCallbackType.Sending && this.settings.sending_payload_callback !== null) {
                this.settings.sending_payload_callback(new Ray(this.settings, this.client(), this.uuid, true), args);
            }

            if (callbackType === SendRequestCallbackType.Sent && this.settings.sent_payload_callback !== null) {
                this.settings.sent_payload_callback(this);
            }
        } catch (e) {
            //
        }

        this.inCallback = false;
    }

    public sendRequest(payloads: Payload | Payload[], meta: any[] = []) {
        if (!this.enabled()) {
            return this;
        }

        if (!this.canSendPayload) {
            return this;
        }

        if (this.chaining) {
            const tempPayloads = Array.isArray(payloads) ? payloads : [payloads];
            this.chainedPayloads.push(...tempPayloads);

            return this;
        }

        if (this.limitOrigin !== null) {
            if (!Ray.limiters.canSendPayload(this.limitOrigin)) {
                return this;
            }

            Ray.limiters.increment(this.limitOrigin);
        }

        if (!Array.isArray(payloads)) {
            payloads = [payloads];
        }

        if (this.rateLimiter().isMaxReached() || this.rateLimiter().isMaxPerSecondReached()) {
            this.rateLimiter().notified = true;
            this.notifyWhenRateLimitReached();

            return this;
        }

        payloads.forEach(payload => {
            this.getOriginData().then(data => {
                payload.data.origin = data;
            });
            payload.remotePath = this.settings.remote_path;
            payload.localPath = this.settings.local_path;
        });

        this.executePayloadCallback(SendRequestCallbackType.Sending, payloads);

        Ray.client.send(new Request(this.uuid, payloads, this.prepareMeta(meta)));

        this.rateLimiter().hit();

        this.executePayloadCallback(SendRequestCallbackType.Sent, payloads);

        return this;
    }

    public rateLimiter(): RateLimiter {
        return Ray._rateLimiter;
    }

    protected async notifyWhenRateLimitReached() {
        if (this.rateLimiter().isNotified()) {
            return;
        }

        const customPayload = new CustomPayload('Rate limit has been reached...', 'Rate limit');
        const request = new Request(this.uuid, [customPayload], []);

        await Ray.client.send(request);

        this.rateLimiter().notify();
    }

    standalone(windowObject: any) {
        if (typeof windowObject !== 'undefined') {
            windowObject.ray = ray;
            windowObject.Ray = Ray;
        }
    }
}

export const ray = (...args: any[]) => {
    return Ray.create().send(...args);
};

export const standalone = windowObject => {
    if (typeof windowObject !== 'undefined') {
        windowObject.ray = ray;
        windowObject.Ray = Ray;
    }
};

// @ts-ignore
if (typeof __BUILDING_STANDALONE_LIB__ !== 'undefined' && __BUILDING_STANDALONE_LIB__) {
    try {
        const win: any = window;
        win.ray = ray;
        win.Ray = Ray;
        win.rayInit = () => standalone(win);
    } catch (e) {
        //
    }
}
