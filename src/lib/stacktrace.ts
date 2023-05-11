import * as ErrorStackParser from 'error-stack-parser';
import StackGenerator from '@/lib/StackGenerator';
import * as StackTraceGPS from 'stacktrace-gps';
import StackFrame from '@/lib/stackframe';

const _options = {
    filter: function (stackframe) {
        return (
            (stackframe.functionName || '').indexOf('StackTrace$$') === -1 &&
            (stackframe.functionName || '').indexOf('ErrorStackParser$$') === -1 &&
            (stackframe.functionName || '').indexOf('StackTraceGPS$$') === -1 &&
            (stackframe.functionName || '').indexOf('StackGenerator$$') === -1
        );
    },
    sourceCache: {},
};

function _generateError(): Error {
    try {
        throw new Error();
    } catch (err: any) {
        return err;
    }
}

function _merge(first, second) {
    const target = {};

    for (const obj of [first, second]) {
        for (const prop in obj) {
            if (Object.prototype.hasOwnProperty.call(obj, prop)) {
                target[prop] = obj[prop];
            }
        }
    }

    return target;
}

function _isShapedLikeParsableError(err) {
    return err.stack || err['opera#sourceloc'];
}

function _filtered(stackframes, filter) {
    if (typeof filter === 'function') {
        return stackframes.filter(filter);
    }
    return stackframes;
}

export const StackTrace = {
    StackFrame: typeof StackFrame,

    get: function StackTrace$$get(opts) {
        const err = _generateError();
        return _isShapedLikeParsableError(err) ? this.fromError(err, opts) : this.generateArtificially(opts);
    },

    getSync: function StackTrace$$getSync(opts) {
        opts = _merge(_options, opts);
        const err = _generateError();
        const stack = _isShapedLikeParsableError(err) ? ErrorStackParser.parse(err) : StackGenerator.backtrace(opts);
        return _filtered(stack, opts.filter);
    },

    fromError: function StackTrace$$fromError(error, opts) {
        opts = _merge(_options, opts);
        const gps = new StackTraceGPS(opts);
        return new Promise(
            function (resolve) {
                const stackframes = _filtered(ErrorStackParser.parse(error), opts.filter);
                resolve(
                    Promise.all(
                        stackframes.map(function (sf) {
                            return new Promise(function (resolve) {
                                function resolveOriginal() {
                                    resolve(sf);
                                }

                                gps.pinpoint(sf).then(resolve, resolveOriginal)['catch'](resolveOriginal);
                            });
                        }),
                    ),
                );
            }.bind(this),
        );
    },

    generateArtificially: function StackTrace$$generateArtificially(opts) {
        opts = _merge(_options, opts);
        let stackFrames = StackGenerator.backtrace(opts);
        if (typeof opts.filter === 'function') {
            stackFrames = stackFrames.filter(opts.filter);
        }
        return Promise.resolve(stackFrames);
    },
};

export default StackTrace;
