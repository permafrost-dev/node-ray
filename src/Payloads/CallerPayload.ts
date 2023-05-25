import { Payload } from '../Payloads/Payload';
import { RemovesRayFrames } from '../Concerns/RemovesRayFrames';
import { StackFrame } from 'stacktrace-js';

export class CallerPayload extends Payload {
    protected frames;

    public constructor(frames: StackFrame[]) {
        super();

        this.frames = RemovesRayFrames.removeRayFrames(frames);
    }

    public getType(): string {
        return 'caller';
    }

    public getContent(): Record<string, unknown> {
        const frames = this.frames.slice(0);

        /** @var Frame frame */
        const frame: StackFrame = frames[0] || null;

        const funcNameParts = frame?.getFunctionName()?.replace('Proxy.', '')?.split('.')?.slice(0);

        const className = funcNameParts?.length ? funcNameParts.shift() : '';
        const methodName = funcNameParts?.join('.') ?? '';

        return {
            frame: {
                file_name: this.replaceRemotePathWithLocalPath(frame?.getFileName() ?? ''),
                line_number: frame?.getLineNumber() || 0,
                class: className,
                method: methodName,
                vendor_frame: frame?.getFileName()?.includes('node_modules') ?? false,
            },
        };
    }
}
