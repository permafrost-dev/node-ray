import { Payload } from '../Payloads/Payload';
import { formatHtmlForDisplay } from '../lib/utils';

export class TextPayload extends Payload {
    public constructor(protected text: string) { // eslint-disable-line no-unused-vars
        super();
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        return {
            content: this.formatContent(),
            label: 'Text',
        };
    }

    protected formatContent() {
        return formatHtmlForDisplay(this.text, { encodeEntities: true })
    }
}
