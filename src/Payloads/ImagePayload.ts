/* eslint-disable constructor-super */


import { Payload } from '../Payloads/Payload';

export class ImagePayload extends Payload
{
    protected location: string;

    public constructor(location: string)
    {
        super();

        this.location = location;
    }

    public getType(): string
    {
        return 'custom';
    }

    public getContent(): Record<string, unknown>
    {
        const location = this.location.replace('"', '\\\\"');

        return {
            content: `<img src="${location}" alt="" />`,
            label: 'Image',
        };
    }
}
