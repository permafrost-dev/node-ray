import { defineConfig } from 'vitest/config';

export default defineConfig({
    test: {
        passWithNoTests: true,
        name: 'Ray',
        alias: {
            '@/': new URL('./src/', import.meta.url).pathname,
        },
        watch: false,
    },
    server: {
        watch: {
            usePolling: true,
            ignored: ['**/node_modules/**', '**/dist/**', './coverage/**', '**/.git/**'],
        },
    },
});
