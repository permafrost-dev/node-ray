/* eslint-disable @typescript-eslint/ban-types */

import { ArgumentConverter } from './ArgumentConverter';
import { BoolPayload } from './Payloads/BoolPayload';
import { LogPayload } from './Payloads/LogPayload';
import { NullPayload } from './Payloads/NullPayload';
import { Payload } from './Payloads/Payload';

export class PayloadFactory {
    protected values: any[];

    protected static payloadFinder: Function | null = null;

    public static createForValues(args: any[]): any[] {
        return new this(args).getPayloads();
    }

    public static registerPayloadFinder(callable: Function) {
        this.payloadFinder = callable;
    }

    public constructor(values: any[]) {
        this.values = values;
    }

    public getPayloads(): any[] {
        return this.values.map(value => {
            return this.getPayload(value);
        });
    }

    protected getPayload(value: any): Payload {
        // if (this.payloadFinder) {
        //     if ($payload = (static::$payloadFinder)($value)) {
        //         return $payload;
        //     }
        // }

        if (typeof value === 'boolean') {
            return new BoolPayload(value);
        }

        if (value === null) {
            return new NullPayload();
        }

        // if ($value instanceof Carbon) {
        //     return new CarbonPayload($value);
        // }

        const primitiveValue = ArgumentConverter.convertToPrimitive(value);

        return new LogPayload(primitiveValue);
    }
}
