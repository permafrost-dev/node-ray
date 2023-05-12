/* eslint-disable @typescript-eslint/ban-ts-comment */
/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */
import * as SourceMapConsumer from 'source-map';
import StackFrame from '@/lib/stackframe';
//import axios, { AxiosResponse } from 'axios';

// const { SourceMapConsumer } = require('source-map');

function _xdr(url: string): Promise<string> {
    return globalThis.axios
        .get(url)
        .then((response: any) => {
            if ((response.status >= 200 && response.status < 300) || (url.substr(0, 7) === 'file://' && response.data)) {
                return response.data;
            } else {
                throw new Error('HTTP status: ' + response.status + ' retrieving ' + url);
            }
        })
        .catch(error => {
            throw new Error('Error retrieving ' + url + ': ' + error.message);
        });
}

function getWindow(): any {
    return globalThis;
}

function _atob(b64str: string): string {
    if (typeof getWindow() !== 'undefined' && getWindow()?.atob) {
        return getWindow()?.atob(b64str);
    } else {
        throw new Error('You must supply a polyfill for window.atob in this environment');
    }
}

function _parseJson(string: string): any {
    if (typeof JSON !== 'undefined' && JSON.parse) {
        return JSON.parse(string);
    } else {
        throw new Error('You must supply a polyfill for JSON.parse in this environment');
    }
}

