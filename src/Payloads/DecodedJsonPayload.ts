import { Payload } from '../Payloads/Payload';

export class DecodedJsonPayload extends Payload {
    // eslint-disable-next-line no-unused-vars
    public constructor(protected value: string) {
        super();
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        const decodedJson = JSON.parse(this.value);

        return {
            // TODO: use ArgumentConverter
            content: decodedJson, //ArgumentConverter::convertToPrimitive(decodedJson),
            label: 'JSON',
        };
    }
}
