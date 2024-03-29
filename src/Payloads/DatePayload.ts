import { formatDateExtended } from '@/lib/utils';
import { Payload } from '@/Payloads/Payload';

export type PayloadType = 'date';

export class DatePayload extends Payload {
    protected date: Date | null;

    protected format: string;

    public constructor(date: Date | null, format = 'YYYY-MM-DD hh:mm:ss') {
        super();

        this.date = date;
        this.format = format;
    }

    public getType(): string {
        return 'carbon';
    }

    public getContent(): Record<string, string | number | null> {
        return {
            formatted: this.getFormatted(),
            timestamp: this.getTimestamp(),
            timezone: this.getTimezoneName(),
        };
    }

    protected getTimestamp(): number | null {
        if (!this.date) {
            return null;
        }

        //remove the last '000' to get the timestamp in seconds:
        return this.date.getTime() / 1000;
    }

    protected getFormatted(): string {
        if (!this.date) {
            return '--';
        }

        return formatDateExtended(this.date, this.format);
    }

    protected getTimezoneName(): string {
        if (!this.date) {
            return '--';
        }

        return formatDateExtended(this.date, 'T');
    }
}
