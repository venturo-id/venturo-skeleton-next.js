# Deploy Notes — venturo.id static mirror

Upload **seluruh** folder `venturo.id/` (termasuk `_assets`, `_components`, `_json`, `_runtimes`, `_woff`, semua folder halaman, `.htaccess`/`_redirects`/`vercel.json`).

## Config redirect per host (sudah disiapkan)

| Host | File | Aktif otomatis? |
|---|---|---|
| Apache / cPanel / shared hosting | `.htaccess` | ✅ otomatis |
| Netlify | `_redirects` | ✅ otomatis |
| Vercel | `vercel.json` | ✅ otomatis |
| Nginx | lihat snippet di bawah | ⚠️ paste manual ke server block |

Pakai **satu** sesuai host. File lain diabaikan host yang tak relevan (aman dibiarkan).

## Nginx (paste ke server block)

```nginx
server {
    listen 443 ssl;
    server_name venturo.id;
    root /var/www/venturo.id;
    index index.html;

    # 301 index.html -> /
    location = /index.html { return 301 /; }

    # 301 dead URL
    location = /professional-programmer-kota-malang { return 301 /; }
    location = /professional-programmer-kota-malang/ { return 301 /; }

    # clean URLs: /slug -> /slug/index.html
    location / {
        try_files $uri $uri/ $uri/index.html =404;
    }

    # cache aset immutable
    location /_assets/ {
        add_header Cache-Control "public, max-age=31536000, immutable";
    }
    location ~* \.html$ {
        add_header Cache-Control "no-cache";
    }
}
```

## Redirect yang dipasang
- `301 /index.html -> /` (hindari duplicate content)
- `301 /professional-programmer-kota-malang -> /` (URL mati pernah terindeks)
- Force HTTPS (Apache/nginx)
- Clean URL: `/slug` serve `/slug/index.html`
- Cache: aset hash immutable 1 thn, HTML no-cache

## Setelah deploy (manual, sekali)
1. Submit `https://venturo.id/sitemap.xml` ke Google Search Console.
2. Cek redirect: buka `venturo.id/index.html` → harus loncat ke `venturo.id/`.
3. Tes schema: Rich Results Test untuk homepage + 1 sub-page.
4. (Opsional) aktifkan prerender/SSR di level CDN kalau mau konten tampil tanpa JS.
5. **Verifikasi 404 `_json`**: buka DevTools → Network di homepage + landing pages. Pastikan
   `/_json/fca6c840-.../*.json` (terutama `it-outsourcing-terbaik.json` ~3.3MB &
   `it-outsourcing-jakarta.json`) balik `200`, bukan `404`. Di ngrok-free file gede ini
   404 (tunnel choke); di server proper harusnya `200` (file ada, lokal serve `200`).
   Kalau masih 404 di prod → cek limit ukuran response / timeout host.

## Enhancement scripts (hand-written, di-inject tiap halaman)
Selain `_leadgen.js` / `_seo-altfix.js` / `_video-facade.js` / `_video-fit.js`:
- **`_console-quiet.js`** — di-load **sinkron paling atas di `<head>`** (sebelum runtime module),
  jadi wrapper `console.error/warn` terpasang sebelum runtime nge-log. Meredam noise yang
  diketahui-harmless: hydration `[Hydration Error]` / `Minified React error #425` (cascade
  stack raksasa dari 1 mismatch), `Error cleaning CSS rules`, `Node cannot be found`.
  Filter pakai all-list substring — error BARU lain tetap lewat. **Tidak** meredam 404 network,
  srcset warning, atau pesan ekstensi browser (browser-native, bukan via console API).
  Penyebab #425 = sifat mirror statis Figma (HTML capture ≠ render ulang runtime); kosmetik,
  bukan penalti SEO. Stub `_cms/_index.json` BUKAN penyebab (runtime skip fetch CMS karena
  tak ada node `cmsCollectionBindingProperties`).

## SEO on-page (status terakhir)
- `<meta name="description">` ada di **semua 10 halaman** (135–158 char). Diambil dari
  `og:description`; konsisten dengan `og`/`twitter` description.
- `og:title` 4 halaman (partnership/portfolio/profile/ratecard-compro) sebelumnya stale
  ("Company Profile Venturo") → sudah disamakan ke `<title>` masing-masing.
- Alt text: `_seo-altfix.js` map 38 slug + **15 hash konten landing-page** (foto tim proyek,
  dashboard ML PLN, portfolio apps, diagram outsourcing, dll). Slug image dipakai homepage;
  landing page pakai filename hash → alt by-hash. Tambah alt baru: keyed by sha1 di `ALT{}`.
- H1 "ganda" = **non-issue by design**: 2 H1 Figma identik (varian responsive, 1 hidden CSS,
  same keyword) + 1 H1 di dalam `<noscript>` (diabaikan Googlebot JS-on). Tidak diedit
  (butuh `_json`, bakal ketimpa).
