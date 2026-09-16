# Anti-Slop Design Manifesto & Technical Guidelines
> *"Perfection is achieved, not when there is nothing more to add, but when there is nothing left to take away."* — Antoine de Saint-Exupéry / Apple HIG Philosophy

Dokumen ini mendefinisikan standar desain dan arsitektur visual untuk **Untuk Dia (Sayang App)** agar terbebas dari sindrom **"AI Slop"** (desain murahan hasil generatif generik yang mengandalkan emoji berlebihan, kontras buruk, dan layout kaku) dan bermigrasi seutuhnya ke standar **Apple Human Interface Guidelines (iOS & macOS Design System)**.

---

## 1. Apa Itu "AI Slop" dalam UI/UX Web?
AI Slop adalah pola desain klise yang sering dihasilkan oleh model AI tanpa pengawasan desainer manusia:
1. **Emoji Vomit**: Menempelkan emoji (`🌸✨💖🎀🧸🍔🍕`) di setiap judul tombol, heading, dan daftar sebagai jalan pintas hierarki visual.
2. **Rainbow Pastel Mud**: Menggunakan gradien acak berlebihan yang membuat teks sulit dibaca dan tidak lolos standar aksesibilitas WCAG.
3. **Card Inception**: Membungkus setiap elemen ke dalam kotak border rounded yang identik tanpa variasi ritme tata letak.
4. **Generic Robotic Microcopy**: Teks formal template ("Aplikasi interaktif yang dirancang khusus untuk...") alih-alih tulisan hangat dan tulus khas manusia.
5. **Janky Physics**: Animasi tanpa easing kurva pegas (spring physics) yang terasa patah-patah di perangkat seluler.

---

## 2. Standar Desain Apple iOS / SF Style yang Diterapkan

### A. Tipografi Presisi (San Francisco Style)
- Menggunakan bobot tipografi yang tegas (`font-semibold`, `font-bold`) dengan rasio ukuran yang berjenjang.
- Kontras warna teks berbasis nuansa slate-plum lembut (`text-[#503043]`, `text-[#7A4A63]`, `text-[#9B7089]`) di atas latar belakang frosted glass.
- Menghilangkan ornamen tanda baca atau emoji di akhir heading.

### B. Ikonografi Vektor Komersial Berlisensi (Lucide Icons)
- **100% Bebas Emoji Murahan**: Seluruh emoji diganti dengan ikon vektor presisi dari pustaka `lucide-react` (Lisensi MIT, Commercial Use Ready).
- **iOS Squircle Icon Tile Pattern**: Setiap ikon dibungkus dalam wadah squircle (`rounded-xl` atau `rounded-2xl`) dengan latar belakang pastel transparan yang senada dengan kategori, seperti halnya ikon menu di iOS Settings dan Apple Health.

| Kategori | Ikon Lucide | Background Tint iOS |
|---|---|---|
| Senang / Happy | `Smile`, `Sun` | Peach Pastel (`#FFF1E8`) |
| Sedih / Calming | `CloudRain`, `HeartCrack` | Soft Iris (`#EEF2FF`) |
| Manja / Affection | `Heart`, `Sparkles` | Blush Pink (`#FFF0F5`) |
| Kesel / Fiery | `Flame` | Sunset Coral (`#FFF0EB`) |
| Capek / Rest | `Moon`, `BatteryLow` | Lavender Mist (`#F3EEFF`) |
| Kesehatan / Air | `Droplets` | Aqua Breeze (`#EBF9F5`) |
| Olahraga / Bergerak | `Footprints`, `Activity` | Soft Mint (`#E9F8EE`) |
| Belanja / Wishlist | `ShoppingBag`, `Gift` | Soft Rose (`#FFF0F7`) |
| Kenangan / Foto | `Camera`, `Image` | Golden Cream (`#FFF9E6`) |

### C. Material Glassmorphism Apple (Vibrancy & Frosted Layers)
- Menggunakan `backdrop-blur-xl` dan `backdrop-blur-2xl` dengan tingkat opasitas putih 70-85% (`bg-white/75` s/d `bg-white/90`).
- Border tipis 1px berwarna putih transparan (`border-white/60`) dengan bayangan difus super lembut (`shadow-[0_8px_30px_rgba(0,0,0,0.04)]`) meniru material Liquid Glass iOS 18.
- Radius squircle khas Apple (`rounded-[24px]`, `rounded-[28px]`, `rounded-[32px]`).

### D. Fisika Pegas & Mikro-Interaksi Haptik (Spring Physics)
- Semua tombol dan kartu interaktif memiliki umpan balik haptik visual:
  ```ts
  whileTap={{ scale: 0.96 }}
  transition={{ type: "spring", stiffness: 400, damping: 25 }}
  ```
- Tidak ada pergeseran tata letak (Zero Layout Shift).
- Transisi halaman halus menggunakan AnimatePresence dengan durasi 0.22s.

### E. Mockup Perangkat: iPhone 17 Pro Max Aerospace Hardware
- Di Landing Page Desktop, aplikasi ditampilkan di dalam frame fisik **iPhone 17 Pro Max**:
  - Bezel simetris ultra-tipis (2.5px).
  - Bodi titanium satin dengan pantulan sudut metalik.
  - **Dynamic Island Interaktif**: Pill kapsul hitam pekat di bagian atas dengan sensor kamera depan dan indikator live status.
  - Detail fisik tombol Action Button & Camera Control.

---

## 3. Fitur Spesial: Milestone Perayaan 2 Tahun (Anniversary)
- Memasuki usia hubungan 2 tahun (~730 hari) antara Yossika & Acha:
  - Sistem mendeteksi otomatis milestone 2 tahun.
  - Menampilkan **Sheet Perayaan iOS** dengan animasi confetti partikel canvas.
  - Surat cinta panjang khusus (*Long-form heartfelt letter*) yang menceritakan perjalanan dari Jogja, Wonosobo, hingga impian masa depan.
  - Tombol perayaan yang bisa diakses kembali kapan pun dari kartu Anniversary.

---

## 4. Checklist Kepatuhan Anti-Slop
- [x] Tidak ada emoji liar di heading, button label, dan status chip.
- [x] Semua ikon berasal dari `lucide-react` (lisensi komersial MIT).
- [x] Responsive penuh di mobile (iPhone/Android), tablet (iPad), dan laptop/desktop.
- [x] Tidak ada card tumpang tindih atau clipping layout di layar kecil.
- [x] Performa 60fps dengan animasi berbasis GPU.
