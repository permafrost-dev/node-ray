/* eslint-disable no-empty */


export interface FormatHtmlOptions
{
    encodeEntities: boolean;
}

export const sleep = (seconds: number) =>
{
    return usleep(seconds * 1000);
};

export const usleep = (milliseconds: number) =>
{
    const start = new Date().getTime();
    while (new Date().getTime() < start + milliseconds) { }
};

export const encodeHtmlEntities = (str: string) =>
{
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
        '\'': '#39',
    };

    const chars: string[] = Object.keys(escapeChars);
    const regex = new RegExp(`[${chars.join('')}]`, 'g');

    return str.replace(regex, m => `&${escapeChars[m]};`);
};

export const spacesToHtmlSpaces = (spaces: string) =>
{
    return '&nbsp;'.repeat(spaces.length);
};

export const encodeNewLinesToHtml = (str: string) =>
{
    return str.replace(/(\r\n|\r|\n)/g, '<br>');
};

export const formatHtmlForDisplay = (html: string, options: FormatHtmlOptions = { encodeEntities: true }) =>
{
    if (options.encodeEntities) {
        html = encodeHtmlEntities(html);
    }

    return encodeNewLinesToHtml(
        html.replace(/^(\s+)/gm, m => `${spacesToHtmlSpaces(m)}`) // preserve indentation spaces
    );
};