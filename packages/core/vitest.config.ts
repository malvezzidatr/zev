import { defineConfig } from 'vitest/config';

export default defineConfig({
  test: {
    environment: 'happy-dom',
    include: ['src/**/*.test.ts'],
    globals: true,
    coverage: {
      provider: 'v8',
      reporter: ['text', 'html', 'lcov'],
      include: ['src/components/**/*.ts', 'src/base/**/*.ts'],
      exclude: ['**/*.styles.ts', '**/*.test.ts', '**/index.ts'],
    },
  },
});
