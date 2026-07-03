# Venturo Skeleton — Next.js

Skeleton company-profile/marketing site milik Venturo. Basis: Zone UI v4.6.0 (Minimals) — Next.js 16 + MUI 9 + TypeScript, terhubung ke backend Go (marketplace-be) via ky + TanStack Query.

Model branch: kerjakan project client dari branch `production`; branch `template-default-4.6.0` adalah template murni untuk diff/update upstream.

## Prerequisites

- Node.js >= 22.12
- Yarn 1.22 (satu-satunya package manager — jangan pakai npm)
- Backend `marketplace-be` berjalan (default `http://localhost:8080`)

## Quick start

```sh
cp .env.example .env   # lalu isi variabelnya — lihat komentar di dalam file
yarn install
yarn dev               # http://localhost:8002
```

## Commands

```sh
yarn dev          # dev server (port 8002)
yarn build        # production build
yarn start        # serve production build (port 8002)

yarn tsc:check    # type-check (tidak ada test runner; ini gate utama)
yarn lint         # eslint
yarn fix:all      # lint:fix + prettier — jalankan sebelum commit
```

## Arsitektur

Pola berlapis `page → view → section` dan konvensi lainnya terdokumentasi di [CLAUDE.md](CLAUDE.md). Lapisan API (fetcher + zod + query keys) ada di `src/lib/api` — jadikan modul `articles.ts` sebagai referensi pola saat menambah endpoint baru.

## Dokumentasi tim

| Dokumen | Isi |
|---|---|
| [docs/recipes/add-a-page.md](docs/recipes/add-a-page.md) | Langkah menambah halaman: paths → section → view → layout → page → nav → sitemap |
| [docs/recipes/add-an-api-endpoint.md](docs/recipes/add-an-api-endpoint.md) | Menambah endpoint API meniru pola `articles.ts` + idiom fallback |
| [docs/branding.md](docs/branding.md) | Checklist branding per-client: logo, palette, font, konten, env |
| [docs/deployment.md](docs/deployment.md) | Env production, Docker (port 80, `.env.prod`), k8s, Jenkins, checklist pasca-deploy |
| [docs/distribution.md](docs/distribution.md) | Model distribusi: template repo, remote `skeleton`, alur cherry-pick perbaikan |
