export type MoodKey = "happy" | "sad" | "angry" | "cuddly" | "tired";

export const MOODS: {
  key: MoodKey;
  label: string;
  iconName: string;
  emoji: string; // backwards compatibility fallback
  tint: "peach" | "blue" | "amber" | "rose" | "lilac";
  gradient: string;
}[] = [
  {
    key: "happy",
    label: "Senang",
    iconName: "Smile",
    emoji: "Smile",
    tint: "peach",
    gradient: "from-[#FFE9F3] via-[#FFF6FA] to-[#FDF3D8]",
  },
  {
    key: "sad",
    label: "Sedih",
    iconName: "CloudRain",
    emoji: "CloudRain",
    tint: "blue",
    gradient: "from-[#E3E9FF] via-[#F1E7FE] to-[#FFF6FA]",
  },
  {
    key: "angry",
    label: "Kesel",
    iconName: "Flame",
    emoji: "Flame",
    tint: "amber",
    gradient: "from-[#FFD9D9] via-[#FFE9F3] to-[#FFF3E8]",
  },
  {
    key: "cuddly",
    label: "Manja",
    iconName: "Heart",
    emoji: "Heart",
    tint: "rose",
    gradient: "from-[#FFE0EF] via-[#F1E7FE] to-[#FFF6FA]",
  },
  {
    key: "tired",
    label: "Capek",
    iconName: "Moon",
    emoji: "Moon",
    tint: "lilac",
    gradient: "from-[#E3F2FF] via-[#EDEBFF] to-[#F6F0FF]",
  },
];

export const FOOD_CATEGORIES = [
  { label: "Pedas", iconName: "Flame", note: "Level nangis dikit gapapa" },
  { label: "Manis", iconName: "Cake", note: "Buat mood booster" },
  { label: "Berkuah", iconName: "Soup", note: "Anget-anget di perut" },
  { label: "Fast Food", iconName: "Pizza", note: "Cepet, gampang, enak" },
  { label: "Jepang", iconName: "Fish", note: "Sushi atau ramen, bebas" },
  { label: "Korea", iconName: "Utensils", note: "Tteokbokki time" },
  { label: "Nasi Padang", iconName: "UtensilsCrossed", note: "Rendang wajib" },
  { label: "Seafood", iconName: "Fish", note: "Bakar atau saus padang" },
  { label: "Ayam Geprek", iconName: "Drumstick", note: "Level sambel nego dulu" },
  { label: "Kopi & Cemilan", iconName: "Coffee", note: "Ga laper-laper amat" },
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
  { key: "hug", label: "Perlu Dipeluk", iconName: "Heart", emoji: "Heart", desc: "Peluk aku dulu, ga usah banyak tanya." },
  { key: "listen", label: "Dengerin Aja", iconName: "Headphones", emoji: "Headphones", desc: "Aku cuma butuh cerita, jangan dikasih solusi dulu." },
  { key: "space", label: "Beliin Cemilan", iconName: "ShoppingBag", emoji: "ShoppingBag", desc: "Butuh waktu sendiri, tapi jangan lupa titip cemilan." },
  { key: "distract", label: "Ajak Ngobrol Random", iconName: "MessageCircle", emoji: "MessageCircle", desc: "Alihin pikiran aku ke hal-hal receh." },
  { key: "quiet", label: "Temenin Tenang", iconName: "Moon", emoji: "Moon", desc: "Ga usah ngomong, cukup di samping aku aja." },
  { key: "reassure", label: "Yakinin Aku", iconName: "ShieldCheck", emoji: "ShieldCheck", desc: "Bilang semua bakal baik-baik aja, ulang kalau perlu." },
];

export const DATE_RECOMMENDATIONS: Record<
  MoodKey,
  { dateIdea: string; outfit: string[]; makeup: string }
> = {
  happy: {
    dateIdea: "Jalan-jalan santai ke kafe outdoor terus foto-foto saat golden hour",
    outfit: ["#FFD9E8", "#FFF3D0", "#FFFFFF"],
    makeup: "Fresh dewy look, blush peach, lip tint natural",
  },
  sad: {
    dateIdea: "Movie night di rumah sambil peluk-pelukan dan makan comfort food",
    outfit: ["#E3E9FF", "#F1E7FE", "#F5F5F5"],
    makeup: "Skincare glowy minimalis dan lip balm tinted",
  },
  angry: {
    dateIdea: "Karaoke lepas emosi bareng terus lanjut makan hidangan pedas favorit",
    outfit: ["#2B2B2B", "#FFD1E8", "#FFFFFF"],
    makeup: "Bold lip, sharp eyeliner, tampil makin percaya diri",
  },
  cuddly: {
    dateIdea: "Piknik santai di taman teduh, bawa selimut dan camilan manis favorit",
    outfit: ["#FFE0EF", "#F1E7FE", "#FFF8ED"],
    makeup: "Soft pink tint, glowing cheeks, glossy lip",
  },
  tired: {
    dateIdea: "Spa dan pijat refleksi santai berdua lalu istirahat awal tanpa distraksi",
    outfit: ["#DFF6E9", "#E3F2FF", "#FFFFFF"],
    makeup: "Natural fresh look dengan sheet mask malam hari",
  },
};

