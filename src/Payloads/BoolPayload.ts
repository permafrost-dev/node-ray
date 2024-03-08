import { Payload } from '@/Payloads/Payload';

export class BoolPayload extends Payload {
    protected value: boolean;

    public constructor(value: boolean) {
        super();
        this.value = value;
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        return {
            content: this.value,
            label: 'Boolean',
        };
    }
}
