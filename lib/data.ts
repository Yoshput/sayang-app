export type MoodKey = "happy" | "sad" | "angry" | "cuddly" | "tired";

export const MOODS: {
  key: MoodKey;
  label: string;
  emoji: string;
  gradient: string;
}[] = [
  { key: "happy", label: "Senang", emoji: "😊", gradient: "from-[#FFE9F3] via-[#FFF6FA] to-[#FDF3D8]" },
  { key: "sad", label: "Sedih", emoji: "😢", gradient: "from-[#E3E9FF] via-[#F1E7FE] to-[#FFF6FA]" },
  { key: "angry", label: "Kesel", emoji: "😤", gradient: "from-[#FFD9D9] via-[#FFE9F3] to-[#FFF3E8]" },
  { key: "cuddly", label: "Manja", emoji: "🥰", gradient: "from-[#FFE0EF] via-[#F1E7FE] to-[#FFF6FA]" },
  { key: "tired", label: "Capek", emoji: "😴", gradient: "from-[#E3F2FF] via-[#EDEBFF] to-[#F6F0FF]" },
];

export const FOOD_CATEGORIES = [
  { label: "Pedas 🌶️", note: "Level nangis dikit gapapa" },
  { label: "Manis 🍰", note: "Buat mood booster" },
  { label: "Berkuah 🍲", note: "Anget-anget di perut" },
  { label: "Fast Food 🍔", note: "Cepet, gampang, enak" },
  { label: "Jepang 🍣", note: "Sushi atau ramen, bebas" },
  { label: "Korea 🍜", note: "Tteokbokki time" },
  { label: "Nasi Padang 🍛", note: "Rendang wajib" },
  { label: "Seafood 🦐", note: "Bakar atau saus padang" },
  { label: "Ayam Geprek 🍗", note: "Level sambel nego dulu" },
  { label: "Kopi & Cemilan ☕", note: "Ga laper-laper amat" },
];

export const DEEP_TALK_QUESTIONS = [
  "Momen paling bikin kamu ngerasa dicintai itu kapan?",
  "Kalau bisa ngobrol sama diri kamu 5 tahun lalu, kamu bakal bilang apa?",
  "Hal kecil apa yang aku lakuin tapi ternyata artinya besar buat kamu?",
  "Kamu paling takut kehilangan apa dalam hidup kamu sekarang?",
  "Kapan terakhir kali kamu ngerasa bener-bener bangga sama diri sendiri?",
  "Kalau kita bisa pindah ke satu tempat bareng, kamu maunya di mana?",
  "Ada mimpi yang belum pernah kamu ceritain ke siapa-siapa?",
  "Hal apa yang pengen banget kamu perbaiki dari cara kita komunikasi?",
  "Menurut kamu, aku paling berubah di bagian mana sejak kita deket?",
  "Kalau besok dunia damai-damai aja, apa hal pertama yang mau kamu lakuin bareng aku?",
  "Apa yang bikin kamu ngerasa aman kalau lagi cerita sama aku?",
  "Versi terbaik dari kita di masa depan itu ngapain aja tiap harinya?",
];

export const CARE_OPTIONS = [
  { key: "hug", label: "Perlu Dipeluk", emoji: "🤗", desc: "Peluk aku dulu, ga usah banyak tanya." },
  { key: "listen", label: "Dengerin Aja", emoji: "👂", desc: "Aku cuma butuh cerita, jangan dikasih solusi dulu." },
  { key: "space", label: "Kasih Jarak, Tapi Beliin Cemilan", emoji: "🛍️", desc: "Butuh waktu sendiri, tapi jangan lupa titip cemilan." },
  { key: "distract", label: "Ajak Ngobrol Random", emoji: "💬", desc: "Alihin pikiran aku ke hal-hal receh." },
  { key: "quiet", label: "Temenin Diem-Dieman", emoji: "🌙", desc: "Ga usah ngomong, cukup di samping aku aja." },
  { key: "reassure", label: "Yakinin Aku", emoji: "💗", desc: "Bilang semua bakal baik-baik aja, ulang kalau perlu." },
];

export const DATE_RECOMMENDATIONS: Record<
  MoodKey,
  { dateIdea: string; outfit: string[]; makeup: string }
> = {
  happy: {
    dateIdea: "Jalan-jalan santai ke kafe outdoor terus foto-foto golden hour 📸",
    outfit: ["#FFD9E8", "#FFF3D0", "#FFFFFF"],
    makeup: "Fresh dewy look, blush peach, lip tint natural",
  },
  sad: {
    dateIdea: "Movie night di rumah sambil peluk-pelukan dan makan comfort food 🎬",
    outfit: ["#E3E9FF", "#F1E7FE", "#F5F5F5"],
    makeup: "Skip makeup, cukup skincare glowy + lip balm tinted",
  },
  angry: {
    dateIdea: "Karaoke teriak-teriak lepas emosi terus lanjut makan pedas 🎤",
    outfit: ["#2B2B2B", "#FFD1E8", "#FFFFFF"],
    makeup: "Bold red lip, sharp eyeliner, biar makin pede",
  },
  cuddly: {
    dateIdea: "Piknik kecil di taman, bawa selimut dan snack favorit 🧺",
    outfit: ["#FFE0EF", "#F1E7FE", "#FFF8ED"],
    makeup: "Soft pink everything, cheeks tint, glossy lip",
  },
  tired: {
    dateIdea: "Spa/pijat santai berdua terus tidur cepet, no drama malam ini 🛁",
    outfit: ["#DFF6E9", "#E3F2FF", "#FFFFFF"],
    makeup: "Ga usah makeup, matching aja pake sheet mask bareng",
  },
};

