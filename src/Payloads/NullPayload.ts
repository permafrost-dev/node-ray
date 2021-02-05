import { Payload } from '../Payloads/Payload';

export class NullPayload extends Payload {
    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        return {
            content: null,
            label: 'Null',
        };
    }
}
