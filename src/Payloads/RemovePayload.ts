import { Payload } from '../Payloads/Payload';

export class RemovePayload extends Payload {
    public getType(): string {
        return 'remove';
    }
}
