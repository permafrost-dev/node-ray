import { ArgumentConverter } from '../ArgumentConverter';
import { Payload } from '../Payloads/Payload';

// use Spatie\Ray\ArgumentConverter;

export class LogPayload extends Payload
{
    protected values: any[];

    public static createForArguments(args: any[]): Payload
    {
        const dumpedArguments = args.map(argument =>
        {
            return ArgumentConverter.convertToPrimitive(argument).value;
        });

        return new this(dumpedArguments);
    }

    public constructor(values: any)
    {
        super();

        if (!Array.isArray(values)) {
            values = [values];
        }

        this.values = values;
    }

    public getType(): string
    {
        return 'log';
    }

    public getContent(): Record<string, unknown>
    {
        return {
            values: this.values,
        };
    }
}
