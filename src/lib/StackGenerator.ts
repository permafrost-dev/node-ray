import StackFrame from '@/lib/stackframe';

export function StackGenerator() {
    return {
        backtrace: function StackGenerator$$backtrace(opts) {
            const stack: any[] = [];
            let maxStackSize = 10;

            if (typeof opts === 'object' && typeof opts.maxStackSize === 'number') {
                maxStackSize = opts.maxStackSize;
            }

            let curr = arguments.callee;
            while (curr && stack.length < maxStackSize && curr['arguments']) {
                const args = new Array(curr['arguments'].length);
                for (let i = 0; i < args.length; ++i) {
                    args[i] = curr['arguments'][i];
                }
                if (/function(?:\s+([\w$]+))+\s*\(/.test(curr.toString())) {
                    stack.push(new StackFrame({ functionName: RegExp.$1 || undefined, args: args }));
                } else {
                    stack.push(new StackFrame({ args: args }));
                }

                try {
                    curr = curr.caller;
                } catch (e) {
                    break;
                }
            }
            return stack;
        },
    };
}

export default StackGenerator;
