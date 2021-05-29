import { Ray } from './Ray';

export const consoleLog = console.log.bind({});

export const consoleWrapper = (...args: any[]) => {
    if (typeof Ray.client !== 'undefined' && Ray.client.isRayAvailable()) {
        Ray.create().send(...args);
    }

    consoleLog(...args);
};

export class ConsoleInterceptor {
    public static active = false;

    public enable() {
        ConsoleInterceptor.active = true;

        console.log = consoleWrapper;
    }

    public disable() {
        ConsoleInterceptor.active = false;

        console.log = consoleLog;
    }

    public active(): boolean {
        return ConsoleInterceptor.active;
    }
}
