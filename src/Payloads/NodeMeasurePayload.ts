import { end } from '../lib/utils';
import { NodeStopwatchEvent } from '../Stopwatch/NodeStopwatchEvent';
import { Payload } from '../Payloads/Payload';

export class NodeMeasurePayload extends Payload {
    /** @var string */
    protected name;

    /** @var boolean */
    protected isNewTimer = false;

    /** @var float|number */
    protected totalTime = 0;

    /** @var number */
    protected maxMemoryUsageDuringTotalTime = 0;

    /** @var float|number */
    protected timeSinceLastCall = 0;

    /** @var number */
    protected maxMemoryUsageSinceLastCall = 0;

    public constructor(name: string, stopwatchEvent: NodeStopwatchEvent) {
        super();

        this.name = name;

        this.totalTime = stopwatchEvent.getDuration();
        this.maxMemoryUsageDuringTotalTime = stopwatchEvent.getMemory();

        const periods = stopwatchEvent.getPeriods();

        //const lastPeriod = end(periods);
        if (periods.length > 1) {
            //const tempPeriods = periods.slice(0);
            //const lastPeriod = <number>tempPeriods.pop();
            //const prevPeriod = <number>tempPeriods.pop();

            this.timeSinceLastCall = end(periods);
            this.maxMemoryUsageSinceLastCall = stopwatchEvent.getMemory(); //process.memoryUsage().heapUsed;
        }
    }

    public getType(): string {
        return 'measure';
    }

    public concernsNewTimer(): this {
        this.isNewTimer = true;
        this.totalTime = 0;
        this.maxMemoryUsageDuringTotalTime = 0;
        this.timeSinceLastCall = 0;
        this.maxMemoryUsageSinceLastCall = 0;

        return this;
    }

    public getContent(): Record<string, unknown> {
        return {
            name: this.name,
            is_new_timer: this.isNewTimer,

            total_time: this.totalTime,
            max_memory_usage_during_total_time: this.maxMemoryUsageDuringTotalTime,

            time_since_last_call: this.timeSinceLastCall,
            max_memory_usage_since_last_call: this.maxMemoryUsageSinceLastCall,
        };
    }
}
