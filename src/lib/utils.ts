/* eslint-disable no-empty */

import { v4 as uuidv4 } from 'uuid';

export function randomInteger(minimum, maximum) {
    if (maximum === undefined) {
        maximum = minimum;
        minimum = 0;
    }

    if (typeof minimum !== 'number' || typeof maximum !== 'number') {
        throw new TypeError('Expected all arguments to be numbers');
    }

    return Math.floor(Math.random() * (maximum - minimum + 1) + minimum);
}

export interface FormatHtmlOptions {
    encodeEntities: boolean;
}

export const sleep = (seconds: number) => {
    return usleep(seconds * 1000);
};

export const usleep = (milliseconds: number) => {
    const start = new Date().getTime();
    while (new Date().getTime() < start + milliseconds) {}
};

export const encodeHtmlEntities = (str: string) => {
    const escapeChars: Record<string, string> = {
        '¢': 'cent',
        '£': 'pound',
        '¥': 'yen',
        '€': 'euro',
        '©': 'copy',
        '®': 'reg',
        '<': 'lt',
        '>': 'gt',
        '"': 'quot',
        '&': 'amp',
        "'": '#39',
    };

    const chars: string[] = Object.keys(escapeChars);
    const regex = new RegExp(`[${chars.join('')}]`, 'g');

    return str.replace(regex, m => `&${escapeChars[m]};`);
};

export const spacesToHtmlSpaces = (spaces: string) => {
    return '&nbsp;'.repeat(spaces.length);
};

export const encodeNewLinesToHtml = (str: string) => {
    return str.replace(/(\r\n|\r|\n)/g, '<br>');
};

export const formatHtmlForDisplay = (html: string, options: FormatHtmlOptions = { encodeEntities: true }) => {
    if (options.encodeEntities) {
        html = encodeHtmlEntities(html);
    }

    return encodeNewLinesToHtml(
        html.replace(/^(\s+)/gm, m => `${spacesToHtmlSpaces(m)}`), // preserve indentation spaces
    );
};

export const nonCryptoUuidV4 = (): string => {
    const v4options = {
        random: [
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
            randomInteger(1, 255),
        ],
    };

    return uuidv4(v4options).toString();
};

/**
 * Returns the last item in an array, or false if the array is empty.
 *
 * @param {any[]} arr
 */
export const end = (arr: any[]) => (arr.length ? arr[arr.length - 1] : false);
