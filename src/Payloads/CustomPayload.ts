import { Payload } from '@/Payloads/Payload';

export class CustomPayload extends Payload {
    protected content: string;
    protected label: string;

    public constructor(content: string, label = '') {
        super();

        this.content = content;
        this.label = label;
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        return {
            content: this.content,
            label: this.label,
        };
    }
}
