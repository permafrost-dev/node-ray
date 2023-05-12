/* eslint-disable no-unused-vars */
import dayjs, * as dayjsNs from 'dayjs';

interface DateImmutableModifyPart {
    value: number;
    unit: string;
}

export class DateImmutable {
    public dateStr: string;
    public dateTs: number;

    public get date() {
        return dayjs(this.dateStr).toDate();
    }

    public set date(value: Date) {
        this.dateTs = value.getTime();
        this.dateStr = value.toISOString();
    }

    public static createFrom(date: Date) {
        return new DateImmutable(date);
    }

    constructor(date: Date | null = null) {
        this.date = date ?? new Date();
        this.dateStr = this.date.toISOString();
        this.dateTs = this.date.getTime();
    }

    public getTimestamp(): number {
        return Math.floor(this.dateTs / 1000);
    }

    public modify(str: string): DateImmutable {
        const strParts = str.split(' ');
        const parts: DateImmutableModifyPart[] = [];

        for (let idx = 0; idx < strParts.length; idx++) {
            parts.push({
                value: Number(strParts[idx]),
                unit: strParts[idx + 1],
            });

            idx++;
        }

        let tempDate = dayjs(this.getTimestamp() * 1000);

        parts.forEach(part => {
            tempDate = tempDate.add(part.value * 1000);
        });

        return DateImmutable.createFrom(tempDate.toDate());
    }
}
