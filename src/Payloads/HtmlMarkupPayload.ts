import { Payload } from '@/Payloads/Payload';
import { formatHtmlForDisplay } from '@/lib/utils';
import formatXml from 'xml-formatter';

export type PayloadType = 'htmlMarkup';

export type HtmlMarkupHighlightTypes = 'tailwindcss' | 'none';
export interface HtmlMarkupOptions {
    highlight?: HtmlMarkupHighlightTypes;
}

export class HtmlMarkupPayload extends Payload {
    protected value: string;

    protected options: HtmlMarkupOptions;

    public constructor(value: string, options: HtmlMarkupOptions = { highlight: 'none' }) {
        super();

        this.value = value;
        this.options = options;
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, string> {
        const content = this.formatMarkupForDisplay(this.value);

        return {
            content: content,
            label: 'Markup',
        };
    }

    protected formatMarkupForDisplay(markup: string): string {
        const content = this.formatAndIndentMarkup(markup);

        return this.highlightHtmlMarkup(formatHtmlForDisplay(content, { encodeEntities: true }));
    }

    protected formatAndIndentMarkup(markup: string): string {
        return formatXml(markup.toString(), {
            indentation: '    ',
            collapseContent: true,
            lineSeparator: '\n',
        });
    }

    protected highlightHtmlMarkup(markup: string): string {
        return markup
            .replace(/&quot;/g, '"') // unescape quotes
            .replace(/="([^"]+)"/g, `=<span style='color:#16A34A;'>&quot;$1&quot;</span>`) // attribute values
            .replace(/(&lt;[A-Za-z\d-]+)(\s|&nbsp;|&gt;)/g, '<span style="color:#1D4ED8;">$1</span>$2') // open tags
            .replace(/(&lt;\/[A-Za-z\d-]+)(&gt;)/g, '<span style="color:#1D4ED8;">$1$2</span>'); // close tags
    }
}
