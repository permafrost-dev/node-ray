import { Payload } from '@/Payloads/Payload';

export class HideAppPayload extends Payload {
    public getType(): string {
        return 'hide_app';
    }
}
