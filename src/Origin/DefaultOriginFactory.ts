import { Origin } from './Origin';
import { OriginFactory } from './OriginFactory';
import StackTrace from 'stacktrace-js';

export class DefaultOriginFactory implements OriginFactory
{
    public getOrigin(): Origin
    {
        const st = StackTrace.getSync();
        const frame = st[1];

        return new Origin(
            <string | null>(frame ? frame.fileName : null),
            <number | null>(frame ? frame.lineNumber : null)
        );
    }

    // /**
    //  * @return \Spatie\Backtrace\Frame|null
    //  */
    // protected getFrame()
    // {
    //     frames = this.getAllFrames();

    //     indexOfRay = this.getIndexOfRayFrame(frames);

    //     return frames[indexOfRay] ?? null;
    // }

    // protected getAllFrames(): array
    // {
    //     frames = Backtrace::create().frames();

    //     return array_reverse(frames, true);
    // }

    // /**
    //  * @param array frames
    //  *
    //  * @return number|null
    //  */
    // protected getIndexOfRayFrame(array frames)
    // {
    //     index = this.search(function (Frame frame) {
    //         if (frame.class === Ray::class) {
    //             return true;
    //         }

    //         if (this.startsWith(frame.file, dirname(__DIR__))) {
    //             return true;
    //         }

    //         return false;
    //     }, frames);

    //     return index + 1;
    // }

    // public startsWith(hayStack: string, needle: string): boolean
    // {
    //     return strpos(hayStack, needle) === 0;
    // }

    // /**
    //  * @param callable callable
    //  * @param array items
    //  *
    //  * @return number|null
    //  */
    // protected search(callable callable, array items)
    // {
    //     foreach (items as key: item) {
    //         if (callable(item, key)) {
    //             return key;
    //         }
    //     }

    //     return null;
    // }
}
