---
paths:
  - "src/app/**"
  - "src/lib/seo.ts"
  - "src/sections/**/*hero*"
---

# SEO

- Root layout memegang title template (`%s - Venturo`), description default,
  default OG/Twitter, dan `opengraph-image.png`/`twitter-image.png`. Halaman
  hanya mengekspor judul pendek.
- `openGraph` di level halaman MENGGANTI seluruh objek openGraph root
  (termasuk og:image): bila ditulis, tulis lengkap (lihat
  `src/app/(home)/page.tsx`).
- Konten above-the-fold/LCP harus terlihat di HTML SSR: tanpa animasi masuk
  pada H1/CTA hero; gambar hero memakai `visibleByDefault` +
  `slotProps={{ img: { fetchPriority: 'high' } }}` (lihat
  `src/sections/home/home-hero.tsx`).
- URL untuk crawler (canonical, sitemap, JSON-LD) berakhiran `/`:
  `${CONFIG.siteUrl}${pathWithSlash(paths.x)}`.
- Halaman publik yang boleh diindex didaftarkan di `src/app/sitemap.ts`;
  halaman utilitas/error memakai `robots: { index: false }`.
- JSON-LD lewat helper `src/lib/seo.ts`.
