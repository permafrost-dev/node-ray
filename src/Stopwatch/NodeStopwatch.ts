/* eslint-disable @typescript-eslint/no-inferrable-types */

import { Stopwatch } from './Stopwatch';
import { NodeStopwatchEvent } from './NodeStopwatchEvent';
import { end } from '../lib/utils';

export class NodeStopwatch extends Stopwatch {
    public memoryLaps: number[] = [];

    public start(name: string | undefined): NodeStopwatchEvent {
        this.startedAt = new Date().getTime();
        this.sw.start(name);

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
        this.sw.stop();
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
