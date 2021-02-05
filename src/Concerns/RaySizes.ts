export class RaySizes {
    // eslint-disable-next-line no-unused-vars
    public size(size: string): this {
        return this;
    }

    public small(): this {
        return this.size('sm');
    }

    public large(): this {
        return this.size('lg');
    }
}
