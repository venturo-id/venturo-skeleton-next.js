---
paths:
  - "src/app/**/page.tsx"
  - "src/app/**/layout.tsx"
  - "src/sections/**"
  - "src/layouts/**"
---

# Halaman: page → view → section

- `page.tsx` tipis (Server Component): `metadata`, fetch data di server, render
  satu `*View`. UI substansial tidak ditulis di `src/app/`.
- View di `src/sections/<vertical>/view/<nama>-view.tsx` (`'use client'`)
  menerima data sebagai props dan merangkai section
  `src/sections/<vertical>/<nama>-section.tsx`. Bentuk ini wajib untuk setiap
  vertical, termasuk error/coming-soon/maintenance.
- Nama folder section kebab-case tanpa awalan `_` (`_examples` khusus galeri).
- Halaman marketing tidak pecah saat backend mati: di `page.tsx`
  `await getX().catch(() => null)`, di view/section
  `data?.length ? data : STATIC_FALLBACK`.
- Halaman detail ISR kebalikannya: hanya `ApiError` status 404 yang jadi
  `notFound()`; kegagalan lain di-`throw` supaya ISR tetap menyajikan versi
  terakhir yang sehat (pola `src/app/article/[slug]/page.tsx`).
- List interaktif (filter/paginasi): `prefetchQuery` di `page.tsx` +
  `HydrationBoundary`, hook TanStack di client — key dari factory yang sama
  (pola `src/app/article/page.tsx`).
- Sebelum membuat pola UI baru, cari contohnya di `src/sections/_examples/`
  (galeri `/components`) dan ikuti.
- Form: react-hook-form + zod dengan wrapper `Field.*` / `Form` dari
  `src/components/hook-form`, bukan input MUI mentah.
- Menu utama di `src/layouts/nav-config-main.tsx`; item baru memakai `paths.*`
  dan ditambahkan setelah halamannya ada.
- Langkah lengkap menambah halaman: `docs/guides/add-a-page.md`.
