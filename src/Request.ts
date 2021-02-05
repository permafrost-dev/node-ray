import { Payload } from '@/Payloads/Payload';

export class Request {
    protected uuid: string;
    protected payloads: Payload[];
    protected meta: any[];

    public constructor(uuid: string, payloads: Payload[], meta: any[] = []) {
        this.uuid = uuid;
        this.payloads = payloads;
        this.meta = meta;
    }

    public toArray(): Record<string, unknown> {
        return {
            uuid: this.uuid,
            payloads: this.payloads.map(payload => payload.toArray()),
            meta: this.meta,
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toArray());
    }
}
