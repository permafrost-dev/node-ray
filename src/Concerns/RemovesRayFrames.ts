import { StackFrame } from 'stacktrace-js';

export class RemovesRayFrames {
    public static removeRayFrames(frames: StackFrame[]): StackFrame[] {
        const result = frames
            .filter(frame => !RemovesRayFrames.isRayFrame(frame) && !RemovesRayFrames.isNodeFrame(frame))
            .filter(frame => {
                return !(!frame.fileName || !frame.functionName || !frame.source);
            });

        return result;
    }

    protected static isRayFrame(frame: StackFrame): boolean {
        for (const rayNamespace of this.rayNamespaces()) {
            if (frame.fileName?.includes(rayNamespace)) {
                return true;
            }
        }

        return false;
    }

    protected static isNodeFrame(frame: StackFrame): boolean {
        return frame.fileName?.indexOf('node:') === 0;
    }

    protected static rayNamespaces(): string[] {
        return ['ray-node/dist', 'node-ray/dist', 'vue-ray/dist'];
    }
}
