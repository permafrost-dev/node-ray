/* eslint-disable @typescript-eslint/ban-ts-comment */
// function _isNumber(n) {
//     return !isNaN(parseFloat(n)) && isFinite(n);
// }

function _capitalize(str) {
    return str.charAt(0).toUpperCase() + str.substring(1);
}

function _getter(t, p): any {
    // return function () {
    // @ts-ignore
    return t[p];
    // };
}

const booleanProps = ['isConstructor', 'isEval', 'isNative', 'isToplevel'];
const numericProps = ['columnNumber', 'lineNumber'];
const stringProps = ['fileName', 'functionName', 'source'];
const arrayProps = ['args'];
const objectProps = ['evalOrigin'];

const props = booleanProps.concat(numericProps, stringProps, arrayProps, objectProps);

export class StackFrame {
    args = [];
    evalOrigin = {};
    fileName = '';
    functionName = '';
    isConstructor = false;
    isEval = false;
    isNative = false;
    isToplevel = false;
    lineNumber = 0;
    source = '';
    columnNumber = 0;

    constructor(obj) {
        if (!obj) return;
        // for (let i = 0; i < booleanProps.length; i++) {
        //     //StackFrame.prototype['get' + _capitalize(booleanProps[i])] = _getter(booleanProps[i]);
        //     StackFrame.prototype['set' + _capitalize(booleanProps[i])] = (function (p) {
        //         return function (v) {
        //             // @ts-ignore
        //             this[p] = Boolean(v);
        //         };
        //     })(booleanProps[i]);
        // }

        for (let i = 0; i < props.length; i++) {
            if (obj[props[i]] !== undefined) {
                const fn = StackFrame.prototype['set' + _capitalize(props[i])];
                if (typeof fn === 'function') {
                    // this['set' + _capitalize(props[i])](obj[props[i]]);
                    fn.call(this, obj[props[i]]);
                }
            }
        }
    }

    getArgs() {
        return this.args;
    }

    setArgs(v) {
        if (Object.prototype.toString.call(v) !== '[object Array]') {
            throw new TypeError('Args must be an Array');
        }
        this.args = v;
    }

    getEvalOrigin() {
        return this.evalOrigin;
    }

    setEvalOrigin(v) {
        if (v instanceof StackFrame) {
            this.evalOrigin = v;
        } else if (v instanceof Object) {
            this.evalOrigin = new StackFrame(v);
        } else {
            throw new TypeError('Eval Origin must be an Object or StackFrame');
        }
    }

    toString() {
        const fileName = this.getFileName() || '';
        const lineNumber = this.getLineNumber() || '';
        const columnNumber = this.getColumnNumber() || '';
        const functionName = this.getFunctionName() || '';
        if (this.getIsEval()) {
            if (fileName) {
                return '[eval] (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
            }
            return '[eval]:' + lineNumber + ':' + columnNumber;
        }
        if (functionName) {
            return functionName + ' (' + fileName + ':' + lineNumber + ':' + columnNumber + ')';
        }
        return fileName + ':' + lineNumber + ':' + columnNumber;
    }

    getFileName() {
        return this.fileName;
    }
    getLineNumber() {
        return _getter(this, 'lineNumber') as number;
    }
    getColumnNumber() {
        return _getter(this, 'columnNumber') as number;
    }
    getFunctionName() {
        return _getter(this, 'functionName') as string;
    }
    getIsEval() {
        return _getter(this, 'isEval');
    }

    fromString(str) {
        const argsStartIndex = str.indexOf('(');
        const argsEndIndex = str.lastIndexOf(')');

        const functionName = str.substring(0, argsStartIndex);
        const args = str.substring(argsStartIndex + 1, argsEndIndex).split(',');
        const locationString = str.substring(argsEndIndex + 1);

        let fileName = '',
            lineNumber = '',
            columnNumber = '';
        if (locationString.indexOf('@') === 0) {
            const parts = /@(.+?)(?::(\d+))?(?::(\d+))?$/.exec(locationString) || [];
            fileName = parts[1];
            lineNumber = parts[2];
            columnNumber = parts[3];
        }

        return new StackFrame({
            functionName: functionName,
            args: args || undefined,
            fileName: fileName,
            lineNumber: lineNumber || undefined,
            columnNumber: columnNumber || undefined,
        });
    }
}

export default StackFrame;
