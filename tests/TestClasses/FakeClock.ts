import { Clock } from '../../src/Support/Clock';
import { DateImmutable } from '../../src/Support/DateImmutable';

export class FakeClock implements Clock {
    protected fixedNow: DateImmutable | null;

    constructor(now: DateImmutable | null = null) {
        this.fixedNow = now;
    }

    public now(): DateImmutable {
        return this.fixedNow ?? new DateImmutable();
    }

    public freeze(now: DateImmutable | null = null): void {
        this.fixedNow = now ?? new DateImmutable();
    }

    public moveForwardInSeconds(modifier: number): void {
        const currentTime = this.now();
        const modifiedTime = currentTime.addSeconds(modifier);

        this.freeze(modifiedTime);
    }
}
