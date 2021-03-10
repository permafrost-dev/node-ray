/* eslint-disable no-async-promise-executor */

//use Spatie\Ray\Exceptions\StopExecutionRequested;

import { Request } from './Request';
import axios from 'axios';
import { Payload } from './Payloads/Payload';

export class Client {
    public static rayState: boolean | null = true;
    public static lastRayStateCheck: number | null = null;

    protected portNumber: number;
    protected host: string;
    protected scheme = 'http';

    public constructor(portNumber = 23517, host = 'localhost', scheme = 'http') {
        this.portNumber = portNumber;

        this.host = host;

        this.scheme = scheme;

        //this.init();
    }

    public async init() {
        await this.updateRayAvailabilty();
    }

    public isRayAvailable(): boolean {
        this.attemptAvailableReset();

        if (Client.rayState === null) {
            this.updateRayAvailabilty();
        }

        if (Client.rayState !== null) {
            return Client.rayState;
        }

        return true;
    }

    protected attemptAvailableReset() {
        if (Client.lastRayStateCheck !== null && new Date().getTime() - Client.lastRayStateCheck >= 30000) {
            Client.rayState = null;
        }
    }

    protected async updateRayAvailabilty() {
        let result = true;

        if (Client.lastRayStateCheck !== null && new Date().getTime() - Client.lastRayStateCheck < 30000) {
            return true;
        }

        Client.lastRayStateCheck = new Date().getTime();

        try {
            await axios.get(this.getUrlForPath('/locks/__availabilty_check'), {});
        } catch (err) {
            if (err.response) {
                // 4xx error
                result = true;
            } else if (err.request) {
                // connection error
                result = false;
            } else {
                // error during setup
                result = false;
            }
        } finally {
            Client.rayState = result;
        }
    }

    protected getUrlForPath(path: string): string {
        path = path.replace(/^\//, ''); // strip leading slash

        return `${this.scheme ?? 'http'}://${this.host}:${this.portNumber}/${path}`;
    }

    public async send(request: Request) {
        if (Client.rayState === null || Client.lastRayStateCheck === null) {
            this.updateRayAvailabilty();
        }

        // if (!this.isRayAvailable()) {
        //     return;
        // }

        try {
            request.payloads = this.ensureAllPayloadsHaveAnOrigin(request.payloads);

            await axios.post(this.getUrlForPath('/'), request.toArray());
        } catch (err) {
            // ignore all errors, such as when Ray isn't running and we can't connect
        }
    }

    protected ensureAllPayloadsHaveAnOrigin(payloads: Payload[]) {
        payloads.forEach(payload => {
            if (
                payload.data.origin.file === null ||
                payload.data.origin.file === '' ||
                typeof payload.data.origin['file'] === 'undefined'
            ) {
                payload.data.origin['file'] = '/unknown-file.js';
                payload.data.origin['line_number'] = 1;
                payload.data.origin['function_name'] = 'unknown';
            }
        });

        return payloads;
    }

    public async lockExists(lockName: string) {
        return new Promise(async (resolve, reject) => {
            let resp;

            try {
                resp = await axios.get(this.getUrlForPath(`/locks/${lockName}`));
            } catch (err) {
                // ignore errors, i.e. connection failed
                return false;
            }

            if (resp.data.stop_execution) {
                reject(new Error('stopping execution'));
                return;
            }

            if (typeof resp.data['active'] === 'undefined') {
                resolve(resp.data);
                return;
            }

            resolve(resp.data);
        });
    }
}
