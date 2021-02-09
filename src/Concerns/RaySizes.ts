/* eslint-disable no-unused-vars */
/* eslint-disable @typescript-eslint/no-unused-vars */

export class RaySizes {
    /* istanbul ignore next */
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