// --- Single Mode Data ---

export const SELF_CARE_RECOMMENDATIONS: Record<
  MoodKey,
  { idea: string; outfit: string[]; tip: string }
> = {
  happy: {
    idea: "Bikin iced coffee favoritmu, dengarkan playlist upbeat, dan nikmati harimu",
    outfit: ["#FFD9E8", "#FFF3D0", "#FFFFFF"],
    tip: "Abadikan momen penuh senyum serumu hari ini!",
  },
  sad: {
    idea: "Tonton comfort movie hangat sambil selimutan dan nikmati teh hangat",
    outfit: ["#E3E9FF", "#F1E7FE", "#F5F5F5"],
    tip: "Menangis itu manusiawi. Basuh wajah dengan air dingin setelahnya.",
  },
  angry: {
    idea: "Keluarkan energi lewat olahraga, journaling ekspresif, atau jalan santai",
    outfit: ["#2B2B2B", "#FFD1E8", "#FFFFFF"],
    tip: "Tarik napas dalam 4 detik, tahan 7 detik, hembuskan perlahan 8 detik.",
  },
  cuddly: {
    idea: "Kenakan pakaian paling nyaman, baca novel favorit, dan manjakan diri",
    outfit: ["#FFE0EF", "#F1E7FE", "#FFF8ED"],
    tip: "Nikmati camilan manis favorit tanpa rasa bersalah.",
  },
  tired: {
    idea: "Mandi air hangat, pasang sheet mask, lalu tidur lebih awal tanpa gadget",
    outfit: ["#DFF6E9", "#E3F2FF", "#FFFFFF"],
    tip: "Nonaktifkan notifikasi malam ini. Kamu pantas beristirahat tenang.",
  },
};

export const TREAT_YOURSELF_OPTIONS = [
  { label: "Nonton Serial Favorit", iconName: "Film", emoji: "Film", note: "Pilih tontonan yang menghibur!" },
  { label: "Skincare Rutin Lengkap", iconName: "Sparkles", emoji: "Sparkles", note: "Double cleanse, sheet mask, glow up!" },
  { label: "Beli Kopi Favorit", iconName: "Coffee", emoji: "Coffee", note: "Self-reward terbaik hari ini" },
  { label: "Mampir ke Toko Buku", iconName: "BookOpen", emoji: "BookOpen", note: "Pilih satu bacaan baru yang inspiratif" },
  { label: "Mandi Air Hangat Santai", iconName: "Bath", emoji: "Bath", note: "Putar playlist santai pengantar relaksasi" },
  { label: "Pesan Makanan Spesial", iconName: "Utensils", emoji: "Utensils", note: "Nikmati santapan enak kesukaanmu" },
  { label: "Tidur Siang Berkualitas", iconName: "Moon", emoji: "Moon", note: "Istirahat adalah bentuk produktivitas" },
  { label: "Dengarkan Musik Favorit", iconName: "Music", emoji: "Music", note: "Lepaskan beban dengan lagu kesukaan" },
  { label: "Belanja Wishlist Pribadi", iconName: "ShoppingBag", emoji: "ShoppingBag", note: "Apresiasi kerja kerasmu selama ini" },
  { label: "Coba Resep Masakan Baru", iconName: "ChefHat", emoji: "ChefHat", note: "Eksplorasi rasa baru di dapur" },
  { label: "Meditasi & Journaling", iconName: "Compass", emoji: "Compass", note: "Jernihkan pikiran dan tata rencana baru" },
  { label: "Perawatan Diri di Salon", iconName: "Scissors", emoji: "Scissors", note: "Manjakan diri agar kembali segar" },
];

