import { Payload } from '../Payloads/Payload';

export class DecodedJsonPayload extends Payload {
    /** @var string */
    protected value;

    public constructor(value: string) {
        super();
        this.value = value;
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        const decodedJson = JSON.parse(this.value);

        return {
            // TODO: use ArgumentConverter
            content: decodedJson, //ArgumentConverter::convertToPrimitive(decodedJson),
            label: '',
        };
    }
}
