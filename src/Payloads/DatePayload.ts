import dayjs from 'dayjs';
import { Payload } from '../Payloads/Payload';


export class DatePayload extends Payload
{
    protected date: Date | null;

    protected format: string;

    public constructor(date: Date | null, format = 'YYYY-MM-DD hh:mm:ss')
    {
        super();

        this.date = date;

        this.format = format;
    }

    public getType(): string
    {
        return 'carbon';
    }

    public getContent(): Record<string, string | number | null>
    {
        return {
            formatted: this.date ? this.getFormatted() : null,
            timestamp: this.date ? this.getTimestamp() : null,
            timezone: this.date ? this.getTimezoneName() : null,
        };
    }

    protected getTimestamp(): number
    {
        return dayjs(this.date?.toISOString()).unix();
    }

    protected getFormatted(): string
    {
        return dayjs(this.date?.toISOString()).format(this.format);
    }

    protected getTimezoneName(): string
    {
        if (this.date === null) {
            return '--';
        }

        const dateObj = this.date ? this.date : new Date();
        const matches = /\((.*)\)/.exec(dateObj.toString());

        return matches ? matches[1] : '--';
    }
}
