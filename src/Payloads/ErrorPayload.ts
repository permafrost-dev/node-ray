import { Payload } from '../Payloads/Payload';

export class ErrorPayload extends Payload
{
    protected err: Error;
    protected label: string;

    public constructor(err: Error, label = 'Error')
    {
        super();

        this.err = err;
        this.label = label;
    }

    public getType(): string
    {
        return 'custom';
    }

    public getContent(): Record<string, unknown>
    {
        return {
            content: this.formatError(),
            label: this.label,
        };
    }

    protected formatError(): string
    {
        return `<span class="text-red-400 bold">${this.err.name}</span>: <br>` +
            `<span class="pl-5 text-gray-500">${this.err.message}</span>`;
    }
}
