/* eslint-disable no-undef */
import { expect, it } from 'vitest';
import { RateLimiter } from '../../src/Support/RateLimiter';

it('can initialize a disabled rate limit', () => {
    const rateLimiter = RateLimiter.disabled();

    expect(rateLimiter.isMaxReached()).toBeFalsy();
    expect(rateLimiter.isMaxPerSecondReached()).toBeFalsy();
});

it('can update the max calls', () => {
    const rateLimiter = RateLimiter.disabled().clear().max(1);

    expect(rateLimiter.isMaxReached()).toBeFalsy();

    rateLimiter.hit();

    expect(rateLimiter.isMaxReached()).toBeTruthy();
});

it('can update the per second calls', () => {
    const rateLimiter = RateLimiter.disabled().clear().perSecond(1);

    expect(rateLimiter.isMaxPerSecondReached()).toBeFalsy();

    rateLimiter.hit();

    expect(rateLimiter.isMaxPerSecondReached()).toBeTruthy();
});

it('can clear all limits', () => {
    const rateLimiter = RateLimiter.disabled().clear().max(1).hit();

    expect(rateLimiter.isMaxReached()).toBeTruthy();
    //expect(rateLimiter.isMaxPerSecondReached()).toBeTruthy();

    rateLimiter.clear();

    expect(rateLimiter.isMaxReached()).toBeFalsy();
    //expect(rateLimiter.isMaxPerSecondReached()).toBeFalsy();
});
