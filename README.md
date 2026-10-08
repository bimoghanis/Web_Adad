# ADAD Esport

Frontend komunitas gaming dengan konsep **ADAD Institute of Questionable Gaming Decisions**.

## Menjalankan

Memerlukan Node.js 20.9+ dan npm.

```sh
npm ci
npm run dev
```

Buka URL lokal yang dicetak Next.js (biasanya http://localhost:3000).

```sh
npm run typecheck
npm run build
```

Build menghasilkan website statis di `out/`. Untuk menguji build statis, jalankan `python3 -m http.server 3000 --directory out`. Karena memakai static export, `next start` tidak digunakan.

## Mengganti data

Semua data berada di **lib/data.ts**:

- `members`: fakta anggota, lore, warna, dan indeks avatar.
- `siteConfig.discordUrl`: isi URL undangan Discord asli; `null` membuat tombol disabled.
- `siteConfig.socials`: tambah `{ label, url }` hanya untuk tautan yang tersedia.
- `clips`: kosong sampai ada clip asli. Setiap entri mempunyai `id`, `title`, `category`, `src`, serta opsional `poster` dan `captions` (WebVTT). `src` harus berupa file MP4/WebM yang dapat diputar browser, bukan URL halaman YouTube. Video tidak autoplay. Gunakan file di `public/clips/` atau URL HTTPS langsung. Tambahkan caption untuk video yang memiliki dialog/audio penting.
- `excuses`, `memos`, `locatorSteps`: copy humor eksperimen.

Kategori clip: `Clutch`, `Fail`, `Absolute Cinema`. Contoh struktur (bukan data asli):

```ts
{ id: 'id-unik', title: 'Judul clip asli', category: 'Clutch', src: '/clips/file-asli.mp4', captions: '/clips/file-asli.vtt' }
```

Filter Valorant menggunakan keberadaan data agent. Filter Mobile Legends menggunakan keberadaan data hero, sehingga saat ini hanya Alwan dan Bimo tampil.

## Struktur

- `app/`: App Router, metadata, CSS dan komposisi halaman server.
- `components/`: Navbar, Hero, SquadSection/MemberCard/MemberModal, GameArena, ClipArchive, BrainrotLab/FahriLocator, Footer.
- `components/modal.tsx`: dialog native dengan focus trap eksplisit, Escape, dan pengembalian fokus.
- `components/brainrot-provider.tsx`: preferensi localStorage dan toast. Pembacaan storage sesudah mount menghindari hydration mismatch; storage yang diblokir tetap aman.
- `public/`: maskot, ekspresi Brainrot, sprite avatar original, favicon.

Next.js App Router, TypeScript, Tailwind CSS v4, Motion for React. Tidak ada login, database, API, upload, autoplay audio, atau pelacakan lokasi. Font Google (Barlow Condensed, DM Sans, IBM Plex Mono) dimuat melalui CSS dengan fallback lokal. Semua visual avatar adalah karakter fiksi, bukan foto anggota.

Arsip sengaja kosong; rank MLBB, data pertandingan, status online, dan tautan sosial tidak dibuat-buat. Fahri Locator hanya urutan animasi lokal. Stat ngaco dan lore diberi label terpisah dari fakta.
