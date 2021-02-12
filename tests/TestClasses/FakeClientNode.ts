import { Payload } from '@/Payloads/Payload';
import { Request } from '@/Request';
import { FakeClient } from './FakeClient';

export class FakeClientNode extends FakeClient {
    public async send(request: Request) {
        const requestProperties: any = request.toArray();
        const payloads: Payload[] = request.payloads;

        payloads.map(payload => {
            payload.toArray();

            const fn = '/test/file.js';

            payload.data.origin.function_name = 'xxxx';
            payload.data.origin.file = fn.replace(this.baseDirectory(), '');
            //payload.data.origin.file = this.convertToUnixPath(payload.data.origin.file);
            payload.data.origin.line_number = 999;

            if (payload.getType() === 'measure') {
                payload.data.content.total_time = Math.floor(payload.data.content.total_time / 10);
                payload.data.content.time_since_last_call = Math.floor(payload.data.content.time_since_last_call / 10);
            }

            if (payload.data.content.label === 'Image') {
                payload.data.content.content = payload.data.content.content.replace(this.baseDirectory(), '');
            }

            if (payload.getType() === 'create_lock') {
                payload.data.content.name = 'xxxxx';
            }
        });

        requestProperties.meta = [];

        this.sentRequests.push(requestProperties);
    }
}
