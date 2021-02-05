import { Payload } from '../Payloads/Payload';

export class JsonStringPayload extends Payload {
    protected value: any;

    public constructor(value: any) {
        super();

        this.value = value;
    }

    public getType(): string {
        return 'json_string';
    }

    public getContent(): Record<string, unknown> {
        return {
            value: JSON.stringify(this.value),
        };
    }
}
