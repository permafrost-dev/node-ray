/* eslint-disable no-undef */
import { expect, it } from 'vitest';

import { CacheStore } from '../../src/Support/CacheStore';
import { FakeClock } from '../TestClasses/FakeClock';

it('can count per second', () => {
    const clock = new FakeClock();
    const store = new CacheStore(clock);

    clock.freeze();

    store.hit().hit().hit();

    expect(store.countLastSecond()).toBe(3);

    clock.moveForwardInSeconds(1);

    expect(store.countLastSecond()).toBe(3);

    clock.moveForwardInSeconds(1);

    expect(store.countLastSecond()).toBe(0);
});
