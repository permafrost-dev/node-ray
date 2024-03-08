/* eslint-disable no-undef */
import { expect, it, beforeEach } from 'vitest';

import { LimiterCounter, Limiters } from '../../src/Support/Limiters';
import { OriginData } from '../../src/Origin/Origin';

let limiters: Limiters;

function createOrigin(filename: string, line: number, initialize = true, limit = 5): OriginData {
    const result: OriginData = {
        file: filename,
        line_number: line,
        hostname: 'fake',
        function_name: 'test',
    };

    if (initialize) {
        limiters.initialize(result, limit);
    }

    return result;
}

beforeEach(() => {
    limiters = new Limiters();
});

it('initializes a limiter for an origin', () => {
    const origins: OriginData[] = [
        { file: 'test.js', line_number: 123, hostname: 'fake', function_name: 'test' },
        { file: 'test.js', line_number: 124, hostname: 'fake', function_name: 'test' },
    ];

    const initResults: LimiterCounter[] = [limiters.initialize(origins[0], 5), limiters.initialize(origins[1], 8)];

    expect(initResults[0]).toStrictEqual({ counter: 0, limit: 5, valid: true });
    expect(initResults[1]).toStrictEqual({ counter: 0, limit: 8, valid: true });
});

it('increments a limiter counter for an origin', () => {
    const origin = createOrigin('test.js', 123);

    limiters.increment(origin);
    limiters.increment(origin);

    const { counter } = limiters.increment(origin);

    expect(counter).toBe(3);
});

it('does not increment a limiter counter for an uninitialized origin', () => {
    const origin = createOrigin('test.js', 456, false);

    const incrementResult = limiters.increment(origin);

    expect(incrementResult.valid).toBe(false);
});

it('determines if a payload can be sent for a given origin', () => {
    const origin = createOrigin('test.js', 123, true, 2);

    limiters.increment(origin);
    expect(limiters.canSendPayload(origin)).toBeTruthy();

    limiters.increment(origin);
    expect(limiters.canSendPayload(origin)).toBeFalsy();
});
