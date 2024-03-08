import { hostname } from 'node:os';

export class HostnameNode {
    protected static hostname: string | null = null;

    public static get(): string {
        return HostnameNode.hostname ?? hostname();
    }

    public static set(hostname: string) {
        HostnameNode.hostname = hostname;
    }
}
