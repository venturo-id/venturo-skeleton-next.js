# Kontrak API

Dua permukaan API di repo ini, masing-masing satu dokumen. Perubahan kode di
kolom kiri wajib membawa dokumennya di PR yang sama, dengan baris
`**Last Updated:**` baru (dicek `yarn check:doc-sync`; aturan format di
`.claude/rules/api-docs.md`).

| Kode | Dokumen | Isi |
|---|---|---|
| `src/app/**/route.ts`, `src/pages/api/**` | [route-handlers.md](route-handlers.md) | endpoint yang disajikan app Next.js ini |
| `src/lib/api/**` | [backend-client.md](backend-client.md) | endpoint marketplace-be yang dipanggil, schema yang divalidasi, cache, dan pemetaan error |

Sumber kebenaran kontrak backend tetap repo **marketplace-be**
(`docs/api-contract/`); `backend-client.md` mencatat bagian yang dipakai dan
divalidasi di sisi ini.
