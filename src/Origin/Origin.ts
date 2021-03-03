//import md5 from 'md5';

export interface OriginData {
    function_name: string | null;
    file: string | null;
    line_number: number | null;
    hostname: string | null;
}

/*
export class Origin
{
    public file: string | null;
    public lineNumber: number | null;
    public functionName: string | null;

    public constructor(file: string | null, lineNumber: number | null, functionName: string | null = null)
    {
        this.file = file;

        this.lineNumber = lineNumber;

        this.functionName = functionName;
    }

    public toArray(): OriginData
    {
        return <OriginData>{
            function_name: this.functionName,
            file: this.file,
            line_number: this.lineNumber,
        };
    }

    public fingerprint(): string
    {
        return md5(JSON.stringify(this.toArray()));
    }
}
*/
