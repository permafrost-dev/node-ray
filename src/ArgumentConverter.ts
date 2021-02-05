import prettyFormat from 'pretty-format';

export class ArgumentConverter
{
    public static convertToPrimitive(arg: any): any
    {
        if (arg === null) {
            return null;
        }

        if (typeof arg === 'string') {
            return arg;
        }

        if (typeof arg === 'number') {
            return arg;
        }

        if (typeof arg === 'boolean') {
            return arg;
        }

        return ArgumentConverter.prettyFormatForHtml(arg);
    }

    public static prettyFormatForHtml(arg: any): string
    {
        const formatted = prettyFormat(arg, { indent: 4 })
            // format whitespace for display in html
            .replace(/ /g, '&nbsp;')
            .replace(/\r\n|\r|\n/g, '<br>')
            // highlight quoted strings
            .replace(
                /("[^"]+")/g,
                '<code style="font-size: 0.8rem!important;" class="bold text-blue-400 p-0">$1</code>'
            )
            // highlight array contents
            .replace(
                /Array(&nbsp;|\s+)+(\[[^\]]+\])/g,
                '<code style="font-size: 0.8rem!important;" class="text-gray-500 p-0">Array$1$2</code>'
            )
            // highlight types like [Function Abc]
            .replace(/^(\[[^\]]+\])$/g, '<code style="font-size: 0.8rem!important;"class="text-gray-500 p-0">$1</code>')
            // highlight object contents
            .replace(/(\{.+\})/g, '<code style="font-size: 0.8rem!important;" class="text-gray-500 ">$1</code>')
            // highlight keywords
            .replace(
                /(Array|Object|Function|Circular|Symbol|WeakMap|Map)/g,
                '<span style="font-size: 0.8rem!important;" class="text-yellow-400">$1</span>'
            )
            // highlight special chars
            .replace(
                /(:&nbsp;|[,[\]{}])/g,
                '<span style="font-size: 0.8rem!important;" class="text-white">$1</span>'
            );

        return `<code style="font-size: 0.8rem!important;">${formatted}</code>`;
    }
}
