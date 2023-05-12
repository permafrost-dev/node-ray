import StackFrame from '@/lib/stackframe';

const FIREFOX_SAFARI_STACK_REGEXP = /(^|@)\S+:\d+/;
const CHROME_IE_STACK_REGEXP = /^\s*at .*(\S+:\d+|\(native\))/m;
const SAFARI_NATIVE_CODE_REGEXP = /^(eval@)?(\[native code])?$/;

export class ErrorStackParser {
    static parse(error) {
        if (typeof error.stacktrace !== 'undefined' || typeof error['opera#sourceloc'] !== 'undefined') {
            return this.parseOpera(error);
        } else if (error.stack && error.stack.match(CHROME_IE_STACK_REGEXP)) {
            return this.parseV8OrIE(error);
        } else if (error.stack) {
            return this.parseFFOrSafari(error);
        } else {
            throw new Error('Cannot parse given Error object');
        }
    }

    static extractLocation(urlLike) {
        if (urlLike.indexOf(':') === -1) {
            return [urlLike];
        }

        const regExp = /(.+?)(?::(\d+))?(?::(\d+))?$/;
        const parts = regExp.exec(urlLike.replace(/[()]/g, ''));

        if (!parts) {
            return [urlLike];
        }

        return [parts[1], parts[2] || undefined, parts[3] || undefined];
    }

    static parseV8OrIE(error) {
        const filtered = error.stack.split('\n').filter(line => !!line.match(CHROME_IE_STACK_REGEXP));

        return filtered.map(line => {
            if (line.indexOf('(eval ') > -1) {
                line = line.replace(/eval code/g, 'eval').replace(/(\(eval at [^()]*)|(,.*$)/g, '');
            }
            let sanitizedLine = line
                .replace(/^\s+/, '')
                .replace(/\(eval code/g, '(')
                .replace(/^.*?\s+/, '');

            const location = sanitizedLine.match(/ (\(.+\)$)/);
            sanitizedLine = location ? sanitizedLine.replace(location[0], '') : sanitizedLine;

            const locationParts = this.extractLocation(location ? location[1] : sanitizedLine);
            const functionName = (location && sanitizedLine) || undefined;
            const fileName = ['eval', '<anonymous>'].indexOf(locationParts[0]) > -1 ? undefined : locationParts[0];

            return new StackFrame({
                functionName,
                fileName,
                lineNumber: locationParts[1],
                columnNumber: locationParts[2],
                source: line,
            });
        });
    }

    static parseFFOrSafari(error) {
        const filtered = error.stack.split('\n').filter(line => !line.match(SAFARI_NATIVE_CODE_REGEXP));

        return filtered.map(line => {
            if (line.indexOf(' > eval') > -1) {
                line = line.replace(/ line (\d+)(?: > eval line \d+)* > eval:\d+:\d+/g, ':$1');
            }

            if (line.indexOf('@') === -1 && line.indexOf(':') === -1) {
                return new StackFrame({
                    functionName: line,
                });
            } else {
                const functionNameRegex = /((.*".+"[^@]*)?[^@]*)(?:@)/;
                const matches = line.match(functionNameRegex);
                const functionName = matches && matches[1] ? matches[1] : undefined;
                const locationParts = this.extractLocation(line.replace(functionNameRegex, ''));

                return new StackFrame({
                    functionName,
                    fileName: locationParts[0],
                    lineNumber: locationParts[1],
                    columnNumber: locationParts[2],
                    source: line,
                });
            }
        });
    }

    static parseOpera(error) {
        if (
            !error.stacktrace ||
            (error.message.indexOf('\n') > -1 && error.message.split('\n').length > error.stacktrace.split('\n').length)
        ) {
            return this.parseOpera9(error);
        } else if (!error.stack) {
            return this.parseOpera10(error);
        } else {
            return this.parseOpera11(error);
        }
    }

    static parseOpera9(e) {
        const lineRE = /Line (\d+).*script (?:in )?(\S+)/i;
        const lines = e.message.split('\n');
        const result: any[] = [];

        for (let i = 2, len = lines.length; i < len; i += 2) {
            const match = lineRE.exec(lines[i]);
            if (match) {
                result.push(
                    new StackFrame({
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i],
                    }),
                );
            }
        }

        return result;
    }

    static parseOpera10(e) {
        const lineRE = /Line (\d+).*script (?:in )?(\S+)(?:: In function (\S+))?$/i;
        const lines = e.stacktrace.split('\n');
        const result: any[] = [];

        for (let i = 0, len = lines.length; i < len; i += 2) {
            const match = lineRE.exec(lines[i]);
            if (match) {
                result.push(
                    new StackFrame({
                        functionName: match[3] || undefined,
                        fileName: match[2],
                        lineNumber: match[1],
                        source: lines[i],
                    }),
                );
            }
        }

        return result;
    }

    static parseOpera11(error) {
        const filtered = error.stack
            .split('\n')
            .filter(line => !!line.match(FIREFOX_SAFARI_STACK_REGEXP) && !line.match(/^Error created at/));

        return filtered.map(line => {
            const tokens = line.split('@');
            const locationParts = this.extractLocation(tokens.pop());
            const functionCall = tokens.shift() || '';
            const functionName = functionCall.replace(/<anonymous function(: (\w+))?>/, '$2').replace(/\([^)]*\)/g, '') || undefined;
            const argsRaw = functionCall.match(/\(([^)]*)\)/) ? functionCall.replace(/^[^(]+\(([^)]*)\)$/, '$1') : undefined;
            const args = argsRaw === undefined || argsRaw === '[arguments not available]' ? undefined : argsRaw.split(',');

            return new StackFrame({
                functionName,
                args,
                fileName: locationParts[0],
                lineNumber: locationParts[1],
                columnNumber: locationParts[2],
                source: line,
            });
        });
    }
}

export default ErrorStackParser;
