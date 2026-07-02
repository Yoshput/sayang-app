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
  "Ada mimpi yang belum pernah kamu certain ke siapa-siapa?",
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
    makeup: "Ga usah makeup, mateching aja pake sheet mask bareng",
  },
};
