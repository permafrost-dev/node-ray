import StackTrace from 'stacktrace-js';

type StackFrame = StackTrace.StackFrame;

export class RemovesRayFrames {
    public static removeRayFrames(frames: StackFrame[]): StackFrame[] {
        const result = frames.filter(frame => !RemovesRayFrames.isRayFrame(frame) && !RemovesRayFrames.isNodeFrame(frame));

        return result;
    }

    protected static isRayFrame(frame: StackFrame): boolean {
        for (const rayNamespace of this.rayNamespaces()) {
            if (frame.getFileName().includes(rayNamespace)) {
                return true;
            }
        }

        return false;
    }

    protected static isNodeFrame(frame: StackFrame): boolean {
        return frame.getFileName().indexOf('node:') === 0;
    }

    protected static rayNamespaces(): string[] {
        return ['ray-node/dist', 'node-ray/dist', 'vue-ray/dist'];
    }
}
