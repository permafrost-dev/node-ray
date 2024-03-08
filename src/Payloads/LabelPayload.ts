import { Payload } from '@/Payloads/Payload';

export class LabelPayload extends Payload {
    protected label: string;

    public constructor(label: string) {
        super();
        this.label = label;
    }

    public getType(): string {
        return 'label';
    }

    public getContent(): Record<string, unknown> {
        return {
            label: this.label,
        };
    }
}
