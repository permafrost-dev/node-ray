import { Payload } from '@/Payloads/Payload';
import { NodeStopwatchEvent } from '@/Stopwatch/NodeStopwatchEvent';
import { end } from '@/lib/utils';

export class NodeMeasurePayload extends Payload {
    /** @var string */
    protected name;

    protected isNewTimer = false;
    protected totalTime = 0;
    protected maxMemoryUsageDuringTotalTime = 0;
    protected timeSinceLastCall = 0;
    protected maxMemoryUsageSinceLastCall = 0;

    public constructor(name: string, stopwatchEvent: NodeStopwatchEvent) {
        super();

        this.name = name;
        this.totalTime = stopwatchEvent.getDuration();
        this.maxMemoryUsageDuringTotalTime = stopwatchEvent.getMemory(process.memoryUsage);

        const periods = stopwatchEvent.getPeriods();

        if (periods.length > 1) {
            this.timeSinceLastCall = end(periods);
            this.maxMemoryUsageSinceLastCall = stopwatchEvent.getMemory(process.memoryUsage); //process.memoryUsage().heapUsed;
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
