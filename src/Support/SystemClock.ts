import { Clock } from './Clock';
import { DateImmutable } from './DateImmutable';

export class SystemClock extends Clock {
    public now(): DateImmutable {
        return new DateImmutable();
    }
}
