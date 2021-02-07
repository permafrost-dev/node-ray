import { Payload } from '../Payloads/Payload';
import { ArgumentConverter } from '../ArgumentConverter';

export class TablePayload extends Payload
{
    protected values: any[];

    protected label: string;

    public constructor(values: any[], label = 'Table')
    {
        super();

        this.values = values;

        this.label = label;
    }

    public getType(): string
    {
        return 'table';
    }

    public getContent(): Record<string, unknown>
    {
        const values = this.values.map(value =>
        {
            return ArgumentConverter.convertToPrimitive(value).value;
        });

        return {
            values: values,
            label: this.label,
        };
    }
}
