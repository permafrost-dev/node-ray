import { Payload } from '@/Payloads/Payload';

export class ClearAllPayload extends Payload {
    public getType(): string {
        return 'clear_all';
    }
}
