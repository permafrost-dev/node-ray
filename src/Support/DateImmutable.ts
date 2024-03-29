export class DateImmutable {
    public dateStr: string;
    public dateTs: number;
    protected _date!: Date;

    public get date() {
        return this._date;
    }

    public set date(value: Date) {
        this.dateTs = value.getTime();
        this.dateStr = value.toISOString();
    }

    public static createFrom(date: Date) {
        return new DateImmutable(date);
    }

    constructor(date: Date | null = null) {
        this._date = date ?? new Date();
        this.date = this._date;
        this.dateStr = this.date.toISOString();
        this.dateTs = this.date.getTime();
    }

    public getTimestamp(): number {
        return Math.floor(this.dateTs / 1000);
    }

    public addSeconds(seconds: number): DateImmutable {
        return DateImmutable.createFrom(new Date(this.dateTs + seconds * 1000));
    }

    public subSeconds(seconds: number): DateImmutable {
        return DateImmutable.createFrom(new Date(this.dateTs - seconds * 1000));
    }
}
