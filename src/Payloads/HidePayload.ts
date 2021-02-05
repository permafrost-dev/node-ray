import { Payload } from '../Payloads/Payload';

export class HidePayload extends Payload {
    public getType(): string {
        return 'hide';
    }
}
