import { Payload } from '../Payloads/Payload';

export class ConfettiPayload extends Payload {
    public getType(): string {
        return 'confetti';
    }
}
