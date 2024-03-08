import { Payload } from '@/Payloads/Payload';

export class ColorPayload extends Payload {
    protected color: string;

    public constructor(color: string) {
        super();

        this.color = color;
    }

    public getType(): string {
        return 'color';
    }

    public getContent(): Record<string, unknown> {
        return {
            color: this.color,
        };
    }
}
