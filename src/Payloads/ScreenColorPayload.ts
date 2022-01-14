import { Payload } from '../Payloads/Payload';

export class ScreenColorPayload extends Payload {
    protected color: string;

    public constructor(color: string) {
        super();

        this.color = color;
    }

    public getType(): string {
        return 'screen_color';
    }

    public getContent(): Record<string, unknown> {
        return {
            color: this.color,
        };
    }
}
