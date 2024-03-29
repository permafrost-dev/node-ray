import { end } from '@/lib/utils';
import { Stopwatch } from '@/Stopwatch/Stopwatch';

export class StopwatchEvent {
    protected name: string | undefined;
    protected laps: number[] = [];
    protected startedAt: number;
    protected endedAt: number;
    protected lapTime: number;

    constructor(sw: Stopwatch, lapTime: number | null = null) {
        this.name = sw.name?.slice(0);
        this.laps = sw.laps.slice(0);
        this.startedAt = sw.startedAt;
        this.endedAt = sw.endedAt;
        this.lapTime = lapTime ?? new Date().getTime();
    }

    public getDuration(): number {
        return this.laps.reduce((prev, cur) => cur + prev, 0);
    }

    // eslint-disable-next-line no-unused-vars
    public getMemory(callback: null | CallableFunction = null): number {
        return 0;
    }

    public getPeriods(): number[] {
        return this.laps.slice();
    }

    public getPreviousDuration(): number {
        return end(this.laps) - (new Date().getTime() - this.lapTime);
    }
}
