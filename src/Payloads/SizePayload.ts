import { Payload } from '../Payloads/Payload';

export class SizePayload extends Payload {
    protected size: string;

    public constructor(size: string) {
        super();

        this.size = size;
    }

    public getType(): string {
        return 'size';
    }

    public getContent(): Record<string, unknown> {
        return {
            size: this.size,
        };
    }
}
