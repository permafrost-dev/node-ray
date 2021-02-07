/* eslint-disable no-unused-vars */

import { OriginData } from '../Origin/Origin';

export interface PayloadData
{
    type: string;
    content: Record<string, any> | any;
    origin: OriginData;
}

export abstract class Payload
{
    public abstract getType(): string;

    public remotePath: string | null = null;
    public localPath: string | null = null;

    public initialized = false;
    public data: PayloadData = { type: '', content: '', origin: { function_name: '', file: '', line_number: 0 } };

    public replaceRemotePathWithLocalPath(filePath: string): string
    {
        if (this.remotePath === null || this.localPath === null) {
            return filePath;
        }

        const pattern = new RegExp('^' + this.remotePath);

        return filePath.replace(pattern, this.localPath);
    }

    public getContent(): Record<string, unknown>
    {
        return {};
    }

    public toArray(): PayloadData
    {
        if (!this.initialized) {
            this.initialized = true;
            this.data.type = this.getType();
            this.data.content = this.getContent();
            this.data.origin.file = this.replaceRemotePathWithLocalPath(<string>this.data.origin.file);
        }

        return this.data;
    }

    public toJson(): string
    {
        return JSON.stringify(this.toArray());
    }
}
