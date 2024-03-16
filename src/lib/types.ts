/* eslint-disable no-unused-vars */
/* eslint-disable no-undef */

/// <reference lib="dom" />

import { Ray } from '@/Ray';

/**
 * Check type of operand with more specificity than `typeof`.
 *   Slightly modified version of MDN helper found in `typeof` definition page.
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Operators/typeof#real-world_usage
 *
 * Modified version of original from:
 * @see https://github.com/m1guelpf/ray-js/blob/main/src/utils/type.js
 *
 * @param {*} item
 * @returns {string}
 */
export const getType = (item: any) => {
    if (typeof item === 'object') {
        //return item.constructor.name.toString();
        const deepType = Object.prototype.toString.call(item).slice(8, -1).toLowerCase();

        if (deepType === 'generatorfunction') {
            return 'function';
        }

        // Prevent over-specificity (for example, [object HTMLDivElement], etc).
        // Account for functionish Regexp (Android <=2.3), functionish <object> element (Chrome <=57, Firefox <=52), etc.
        // String.prototype.match is universally supported.
        if (deepType.match(/^(array|bigint|date|error|function|generator|regexp|symbol)$/)) {
            return deepType;
        }
    }

    return typeof item;
};

export const isHtmlable = (item: any): boolean => {
    if (typeof item !== 'object') {
        return false;
    }

    return item instanceof HTMLElement;
};

export enum SendRequestCallbackType {
    Sending = 'sending',
    Sent = 'sent',
}

export type { PayloadTypes } from '@/Payloads';
