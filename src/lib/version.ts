/* eslint-disable no-undef */
// globalThis.__BUILD_VERSION__ is defined by esbuild during the build process.

export const PACKAGE_VERSION = globalThis.__BUILD_VERSION__ || '0.0.0';
