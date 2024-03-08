/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-undef */
import { expect, it, describe, beforeEach } from 'vitest';

import { usleep } from '../../src/lib/utils';
import Stopwatch from './../../src/Stopwatch/Stopwatch';

let stopwatch: Stopwatch;

beforeEach(() => {
    stopwatch = new Stopwatch('one');
});

describe('Stopwatch', () => {
    it('can created an unnamed stopwatch', () => {
        const sw = new Stopwatch();
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
});
