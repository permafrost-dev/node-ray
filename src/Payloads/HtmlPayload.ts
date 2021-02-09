import { Payload } from '../Payloads/Payload';

export class HtmlPayload extends Payload {
    protected html: string;

    public constructor(html = '') {
        super();

        this.html = html;
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        return {
            content: this.html,
            label: 'HTML',
        };
    }
}
