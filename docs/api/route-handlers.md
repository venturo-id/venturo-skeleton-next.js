# Route handler

**Base URL:** origin situs (`NEXT_PUBLIC_SITE_URL`)
**Module:** `src/app/**/route.ts`, `src/pages/api/**`
**Last Updated:** 2026-10-27

Endpoint yang disajikan app Next.js ini sendiri. `trailingSlash: true` berlaku
global: path tanpa slash akhir di-redirect 308, jadi pemanggil wajib memakai
slash akhir.

## Overview

| Method | Path | Kode |
|---|---|---|
| POST | `/api/revalidate/` | `src/app/api/revalidate/route.ts` |

## POST /api/revalidate/

Webhook invalidasi ISR on-demand, dipanggil backend/CMS saat konten berubah.

**Auth:** `Authorization: Bearer <REVALIDATE_TOKEN>` (env server-only, minimal
16 karakter). Tanpa `REVALIDATE_TOKEN` endpoint nonaktif.

**Body** (`application/json`), minimal salah satu field terisi:

| Field | Tipe | Keterangan |
|---|---|---|
| `tags` | `string[]` | cache tag yang dikenal: `articles`, `article-categories`, `faq`, `site-content` |
| `slugs` | `string[]` | slug artikel; masing-masing jadi tag `article:<slug>` |

**Response 200**

```json
{ "revalidated": ["articles", "article:contoh-artikel"], "now": 1793066400000 }
```

**Error**

| Status | Kapan | Body |
|---|---|---|
| 400 | body bukan JSON, atau `tags` dan `slugs` sama-sama kosong | `{ "error": "Body tidak valid.", "issues": [...] }` |
| 400 | ada tag di luar daftar | `{ "error": "Tag tidak dikenal: …", "allowed": [...] }` |
| 401 | header `Authorization` tidak cocok | `{ "error": "Unauthorized." }` |
| 503 | `REVALIDATE_TOKEN` tidak dikonfigurasi | `{ "error": "REVALIDATE_TOKEN tidak dikonfigurasi — endpoint nonaktif." }` |

Setiap tag di-purge dengan `revalidateTag(tag, 'max')`.

**Last Updated:** 2026-10-27 (dokumen awal: POST /api/revalidate/)
