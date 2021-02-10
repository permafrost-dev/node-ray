import { Ray } from './Ray';

export class ConsoleInterceptor {
    public static active = false;
    public static consoleLog: any;

    public intercept() {
        ConsoleInterceptor.active = true;
        ConsoleInterceptor.consoleLog = console.log;

        console.log = this.wrapper;
    }

    public reset() {
        ConsoleInterceptor.active = false;

        console.log = ConsoleInterceptor.consoleLog;
    }

    public active(): boolean {
        return ConsoleInterceptor.active;
    }

    protected wrapper(...args: any[]) {
        if (typeof Ray.client !== 'undefined' && Ray.client.isRayAvailable()) {
            Ray.create().send(...args);
        }

        ConsoleInterceptor.consoleLog(...args);
    }
}
