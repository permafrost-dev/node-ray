import { Payload } from '@/Payloads/Payload';
import dayjs from 'dayjs';

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
        if (this.date === null) return null;

        return dayjs(this.date.toISOString()).unix();
    }

    protected getFormatted(): string {
        if (this.date === null) {
            return '--';
        }

        return dayjs(this.date.toISOString()).format(this.format);
    }

    protected getTimezoneName(): string {
        if (this.date === null) {
            return '--';
        }

        const dateObj = this.date ? this.date : new Date();
        const matches = /\((.*)\)/.exec(dateObj.toString());

        return matches ? matches[1] : '--';
    }
}
