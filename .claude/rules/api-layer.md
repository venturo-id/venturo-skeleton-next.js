---
paths:
  - "src/lib/api/**"
  - "src/lib/query/**"
---

# Lapisan API (`src/lib/api`)

- `articles.ts` adalah rujukan; endpoint baru meniru bentuknya:
  `endpoints.ts` → schema zod → fetcher via `apiFetch` → query keys → hook di
  `use-<nama>.ts`. Langkah lengkap: `docs/guides/add-an-api-endpoint.md`.
- Path di `endpoints.ts` relatif tanpa `/` di depan; segmen dinamis lewat
  `encodeURIComponent`.
- `apiFetch<unknown>` lalu `schema.parse(data)`; field identitas wajib, sisanya
  toleran dengan default aman. List dari Go bisa `null`: pakai `nullableList()`.
  `meta.pagination` di-parse `apiPaginationSchema`.
- Fetcher server menyetel `next: { revalidate, tags }` eksplisit (fetch Next
  16 tidak di-cache tanpa itu); tag baru juga masuk `ALLOWED_TAGS` di
  `src/app/api/revalidate/route.ts`.
- Fetcher yang dipakai TanStack menerima `signal` dan meneruskannya ke
  `apiFetch` (`queryFn: ({ signal }) => getX(..., { signal })`).
- Query key menyerialkan SETIAP filter yang ikut request (termasuk `limit`),
  dan tinggal di modul server-safe, bukan file `'use client'`.
- Modul `use-*.ts` (`'use client'`) tidak di-re-export dari `index.ts`: barrel
  di-import Server Component.
- Satu kelas error untuk pemanggil: `ApiError` (lihat `toApiError` di
  `client.ts`). Retry: ky di transport (GET saja), TanStack di level query —
  jangan menambah retry untuk method non-idempoten.
- Setiap perubahan di folder ini memperbarui `docs/api/backend-client.md`
  (dicek `yarn check:doc-sync`) dan menambah/menyesuaikan test di sebelah
  modulnya (`*.test.ts`, fetch di-stub `src/test/fetch-mock.ts`).
