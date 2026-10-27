import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { defineConfig } from 'vitest/config';

// ----------------------------------------------------------------------

export default defineConfig({
  plugins: [react()],
  resolve: {
    // Import internal `src/...` (tsconfig baseUrl ".").
    alias: { src: fileURLToPath(new URL('./src', import.meta.url)) },
  },
  test: {
    environment: 'jsdom',
    include: ['src/**/*.test.{ts,tsx}'],
    clearMocks: true,
    restoreMocks: true,
    unstubEnvs: true,
    unstubGlobals: true,
    // src/lib/env.ts memvalidasi env saat module dimuat; nilai contoh untuk test.
    env: {
      NEXT_PUBLIC_API_URL: 'https://api.example.test/v1',
      NEXT_PUBLIC_COMPANY_SLUG: 'acme',
      REVALIDATE_TOKEN: 'test-revalidate-token',
    },
  },
});
