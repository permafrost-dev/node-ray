/* eslint-disable no-empty */

import { v4 as uuidV4 } from 'uuid';

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

    return uuidV4(v4options).toString();
};

/**
 * Returns the last item in an array, or false if the array is empty.
 *
 * @param {any[]} arr
 */
export const end = (arr: any[]) => (arr.length ? arr[arr.length - 1] : false);

export function toPath(urlOrPath) {
    return urlOrPath instanceof URL ? fileURLToPath(urlOrPath) : urlOrPath;
}

export function md5(inputString) {
    const hc = '0123456789abcdef';
    function rh(n) {
        let j,
            s = '';
        for (j = 0; j <= 3; j++) s += hc.charAt((n >> (j * 8 + 4)) & 0x0f) + hc.charAt((n >> (j * 8)) & 0x0f);
        return s;
    }
    function ad(x, y) {
        const l = (x & 0xffff) + (y & 0xffff);
        const m = (x >> 16) + (y >> 16) + (l >> 16);
        return (m << 16) | (l & 0xffff);
    }
    function rl(n, c) {
        return (n << c) | (n >>> (32 - c));
    }
    function cm(q, a, b, x, s, t) {
        return ad(rl(ad(ad(a, q), ad(x, t)), s), b);
    }
    function ff(a, b, c, d, x, s, t) {
        return cm((b & c) | (~b & d), a, b, x, s, t);
    }
    function gg(a, b, c, d, x, s, t) {
        return cm((b & d) | (c & ~d), a, b, x, s, t);
    }
    function hh(a, b, c, d, x, s, t) {
        return cm(b ^ c ^ d, a, b, x, s, t);
    }
    function ii(a, b, c, d, x, s, t) {
        return cm(c ^ (b | ~d), a, b, x, s, t);
    }
    function sb(x) {
        let i;
        const nblk = ((x.length + 8) >> 6) + 1;
        const blks = new Array(nblk * 16);
        for (i = 0; i < nblk * 16; i++) blks[i] = 0;
        for (i = 0; i < x.length; i++) blks[i >> 2] |= x.charCodeAt(i) << ((i % 4) * 8);
        blks[i >> 2] |= 0x80 << ((i % 4) * 8);
        blks[nblk * 16 - 2] = x.length * 8;
        return blks;
    }
    // biome-ignore lint/style/useSingleVarDeclarator: <explanation>
    let i,
        a = 1732584193,
        b = -271733879,
        c = -1732584194,
        d = 271733878,
        olda,
        oldb,
        oldc,
        oldd;
    const x = sb(`${inputString}`);
    for (i = 0; i < x.length; i += 16) {
        olda = a;
        oldb = b;
        oldc = c;
        oldd = d;
        a = ff(a, b, c, d, x[i + 0], 7, -680876936);
        d = ff(d, a, b, c, x[i + 1], 12, -389564586);
        c = ff(c, d, a, b, x[i + 2], 17, 606105819);
        b = ff(b, c, d, a, x[i + 3], 22, -1044525330);
        a = ff(a, b, c, d, x[i + 4], 7, -176418897);
        d = ff(d, a, b, c, x[i + 5], 12, 1200080426);
        c = ff(c, d, a, b, x[i + 6], 17, -1473231341);
        b = ff(b, c, d, a, x[i + 7], 22, -45705983);
        a = ff(a, b, c, d, x[i + 8], 7, 1770035416);
        d = ff(d, a, b, c, x[i + 9], 12, -1958414417);
        c = ff(c, d, a, b, x[i + 10], 17, -42063);
        b = ff(b, c, d, a, x[i + 11], 22, -1990404162);
        a = ff(a, b, c, d, x[i + 12], 7, 1804603682);
        d = ff(d, a, b, c, x[i + 13], 12, -40341101);
        c = ff(c, d, a, b, x[i + 14], 17, -1502002290);
        b = ff(b, c, d, a, x[i + 15], 22, 1236535329);
        a = gg(a, b, c, d, x[i + 1], 5, -165796510);
        d = gg(d, a, b, c, x[i + 6], 9, -1069501632);
        c = gg(c, d, a, b, x[i + 11], 14, 643717713);
        b = gg(b, c, d, a, x[i + 0], 20, -373897302);
        a = gg(a, b, c, d, x[i + 5], 5, -701558691);
        d = gg(d, a, b, c, x[i + 10], 9, 38016083);
        c = gg(c, d, a, b, x[i + 15], 14, -660478335);
        b = gg(b, c, d, a, x[i + 4], 20, -405537848);
        a = gg(a, b, c, d, x[i + 9], 5, 568446438);
        d = gg(d, a, b, c, x[i + 14], 9, -1019803690);
        c = gg(c, d, a, b, x[i + 3], 14, -187363961);
        b = gg(b, c, d, a, x[i + 8], 20, 1163531501);
        a = gg(a, b, c, d, x[i + 13], 5, -1444681467);
        d = gg(d, a, b, c, x[i + 2], 9, -51403784);
        c = gg(c, d, a, b, x[i + 7], 14, 1735328473);
        b = gg(b, c, d, a, x[i + 12], 20, -1926607734);
        a = hh(a, b, c, d, x[i + 5], 4, -378558);
        d = hh(d, a, b, c, x[i + 8], 11, -2022574463);
        c = hh(c, d, a, b, x[i + 11], 16, 1839030562);
        b = hh(b, c, d, a, x[i + 14], 23, -35309556);
        a = hh(a, b, c, d, x[i + 1], 4, -1530992060);
        d = hh(d, a, b, c, x[i + 4], 11, 1272893353);
        c = hh(c, d, a, b, x[i + 7], 16, -155497632);
        b = hh(b, c, d, a, x[i + 10], 23, -1094730640);
        a = hh(a, b, c, d, x[i + 13], 4, 681279174);
        d = hh(d, a, b, c, x[i + 0], 11, -358537222);
        c = hh(c, d, a, b, x[i + 3], 16, -722521979);
        b = hh(b, c, d, a, x[i + 6], 23, 76029189);
        a = hh(a, b, c, d, x[i + 9], 4, -640364487);
        d = hh(d, a, b, c, x[i + 12], 11, -421815835);
        c = hh(c, d, a, b, x[i + 15], 16, 530742520);
        b = hh(b, c, d, a, x[i + 2], 23, -995338651);
        a = ii(a, b, c, d, x[i + 0], 6, -198630844);
        d = ii(d, a, b, c, x[i + 7], 10, 1126891415);
        c = ii(c, d, a, b, x[i + 14], 15, -1416354905);
        b = ii(b, c, d, a, x[i + 5], 21, -57434055);
        a = ii(a, b, c, d, x[i + 12], 6, 1700485571);
        d = ii(d, a, b, c, x[i + 3], 10, -1894986606);
        c = ii(c, d, a, b, x[i + 10], 15, -1051523);
        b = ii(b, c, d, a, x[i + 1], 21, -2054922799);
        a = ii(a, b, c, d, x[i + 8], 6, 1873313359);
        d = ii(d, a, b, c, x[i + 15], 10, -30611744);
        c = ii(c, d, a, b, x[i + 6], 15, -1560198380);
        b = ii(b, c, d, a, x[i + 13], 21, 1309151649);
        a = ii(a, b, c, d, x[i + 4], 6, -145523070);
        d = ii(d, a, b, c, x[i + 11], 10, -1120210379);
        c = ii(c, d, a, b, x[i + 2], 15, 718787259);
        b = ii(b, c, d, a, x[i + 9], 21, -343485551);
        a = ad(a, olda);
        b = ad(b, oldb);
        c = ad(c, oldc);
        d = ad(d, oldd);
    }
    return rh(a) + rh(b) + rh(c) + rh(d);
}

