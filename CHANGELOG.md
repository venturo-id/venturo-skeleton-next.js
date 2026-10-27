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
  dengan test untuk `getArticles`, `parseArticleListParams`, `articleKeys`,
  `toWhatsAppLink`, hook `useArticlesQuery`, dan route `POST /api/revalidate/`.
- `yarn check:changelog` dan `yarn check:doc-sync` (`scripts/check-changelog.sh`,
  `scripts/check-doc-sync.sh`); `yarn check:all` menjalankan seluruh gate seperti CI.
- `.husky/commit-msg`: format Conventional Commit dan kode issue Space `[KODE-123]`, sama dengan
  gate review Kinerja.
- CI GitHub Actions (`.github/workflows/ci.yml`) di setiap pull request ke `production`: batas
  200 baris `CLAUDE.md` dan `yarn check:all`.
- Dokumen kontrak `docs/api/` (`route-handlers.md`, `backend-client.md`) dan template pull request.

### Changed

- lint-staged menjalankan `eslint --fix --max-warnings 0` + prettier pada semua file JS/TS yang
  di-stage (sebelumnya hanya `src/`, tanpa batas warning).
- `.husky/pre-push` menjalankan `yarn test` setelah `yarn tsc:check`.
