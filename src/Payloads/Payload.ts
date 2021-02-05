import { Origin } from '../Origin/Origin';

export abstract class Payload {
    /** @var string */
    // public static originFactoryClass = DefaultOriginFactory::class;

    public abstract getType(): string;

    public remotePath: string | null = null;
    public localPath: string | null = null;

    public replaceRemotePathWithLocalPath(filePath: string): string {
        if (this.remotePath === null || this.localPath === null) {
            return filePath;
        }

        const pattern = new RegExp('^' + this.remotePath + '');

        return this.localPath.replace(pattern, filePath);
    }

    public getContent(): Record<string, unknown> {
        return {};
    }

    public toArray(): Record<string, unknown> {
        return {
            type: this.getType(),
            content: this.getContent(),
            origin: this.getOrigin().toArray(),
        };
    }

    public toJson(): string {
        return JSON.stringify(this.toArray());
    }

    protected getOrigin(): Origin {
        // originFactory = new this.originFactoryClass();

        // origin = originFactory.getOrigin();
        const origin = new Origin('file.js', 12);

        origin.file = this.replaceRemotePathWithLocalPath(<string>origin.file);

        return origin;
    }
}
