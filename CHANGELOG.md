# Changelog

Semua perubahan penting di repo ini dicatat di sini. Formatnya mengikuti
[Keep a Changelog](https://keepachangelog.com/en/1.1.0/). Setiap PR yang mengubah
kode aplikasi (`src/**` atau `next.config.*`, selain test) menambah entri di
`## [Unreleased]` (dicek `yarn check:changelog`).

## [Unreleased]

### Added

- Ambang review Kinerja di `eslint.config.mjs` (level `warn`): `max-lines-per-function` 50
  (baris kosong dan komentar ikut dihitung), `complexity` 10, `max-depth` 4, `max-params` 5,
  `max-lines` 800 (300 untuk `.tsx`/`.jsx`), `@typescript-eslint/no-magic-numbers` (test, config,
  `src/_mock`, `src/theme` dikecualikan), `sonarjs/no-identical-functions`,
  `sonarjs/no-duplicate-string`, `@typescript-eslint/no-explicit-any`, `no-console`.
- `yarn lint:changed` (`scripts/lint-changed.sh`): ESLint `--max-warnings 0` pada file yang
  berubah sejak merge-base. Base diff dari `$BASE`, `git config kinerja.base`, `origin/HEAD`, lalu
  `origin/production` (`scripts/changed-files.sh`).
- Test runner vitest + Testing Library + jsdom (`vitest.config.mts`, `yarn test`, `yarn test:watch`)
  dengan test untuk `apiFetch`, `getArticles`, `parseArticleListParams`, `articleKeys`,
  `toWhatsAppLink`, hook `useArticlesQuery`, dan route `POST /api/revalidate/`.
- `yarn check:changelog` dan `yarn check:doc-sync` (`scripts/check-changelog.sh`,
  `scripts/check-doc-sync.sh`); `yarn check:all` menjalankan seluruh gate seperti CI.
- `.husky/commit-msg`: format Conventional Commit dan kode issue Space `[KODE-123]`, sama dengan
  gate review Kinerja.
- CI GitHub Actions (`.github/workflows/ci.yml`) di setiap pull request ke `production`: batas
  200 baris `CLAUDE.md` dan `yarn check:all`.
- Dokumen kontrak `docs/api/` (`route-handlers.md`, `backend-client.md`) dan template pull request.
- `docs/architecture.md`, `docs/guides/quality-gates.md`, dan `.claude/rules/` per folder.
- `.claude/settings.json` dengan marketplace `venturo-tools` serta plugin `venturo-kinerja` dan
  mod `venturo-kinerja-hud`; `.claude/venturo-kinerja.json` (`"mode": "enforce"`).

### Changed

- lint-staged menjalankan `eslint --fix --max-warnings 0` + prettier pada semua file JS/TS yang
  di-stage (sebelumnya hanya `src/`, tanpa batas warning).
- `.husky/pre-push` menjalankan `yarn test` setelah `yarn tsc:check`.
- `CLAUDE.md` ditulis ulang (100 → 107 baris, bahasa Indonesia): perintah, konvensi, gotcha,
  larangan, standar review Kinerja, dan delegasi sub-agent. Isi arsitektur pindah ke
  `docs/architecture.md`, aturan per folder ke `.claude/rules/`.
- `docs/recipes/` dipindah ke `docs/guides/`; resep halaman dan endpoint menyebut test,
  dokumen kontrak, dan CHANGELOG.

### Fixed

- `apiFetch` memetakan semua kegagalan ky 2 ke `ApiError`: `message` dan `errors` dibaca
  dari `HTTPError.data` (body error sudah dikonsumsi ky, sehingga sebelumnya selalu jatuh ke pesan
  generik ky dan `errors: null`), dan `NetworkError` menjadi `ApiError` status 0 (sebelumnya lolos
  sebagai `NetworkError`).
