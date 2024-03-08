import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        passWithNoTests: true,
        name: 'Ray',
        coverage: {
            exclude: ['**/node_modules/**', '**/dist/**', './coverage/**', '**/.git/**'],
        },
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname,
        },
        watch: false,
    },
    build: {
        rollupOptions: {
            treeshake: true,
        },
    },
    server: {
        watch: {
            usePolling: true,
            ignored: ['**/node_modules/**', '**/dist/**', './coverage/**', '**/.git/**'],
        },
    },
});
