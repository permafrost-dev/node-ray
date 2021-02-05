/* eslint-disable no-undef */

import { usleep, sleep, encodeHtmlEntities, spacesToHtmlSpaces, encodeNewLinesToHtml } from '../../src/lib/utils';

it('sleeps for 0.1 sec', () =>
{
    const start = new Date().getTime();
    sleep(0.1);
    const finish = new Date().getTime();

    expect(Math.floor((finish - start) / 10)).toBe(10);
});

it('sleeps for 100 milliseconds', () =>
{
    const start = new Date().getTime();
    usleep(100);
    const finish = new Date().getTime();

    expect(Math.floor((finish - start) / 10)).toBe(10);
});

it('encodes html entities', async () =>
{
    expect(encodeHtmlEntities('<test>')).toBe('&lt;test&gt;');
    expect(encodeHtmlEntities('"one & two"')).toBe('&quot;one &amp; two&quot;');
    expect(encodeHtmlEntities("'©'")).toBe('&#39;&copy;&#39;');
});

it('converts a string of spaces to html entities', async () =>
{
    expect(spacesToHtmlSpaces('  ')).toBe('&nbsp;&nbsp;');
});

it('encodes line breaks as html <br> tags', async () =>
{
    expect(encodeNewLinesToHtml("\r\ntest\n")).toBe('<br>test<br>');
});
