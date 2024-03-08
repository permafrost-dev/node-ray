import { Payload } from '@/Payloads/Payload';

export class ShowAppPayload extends Payload {
    public getType(): string {
        return 'show_app';
    }
}
