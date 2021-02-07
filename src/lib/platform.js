/* global window process */
/* istanbul ignore file */

export const PLATFORM_BROWSER = typeof window !== 'undefined'
    && typeof window['document'] !== 'undefined';

export const PLATFORM_NODE = !PLATFORM_BROWSER;

export default {
    PLATFORM_BROWSER,
    PLATFORM_NODE,
};
