---
paths:
  - "src/sections/_examples/**"
  - "src/app/components/**"
---

# Galeri komponen `/components`

- Galeri adalah contoh resmi pemakaian komponen di `src/components/` yang ditiru
  engineer dan agent; contoh baru di sini lolos ambang yang sama dengan kode
  aplikasi (`yarn lint:changed`).
- Satu halaman galeri = `src/app/components/<nama>/page.tsx` tipis + view di
  `src/sections/_examples/<nama>-view/`.
- Galeri di-gate di `src/middleware.ts` (production hanya bila
  `NEXT_PUBLIC_SHOW_COMPONENTS=true`); jangan menggantinya dengan `notFound()`
  di layout — halaman galeri di-prerender statis.
- Dependency yang hanya dipakai galeri dicatat di `docs/architecture.md`
  (bagian Galeri komponen) bila bertambah.
