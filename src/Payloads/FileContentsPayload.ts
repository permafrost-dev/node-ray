import { Payload } from '../Payloads/Payload';
import { existsSync, readFileSync } from 'fs';
import { EOL } from 'os';
import { basename } from 'path';

export class FileContentsPayload extends Payload {
    protected file: string;

    public constructor(file: string) {
        super();

        this.file = file;
    }

    public getType(): string {
        return 'custom';
    }

    public getContent(): Record<string, unknown> {
        if (!existsSync(this.file)) {
            return {
                content: `File not found: '{${this}.file}'`,
                label: 'File',
            };
        }

        const contents = readFileSync(this.file, { encoding: 'utf-8' });

        return {
            content: this.encodeContent(contents),
            label: basename(this.file),
        };
    }

    protected encodeContent(content: string): string {
        const result = content.replace(/>/g, '&gt;').replace(/</g, '&lt;').replace(new RegExp(EOL, 'g'), '<br>');

        return result;
    }
}
