# Venturo Skeleton Next.js

Template dasar (skeleton) proyek **Next.js** untuk Venturo. Repo ini menjadi titik awal pengembangan aplikasi baru agar struktur, konvensi, dan tooling konsisten antar proyek.

> Template version: **default-4.6.0**

## Prasyarat

- [Node.js](https://nodejs.org/) 18 LTS atau lebih baru
- Package manager: `npm`, `pnpm`, atau `yarn`

## Memulai

```bash
# install dependency
npm install

# jalankan development server
npm run dev
```

Buka [http://localhost:3000](http://localhost:3000) di browser.

## Script

| Perintah        | Keterangan                          |
| --------------- | ----------------------------------- |
| `npm run dev`   | Menjalankan server development      |
| `npm run build` | Build aplikasi untuk production     |
| `npm run start` | Menjalankan hasil build production  |
| `npm run lint`  | Menjalankan linter                  |

## Struktur Proyek

```
.
├── app/            # routing & halaman (App Router)
├── components/     # komponen UI reusable
├── lib/            # helper, util, dan konfigurasi
├── public/         # aset statis
└── README.md
```

## Konfigurasi Environment

Salin `.env.example` menjadi `.env.local` lalu sesuaikan nilainya:

```bash
cp .env.example .env.local
```

## Deployment

Aplikasi di-deploy melalui pipeline Venturo (Jenkins + Kubernetes). Pastikan build lulus sebelum push ke branch rilis.

## Lisensi

Internal — Venturo.
