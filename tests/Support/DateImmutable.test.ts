/* eslint-disable no-undef */
import { expect, it } from 'vitest';

import { DateImmutable } from '../../src/Support/DateImmutable';
import dayjs from 'dayjs';

it('returns a timestamp without milliseconds', () => {
    const now = DateImmutable.createFrom(dayjs('2021-06-22T18:11:03.967Z').toDate());

    expect(now.getTimestamp()).toBe(1624385463);
});

it('modifies the date by adding time', () => {
    let now = DateImmutable.createFrom(dayjs('2021-06-22T18:11:03.967Z').toDate());

    expect(now.getTimestamp()).toBe(1624385463);

    now = now.addSeconds(5);

    expect(now.getTimestamp()).toBe(1624385468);
});

it('modifies the date by subtracting time', () => {
    let now = DateImmutable.createFrom(dayjs('2021-06-22T18:11:03.000Z').toDate());

    expect(now.getTimestamp()).toBe(1624385463);

    now = now.subSeconds(2);

    expect(now.getTimestamp()).toBe(1624385461);
});
