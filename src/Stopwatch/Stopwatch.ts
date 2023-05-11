/* eslint-disable @typescript-eslint/no-inferrable-types */

import * as StopWatches from 'stopwatch-node/dist/stopwatch';
import { StopwatchEvent } from './StopwatchEvent';

export class Stopwatch {
    protected sw: StopWatches.StopWatch;
    public name: string | undefined;
    public laps: number[] = [];
    public startedAt: number = 0;
    public endedAt: number = 0;

    constructor(name: string | undefined = undefined) {
        this.name = name;
        this.sw = new StopWatches.StopWatch(name);
        this.laps = [];
        this.startedAt = 0;
        this.endedAt = 0;
    }

    protected initialize(name: string | undefined) {
        this.name = name;
        this.sw = new StopWatches.StopWatch(name);
        this.laps = [];
        this.startedAt = 0;
        this.endedAt = 0;
    }

    public start(name: string | undefined): StopwatchEvent {
        this.startedAt = new Date().getTime();
        this.sw.start(name);

        return new StopwatchEvent(this);
    }

    public lap(): StopwatchEvent {
        const lapTime = new Date().getTime();
        const duration = lapTime - this.startedAt;

        this.laps.push(duration - this.totalDuration());

        return new StopwatchEvent(this, lapTime);
    }

    public stop(): StopwatchEvent {
        this.sw.stop();
        this.endedAt = new Date().getTime();

        const duration = this.endedAt - this.startedAt;

        this.laps.push(duration - this.totalDuration());

        return new StopwatchEvent(this);
    }

    public totalDuration(): number {
        return this.laps.reduce((prev, cur) => {
            return cur + prev;
        }, 0);
    }

    public reset(): this {
        this.initialize(this.name);

        return this;
    }

    public getLaps(): number[] {
        return this.laps;
    }
}

export default Stopwatch;