export const HABIT_ITEMS = [
  { key: "water", label: "Minum 8 gelas air", iconName: "Droplets", emoji: "Droplets" },
  { key: "sleep", label: "Tidur 7-8 jam", iconName: "Moon", emoji: "Moon" },
  { key: "vitamins", label: "Minum vitamin", iconName: "Pill", emoji: "Pill" },
  { key: "exercise", label: "Gerak / olahraga", iconName: "Footprints", emoji: "Footprints" },
  { key: "skincare", label: "Skincare rutin", iconName: "Sparkles", emoji: "Sparkles" },
  { key: "journal", label: "Journaling refleksi", iconName: "BookOpen", emoji: "BookOpen" },
  { key: "healthy_food", label: "Makan bergizi", iconName: "Salad", emoji: "Salad" },
  { key: "meditation", label: "Meditasi hening", iconName: "Wind", emoji: "Wind" },
] as const;

export type HabitKey = typeof HABIT_ITEMS[number]["key"];

// --- Mood-based Food Picker ---
export type FoodItem = { name: string; iconName: string; emoji: string; category: string; note: string };

export const FOODS_BY_MOOD: Record<MoodKey, FoodItem[]> = {
  happy: [
    { name: "Boba Brown Sugar", iconName: "Coffee", emoji: "Coffee", category: "Minuman", note: "Segar dan manis melengkapi harimu" },
    { name: "Sushi Platter Segar", iconName: "Fish", emoji: "Fish", category: "Jepang", note: "Fresh vibes untuk merayakan momen" },
    { name: "Rainbow Salad Bowl", iconName: "Salad", emoji: "Salad", category: "Sehat", note: "Penuh warna dan nutrisi seimbang" },
    { name: "Fluffy Pancake Stack", iconName: "Cake", emoji: "Cake", category: "Brunch", note: "Sirup maple dan butter melimpah" },
    { name: "Artisan Pizza Slice", iconName: "Pizza", emoji: "Pizza", category: "Western", note: "Keju leleh yang memanjakan lidah" },
    { name: "Ice Cream Gelato", iconName: "IceCream", emoji: "IceCream", category: "Dessert", note: "Rasa manis dingin pelepas penat" },
    { name: "Ayam Geprek Mozzarella", iconName: "Drumstick", emoji: "Drumstick", category: "Lokal", note: "Sensasi pedas gurih yang pas" },
    { name: "Mie Goreng Spesial", iconName: "Soup", emoji: "Soup", category: "Lokal", note: "Kelezatan klasik penghangat suasana" },
  ],
  sad: [
    { name: "Ramen Kaldu Hangat", iconName: "Soup", emoji: "Soup", category: "Jepang", note: "Kuah gurih hangat yang menenangkan" },
    { name: "Nasi Goreng Telur Rumahan", iconName: "Utensils", emoji: "Utensils", category: "Comfort", note: "Sederhana tapi selalu menenangkan" },
    { name: "Soto Ayam Kuah Bening", iconName: "Soup", emoji: "Soup", category: "Berkuah", note: "Menghangatkan tubuh dari dalam" },
    { name: "Cokelat Panas Marshmallow", iconName: "Coffee", emoji: "Coffee", category: "Minuman", note: "Rasa manis lembut penghibur hati" },
    { name: "Sup Krim Jagung Manis", iconName: "Soup", emoji: "Soup", category: "Comfort", note: "Tekstur creamy yang lembut" },
    { name: "Pudding Cokelat Karamel", iconName: "Cake", emoji: "Cake", category: "Dessert", note: "Manis lembut penyejuk suasana" },
    { name: "Bakso Kuah Sapi", iconName: "Soup", emoji: "Soup", category: "Berkuah", note: "Porsi mantap penyemangat hari" },
    { name: "Toast Selai Nutella", iconName: "Sandwich", emoji: "Sandwich", category: "Snack", note: "Renyah manis teman bersantai" },
  ],
  angry: [
    { name: "Ayam Geprek Sambal Korek", iconName: "Flame", emoji: "Flame", category: "Pedas", note: "Lepaskan beban lewat rasa pedas nendang" },
    { name: "Spicy Tteokbokki", iconName: "Soup", emoji: "Soup", category: "Korea", note: "Sensasi pedas manis kenyal yang nagih" },
    { name: "Kimchi Jjigae Panas", iconName: "Flame", emoji: "Flame", category: "Korea", note: "Segar dan pedas membersihkan penat" },
    { name: "Sambal Matah Crispy", iconName: "Flame", emoji: "Flame", category: "Pedas", note: "Aroma segar pelecut semangat" },
    { name: "Buldak Spicy Noodles", iconName: "Flame", emoji: "Flame", category: "Pedas", note: "Tantangan pedas pelepas emosi" },
    { name: "Camilan Renyah Gurih", iconName: "Utensils", emoji: "Utensils", category: "Snack", note: "Kriuk renyah yang memuaskan" },
    { name: "Nasi Padang Rendang Daging", iconName: "UtensilsCrossed", emoji: "UtensilsCrossed", category: "Lokal", note: "Bumbu kaya rempah yang memuaskan" },
    { name: "Burger Double Patty", iconName: "Pizza", emoji: "Pizza", category: "Fast Food", note: "Porsi besar pengisi energi maksimal" },
  ],
  cuddly: [
    { name: "Strawberry Milk Latte", iconName: "Coffee", emoji: "Coffee", category: "Minuman", note: "Manis lembut bernuansa merah muda" },
    { name: "French Macarons", iconName: "Cookie", emoji: "Cookie", category: "Dessert", note: "Kecil, manis, dan elegan" },
    { name: "Onigiri Salmon Mayo", iconName: "Fish", emoji: "Fish", category: "Jepang", note: "Praktis dan selalu lezat dinikmati" },
    { name: "Crepe Buah Segar", iconName: "Cake", emoji: "Cake", category: "Dessert", note: "Manis segar teman quality time" },
    { name: "Dimsum Kukus Campur", iconName: "Utensils", emoji: "Utensils", category: "Cina", note: "Lembut dan hangat saat disantap" },
    { name: "Mochi Ice Cream Lembut", iconName: "IceCream", emoji: "IceCream", category: "Dessert", note: "Kenyal manis yang menggemaskan" },
    { name: "Waffle Madu Beri", iconName: "Cake", emoji: "Cake", category: "Brunch", note: "Renyah berpadu saus manis buah" },
    { name: "Butter Croffle Renyah", iconName: "Croissant", emoji: "Croissant", category: "Cafe", note: "Wangi mentega khas kafe favorit" },
  ],
  tired: [
    { name: "Bubur Ayam Gurih Hangat", iconName: "Soup", emoji: "Soup", category: "Comfort", note: "Mudah dicerna dan mengembalikan tenaga" },
    { name: "Oatmeal Buah & Madu", iconName: "Apple", emoji: "Apple", category: "Sehat", note: "Sumber energi alami yang ringan" },
    { name: "Nasi Goreng Simpel Cepat", iconName: "Utensils", emoji: "Utensils", category: "Cepat", note: "Langsung pesan tanpa repot masak" },
    { name: "Fresh Smoothie Recharge", iconName: "Coffee", emoji: "Coffee", category: "Sehat", note: "Suntikan vitamin untuk tubuh lelah" },
    { name: "Mie Kuah Telur Rebus", iconName: "Soup", emoji: "Soup", category: "Comfort", note: "Klasik, cepat, dan selalu pas" },
    { name: "Sandwich Keju Panggang", iconName: "Sandwich", emoji: "Sandwich", category: "Cepat", note: "Tiga menit siap santap" },
    { name: "Yogurt Granola Madu", iconName: "Apple", emoji: "Apple", category: "Sehat", note: "Ringan di perut sebelum istirahat" },
    { name: "Sup Tomat Daging Cincang", iconName: "Soup", emoji: "Soup", category: "Berkuah", note: "Hangat kaya nutrisi penenang tubuh" },
  ],
};

