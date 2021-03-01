import prettyFormat from 'pretty-format';
const PrettyFormatPluginDomCollection = require('pretty-format/build/plugins/DOMCollection');
const PrettyFormatPluginDomElement = require('pretty-format/build/plugins/DOMElement');

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

    public static prettyFormatForHtml(arg: any): string {
        const formatted = prettyFormat(arg, {
            plugins: [PrettyFormatPluginDomCollection, PrettyFormatPluginDomElement],
            indent: 4,
        })
            // format whitespace for display in html
            .replace(/ /g, '&nbsp;')
            .replace(/\r\n|\r|\n/g, '<br>')
            // highlight quoted strings
            .replace(/("[^"]+")/g, '<code style="font-size: 0.8rem!important;" class="bold text-green-600 p-0">$1</code>')
            // highlight array contents
            .replace(
                /Array(&nbsp;|\s)+(\[[^\]]+\])/g,
                '<code style="font-size: 0.8rem!important;" class="text-gray-500 p-0">Array$1$2</code>'
            )
            // highlight types like [Function Abc]
            .replace(/^(\[[^\]]+\])$/g, '<code style="font-size: 0.8rem!important;"class="text-gray-500 p-0">$1</code>')
            // highlight object contents
            .replace(/(\{.+\})/g, '<code style="font-size: 0.8rem!important;" class="text-gray-600 ">$1</code>')
            // highlight keywords
            .replace(
                /(Array|Object|Function|Circular|Symbol|WeakMap|Map)/g,
                '<span style="font-size: 0.8rem!important;" class="text-yellow-600 bold">$1</span>'
            )
            // highlight reserved words
            .replace(/(true|false|null)/g, '<span style="font-size: 0.8rem!important;" class="text-indigo-600 bold">$1</span>')
            // highlight special chars
            .replace(/(:&nbsp;|[,[\]{}])/g, '<span style="font-size: 0.8rem!important;" class="text-orange-400 bold">$1</span>');

        return `<code style="font-size: 0.8rem!important;">${formatted}</code>`;
    }
}
