import { Payload } from '@/Payloads/Payload';
import { memoryUsage, versions } from 'node:process';

export class NodeInfoPayload extends Payload {
    protected properties: string[] = [];

    constructor(...properties: string[]) {
        super();
        this.properties = properties;
    }

    getType(): string {
        return 'table';
    }

    getContent(): Record<string, any> {
        let values: Record<string, any> = {};

        if (Object.keys(versions).length === 0) {
            const extensions: string[] = [];
            for (const extension in versions) {
                if (extension !== 'node' && extension !== 'v8') {
                    extensions.push(`${extension} v${versions[extension]}`);
                }
            }

            values = {
                'Node version': versions.node,
                'V8 version': versions.v8,
                'Memory Heap usage': memoryUsage().heapUsed,
                'Memory RSS usage': memoryUsage().rss,
                Extensions: extensions.join(', '),
            };
        }

        return {
            values,
            label: 'NodeInfo',
        };
    }
}
