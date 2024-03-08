import { Payload } from '@/Payloads/Payload';

export class NewScreenPayload extends Payload {
    protected name;

    public constructor(name: string) {
        super();

        this.name = name;
    }

    public getType(): string {
        return 'new_screen';
    }

    public getContent(): Record<string, unknown> {
        return {
            name: this.name,
        };
    }
}
