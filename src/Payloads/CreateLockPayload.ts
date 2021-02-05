import { Payload } from '@/Payloads/Payload';

export class CreateLockPayload extends Payload {
    protected name: string;

    public constructor(name: string) {
        super();

        this.name = name;
    }

    public getType(): string {
        return 'create_lock';
    }

    public getContent(): Record<string, unknown> {
        return {
            name: this.name,
        };
    }
}
