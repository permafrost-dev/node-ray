import { DateImmutable } from '@/Support/DateImmutable';

export abstract class Clock {
    public abstract now(): DateImmutable;
}
