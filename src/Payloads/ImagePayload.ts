import { existsSync } from 'fs';
import { Payload } from '../Payloads/Payload';

export class ImagePayload extends Payload {
    protected location: string;

    public constructor(location: string) {
        super();

        this.location = location;
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        if (existsSync(this.location)) {
            this.location = `file://${this.location}`;
        }

        const location = this.location.replace('`', '');

        return {
            content: `<img src="${location}" alt="" />`,
            label: 'Image',
        };
    }
}
