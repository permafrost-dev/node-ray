/* eslint-disable no-async-promise-executor */

//use Spatie\Ray\Exceptions\StopExecutionRequested;

import { Request } from './Request';
import axios from 'axios';
import { Payload } from './Payloads/Payload';

export class Client {
    public static rayState: boolean | null = true;

    protected portNumber: number;
    protected host: string;

    public constructor(portNumber = 23517, host = 'localhost') {
        this.portNumber = portNumber;

        this.host = host;
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
        const sec = Math.floor(new Date().getSeconds() / 5);

        if ([0, 10].includes(sec)) {
            Client.rayState = null;
        }
    }

    protected async updateRayAvailabilty() {
        let result = true;

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

        return `http://${this.host}:${this.portNumber}/${path}`;
    }

    public async send(request: Request) {
        if (Client.rayState === null) {
            await this.updateRayAvailabilty();
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
        // if (Client.rayState === null) {
        //     await this.updateRayAvailabilty();
        // }

        return new Promise(async (resolve, reject) => {
            // if (!this.isRayAvailable()) {
            //     resolve(false);
            // }

            let resp;

            try {
                resp = await axios.get(this.getUrlForPath(`/locks/${lockName}`));
            } catch (err) {
                // ignore errors, i.e. connection failed
                return false;
            }

            //console.log('resp=', resp);

            //console.log(resp.data.stop_exectution);
            if (resp.data.stop_execution) {
                ///console.log(resp.data);

                reject(new Error('stopping execution'));

                //resolve(new Error('stopping execution'));
            }

            if (resp.data.stop_execution) {
                reject(new Error('stopping execution'));
            } else {
                if (typeof resp.data['active'] === 'undefined') {
                    console.log(resp.data);
                    resolve(resp.data);
                } else {
                    //resolve(resp.data);

                    //console.log(resp.data);
                    if (resp.data.stop_execution) {
                        //resolve(new Error('stopping execution'));
                        //return new Error('abc');
                        reject(new Error('test'));
                    } else {
                        resolve(resp.data);
                    }
                }
            }

            reject(new Error('test'));
        });
        //}//});

        /*
        curlHandle = this.getCurlHandleForUrl('get', `locks/${lockName}`);
        curlError = null;

        try {
            curlResult = curl_exec(curlHandle);

            if (curl_errno(curlHandle)) {
                curlError = curl_error(curlHandle);
            }

            if (curlError) {
                throw new Exception;
            }

            if (! curlResult) {
                return false;
            }

            response = json_decode(curlResult, true);

            if (response['stop_execution'] ?? false) {
                throw StopExecutionRequested::make();
            }

            return response['active'] ?? false;
        } catch (Exception exception) {
            if (exception instanceof StopExecutionRequested) {
                throw exception;
            }
        } finally {
            curl_close(curlHandle);
        }
        */

        //return false;
    }
}
