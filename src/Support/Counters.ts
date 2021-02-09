import { Ray, ray as rayFunc } from '../Ray';

export class Counters {
    protected counters: Record<string, any> = {};

    public increment(name: string): any[] {
        if (typeof this.counters[name] === 'undefined') {
            this.counters[name] = [rayFunc(), 0];
        }

        const data = this.counters[name];
        const ray: Ray = data[0] as Ray;
        const times: number = <number>data[1];

        const newTimes = times + 1;

        this.counters[name] = [ray, newTimes];

        return [ray, newTimes];
    }

    public get(name: string): number {
        if (typeof this.counters[name] === 'undefined') {
            return 0;
        }

        return this.counters[name][1];
    }

    public clear(): void {
        this.counters = [];
    }

    public setRay(name: string, ray: Ray): void {
        this.counters[name][0] = ray;
    }

    public getCounters(): Record<string, any> {
        return this.counters;
    }
}
