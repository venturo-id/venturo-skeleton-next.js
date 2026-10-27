# Arsitektur

Ringkasan yang dipindah dari `CLAUDE.md` lama. Isinya bisa dibaca dari kode, jadi
tidak dimuat otomatis ke sesi agent; buka file ini bila butuh gambaran besar.
Kontrak API ada di [docs/api](api/README.md), prosedur di [docs/guides](guides/).

## Gambaran umum

Skeleton **company-profile / marketing site** Venturo: Next.js 16 (App Router) +
MUI 9 + TypeScript, berbasis template Zone UI v4.6.0 (Minimals). Di-clone per
client untuk membangun situs marketing. Vertical yang hidup: **home** (landing),
**article** (list + detail), **support** (FAQ), halaman utilitas (error,
coming-soon, maintenance, blank), dan galeri referensi `/components`.

Data datang dari backend Go **marketplace-be** lewat lapisan API di
[src/lib/api/](../src/lib/api/) (ky + zod + TanStack Query). Data contoh di
[src/_mock/](../src/_mock/) hanya mengisi galeri komponen dan beberapa fallback
statis.

Model branch: pekerjaan masuk ke `production`; `template-default-4.6.0` adalah
template upstream murni yang disimpan untuk diff. Distribusi ke project client:
[docs/distribution.md](distribution.md).

## Lapisan page → view → section

Routing memakai App Router di [src/app/](../src/app/). Route group = layout
bersama tanpa menambah segmen URL: `(home)` untuk landing, `(simple)` untuk
halaman utilitas ringkas (coming-soon, maintenance); route lain membawa
`layout.tsx` sendiri.

| File | Peran |
|---|---|
| `src/app/<route>/page.tsx` | Server Component tipis: `metadata` (judul pendek; template root menambah "- Venturo"), fetch data di server, render satu `*View` |
| `src/app/<route>/layout.tsx` | membungkus children dengan `MainLayout` atau `SimpleLayout` |
| `src/sections/<vertical>/view/<nama>-view.tsx` | View `'use client'` yang merangkai halaman dari section; wajib untuk setiap vertical |
| `src/sections/<vertical>/<nama>-section.tsx` | blok presentasional |

Folder section memakai kebab-case (`home`, `article`, `support`, …); satu-satunya
folder berawalan `_` adalah `_examples` (sumber galeri, bukan vertical halaman).

## Aliran data

Tiga mode, dipilih sesuai kebutuhan SEO dan interaktivitas:

| Mode | Kapan | Contoh |
|---|---|---|
| RSC props + fallback statis | konten marketing, SEO penting | home, support: fetch di `page.tsx`, `.catch(() => null)`, section memakai fallback statis |
| Prefetch + `HydrationBoundary` | list interaktif (filter, paginasi) | `/article`: `prefetchQuery` di server + `useQuery` di client ([src/lib/query/](../src/lib/query/)) |
| Pure RSC + ISR | detail per-slug + `generateMetadata` | `/article/[slug]`: export `revalidate`, 404 lewat `notFound()` |

## Lapisan API

[src/lib/api/articles.ts](../src/lib/api/articles.ts) adalah implementasi
rujukan. Rantainya: entri di `endpoints.ts` → schema zod yang divalidasi di fetch
boundary → fetcher lewat `apiFetch` (`client.ts`: envelope di-unwrap, header
`X-Company-Slug`, semua kegagalan jadi `ApiError`) → factory query key → hook
`'use client'` di modul `use-*.ts` terpisah (tidak di-re-export dari barrel).

| Lapisan | Peran |
|---|---|
| ky (`client.ts`) | timeout 10 dtk; retry transport `{ limit: 2, methods: ['get'] }` |
| TanStack Query | retry level query di browser, cache client, `AbortSignal` |
| Next Data Cache | cache server via `next.revalidate` + tag, dibersihkan webhook `POST /api/revalidate/` |
| zod | validasi di fetch boundary |

Endpoint backend yang dipakai dan route handler milik app ini: [docs/api](api/README.md).

## Galeri komponen

Galeri `/components` merender [src/sections/_examples/](../src/sections/_examples/):
contoh pemakaian setiap komponen bersama di [src/components/](../src/components/)
(carousel, animate, field hook-form, image, lightbox, markdown, ikon, dsb.).

Galeri selalu tampil di `yarn dev`; di build production hanya bila
`NEXT_PUBLIC_SHOW_COMPONENTS=true` (deploy client membiarkannya kosong → semua
`/components/*` 404, ditegakkan di [src/middleware.ts](../src/middleware.ts)).
Beberapa dependency hanya dipakai galeri (`yet-another-react-lightbox`,
`react-phone-number-input`, `@mui/lab`, `mui-one-time-password-input`, plugin
embla `fade`/`auto-height`, `@mui/x-date-pickers`); project client yang membuang
galeri boleh ikut membuangnya.

## Theme

[src/theme/](../src/theme/) adalah theme MUI berbasis CSS variables (light/dark
via `colorSchemeSelector: 'data-color-scheme'`): `theme-config.ts` (palette,
font, mode default), `create-theme.ts`, override per komponen di
`core/components/`, dan `theme-overrides.ts` untuk tweak level app yang
diteruskan ke `ThemeProvider`. Rangkaian provider (Query → Localization →
AppRouterCache → Theme → MotionLazy) disusun di
[src/app/layout.tsx](../src/app/layout.tsx).

## Form

react-hook-form + Zod. Wrapper RHF ada di
[src/components/hook-form/](../src/components/hook-form/) (namespace `Field.*`
dan `Form`); helper Zod bersama di `schema-utils.ts`; resolver dari
`@hookform/resolvers/zod`. Contoh: `/components/form-validation` di galeri.

## Folder lain

- [src/layouts/](../src/layouts/) — shell halaman (`main`, `simple`); menu utama di `nav-config-main.tsx`.
- [src/components/](../src/components/) — komponen bersama; tiap folder punya barrel `index.ts`.
- [src/routes/](../src/routes/) — `paths.ts` (semua string URL), hook navigasi, `RouterLink`.
- [src/lib/env.ts](../src/lib/env.ts) — pembaca env tunggal (zod, saat module load); [src/global-config.ts](../src/global-config.ts) mengeksposnya sebagai `CONFIG`.
- [src/lib/seo.ts](../src/lib/seo.ts) — helper JSON-LD (Organization, WebSite, Article, BreadcrumbList).
- [src/locales/](../src/locales/) — i18n dorman (default `id`).

## Build dan deploy

- Dev server dan `yarn start` di port 8002.
- `output: 'standalone'` hanya aktif bila `BUILD_STANDALONE=true` (di-set
  Dockerfile); `yarn build`/`yarn start` biasa tidak terpengaruh.
- Docker production: `docker compose up -d --build`, image standalone multi-stage
  di port 80, env dari `.env.prod`. Detail: [docs/deployment.md](deployment.md).

## Gate kualitas

| Tempat | Yang dijalankan |
|---|---|
| pre-commit (husky) | lint-staged: `eslint --fix --max-warnings 0` + prettier pada file staged |
| commit-msg (husky) | format Conventional Commit + kode issue Space |
| pre-push (husky) | `yarn tsc:check` + `yarn test` |
| GitHub Actions (`pull_request`) | `CLAUDE.md` ≤ 200 baris + `yarn check:all` |
| Jenkins | install → lint → format → typecheck → build |

Detail dan cara menyetel base diff: [docs/guides/quality-gates.md](guides/quality-gates.md).
