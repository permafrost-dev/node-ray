import { Payload } from '../Payloads/Payload';
// import formatXml from 'xml-formatter';
import { formatHtmlForDisplay } from '../lib/utils';

const formatXml = require('xml-formatter').default;

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
            //filter: (node) => node.type !== 'Comment',
            collapseContent: true,
            lineSeparator: '\n',
        });
    }

    protected highlightHtmlMarkup(markup: string): string {
        // return markup.replace(
        //     /(hover:)?(xs:|sm:|md:|lg:|xl:|\dxl:)?(min-|max-)?((bg|text|font|flex|grid|border|col|divide|align|tracking|leading|rounded|whitespace|overflow|inline|grid|row|h|w|p[rltbxy]?|m[rltbxy]?)-[\w-]+|(flex|absolute|relative|sr-only|uppercase|lowercase))/g,
        //     `<div class='ml-1 mr-1 bg-blue-100 rounded-md inline'>$1$2$3$4</div>`
        // );

        return markup
            .replace(/&quot;/g, '"') // unescape quotes
            .replace(/="([^"]+)"/g, `=<span style='color:#16A34A;'>&quot;$1&quot;</span>`) // attribute values
            .replace(/(&lt;[A-Za-z\d-]+)(\s|&nbsp;|&gt;)/g, '<span style="color:#1D4ED8;">$1</span>$2') // open tags
            .replace(/(&lt;\/[A-Za-z\d-]+)(&gt;)/g, '<span style="color:#1D4ED8;">$1$2</span>'); // close tags

        // return markup
        // .replace(/(<\w+)/g, '<span style="color:blue;">$1</span>')
        // .replace(
        //     /(hover:|focus:)?(xs:|sm:|md:|lg:|xl:|\dxl:)?(min-|max-)?((bg|text|font|flex|grid|border|col|divide|align|tracking|leading|rounded|whitespace|overflow|inline|grid|row|h|w|p[rltbxy]?|m[rltbxy]?)-[\w-\/]+|(flex|absolute|relative|sr-only|uppercase|lowercase))/g,
        //     "<div class='ml-0.5 mr-0.5 p-0.5 bg-blue-200 rounded-sm inline'>$1$2$3$4$5</div>"
        // );
    }
}
