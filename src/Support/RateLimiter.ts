import { CacheStore } from './CacheStore';
import { SystemClock } from './SystemClock';

export class RateLimiter {
    protected maxCalls: number | null;

    protected maxPerSecond: number | null;

    protected cache: CacheStore;

    protected notified = false;

    protected constructor(maxCalls: number | null = null, maxPerSecond: number | null = null) {
        this.maxCalls = maxCalls;
        this.maxPerSecond = maxPerSecond;

        this.cache = new CacheStore(new SystemClock());
    }

    public static disabled(): RateLimiter {
        return new RateLimiter(null, null);
    }

    public hit(): this {
        this.cache.hit();

        return this;
    }

    public max(maxCalls: number | null = null): this {
        this.maxCalls = maxCalls;

        return this;
    }

    public perSecond(callsPerSecond: number | null = null): this {
        this.maxPerSecond = callsPerSecond;

        return this;
    }

    public isMaxReached(): boolean {
        if (this.maxCalls === null) {
            return false;
        }

        const reached = this.cache.count() >= this.maxCalls;

        if (!reached) {
            this.notified = false;
        }

        return reached;
    }

    public isMaxPerSecondReached(): boolean {
        if (this.maxPerSecond === null) {
            return false;
        }

        const reached = this.cache.countLastSecond() >= this.maxPerSecond;

        if (reached === false) {
            this.notified = false;
        }

        return reached;
    }

    public clear(): this {
        this.maxCalls = null;
        this.maxPerSecond = null;

        this.cache.clear();

        return this;
    }

    public isNotified(): boolean {
        return this.notified;
    }

    public notify(): void {
        this.notified = true;
    }

    public getCache(): CacheStore {
        return this.cache;
    }
}