function _findFunctionName(source: string, lineNumber: number): string | undefined {
    const syntaxes = [
        /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*function\b/,
        /function\s+([^('"`]*?)\s*\(([^)]*)\)/,
        /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*(?:eval|new Function)\b/,
        /\b(?!(?:if|for|switch|while|with|catch)\b)(?:(?:static)\s+)?([^('"`\s]+?)\s*\([^)]*\)\s*\{/,
        /['"]?([$_A-Za-z][$_A-Za-z0-9]*)['"]?\s*[:=]\s*\(.*?\)\s*=>/,
    ];
    const lines = source.split('\n');
    let code = '';
    const maxLines = Math.min(lineNumber, 20);
    for (let i = 0; i < maxLines; ++i) {
        const line = lines[lineNumber - i - 1];
        const commentPos = line.indexOf('//');
        if (commentPos >= 0) {
            code = line.substr(0, commentPos);
        } else {
            code = line + code;
        }
        for (let j = 0; j < syntaxes.length; j++) {
            const m = syntaxes[j].exec(code);
            if (m && m[1]) {
                return m[1];
            }
        }
    }
    return undefined;
}

function _ensureSupportedEnvironment() {
    if (typeof Object.defineProperty !== 'function' || typeof Object.create !== 'function') {
        throw new Error('Unable to consume source maps in older browsers');
    }
}

function _ensureStackFrameIsLegit(stackframe: StackFrame): boolean {
    if (typeof stackframe !== 'object') {
        throw new TypeError('Given StackFrame is not an object');
    } else if (typeof stackframe.fileName !== 'string') {
        throw new TypeError('Given file name is not a String');
    } else if (typeof stackframe.lineNumber !== 'number' || stackframe.lineNumber % 1 !== 0 || stackframe.lineNumber < 1) {
        throw new TypeError('Given line number must be a positive integer');
    } else if (typeof stackframe.columnNumber !== 'number' || stackframe.columnNumber % 1 !== 0 || stackframe.columnNumber < 0) {
        throw new TypeError('Given column number must be a non-negative integer');
    }
    return true;
}

function _findSourceMappingURL(source: string): string {
    const sourceMappingUrlRegExp = /\/\/[#@] ?sourceMappingURL=([^\s'"]+)\s*$/gm;
    let lastSourceMappingUrl;
    let matchSourceMappingUrl;
    while ((matchSourceMappingUrl = sourceMappingUrlRegExp.exec(source))) {
        lastSourceMappingUrl = matchSourceMappingUrl[1];
    }
    if (lastSourceMappingUrl) {
        return lastSourceMappingUrl;
    } else {
        throw new Error('sourceMappingURL not found');
    }
}

function _extractLocationInfoFromSourceMapSource(
    stackframe: StackFrame,
    sourceMapConsumer: SourceMapConsumer.SourceMapConsumer,
    sourceCache: Record<string, string>,
): Promise<StackFrame> {
    return new Promise((resolve, reject) => {
        const loc = sourceMapConsumer.originalPositionFor({
            line: stackframe.lineNumber || 0,
            column: stackframe.columnNumber || 0,
        });

        if (loc.source) {
            const mappedSource = sourceMapConsumer.sourceContentFor(loc.source);
            if (mappedSource) {
                sourceCache[loc.source] = mappedSource;
            }

            resolve(
                new StackFrame({
                    functionName: loc.name || stackframe.functionName,
                    args: stackframe.args,
                    fileName: loc.source,
                    lineNumber: loc.line,
                    columnNumber: loc.column,
                }),
            );
        } else {
            reject(new Error('Could not get original source for given stackframe and source map'));
        }
    });
}

export class StackTraceGPS {
    private sourceCache: Record<string, string>;
    private sourceMapConsumerCache: Record<string, Promise<SourceMapConsumer.SourceMapConsumer>>;
    private ajax: (url: string) => Promise<string>;
    private _atob: (b64str: string) => string;

    constructor(
        public opts: {
            sourceCache?: Record<string, string>;
            sourceMapConsumerCache?: Record<string, Promise<SourceMapConsumer.SourceMapConsumer>>;
            offline?: boolean;
            ajax?: (url: string) => Promise<string>;
            atob?: (b64str: string) => string;
        },
    ) {
        this.opts = opts || {};
        this.sourceCache = this.opts.sourceCache || {};
        this.sourceMapConsumerCache = this.opts.sourceMapConsumerCache || {};
        this.ajax = this.opts.ajax || _xdr;
        this._atob = this.opts.atob || _atob;
    }

    private _get(location: string): Promise<string> {
        return new Promise<string>((resolve, reject) => {
            const isDataUrl = location.substr(0, 5) === 'data:';
            if (this.sourceCache[location]) {
                resolve(this.sourceCache[location]);
            } else if (isDataUrl) {
                const supportedEncodingRegexp = /^data:application\/json;([\w=:"-]+;)*base64,/;
                const match = location.match(supportedEncodingRegexp);
                if (match) {
                    const sourceMapStart = match[0].length;
                    const encodedSource = location.substr(sourceMapStart);
                    const source = this._atob(encodedSource);
                    this.sourceCache[location] = source;
                    resolve(source);
                } else {
                    reject(new Error('The encoding of the inline sourcemap is not supported'));
                }
            } else {
                if (this.opts.offline && !isDataUrl) {
                    reject(new Error('Cannot make network requests in offline mode'));
                } else {
                    const xhrPromise = this.ajax(location);

                    xhrPromise.then(s => {
                        this.sourceCache[location] = s;
                        resolve(s);
                    }, reject);
                    xhrPromise.then(resolve, reject);
                }
            }
        });
    }

    private _getSourceMapConsumer(sourceMappingURL: string, defaultSourceRoot: string): Promise<SourceMapConsumer.SourceMapConsumer> {
        return new Promise<SourceMapConsumer.SourceMapConsumer>(resolve => {
            // @ts-ignore
            if (this.sourceMapConsumerCache[sourceMappingURL]) {
                resolve(this.sourceMapConsumerCache[sourceMappingURL]);
            } else {
                const sourceMapConsumerPromise = new Promise<SourceMapConsumer.SourceMapConsumer>((resolve, reject) => {
                    this._get(sourceMappingURL)
                        .then((sourceMapSource: any) => {
                            if (typeof sourceMapSource === 'string') {
                                sourceMapSource = _parseJson(sourceMapSource.replace(/^\)\]\}'/, ''));
                            }
                            if (typeof sourceMapSource.sourceRoot === 'undefined') {
                                sourceMapSource.sourceRoot = defaultSourceRoot;
                            }
                            resolve(new SourceMapConsumer.SourceMapConsumer(sourceMapSource));
                        })
                        .catch(reject);
                });
                this.sourceMapConsumerCache[sourceMappingURL] = sourceMapConsumerPromise;
                resolve(sourceMapConsumerPromise);
            }
        });
    }

    pinpoint(stackframe: StackFrame): Promise<StackFrame> {
        return new Promise<StackFrame>((resolve, reject) => {
            this.getMappedLocation(stackframe).then(mappedStackFrame => {
                this.findFunctionName(mappedStackFrame)
                    .then(resolve)
                    .catch(() => resolve(mappedStackFrame));
            }, reject);
        });
    }

    findFunctionName(stackframe: StackFrame): Promise<StackFrame> {
        return new Promise<StackFrame>((resolve, reject) => {
            _ensureStackFrameIsLegit(stackframe);
            this._get(stackframe.fileName || '')
                .then(source => {
                    const lineNumber = stackframe.lineNumber;
                    const guessedFunctionName = _findFunctionName(source, lineNumber);
                    if (guessedFunctionName) {
                        resolve(
                            new StackFrame({
                                functionName: guessedFunctionName,
                                args: stackframe.args,
                                fileName: stackframe.fileName,
                                lineNumber,
                                columnNumber: stackframe.columnNumber,
                            }),
                        );
                    } else {
                        resolve(stackframe);
                    }
                }, reject)
                .catch(reject);
        });
    }

    getMappedLocation(stackframe: StackFrame): Promise<StackFrame> {
        return new Promise<StackFrame>((resolve, reject) => {
            _ensureSupportedEnvironment();
            _ensureStackFrameIsLegit(stackframe);
            const sourceCache = this.sourceCache;
            const fileName = stackframe.fileName || '';

            this._get(fileName)
                .then(source => {
                    let sourceMappingURL = _findSourceMappingURL(source);
                    const isDataUrl = sourceMappingURL.substr(0, 5) === 'data:';
                    const defaultSourceRoot = fileName?.substring(0, fileName.lastIndexOf('/') + 1);
                    if (sourceMappingURL[0] !== '/' && !isDataUrl && !/^https?:\/\/|^\/\//i.test(sourceMappingURL)) {
                        sourceMappingURL = defaultSourceRoot + sourceMappingURL;
                    }
                    this._getSourceMapConsumer(sourceMappingURL, defaultSourceRoot)
                        .then(sourceMapConsumer => {
                            _extractLocationInfoFromSourceMapSource(stackframe, sourceMapConsumer, sourceCache)
                                .then(resolve)
                                .catch(() => resolve(stackframe));
                        })
                        .catch(reject);
                }, reject)
                .catch(reject);
        });
    }
}

export default StackTraceGPS;
