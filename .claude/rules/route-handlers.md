---
paths:
  - "src/app/**/route.ts"
  - "src/pages/api/**"
---

# Route handler

- Body dan query divalidasi zod (`safeParse`); body yang bukan JSON dibaca
  dengan `request.json().catch(() => null)` lalu ditolak 400.
- Endpoint yang mengubah state (purge cache, dsb.) memeriksa token server-only
  dari `env` (`src/lib/env.ts`) dan menjawab 503 bila token tidak dikonfigurasi.
- Pesan error tidak membawa isi env, stack, atau detail internal.
- Path publik berakhiran `/` (`trailingSlash: true` me-redirect 308 varian
  tanpa slash) — tulis begitu di dokumen dan contoh pemanggil.
- Setiap perubahan memperbarui `docs/api/route-handlers.md` dan test
  `route.test.ts` di folder yang sama (`// @vitest-environment node`).
