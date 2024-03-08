import { Payload } from '../Payloads/Payload';
import StackTrace from 'stacktrace-js';

export class ExceptionPayload extends Payload {
    protected exception: Error;

    protected meta = {};

    // eslint-disable-next-line no-undef
    protected stack: StackTrace.StackFrame[];

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
                let className = typeof frame.functionName !== 'string' ? 'unknown' : funcNameParts.pop();

                if (typeof frame.functionName === 'undefined') {
                    className = 'unknown';
                }

                const result = {
                    file_name: this.replaceRemotePathWithLocalPath(frame.getFileName() ?? ''),
                    line_number: frame.getLineNumber(),
                    class: className,
                    method: typeof frame.fileName === 'undefined' ? '<anonymous>' : methodName,
                    vendor_frame: frame.getFileName()?.includes('node_modules'),
                    snippet: [],
                };

                return result;
            })
            .filter((obj: any) => !obj.file_name.startsWith('node:'))
            .filter((obj: any) => !obj.file_name.includes('jest-circus'))
            .filter((obj: any) => obj.class !== 'Ray' && obj.method !== 'exception');
    }
}
