import { Payload } from '../Payloads/Payload';
import { EOL } from 'os';
import formatXml from 'xml-formatter';

export class XmlPayload extends Payload
{
    /** @var string */
    protected value;

    public constructor(value: string)
    {
        super();

        this.value = value;
    }

    public getType(): string
    {
        return 'custom';
    }

    public getContent(): Record<string, unknown>
    {
        const content = this.formatXmlForDisplay(this.value);

        return {
            content: content,
            label: 'XML',
        };
    }

    protected formatXmlForDisplay(xml: string): string
    {
        const content = this.formatAndIndentXml(xml);

        return this.encodeXml(content.trim());
    }

    protected encodeXml(xml: string): string
    {
        const escapeChars: Record<string, string> = {
            '¢': 'cent',
            '£': 'pound',
            '¥': 'yen',
            '€': 'euro',
            '©': 'copy',
            '®': 'reg',
            '<': 'lt',
            '>': 'gt',
            '"': 'quot',
            '&': 'amp',
            '\'': '#39',
            ' ': 'nbsp',
        };

        let regexString = '[';
        for (const key in escapeChars) {
            regexString += key;
        }
        regexString += ']';

        const regex = new RegExp(regexString, 'g');

        const escapeHTML = (str: string) => str.replace(regex, m => `&${escapeChars[m]};`);

        return escapeHTML(xml).replace(/(\r\n|\r|\n)/g, '<br>');
    }

    protected formatAndIndentXml(xml: string): string
    {
        return formatXml(xml, {
            indentation: '    ',
            filter: (node) => node.type !== 'Comment',
            collapseContent: true,
            lineSeparator: EOL,
        });
    }
}
