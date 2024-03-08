/* eslint-disable no-undef */
import { expect, it } from 'vitest';

import {
    usleep,
    sleep,
    encodeHtmlEntities,
    spacesToHtmlSpaces,
    encodeNewLinesToHtml,
    formatHtmlForDisplay,
    end,
    nonCryptoUuidV4,
    md5,
} from '../../src/lib/utils';

it.concurrent('sleeps for 0.1 sec', async () => {
    const start = new Date().getTime();
    sleep(0.1);
    const finish = new Date().getTime();

    expect(Math.floor((finish - start) / 10)).toBe(10);
});

it.concurrent('sleeps for 100 milliseconds', async () => {
    const start = new Date().getTime();
    usleep(100);
    const finish = new Date().getTime();

    expect(Math.floor((finish - start) / 10)).toBe(10);
});

it('encodes html entities', async () => {
    expect(encodeHtmlEntities('<test>')).toBe('&lt;test&gt;');
    expect(encodeHtmlEntities('"one & two"')).toBe('&quot;one &amp; two&quot;');
    expect(encodeHtmlEntities("'©'")).toBe('&#39;&copy;&#39;');
});

it('converts a string of spaces to html entities', async () => {
    expect(spacesToHtmlSpaces('  ')).toBe('&nbsp;&nbsp;');
});

it('encodes line breaks as html <br> tags', async () => {
    expect(encodeNewLinesToHtml('\r\ntest\n')).toBe('<br>test<br>');
});

it('formats html entities for display', async () => {
    expect(formatHtmlForDisplay('<em>test</em>', { encodeEntities: true })).toBe('&lt;em&gt;test&lt;/em&gt;');

    expect(formatHtmlForDisplay(' <em>test</em>', { encodeEntities: false })).toBe('&nbsp;<em>test</em>');

    expect(formatHtmlForDisplay('  te\nst\n')).toBe('&nbsp;&nbsp;te<br>st<br>');
});

it('generates a uuid v4', () => {
    expect(nonCryptoUuidV4().length).toBeGreaterThanOrEqual(24);
    expect(nonCryptoUuidV4()).toMatch(/^[0-9A-F]{8}-[0-9A-F]{4}-4[0-9A-F]{3}-[89AB][0-9A-F]{3}-[0-9A-F]{12}$/i);
});

it('gets the last item in an array', () => {
    const data = [12, 34, 56, 78];
    const testData = data.slice(0);

    let counter = data.length - 1;

    while (data.length) {
        if (counter < 0) {
            expect(end(testData)).toBe(false);
            break;
        }
        expect(end(testData)).toBe(data[counter]);
        testData.pop();
        counter--;
    }

    expect(end([])).toBe(false);
});

it('calculates an md5 hash', () => {
    const data = 'test';
    expect(md5(data)).toBe('098f6bcd4621d373cade4e832627b4f6');
});
