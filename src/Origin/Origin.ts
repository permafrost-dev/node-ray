import md5 from 'md5';

export interface OriginData {
    file: string | null;
    line_number: number | null;
}

export class Origin {
    public file: string | null;
    public lineNumber: number | null;

    /**
     * @param string|null file
     * @param number|null lineNumber
     */
    public constructor(file: string | null, lineNumber: number | null) {
        this.file = file;

        this.lineNumber = lineNumber;
    }

    public toArray(): OriginData {
        return <OriginData>{
            file: this.file,
            line_number: this.lineNumber,
        };
    }

    public fingerprint(): string {
        return md5(JSON.stringify(this.toArray()));
    }
}
