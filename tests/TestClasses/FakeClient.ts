import { Payload } from 'dist1.ignore/src/Payloads/Payload';
import { sep } from 'path';
import { Client } from '../../src/Client';
//import { Payload } from '../../src/Payloads/Payload';
import { Request } from '../../src/Request';

export class FakeClient extends Client
{
    protected sentRequests: any[] = [];

    protected getUrlForPath(path: string): string
    {
        return `http://localhost:19990/bad/${path}`;
    }

    public async send(request: Request)
    {
        const requestProperties: any = request.toArray();
        const payloads: Payload[] = request.payloads;


        payloads.map((payload: any) =>
        {
            //console.log(payload.data.origin.function_name);

            payload.toArray();

            const fn: string = payload.data.origin.file ?? '/test/file.js';

            payload.data.origin.function_name = 'xxxx';
            payload.data.origin.file = fn.replace(this.baseDirectory(), '');
            //payload.data.origin.file = this.convertToUnixPath(payload.data.origin.file);

            payload.data.origin.line_number = 999;
        });

        requestProperties.meta = [];

        this.sentRequests.push(requestProperties);
    }

    public sentPayloads(): any[]
    {
        return this.sentRequests;
    }

    public reset(): this
    {
        this.sentRequests = [];

        return this;
    }

    protected baseDirectory(): string
    {
        return __dirname.replace('/tests/TestClasses', '');
    }

    protected convertToUnixPath(path: string): string
    {
        path = path.replace('D:\\a\\ray\\ray', '');

        return path.replace(sep, '/');
    }
}