/**
 * Mimics the functionality of Node.js's `fileURLToPath` for file URLs.
 * Converts a file URL to a local file system path.
 *
 * @param {string} url - The file URL to convert.
 * @returns {string} The local file system path.
 */
export function fileURLToPath(url): string {
    try {
        const urlObject = url instanceof URL ? url : new URL(url);

        return decodeURIComponent(urlObject.pathname);
    } catch (error) {
        throw new Error('Invalid URL.');
    }
}

/**
 * Returns a formatted date string using dayjs format strings.
 * @param date Date
 * @param format string
 * @returns {string}
 */
export function formatDateExtended(date: Date, format = 'YYYY-MM-DD HH:mm:ss'): string {
    const pad = number => (number < 10 ? `0${number}` : number);
    const getTzName = date => {
        const tzNameMatch = new Intl.DateTimeFormat('en', { timeZoneName: 'short' })
            .formatToParts(date)
            .find(part => part.type === 'timeZoneName');
        return tzNameMatch ? tzNameMatch.value : '';
    };

    const tokens = {
        // Year
        YYYY: () => date.getFullYear(),
        YY: () => String(date.getFullYear()).slice(-2),

        // Month
        MM: () => pad(date.getMonth() + 1),
        M: () => date.getMonth() + 1,

        // Day
        DD: () => pad(date.getDate()),
        D: () => date.getDate(),

        // Hours
        HH: () => pad(date.getHours()),
        H: () => date.getHours(),
        hh: () => pad(date.getHours() % 12 || 12),
        h: () => date.getHours() % 12 || 12,

        // Minutes
        mm: () => pad(date.getMinutes()),
        m: () => date.getMinutes(),

        // Seconds
        ss: () => pad(date.getSeconds()),
        s: () => date.getSeconds(),

        // AM/PM
        A: () => (date.getHours() < 12 ? 'AM' : 'PM'),
        a: () => (date.getHours() < 12 ? 'am' : 'pm'),

        T: () => getTzName(date),
        Z: () => {
            const offset = date.getTimezoneOffset();
            return `${(offset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(offset) / 60))}:${pad(Math.abs(offset) % 60)}`;
        },
        z: () => {
            const offset = date.getTimezoneOffset();
            return `${(offset > 0 ? '-' : '+') + pad(Math.floor(Math.abs(offset) / 60)) + pad(Math.abs(offset) % 60)}`;
        },

        // Escape character is handled below in the loop
    };

    let formattedDate = '';
    let escapeNext = false;
    for (let i = 0; i < format.length; i++) {
        if (format[i] === '[') {
            escapeNext = true;
            continue;
        }

        if (format[i] === ']') {
            escapeNext = false;
            continue;
        }

        if (escapeNext) {
            formattedDate += format[i];
            continue;
        }

        const twoCharToken = format.substring(i, i + 2);
        const fourCharToken = format.substring(i, i + 4);

        if (tokens[fourCharToken]) {
            formattedDate += tokens[fourCharToken]();
            i += 3; // Skip next 3 characters
        } else if (tokens[twoCharToken]) {
            formattedDate += tokens[twoCharToken]();
            i += 1; // Skip next character
        } else {
            formattedDate += format[i];
        }
    }

    return formattedDate;
}

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
