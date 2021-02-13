import { Payload } from './Payload';
import { RemovesRayFrames } from '../Concerns/RemovesRayFrames';
import { StackFrame } from 'stacktrace-js';

export class TracePayload extends Payload {
    /** @var array */
    protected frames: StackFrame[];

    protected startFromIndexNum: number | null = null;

    protected limitNum: number | null = null;

    public constructor(frames: StackFrame[]) {
        super();

        this.frames = RemovesRayFrames.removeRayFrames(frames);
    }

    public startFromIndex(index: number): this {
        this.startFromIndexNum = index;

        return this;
    }

    public limit(limit: number): this {
        this.limitNum = limit;

        return this;
    }

    public getType(): string {
        return 'trace';
    }

    public getContent(): Record<string, unknown> {
        let frames = this.frames.map(frame => {
            const funcNameParts = frame.getFunctionName().replace('Proxy.', '').split('.').slice(0);
            const className = funcNameParts.length ? funcNameParts.shift() : '';
            const methodName = funcNameParts.join('.');

            return {
                file_name: this.replaceRemotePathWithLocalPath(frame.getFileName()),
                line_number: frame.getLineNumber(),
                class: className,
                method: methodName,
                vendor_frame: frame.getFileName().includes('node_modules'),
            };
        });

        if (this.limitNum !== null) {
            frames = frames.slice(this.startFromIndexNum ?? 0, this.limitNum);
        }

        return { frames };
    }
}
