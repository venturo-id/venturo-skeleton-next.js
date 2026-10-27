# CLAUDE.md

Arsitektur: `docs/architecture.md`; kontrak API: `docs/api/`; prosedur: `docs/guides/` (dibaca bila perlu).
Aturan per folder (halaman/section, SEO, lapisan API, route handler, test, dokumen API, theme, galeri) dimuat dari `.claude/rules/`.

## Perintah

```sh
yarn dev               # dev server, port 8002
yarn build             # production build (butuh .env valid)
yarn test              # vitest run (jsdom; *.test.ts(x) di sebelah kodenya)
yarn lint:changed      # eslint --max-warnings 0, hanya file yang berubah sejak BASE
yarn tsc:check         # tsc --noEmit
yarn check:all         # lint:changed + fm:check + tsc:check + test + check:changelog + check:doc-sync (sama dengan CI)
yarn fix:all           # eslint --fix + prettier di src/
```

`BASE` = argumen atau `$BASE`, lalu `git config kinerja.base`, lalu `origin/HEAD`, lalu `origin/production`;
di project turunan set sekali: `git config kinerja.base origin/<branch-tujuan>`. Hook husky terpasang saat
`yarn install`. Detail gate: `docs/guides/quality-gates.md`.

## Konvensi yang berbeda dari kebiasaan

- Yarn 1 satu-satunya package manager (`packageManager: yarn@1.22.22`); `package-lock.json` tidak di-commit.
- Import internal absolut `src/...` (`baseUrl: "."`). Urutan import diatur `perfectionist` berdasarkan
  panjang baris — biarkan `yarn fix:all` yang mengurutkan.
- URL tidak di-hardcode: pakai `paths.*` (`src/routes/paths.ts`; route dinamis berupa fungsi). Navigasi lewat
  `src/routes/hooks` dan `RouterLink`, bukan `next/navigation` / `next/link` langsung.
- `paths.*` tanpa slash akhir; URL untuk crawler (canonical, sitemap, JSON-LD) dibentuk dengan `pathWithSlash()`.
- Env hanya dibaca di `src/lib/env.ts` dan dikonsumsi lewat `CONFIG` (`src/global-config.ts`).
  Pengecualian: `src/middleware.ts` (bundle sendiri).
- Data backend selalu lewat `src/lib/api`; `src/_mock` hanya untuk galeri dan fallback statis.
- SVG di-import sebagai komponen React (`@svgr/webpack`). Nama file kebab-case; folder komponen punya barrel `index.ts`.

## Gotcha

- `src/lib/env.ts` melempar error saat module dimuat bila env wajib hilang: `yarn dev`/`build` butuh `.env`
  (salin `.env.example`); test memakai nilai di `vitest.config.mts`.
- `NEXT_PUBLIC_*` di-inline saat build: mengubahnya butuh rebuild (termasuk image Docker), bukan restart.
  `NEXT_PUBLIC_SITE_URL` wajib untuk build production.
- `trailingSlash: true`: path tanpa slash akhir di-redirect 308 — webhook dipanggil `POST /api/revalidate/`.
- Galeri `/components` di-gate di `src/middleware.ts`, bukan `notFound()` di layout: halamannya di-prerender statis.
- ky 2 sudah membaca body error ke `HTTPError.data` (`error.response.json()` gagal) dan membungkus kegagalan
  jaringan jadi `NetworkError`; pemetaannya ke `ApiError` ada di `toApiError` (`src/lib/api/client.ts`).
- Rule ambang ESLint berlevel `warn` supaya `yarn lint` seluruh repo tidak gagal karena backlog. Yang memblokir
  adalah `--max-warnings 0` pada file yang berubah: menyentuh file lama berarti membersihkan semua warning-nya.
- `max-lines-per-function` juga menghitung callback `describe`/`it` di test.

## Larangan keras

- Tidak ada rahasia di file yang di-commit (`.env*` selain `.env.example` di-gitignore). Token server
  (`REVALIDATE_TOKEN`, `API_URL`) tidak pernah diberi prefiks `NEXT_PUBLIC_`.
- Data eksternal (response backend, body request) tidak di-`as`-cast: bentuknya dibuktikan zod `parse`/`safeParse`.
- `dangerouslySetInnerHTML` hanya untuk HTML yang sudah disanitasi (komponen `Markdown`, isomorphic-dompurify).
- `eslint-disable` wajib menyebut rule dan alasannya (`// eslint-disable-next-line max-params -- alasan`).
- `--no-verify` tidak dipakai untuk melewati lint atau test.
- Tidak push ke branch PR setelah PR di-approve (dihitung pelanggaran, tidak direview).

