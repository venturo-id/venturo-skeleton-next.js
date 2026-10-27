---
paths:
  - "docs/api/**"
---

# Dokumen kontrak API

- Dua dokumen: `route-handlers.md` (endpoint app ini) dan `backend-client.md`
  (endpoint marketplace-be yang dipanggil `src/lib/api`). Endpoint baru masuk
  ke dokumen yang sesuai, bukan file baru, kecuali tabel di `README.md` ikut
  diperbarui.
- Kepala file: `**Base URL:**`, `**Module:**`, `**Last Updated:** YYYY-MM-DD`.
- Penanda last-updated ada dua dan keduanya diupdate di setiap perubahan isi:
  - baris kepala `**Last Updated:** YYYY-MM-DD` (tanggal saja);
  - baris penutup `**Last Updated:** YYYY-MM-DD (<ringkasan perubahan>)`.
  `yarn check:doc-sync` menolak dokumen yang berubah tanpa baris
  `**Last Updated:**` baru.
- Perubahan yang mengubah perilaku pemanggil ditulis sebagai bagian
  `## ⚠️ Breaking Change (YYYY-MM-DD) — <judul>` atau
  `## ⚠️ Behaviour Change (YYYY-MM-DD) — <judul>` di atas `## Overview`,
  terbaru di atas.
- Field, default, dan status yang ditulis harus sama dengan schema zod dan
  kode di diff; contoh memakai data fiktif.
