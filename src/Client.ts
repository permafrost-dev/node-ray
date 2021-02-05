/* eslint-disable no-async-promise-executor */
//use Exception;
//use Spatie\Ray\Exceptions\StopExecutionRequested;

import { Request } from './Request';
import axios from 'axios';

export class Client {
    protected portNumber: number;
    protected host: string;

    public constructor(portNumber = 23517, host = 'localhost') {
        this.portNumber = portNumber;

        this.host = host;
    }

    public async send(request: Request) {
        await axios.post(`http://${this.host}:${this.portNumber}/`, request.toArray());

        //console.log(request.toJson());
        // TODO: send axios post request
    }

    public async lockExists(lockName: string) {
        return new Promise(async (resolve, reject) => {
            //console.log(lockName);

            const resp = await axios.get(`http://${this.host}:${this.portNumber}/locks/${lockName}`);

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

    protected getCurlHandleForUrl(method: string, url: string) {
        return this.getCurlHandle(method, `http://${this.host}:${this.portNumber}/${url}`);
    }

    protected getCurlHandle(method: string, fullUrl: string) {
        console.log(method, fullUrl);
        /*
        curlHandle = curl_init();

        curl_setopt(curlHandle, CURLOPT_URL, fullUrl);

        curl_setopt(curlHandle, CURLOPT_HTTPHEADER, array_merge(['Accept: application/json', 'Content-Type: application/json']));

        curl_setopt(curlHandle, CURLOPT_USERAGENT, 'Ray 1.0');
        curl_setopt(curlHandle, CURLOPT_RETURNTRANSFER, true);
        curl_setopt(curlHandle, CURLOPT_TIMEOUT, 2);
        curl_setopt(curlHandle, CURLOPT_SSL_VERIFYPEER, true);
        curl_setopt(curlHandle, CURLOPT_HTTP_VERSION, CURL_HTTP_VERSION_1_1);
        curl_setopt(curlHandle, CURLOPT_ENCODING, '');
        curl_setopt(curlHandle, CURLINFO_HEADER_OUT, true);
        curl_setopt(curlHandle, CURLOPT_FAILONERROR, true);

        if (method === 'post') {
            curl_setopt(curlHandle, CURLOPT_POST, true);
        }

        return curlHandle;
        */
    }
}
