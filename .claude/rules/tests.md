---
paths:
  - "**/*.test.ts"
  - "**/*.test.tsx"
  - "src/test/**"
  - "vitest.config.mts"
---

# Test (vitest + Testing Library)

- Test di sebelah kodenya: `<nama>.test.ts(x)`. Helper bersama di `src/test/`
  (bukan test, tidak di-import kode aplikasi).
- Environment default `jsdom`. Test yang memanggil `fetch`/`Request` asli
  (lapisan API, route handler) memakai `// @vitest-environment node` di baris
  pertama.
- Tidak ada request jaringan sungguhan: stub `fetch` dengan `stubFetch()` dari
  `src/test/fetch-mock.ts`; modul Next yang butuh runtime server di-mock
  (`vi.mock('next/cache', …)`).
- Env test dari `vitest.config.mts` (`test.env`); variasi per test dengan
  `vi.stubEnv` + `vi.resetModules()` lalu `await import(...)` (lihat
  `route.test.ts`). Mock dan env dipulihkan otomatis antar test.
- Hook diuji dengan `renderHook` + `QueryClientProvider` (`retry: false`);
  uji perilaku yang terlihat pemanggil, bukan detail implementasi.
- Ambang ESLint berlaku juga di test: callback `describe` ≤ 50 baris, jadi
  pecah per `describe` kecil; literal angka dan string berulang di test boleh.
