import { StopwatchEvent } from './StopwatchEvent';

export class NodeStopwatchEvent extends StopwatchEvent {
    public getMemory() {
        return process.memoryUsage().heapUsed;
    }
}
