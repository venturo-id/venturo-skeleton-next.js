# Klien backend marketplace-be

**Base URL:** `NEXT_PUBLIC_API_URL` (server boleh memakai `API_URL` internal)
**Module:** `src/lib/api/**`
**Last Updated:** 2026-10-27

Endpoint marketplace-be yang dipanggil lapisan `src/lib/api`, bentuk data yang
divalidasi zod di sisi ini, dan cache Next yang dipakai. Kontrak lengkap ada di
repo marketplace-be, `docs/api-contract/marketplace/` (file per resource
disebut di tiap bagian).

## Overview

- Semua request membawa header `X-Company-Slug: <NEXT_PUBLIC_COMPANY_SLUG>`.
- Path relatif tanpa `/` di depan (`endpoints.ts`), supaya prefix path di base
  URL tetap dipakai.
- Response memakai envelope `{ data, message, meta: { pagination? }, errors }`;
  `apiFetch` mengembalikan envelope, fetcher mem-parse `data` dan `meta`.
- Query param kosong (`''`, `null`, `undefined`) tidak dikirim.
- ky: timeout 10 dtk (tidak di-retry); retry transport maks 2x hanya untuk GET,
  pada network error dan status 408, 429, 500, 502, 503, 504 (413 hanya bila
  ada `Retry-After`).

## Pemetaan error (`apiFetch` → `ApiError`)

| Kegagalan | `status` | `message` | `errors` |
|---|---|---|---|
| HTTP non-2xx | status HTTP | `message` dari body envelope, atau pesan ky bila body bukan envelope | `errors` dari body, atau `null` |
| timeout | `0` | `Request timeout: <path>` | `null` |
| network error (DNS, refused, offline) | `0` | `Network error: …` | `null` |
| `NEXT_PUBLIC_API_URL` / `NEXT_PUBLIC_COMPANY_SLUG` kosong | `0` | pesan konfigurasi | `null` |

Abort (pembatalan TanStack Query atau navigasi) diteruskan apa adanya, bukan
`ApiError`.

## GET api/articles

Kontrak: `articles.md`. Fetcher `getArticles`, hook `useArticlesQuery`.

| Param | Default | Keterangan |
|---|---|---|
| `page` | `1` | integer ≥ 1 (`parseArticleListParams` membulatkan ke bawah dan menjepit) |
| `limit` | `12` | `ARTICLES_PER_PAGE` |
| `search`, `category` | — | dikirim bila terisi |

`data`: list artikel, `null` → `[]`. Field wajib `slug`, `title`; `excerpt`,
`author` default `''`; `cover_url`, `category {slug, name}`, `published_at`
boleh `null`. `meta.pagination` (`page`, `limit`, `total`, `total_pages`)
divalidasi; tanpa itu dianggap satu halaman. Cache: `revalidate` 60 dtk, tag
`articles`.

## GET api/articles/{slug}

Kontrak: `articles.md`. Fetcher `getArticle`. Field list artikel + `content`
(HTML belum disanitasi; komponen `Markdown` menyanitasi sebelum render). Cache:
`revalidate` 300 dtk, tag `articles` dan `article:<slug>`. Halaman detail hanya
memetakan `ApiError` status 404 ke `notFound()`.

## GET api/article-categories

Kontrak: `articles.md`. Fetcher `getArticleCategories`, hook
`useArticleCategoriesQuery`. Param `search` opsional. Item: `id`, `slug`,
`name` wajib; `description` default `''`, `sort_order` dan `article_count`
default `0`. Cache: `revalidate` 300 dtk, tag `article-categories`.

## GET api/faq

Kontrak: `faq.md`. Fetcher `getFaqGroups`. Param `locale` (`id` | `en`, default
`id`). `data`: pohon node `{ key, title, items?: [{ q, a }], children? }`;
setiap node daun yang punya item jadi satu grup, urut sesuai pohon. Cache:
`revalidate` 300 dtk, tag `faq`.

## GET api/site-content

Kontrak: `site-content.md`. Fetcher `getSiteContent`, `getWhatsAppLink`. Param
`locale` (default `id`). `data`: map key → nilai JSON bebas, `null` → `{}`.
Key `hubungi-kami` dinormalisasi `toWhatsAppLink`: nomor telepon → link
`wa.me`, URL hanya diterima untuk host WhatsApp, selain itu `null`. Cache:
`revalidate` 300 dtk, tag `site-content`.

**Last Updated:** 2026-10-27 (pemetaan error `apiFetch` → `ApiError`: `message`/`errors` dari `HTTPError.data`, `NetworkError` ky 2 berstatus 0)
