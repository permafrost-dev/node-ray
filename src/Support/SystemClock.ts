import { Clock } from '@/Support/Clock';
import { DateImmutable } from '@/Support/DateImmutable';

export class SystemClock extends Clock {
    public now(): DateImmutable {
        return new DateImmutable();
    }
}
