import { format as prettyFormat } from '@permafrost-dev/pretty-format';

export interface ArgumentConverterResult {
    value: any;
    isHtml: boolean;
}

export class ArgumentConverter {
    public static convertToPrimitive(arg: any): ArgumentConverterResult {
        if (arg === null) {
            return { value: null, isHtml: false };
        }

        if (typeof arg === 'string') {
            return { value: arg, isHtml: false };
        }

        if (typeof arg === 'number') {
            return { value: arg, isHtml: false };
        }

        if (typeof arg === 'boolean') {
            return { value: arg, isHtml: false };
        }

        return { value: ArgumentConverter.prettyFormatForHtml(arg), isHtml: true };
    }

    protected static buildHtmlElement(tagName: string, classes: string, slot: string): string {
        return `<${tagName} style="font-size: 0.8rem!important;" class="${classes}">${slot}</${tagName}>`;
    }

    public static prettyFormatForHtml(arg: any): string {
        const formatted = prettyFormat(arg, { indent: '    ' } as any)
            // format whitespace for display in html
            .replaceAll(' ', '&nbsp;')
            .replace(/\r\n|\r|\n/g, '<br>')

            // highlight quoted strings
            .replace(/("[^"]+")/g, this.buildHtmlElement('code', 'bold text-green-600 p-0', '$1'))

            // highlight array contents
            .replace(/Array(&nbsp;|\s)+(\[[^\]]+\])/g, this.buildHtmlElement('code', 'bold text-gray-500 p-0', '$1$2'))

            // highlight types like [Function Abc]
            .replace(/^(\[[^\]]+\])$/g, this.buildHtmlElement('code', 'bold text-gray-500 p-0', '$1'))

            // highlight object contents
            .replace(/(\{.+\})/g, this.buildHtmlElement('code', 'text-gray-600', '$1'))

            // highlight keywords
            .replace(
                /(Array|Object|Number|Function|Circular|Symbol|WeakMap|Map)/g,
                this.buildHtmlElement('span', 'bold text-yellow-600', '$1'),
            )

            // highlight reserved words
            .replaceAll(/(true|false|null|undefined|NaN)/g, this.buildHtmlElement('span', 'bold text-indigo-600', '$1'))

            // highlight special chars
            .replace(/(:&nbsp;|[,[\]{}])/g, this.buildHtmlElement('span', 'bold text-orange-400', '$1'));

        return this.buildHtmlElement('code', '', formatted);
    }
}
