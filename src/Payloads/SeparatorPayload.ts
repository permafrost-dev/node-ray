import { Payload } from '../Payloads/Payload';

export class SeparatorPayload extends Payload {
    public getType(): string {
        return 'separator';
    }
}
