# Untuk Dia 🌷 — Cute PWA Dashboard

Dashboard imut untuk pacar, dibangun dengan Next.js 14 (App Router), Tailwind CSS, dan Framer Motion. Installable sebagai PWA di HP.

Setiap orang yang buka app ini akan diminta ngisi **nama panggilan pacarnya, tanggal
jadian, dan tanggal lahir** lewat onboarding sebelum masuk dashboard. Data itu
disimpan di `localStorage` browser masing-masing (bukan database bersama), jadi
aman dipakai banyak orang sekaligus tanpa perlu login — cocok buat di-share
sebagai demo publik.

## 1. Struktur folder

```
sayang-app/
├── app/
│   ├── layout.tsx          # Root layout, metadata PWA, phone-frame shell
│   ├── providers.tsx        # ProfileProvider (localStorage) + useProfile()
│   ├── page.tsx              # Gate: onboarding kalau belum ada profil, else dashboard
│   └── globals.css
├── components/
│   ├── onboarding/
│   │   └── OnboardingFlow.tsx   # Welcome → nama → tgl jadian → tgl lahir → recap
│   ├── MoodTracker.tsx
│   ├── AnniversaryCard.tsx      # Widget hari-bareng & countdown ultah di Home
│   ├── FoodRoulette.tsx
│   ├── DeepTalkCards.tsx
│   ├── HandleWithCare.tsx
│   ├── PeriodTracker.tsx
│   ├── DateRecommendation.tsx
│   ├── SettingsButton.tsx       # Tombol kecil buat reset/ganti profil
│   └── BottomNav.tsx
├── lib/
│   ├── profile.ts           # Tipe Profile + hitung hari jadian/ultah/zodiak
│   └── data.ts               # Semua konten (mood, makanan, deep talk, dll)
├── public/
│   ├── manifest.json
│   └── icons/                # Placeholder icon pastel, ganti sesuai selera
├── next.config.js            # Konfigurasi PWA (@ducanh2912/next-pwa)
├── tailwind.config.ts
└── package.json
```

## 2. Setup lokal

```bash
npm install
npm run dev
```

Buka `http://localhost:3000`.

> Catatan: PWA (service worker) di-nonaktifkan otomatis saat `npm run dev`
> (lihat `disable: process.env.NODE_ENV === "development"` di `next.config.js`).
> Untuk test install/offline, jalankan build production:

```bash
npm run build
npm run start
```

## 3. Ganti icon

Icon placeholder (hati pastel) sudah ada di `public/icons/`. Ganti dengan foto/logo
kesukaan kalian di ukuran yang sama:
- `icon-192.png` — 192x192
- `icon-512.png` — 512x512
- `icon-maskable-512.png` — 512x512, safe-area di tengah ~66% (untuk Android adaptive icon)

## 4. Personalisasi

Nama, tanggal jadian, dan tanggal lahir **tidak lagi di-hardcode** — user
mengisinya sendiri lewat onboarding saat pertama kali buka app, dan tersimpan
di `localStorage` (key: `untuk-acha:profile`). Kalau mau reset/ganti, tinggal
klik ikon gear kecil di pojok kanan atas dashboard.

Yang masih bisa diedit langsung di kode: `lib/data.ts`, buat ganti pilihan
makanan, pertanyaan deep talk, opsi "handle with care", dan rekomendasi
date/outfit/makeup per mood.

## 5. Deploy ke Vercel

```bash
npm i -g vercel
vercel
```

Atau langsung push ke GitHub lalu import repo-nya di [vercel.com/new](https://vercel.com/new).
Tidak perlu environment variable tambahan — semua data disimpan di client (React state),
belum pakai database.

## 6. Install sebagai app di HP (PWA)

Setelah di-deploy (harus HTTPS, Vercel otomatis HTTPS):
- **Android (Chrome):** buka link → menu titik tiga → "Add to Home screen" / "Install app".
- **iOS (Safari):** buka link → tombol Share → "Add to Home Screen".

Setelah di-install, app bisa dibuka tanpa internet (halaman yang sudah pernah
dibuka akan ter-cache oleh service worker).

## 7. Yang masih manual / bisa dikembangkan

- Profil (nama, tgl jadian, tgl lahir) sudah tersimpan permanen di
  `localStorage` per-browser. Tapi histori mood harian & pilihan "handle with
  care" masih React state (hilang kalau refresh) — kalau mau permanen juga,
  tinggal simpan ke `localStorage` dengan pola yang sama seperti `lib/profile.ts`,
  atau sambungkan ke database (mis. Supabase) kalau mau data bisa diakses
  lintas device.
- Karena datanya per-browser (bukan per-akun), setiap orang yang buka link
  demo ini bakal dapet onboarding kosong dan bisa isi profil pacarnya
  sendiri-sendiri tanpa saling menimpa data orang lain.
- Font pakai Google Fonts (`Poppins` + `Quicksand`) lewat `next/font`, otomatis
  ter-optimize dan self-hosted oleh Next.js, jadi tetap jalan offline setelah
  cache pertama.
