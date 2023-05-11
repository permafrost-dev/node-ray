import { Payload } from '../Payloads/Payload';
//import * as StackTrace from 'stacktrace-js/dist/stacktrace-with-promises-and-json-polyfills';
import { StackTrace } from '@/lib/stacktrace';
import StackFrame from 'stackframe';

export class ExceptionPayload extends Payload {
    protected exception: Error;

    protected meta = {};

    // eslint-disable-next-line no-undef
    protected stack: StackFrame[];

    public constructor(exception: Error, meta: Record<string, unknown> = {}) {
        super();

        this.stack = StackTrace.getSync({});

        this.exception = exception;

        this.meta = meta;
    }

    public getType(): string {
        return 'exception';
    }

    public getContent(): Record<string, unknown> {
        return {
            class: this.exception.name,
            message: this.exception.message,
            frames: this.getFrames(),
            meta: this.meta,
        };
    }

    protected getFrames(): any[] {
        return this.stack
            .slice(1)
            .map(frame => {
                const funcNameParts = frame.functionName?.split('.') ?? ['unknown', 'unknown'];
                const methodName = funcNameParts.pop();
                let className = funcNameParts.pop();

                if (typeof className === 'undefined') {
                    className = 'unknown';
                }

                return {
                    file_name: this.replaceRemotePathWithLocalPath(frame.getFileName() ?? ''),
                    line_number: frame.getLineNumber(),
                    class: className,
                    method: methodName,
                    vendor_frame: frame.getFileName()?.includes('node_modules'),
                    snippet: [],
                };
            })
            .filter((obj: any) => !obj.file_name.startsWith('node:'))
            .filter((obj: any) => !obj.file_name.includes('jest-circus'))
            .filter((obj: any) => obj.class !== 'Ray' && obj.method !== 'exception');
    }
}
