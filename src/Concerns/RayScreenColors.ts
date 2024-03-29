/* eslint-disable no-unused-vars */
export class RayScreenColors {
    public screenColor(color: string): this {
        return this;
    }

    public screenGreen(): this {
        return this.screenColor('green');
    }

    public screenOrange(): this {
        return this.screenColor('orange');
    }

    public screenRed(): this {
        return this.screenColor('red');
    }

    public screenPurple(): this {
        return this.screenColor('purple');
    }

    public screenBlue(): this {
        return this.screenColor('blue');
    }

    public screenGray(): this {
        return this.screenColor('gray');
    }
}
