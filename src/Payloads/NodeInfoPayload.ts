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
        const extensions: string[] = Object.keys(versions)
            .filter(extension => extension !== 'node' && extension !== 'v8')
            .map(extension => `${extension} v${versions[extension]}`);

        const values: Record<string, any> = {
            'Node version': versions.node,
            'V8 version': versions.v8,
            'Memory Heap usage': memoryUsage().heapUsed,
            'Memory RSS usage': memoryUsage().rss,
            Extensions: extensions.join(', '),
        };

        return {
            values,
            label: 'NodeInfo',
        };
    }
}
