import { Payload } from '../Payloads/Payload';
import { ArgumentConverter } from '../ArgumentConverter';

export type PayloadType = 'event';

export class EventPayload extends Payload {
    protected eventName: string;

    protected payload: any[];

    public constructor(eventName: string, payload: any[]) {
        super();

        this.eventName = eventName;
        this.payload = payload;
    }

    public getType(): string {
        return 'event';
    }

    public getContent(): Record<string, unknown> {
        return {
            name: this.eventName,
            event: this.payload[0],
            payload: ArgumentConverter.convertToPrimitive(this.payload).value,
            class_based_event: true,
        };
    }
}
