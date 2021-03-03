export class Hostname {
    protected static hostname: string | null = null;

    public static get(): string {
        return Hostname.hostname ?? 'remote';
    }

    public static set(hostname: string) {
        Hostname.hostname = hostname;
    }
}
