import { OriginData } from '../Origin/Origin';

export interface LimiterCounter {
    counter: number;
    limit: number;
    valid: boolean;
}

export class Limiters {
    protected counters: Record<string, LimiterCounter> = {};

    public initialize(origin: OriginData, limit: number): LimiterCounter {
        const fingerprint = `${origin.file}:${origin.line_number}`;

        if (typeof this.counters[fingerprint] === 'undefined') {
            this.counters[fingerprint] = { counter: 0, limit, valid: true };
        }

        return this.counters[fingerprint];
    }

    public increment(origin: OriginData): LimiterCounter {
        const name = `${origin.file}:${origin.line_number}`;

        if (typeof this.counters[name] === 'undefined') {
            return { counter: 0, limit: 0, valid: false };
        }

        const { counter, limit, valid } = this.counters[name];

        this.counters[name] = { counter: counter + 1, limit, valid };

        return this.counters[name];
    }

    public canSendPayload(origin: OriginData): boolean {
        const name = `${origin.file}:${origin.line_number}`;

        if (typeof this.counters[name] === 'undefined') {
            return true;
        }

        const { counter, limit, valid } = this.counters[name];

        return valid && (counter < limit || limit <= 0);
    }
}
