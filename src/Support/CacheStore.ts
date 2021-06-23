import { Clock } from './Clock';
import { DateImmutable } from './DateImmutable';

export class CacheStore {
    protected store: DateImmutable[] = [];

    protected clock: Clock;

    constructor(clock: Clock) {
        this.clock = clock;
    }

    public hit(): this {
        this.store.push(this.clock.now());

        return this;
    }

    public clear(): this {
        this.store = [];

        return this;
    }

    public count(): number {
        return this.store.length;
    }

    public countLastSecond(): number {
        const lastSecond = this.clock.now().modify('-1 second');
        let amount = 0;

        this.store.forEach(item => {
            if (this.isBetween(item, lastSecond, this.clock.now())) {
                amount++;
            }
        });

        return amount;
    }

    protected isBetween(toCheck: DateImmutable, start: DateImmutable, end: DateImmutable): boolean {
        return toCheck.getTimestamp() >= start.getTimestamp() && toCheck.getTimestamp() <= end.getTimestamp();
    }
}
