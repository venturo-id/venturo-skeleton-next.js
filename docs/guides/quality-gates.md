# Panduan: gate kualitas dan review Kinerja

Setiap PR dinilai otomatis oleh code review Kinerja (kinerja.venturo.id). Gate di
repo ini menangkap sebagian besar temuannya sebelum push.

## Sekali per clone

1. `yarn install` — `prepare` memasang hook husky (`.husky/`).
2. Bila remote belum punya `origin/HEAD` atau branch tujuan PR bukan
   `production`, set base diff sekali:

   ```sh
   git config kinerja.base origin/<branch-tujuan>
   ```

   Urutan base yang dipakai `scripts/changed-files.sh` (dan plugin
   `venturo-kinerja`): argumen / `$BASE`, `git config kinerja.base`,
   `origin/HEAD`, lalu `origin/production`.

## Hook

| Hook | Isi |
|---|---|
| pre-commit | `lint-staged`: `eslint --fix --max-warnings 0` + `prettier --write` pada file JS/TS yang di-stage |
| commit-msg | subject `type(scope)?!?: deskripsi` + kode issue Space `[KODE-123]` (regex sama dengan gate Kinerja) |
| pre-push | `yarn tsc:check` + `yarn test` |

## Ambang ESLint dan backlog

Rule ambang di `eslint.config.mjs` (`kinerjaConfig`) berlevel `warn`:

- `yarn lint` (seluruh `src/`) tetap lulus walau kode lama punya pelanggaran
  (backlog); warning-nya terlihat di output.
- `yarn lint:changed` dan pre-commit memakai `--max-warnings 0`: file yang
  berubah harus bersih dari SEMUA warning, termasuk pelanggaran lama di file itu.

`yarn lint:changed` hanya membaca file yang berubah sejak merge-base dengan base
diff (commit + staged + unstaged + untracked), jadi hasilnya sama sebelum dan
sesudah commit. Base lain untuk sekali jalan: `yarn lint:changed origin/develop`.

## CHANGELOG dan dokumen kontrak

- `yarn check:changelog`: perubahan `src/**` atau `next.config.*` (selain
  `*.test.*`, `*.spec.*`, dan `src/test/`) wajib membawa `CHANGELOG.md` dengan
  bagian `## [Unreleased]`.
- `yarn check:doc-sync`: `src/app/**/route.ts` / `src/pages/api/**` →
  `docs/api/route-handlers.md`; `src/lib/api/**` → `docs/api/backend-client.md`;
  dokumen kontrak yang berubah wajib membawa baris `**Last Updated:**` baru.
  Refactor murni yang tidak mengubah kontrak: `DOC_SYNC_SKIP=1 yarn check:doc-sync`
  (di CI: label PR `no-doc-change`).

## CI

`.github/workflows/ci.yml` berjalan di setiap pull request ke `production`:
`CLAUDE.md` ≤ 200 baris, lalu `yarn check:all` (lint file berubah, prettier,
`tsc --noEmit`, vitest, CHANGELOG, doc-sync) dengan base `origin/<branch-tujuan>`.
`Jenkinsfile` tetap menjalankan install → lint → format → typecheck → build.

## Sebelum membuka PR

```sh
yarn check:all
```

Dengan plugin `venturo-kinerja` aktif (`.claude/settings.json`), perkiraan skor
diff bisa dilihat lewat `/venturo-kinerja-precheck` di Claude Code.

Deskripsi PR mengikuti `.github/pull_request_template.md` dan ditulis sebelum
push pertama.
