import { Payload } from '@/Payloads/Payload';
import { formatHtmlForDisplay } from '@/lib/utils';

export type PayloadType = 'text';

export class TextPayload extends Payload {
    // eslint-disable-next-line no-unused-vars
    public constructor(protected text: string) {
        super();
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        return {
            content: formatHtmlForDisplay(this.text, { encodeEntities: true }),
            label: 'Text',
        };
    }
}
