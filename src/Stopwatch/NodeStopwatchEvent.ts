import { StopwatchEvent } from '@/Stopwatch/StopwatchEvent';

export class NodeStopwatchEvent extends StopwatchEvent {
    public getMemory() {
        return process.memoryUsage().heapUsed;
    }
}
