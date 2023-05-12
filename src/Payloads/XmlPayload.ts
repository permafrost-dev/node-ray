import { Payload } from '../Payloads/Payload';
//import formatXml from 'xml-formatter/dist/esm/index';
import { formatHtmlForDisplay } from '../lib/utils';
import * as xmlfmt from 'xml-formatter';

const formatXml = xmlfmt.default;

// const formatXml = require('xml-formatter');

export class XmlPayload extends Payload {
    protected value: string;

    public constructor(value: string) {
        super();

        this.value = value;
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, string> {
        const content = this.formatXmlForDisplay(this.value);

        return {
            content: content,
            label: 'XML',
        };
    }

    protected formatXmlForDisplay(xml: string): string {
        const content = this.formatAndIndentXml(xml);

        return this.encodeXml(content);
    }

    protected encodeXml(xml: string): string {
        return formatHtmlForDisplay(xml, { encodeEntities: true });
    }

    protected formatAndIndentXml(xml: string): string {
        return formatXml(xml.toString(), {
            indentation: '    ',
            //filter: (node) => node.type !== 'Comment',
            collapseContent: true,
            lineSeparator: '\n',
        });
    }
}
