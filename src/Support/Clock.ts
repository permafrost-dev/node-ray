import { DateImmutable } from './DateImmutable';

export abstract class Clock {
    public abstract now(): DateImmutable;
}
