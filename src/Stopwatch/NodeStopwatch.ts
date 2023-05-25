/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Stopwatch } from './Stopwatch';
import { NodeStopwatchEvent } from './NodeStopwatchEvent';
import { end } from '../lib/utils';

export class NodeStopwatch extends Stopwatch {
    public memoryLaps: number[] = [];

    // eslint-disable-next-line no-unused-vars, @typescript-eslint/no-unused-vars
    public start(name: string | undefined): NodeStopwatchEvent {
        this.startedAt = new Date().getTime();

        return new NodeStopwatchEvent(this);
    }

    public lap(): NodeStopwatchEvent {
        const lapTime = new Date().getTime();
        const duration = lapTime - this.startedAt;
        let memUsage = process.memoryUsage().heapUsed;

        if (this.memoryLaps.length > 0) {
            memUsage = end(this.memoryLaps) - memUsage;
        }
        this.memoryLaps.push(memUsage);
        this.laps.push(duration - this.totalDuration());

        return new NodeStopwatchEvent(this, lapTime);
    }

    public stop(): NodeStopwatchEvent {
        this.endedAt = new Date().getTime();

        const duration = this.endedAt - this.startedAt;
        let memUsage = process.memoryUsage().heapUsed;

        if (this.memoryLaps.length > 0) {
            memUsage = end(this.memoryLaps) - memUsage;
        }

        this.memoryLaps.push(memUsage);
        this.laps.push(duration - this.totalDuration());

        return new NodeStopwatchEvent(this);
    }
}

export default NodeStopwatch;
