import { StopwatchEvent } from '@/Stopwatch/StopwatchEvent';

export class NodeStopwatchEvent extends StopwatchEvent {
    public getMemory(callback: null | CallableFunction = null) {
        if (!callback) {
            return 0;
        }

        return callback().heapUsed;
    }
}
