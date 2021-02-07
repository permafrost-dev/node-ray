/* eslint-disable no-async-promise-executor */

//use Spatie\Ray\Exceptions\StopExecutionRequested;

import { Request } from './Request';
import axios from 'axios';

export class Client
{
    protected portNumber: number;
    protected host: string;

    public constructor(portNumber = 23517, host = 'localhost')
    {
        this.portNumber = portNumber;

        this.host = host;
    }

    protected getUrlForPath(path: string): string
    {
        path = path.replace(/^\//, ''); // strip leading slash

        return `http://${this.host}:${this.portNumber}/${path}`;
    }

    public async send(request: Request)
    {
        try {
            await axios.post(this.getUrlForPath('/'), request.toArray(), { timeout: 2, httpAgent: 'node-ray/1.0' });
        } catch (err) {
            // ignore all errors, such as when Ray isn't running and we can't connect
        }
    }

    public async lockExists(lockName: string)
    {
        return new Promise(async (resolve, reject) =>
        {
            let resp;

            try {
                resp = await axios.get(this.getUrlForPath(`/locks/${lockName}`), { timeout: 2, httpAgent: 'node-ray/1.0' });
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
