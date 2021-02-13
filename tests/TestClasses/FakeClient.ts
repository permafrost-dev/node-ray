import { sep } from 'path';
import { Client } from '../../src/Client';
import { Payload } from '../../src/Payloads/Payload';
import { Request } from '../../src/Request';

export class FakeClient extends Client {
    protected sentRequests: any[] = [];

    public async send(request: Request) {
        const requestProperties: any = request.toArray();
        const payloads: Payload[] = request.payloads;

        payloads.map(payload => {
            payload.toArray();

            const fn: string = payload.data.origin.file ?? '/test/file.js';

            payload.data.origin.function_name = 'xxxx';
            payload.data.origin.file = fn.replace(this.baseDirectory(), '');
            //payload.data.origin.file = this.convertToUnixPath(payload.data.origin.file);
            payload.data.origin.line_number = 999;

            if (payload.getType() === 'color' || payload.getType() === 'size') {
                payload.data.origin.file = '/tests/Ray.test.ts';
            }

            if (payload.getType() === 'measure') {
                payload.data.content.max_memory_usage_during_total_time = 0;
                payload.data.content.max_memory_usage_since_last_call = 0;

                payload.data.content.total_time = Math.floor(payload.data.content.total_time / 10);
                payload.data.content.time_since_last_call = Math.floor(payload.data.content.time_since_last_call / 10);
            }

            if (payload.getType() === 'caller') {
                payload.data.content.frame.method = 'caller';
            }

            if (payload.getType() === 'create_lock') {
                payload.data.content.name = 'xxxxx';
            }
        });

        requestProperties.meta = [];

        this.sentRequests.push(requestProperties);
    }

    // eslint-disable-next-line no-unused-vars
    public async lockExists(lockName: string) {
        // eslint-disable-next-line no-unused-vars
        return new Promise((resolve, reject) => {
            resolve({ active: false, stop_exectution: true });
        });
    }

    public sentPayloads(): any[] {
        return this.sentRequests;
    }

    public reset(): this {
        this.sentRequests = [];

        return this;
    }

    protected baseDirectory(): string {
        return __dirname.replace('/tests/TestClasses', '');
    }

    protected convertToUnixPath(path: string): string {
        path = path.replace('D:\\a\\ray\\ray', '');

        return path.replace(sep, '/');
    }
}