// --- Single Mode Data ---

export const SELF_CARE_RECOMMENDATIONS: Record<
  MoodKey,
  { idea: string; outfit: string[]; tip: string }
> = {
  happy: {
    idea: "Bikin iced coffee favoritmu, dengerin lagu up-beat, dan beresin kamar sambil nari tipis-tipis 🎶",
    outfit: ["#FFD9E8", "#FFF3D0", "#FFFFFF"],
    tip: "Jangan lupa abadikan senyum serumu hari ini!",
  },
  sad: {
    idea: "Nonton film komedi/comfort movie hangat sambil selimutan dan minum teh anget ☕",
    outfit: ["#E3E9FF", "#F1E7FE", "#F5F5F5"],
    tip: "It's okay to cry. Cuci muka pakai air dingin setelahnya ya.",
  },
  angry: {
    idea: "Olahraga kardio, journaling coret-coret emosi, atau dengerin musik rock kencang-kencang 🎧",
    outfit: ["#2B2B2B", "#FFD1E8", "#FFFFFF"],
    tip: "Tarik napas dalam 4 detik, tahan 7 detik, hembuskan 8 detik.",
  },
  cuddly: {
    idea: "Pakai piyama paling lembut, baca novel kesukaan, dan peluk bantal guling seharian 🧸",
    outfit: ["#FFE0EF", "#F1E7FE", "#FFF8ED"],
    tip: "Manjakan dirimu dengan cemilan manis favorit.",
  },
  tired: {
    idea: "Mandi air hangat, pasang sheet mask dingin, lalu tidur lebih awal tanpa gadget 😴",
    outfit: ["#DFF6E9", "#E3F2FF", "#FFFFFF"],
    tip: "Matikan semua notifikasi malam ini. Kamu berhak istirahat.",
  },
};

export const TREAT_YOURSELF_OPTIONS = [
  { label: "Nonton Drakor", emoji: "🎬", note: "Pilih yang happy ending ya!" },
  { label: "Skincare-an", emoji: "🧴", note: "Double cleanse, sheet mask, slay!" },
  { label: "Beli Kopi Mahal", emoji: "☕", note: "Deserve it, bestie!" },
  { label: "Jalan ke Toko Buku", emoji: "📚", note: "Beli satu, liat lainnya" },
  { label: "Mandi Bubble Bath", emoji: "🛁", note: "Candle + playlist lo-fi 🕯️" },
  { label: "Order Makanan Enak", emoji: "🍕", note: "Tanpa dihakimi siapapun" },
  { label: "Tidur Seharian", emoji: "😴", note: "Rest is productive ✨" },
  { label: "Karaoke Solo", emoji: "🎤", note: "Paling keras, paling lepas!" },
  { label: "Belanja Online", emoji: "🛍️", note: "Add to cart dulu, bayarnya nanti" },
  { label: "Masak Resep Baru", emoji: "🍳", note: "Gordon Ramsay siapa takut" },
  { label: "Meditasi & Journaling", emoji: "🧘", note: "Mind reset yang berarti" },
  { label: "Ke Salon", emoji: "💅", note: "Pamper yourself, sis!" },
];

export const HABIT_ITEMS = [
  { key: "water", label: "Minum 8 gelas air", emoji: "💧" },
  { key: "sleep", label: "Tidur 7-8 jam", emoji: "😴" },
  { key: "vitamins", label: "Minum vitamin", emoji: "💊" },
  { key: "exercise", label: "Gerak / olahraga", emoji: "🏃" },
  { key: "skincare", label: "Skincare rutin", emoji: "✨" },
  { key: "journal", label: "Journaling", emoji: "📓" },
  { key: "healthy_food", label: "Makan bergizi", emoji: "🥗" },
  { key: "meditation", label: "Meditasi 5 menit", emoji: "🧘" },
] as const;

export type HabitKey = typeof HABIT_ITEMS[number]["key"];

// Partner status options for couple mode
export const PARTNER_STATUSES = [
  { key: "happy", label: "Lagi Bahagia 🥰", emoji: "🥰", color: "#F98FC2", bg: "#FFF2F9" },
  { key: "pms", label: "PMS ⚠️", emoji: "⚠️", color: "#FF6B6B", bg: "#FFF0F0" },
  { key: "gaming", label: "Nge-game 🎮", emoji: "🎮", color: "#7B68EE", bg: "#F0EEFF" },
  { key: "busy", label: "Kerjaan Numpuk 💻", emoji: "💻", color: "#B58AF5", bg: "#F6EEFF" },
  { key: "sleepy", label: "Ngantuk 😴", emoji: "😴", color: "#94DCB6", bg: "#F0FBF6" },
  { key: "overthinking", label: "Overthinking 🌀", emoji: "🌀", color: "#FFA877", bg: "#FFF7F0" },
  { key: "need_hug", label: "Butuh Pelukan 🤗", emoji: "🤗", color: "#FCAFD6", bg: "#FFF6FA" },
  { key: "angry", label: "Lagi Kesel 😤", emoji: "😤", color: "#FF8E55", bg: "#FFF3EE" },
];
