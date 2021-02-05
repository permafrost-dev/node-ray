// import { DefaultOriginFactory } from '../Origin/DefaultOriginFactory';
import { Origin, OriginData } from '../Origin/Origin';
import StackTrace from 'stacktrace-js';

export interface PayloadData
{
    type: string;
    content: Record<string, any> | any;
    origin: OriginData;
};

export abstract class Payload
{
    public abstract getType(): string;

    public remotePath: string | null = null;
    public localPath: string | null = null;

    public data: PayloadData = { type: '', content: '', origin: { file: '', line_number: 0 } };

    public replaceRemotePathWithLocalPath(filePath: string): string
    {
        if (this.remotePath === null || this.localPath === null) {
            return filePath;
        }

        const pattern = new RegExp('^' + this.remotePath + '');

        return this.localPath.replace(pattern, filePath);
    }

    public getContent(): Record<string, unknown>
    {
        return {};
    }

    public toArray(): PayloadData
    {
        if (this.data.type === '') {
            this.data = {
                type: this.getType(),
                content: this.getContent(),
                origin: this.getOrigin().toArray(),
            };
        }

        return this.data;
    }

    public toJson(): string
    {
        return JSON.stringify(this.toArray());
    }

    protected getOrigin(): Origin
    {
        // const originFactory = new DefaultOriginFactory(); //new this.originFactoryClass();
        // const origin = originFactory.getOrigin();

        const frame = StackTrace.getSync().filter(frame =>
        {
            return frame.getFileName().includes('Ray')
                && frame.getFileName() !== 'Ray.sendRequest';
        })[1];

        const origin = new Origin(frame?.getFileName(), frame?.getLineNumber());

        origin.file = this.replaceRemotePathWithLocalPath(<string>origin.file);

        return origin;
    }
}
