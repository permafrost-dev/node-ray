import { Payload } from '../Payloads/Payload';

export class NotifyPayload extends Payload {
    protected text: string;

    public constructor(text: string) {
        super();

        this.text = text;
    }

    public getType(): string {
        return 'notify';
    }

    public getContent(): Record<string, unknown> {
        return {
            value: this.text,
        };
    }
}
