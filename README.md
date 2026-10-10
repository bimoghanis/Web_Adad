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

## Lab v.02

Empat eksperimen tambahan di `components/advanced-lab.tsx`: kuis empat pertanyaan dengan sertifikat dan salin hasil, roulette strategi dua game, simulator komunikasi tiga skenario, serta Sidang Baper Alwan dengan meter interaktif. Kamus anti tanggung jawab dapat dibuka/tutup. Semua copy dan skenario terpusat di `lib/data.ts` (`quizQuestions`, `quizVerdicts`, `questionablePlans`, `commsScenarios`, `baperVerdicts`, `academicDictionary`). Semua dialog adalah fiksi; meter bukan penilaian emosi nyata. Tidak mengakses mikrofon atau server.

Pintasan di awal laboratorium menuju ketujuh eksperimen. Kuis mendukung kembali ke soal sebelumnya; roulette menyediakan salin strategi; simulasi chat dapat dijeda, dilanjutkan, ditampilkan sekaligus, atau diulang. Hasil eksperimen direset saat halaman dimuat ulang; hanya preferensi Brainrot Mode yang disimpan.

## Operasi: Takhta Tuan Alwan (ADAD Arcade)

Buka `/operasi-alwan/`. Campaign berisi **6 wilayah × 5 misi = 30 misi**, lima mekanik puzzle (memori, urutan, lights-out, deduksi sandi, labirin), enam artefak lore, dan final penobatan tiga dekret. Target desain eksplorasi pertama **45–60 menit**, bukan durasi yang dijamin atau pengukuran playtest manusia. Tidak ada timer paksa, pembayaran, mikrofon, atau API.

- `lib/campaign.ts`: konten wilayah, misi, artefak, ending, generator puzzle deterministik, validasi save, dan aturan progres.
- `components/campaign/games.tsx`: lima mesin permainan. Tersedia kontrol keyboard/tap dan petunjuk. Puzzle jaringan dibuat dengan mengacak papan yang sudah solved sehingga tetap solvable; labirin dibuat sebagai jaringan yang terhubung.
- `components/campaign/campaign.tsx`: peta, unlock, checkpoint, hadiah, altar, museum, dan finale.
- `app/operasi-alwan/campaign.css`: tema arcade dan efek kampanye.
- `components/arcade-portal.tsx`, `components/brainrot-fx.tsx`: pintu masuk campaign dan animasi Brainrot tambahan di markas.

Checkpoint disimpan di localStorage `adad-campaign-v1` setiap misi selesai. Menutup puzzle aktif mengulang puzzle itu saja. Browser/perangkat berbeda memiliki progres berbeda. Save yang rusak dipulihkan ke awal; penyimpanan yang diblokir menampilkan peringatan di HUD. Reset progres memerlukan konfirmasi di aplikasi dan tidak menghapus data lain.

Setiap misi memberi 100 aura, atau 75 jika menggunakan petunjuk yang mengungkap solusi. Replay mempertahankan hasil terbaik tanpa menggandakan aura; memperbaiki hasil assisted ke tanpa petunjuk menambah selisihnya. Finale memberi 500 aura satu kali. Altar pujian dan efek “RESTU +1000” hanyalah lore, bukan hadiah skor.

Pilihan efek LEBAY/TENANG tersimpan. `prefers-reduced-motion` selalu diprioritaskan, ritual segel menggunakan urutan statis dalam mode tenang. Tidak ada flashing atau audio otomatis.

### Tes mesin campaign

Menggunakan Node.js 22.18+ (atau Node.js 24/26):

```sh
node --test tests/campaign.test.mjs
npm run typecheck
npm run build
```

Tes mencakup semua seed puzzle jaringan/labirin, pasangan memori, urutan, feedback sandi, unlock per wilayah, save/load, skor, serta pemulihan penyimpanan invalid.

## Expansion 02 — Laboratorium Restu 3D

Tersedia di beranda dan `/operasi-alwan/#holo-lab`.
- Hologram kubus CSS 3D dengan enam sisi, orbit, grid perspektif, rotasi otomatis, drag dan tombol keyboard. Tidak memerlukan WebGL atau unduhan engine 3D.
- Enam hologram lore untuk di-scan ke Codex; empat achievement lokal.
- Recon Rush: ronde refleks 20 detik, combo, penalti salah tap, statistik akurasi dan rekor. Tombol angka 1–9 bekerja saat arena memiliki fokus. Pindah tab membatalkan ronde agar timer tidak berjalan tanpa terlihat.
- Tantangan harian memakai tanggal WIB untuk urutan deterministik yang sama bagi semua pemain. Ini rekor pribadi lokal, bukan leaderboard online. Replay diperbolehkan.
- Data `adad-royal-lab-v1` terpisah dari save campaign; mode gerakan tenang dan preferensi reduced-motion mematikan animasi kontinu.

## Hosting paling sederhana: GitHub → Vercel

1. Import repo `bimoghanis/Web_Adad` di **Vercel → Add New → Project**.
2. Framework: **Next.js**, Root Directory: **./**, Build Command: **npm run build**. Biarkan Output Directory mengikuti preset Next.js.
3. Tidak perlu environment variable untuk versi saat ini. Klik **Deploy**.
4. Setelah terhubung, push ke branch produksi akan memicu deploy otomatis; branch lain mendapat preview.

Panduan resmi: https://vercel.com/docs/git/vercel-for-github

Website ini memakai static export. Alternatif: hosting folder `out/` di Netlify atau Cloudflare Pages. Progres game hanya ada di browser/perangkat yang dipakai; perpindahan dari localhost ke domain hosting tidak membawa save otomatis. Untuk leaderboard bersama atau akun lintas perangkat, diperlukan backend dan autentikasi tambahan.

Jalankan semua pemeriksaan sebelum push:

```sh
npm run typecheck
npm test
npm run build
```
