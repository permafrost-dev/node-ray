import { usleep } from '@/lib/utils';
import NodeStopwatch from '@/Stopwatch/NodeStopwatch';
import { beforeEach, expect, it } from 'vitest';

let stopwatch: NodeStopwatch;

beforeEach(() => {
    stopwatch = new NodeStopwatch('one');
});

it('can created an unnamed stopwatch', () => {
    const sw = new NodeStopwatch();
    expect(sw.name).toBeUndefined();
});

it('can be reset', () => {
    stopwatch.startedAt = 100;
    stopwatch.endedAt = 200;

    stopwatch.start('one');
    stopwatch.lap();
    stopwatch.stop();

    stopwatch.reset();

    expect(stopwatch.startedAt).toBe(0);
    expect(stopwatch.endedAt).toBe(0);
    expect(stopwatch.getLaps().length).toBe(0);
});

it('can get the total duration', async () => {
    stopwatch.start('one');
    usleep(100);
    stopwatch.stop();

    expect(Math.floor(stopwatch.totalDuration() / 10)).toBe(10);
});

it('can get the previous duration', async () => {
    stopwatch.start('one');
    usleep(100);
    stopwatch.lap();
    usleep(100);
    const ev2 = stopwatch.lap();
    expect(Math.floor(ev2.getPreviousDuration() / 10)).toBe(10);
    stopwatch.stop();
});

it('can get the laps', async () => {
    stopwatch.start('one');
    usleep(5);
    stopwatch.stop();

    expect(stopwatch.getLaps().length).toBe(1);
});

it('stores the memory usage', async () => {
    stopwatch.start('one');
    usleep(5);
    stopwatch.stop();

    expect(stopwatch.memoryLaps.length).toBe(1);
});