## Standar review Kinerja

PR dinilai otomatis di kinerja.venturo.id; `yarn check:all` dan hook husky menegakkan sebagian besar.

- Struktur (−10 per temuan): fungsi ≤50 baris dari signature sampai penutup termasuk baris kosong dan komentar
  (komponen React ikut); kompleksitas ≤10; nesting ≤4; parameter ≤5 (satu objek destructuring = 1); file ≤800
  baris, file komponen `.tsx`/`.jsx` ≤300; tanpa duplikasi; tanpa magic value di logika (literal di test,
  config, `src/_mock`, `src/theme` dikecualikan); tanpa kode mati. Semua dicek `yarn lint:changed`.
- React/TS: tanpa `any` (pakai `unknown` lalu narrow); props bertipe eksplisit; dependency `useEffect` lengkap
  dan ada cleanup; `key` unik (bukan index untuk list dinamis); string literal union, bukan `enum`;
  tanpa `console.log` (`console.error` boleh); gambar punya `alt`.
- Setiap fungsi yang diubah punya test; custom hook dan util wajib unit test (`.claude/rules/tests.md`).
- Doc sync (10 poin, biner): perubahan `src/app/**/route.ts`, `src/pages/api/**`, atau `src/lib/api/**`
  membawa `docs/api/` di PR yang sama (`yarn check:doc-sync`). Setiap perubahan kode aplikasi non-test =
  entri `CHANGELOG.md` bagian `## [Unreleased]` (`yarn check:changelog`).
- Commit: subject `type(scope)?!?: deskripsi` (type `build|chore|ci|docs|feat|fix|perf|refactor|revert|style|test`)
  dan kode issue Space `[KODE-123]` di setiap commit; tanpa itu PR tidak dinilai (hook `commit-msg`).
- Deskripsi PR ditulis sebelum push pertama (mengedit deskripsi tidak memicu review ulang) dan hanya berisi
  fakta yang ada di diff.

## Delegasi sub-agent

Batas umum: sub-agent tidak commit, push, atau membuat PR; hasilnya diperiksa agent utama.

1. **Eksplorasi sebelum mengubah kode** — agent `Explore`
   - Pemicu: akan mengubah komponen, hook, fetcher, schema, atau util yang dipakai di luar file itu.
   - Input: path file + nama simbol yang akan diubah; scope `src/`, `docs/api/`.
   - Output: daftar `path:line` pemakai, test yang menutupinya, dan dokumen kontrak terkait — satu baris per item, maks 30 baris.
   - Batas: read-only; maks 4 paralel (satu per file atau vertical).
2. **Rencana perubahan besar** — agent `Plan`
   - Pemicu: perubahan menyentuh lebih dari 3 file, lebih dari satu vertical, atau `src/lib/api`/`src/app/layout.tsx`.
   - Input: tujuan issue Space, hasil eksplorasi, file `.claude/rules/` yang berlaku.
   - Output: langkah bernomor; tiap langkah menyebut file, test yang ditambah, dan dokumen yang diupdate.
   - Batas: read-only; 1 agent.
3. **Verifikasi calon temuan** — agent `general-purpose`
   - Pemicu: ada temuan dari review, lint, atau agent lain yang belum terbukti.
   - Input: satu temuan (kategori, `path:line`, klaim); scope file itu dan pemakainya.
   - Output: `CONFIRMED` / `REJECTED` + bukti `path:line` + alasan maks 2 kalimat.
   - Batas: read-only (boleh menjalankan `yarn test` dan `yarn lint:changed`); maks 3 paralel.
4. **Review diff sebelum PR** — agent `general-purpose`
   - Pemicu: sebelum push pertama atau sebelum membuka PR.
   - Input: output `git diff <BASE>...HEAD`, bagian "Standar review Kinerja" di atas, dan rules yang berlaku untuk file di diff.
   - Output: daftar `[severity] kategori path:line — ringkasan` maks 15 butir, atau `bersih`.
   - Batas: read-only; 1 agent.
5. **Sinkron dokumen setelah API berubah** — agent `general-purpose`
   - Pemicu: `yarn check:doc-sync` atau `yarn check:changelog` gagal.
   - Input: diff `src/app/**/route.ts` / `src/lib/api/**`; scope hanya `docs/api/` dan `CHANGELOG.md`.
   - Output: daftar file dokumen yang diubah + satu kalimat per file.
   - Batas: boleh edit hanya file di scope itu; 1 agent.
