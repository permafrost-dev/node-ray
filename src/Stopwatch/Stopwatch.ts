/* eslint-disable @typescript-eslint/no-inferrable-types */

import { end } from '../lib/utils';
import { StopWatch as StopwatchNode } from 'stopwatch-node';

export class StopwatchEvent
{
    protected name: string | undefined;
    protected laps: number[] = [];
    protected startedAt: number = 0;
    protected endedAt: number = 0;
    protected lapTime: number = 0;

    constructor(sw: Stopwatch, lapTime: number | null = null)
    {
        this.name = sw.name?.slice(0);
        this.laps = sw.laps.slice(0);
        this.startedAt = sw.startedAt;
        this.endedAt = sw.endedAt;
        this.lapTime = lapTime ?? (new Date()).getTime();
    }

    public getDuration(): number
    {
        return this.laps.reduce((prev, cur) =>
        {
            return cur + prev;
        }, 0);
    }

    public getMemory()
    {
        return 0;
    }

    public getPeriods(): number[]
    {
        return this.laps.slice();
    }

    public getPreviousDuration(): number
    {
        return this.lapTime - end(this.laps);
    }

}

export class Stopwatch
{
    protected sw: StopwatchNode;
    public name: string | undefined;
    public laps: number[] = [];
    public startedAt: number = 0;
    public endedAt: number = 0;

    constructor(name: string | undefined = undefined)
    {
        this.name = name;
        this.sw = new StopwatchNode(name);
        this.laps = [];
        this.startedAt = 0;
        this.endedAt = 0;
    }

    protected initialize(name: string | undefined)
    {
        this.name = name;
        this.sw = new StopwatchNode(name);
        this.laps = [];
        this.startedAt = 0;
        this.endedAt = 0;
    }

    public start(name: string | undefined): StopwatchEvent
    {
        this.startedAt = (new Date).getTime();
        this.sw.start(name);

        return new StopwatchEvent(this);
    }

    public lap(): StopwatchEvent
    {
        const lapTime = (new Date).getTime();
        const duration = lapTime - this.startedAt;

        this.laps.push(duration - this.totalDuration());

        return new StopwatchEvent(this, lapTime);
    }

    public stop(): StopwatchEvent
    {
        this.sw.stop();
        this.endedAt = (new Date).getTime();

        const duration = this.endedAt - this.startedAt;

        this.laps.push(duration - this.totalDuration());

        return new StopwatchEvent(this);
    }

    public totalDuration(): number
    {
        return this.laps.reduce((prev, cur) =>
        {
            return cur + prev;
        }, 0);
    }

    public reset(): this
    {
        this.initialize(this.name);

        return this;
    }

    public getLaps(): number[]
    {
        return this.laps;
    }

}

export default Stopwatch;