// Partner status options for couple mode
export const PARTNER_STATUSES = [
  { key: "happy", label: "Lagi Bahagia", iconName: "Smile", emoji: "Smile", color: "#F98FC2", bg: "#FFF2F9" },
  { key: "pms", label: "Periode PMS", iconName: "HeartPulse", emoji: "HeartPulse", color: "#FF6B6B", bg: "#FFF0F0" },
  { key: "gaming", label: "Lagi Main Game", iconName: "Gamepad2", emoji: "Gamepad2", color: "#7B68EE", bg: "#F0EEFF" },
  { key: "busy", label: "Fokus Kerja", iconName: "Laptop", emoji: "Laptop", color: "#B58AF5", bg: "#F6EEFF" },
  { key: "sleepy", label: "Mengantuk", iconName: "Moon", emoji: "Moon", color: "#94DCB6", bg: "#F0FBF6" },
  { key: "overthinking", label: "Butuh Ketenangan", iconName: "Compass", emoji: "Compass", color: "#FFA877", bg: "#FFF7F0" },
  { key: "need_hug", label: "Butuh Pelukan", iconName: "HeartHandshake", emoji: "HeartHandshake", color: "#FCAFD6", bg: "#FFF6FA" },
  { key: "angry", label: "Sedang Kesal", iconName: "Flame", emoji: "Flame", color: "#FF8E55", bg: "#FFF3EE" },
];
