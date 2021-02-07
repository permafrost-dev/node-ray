/* global window */
/* istanbul ignore file */

export const PLATFORM_BROWSER = typeof window !== 'undefined'
    && typeof window.document !== 'undefined';

export const PLATFORM_NODE = typeof process !== 'undefined'
    && process.versions != null
    && process.versions.node != null;

export const PLATFORM_NAME = PLATFORM_BROWSER ? 'browser' : 'node';

export default {
    PLATFORM_BROWSER,
    PLATFORM_NODE,
    PLATFORM_NAME,
};
