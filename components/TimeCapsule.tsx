"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Lock, Unlock, Mail, Calendar, Sparkles } from "lucide-react";
import { useProfile } from "@/app/providers";

interface Letter {
  id: string;
  title: string;
  content: string;
  openDate: string; // yyyy-mm-dd
  theme: "pink" | "purple" | "mint" | "cream";
  createdAt: number;
}

const STORAGE_KEY = "capsule:letters";

const THEMES = {
  pink: {
    bg: "bg-gradient-to-br from-[#FFF2F9] to-[#FFD1E8]",
    border: "border-blush-200",
    accent: "text-blush-500",
    headerBg: "bg-blush-100",
    glow: "shadow-glow",
  },
  purple: {
    bg: "bg-gradient-to-br from-[#F6EEFF] to-[#E3CFFD]",
    border: "border-lilac-200",
    accent: "text-lilac-500",
    headerBg: "bg-lilac-100",
    glow: "shadow-glow-lilac",
  },
  mint: {
    bg: "bg-gradient-to-br from-[#F1FBF6] to-[#BEEBD2]",
    border: "border-mint-200",
    accent: "text-mint-500",
    headerBg: "bg-mint-100",
    glow: "shadow-softer",
  },
  cream: {
    bg: "bg-gradient-to-br from-[#FFFDF8] to-[#FCEFD8]",
    border: "border-orange-100",
    accent: "text-orange-400",
    headerBg: "bg-orange-50",
    glow: "shadow-softer",
  },
};

export default function TimeCapsule() {
  const { profile } = useProfile();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [theme, setTheme] = useState<keyof typeof THEMES>("pink");
  
  // Reading state
  const [activeReadLetter, setActiveReadLetter] = useState<Letter | null>(null);
  const [shakeLetterId, setShakeLetterId] = useState<string | null>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setLetters(JSON.parse(raw));
    } catch {}
  }, []);

  const saveLetters = (newLetters: Letter[]) => {
    setLetters(newLetters);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newLetters));
  };

  const tomorrowStr = () => {
    const tomorrow = new Date();
    tomorrow.setDate(tomorrow.getDate() + 1);
    return tomorrow.toISOString().split("T")[0];
  };

  const handleAdd = () => {
    if (!title.trim() || !content.trim() || !openDate) return;
    
    const newLetter: Letter = {
      id: Date.now().toString(),
      title: title.trim(),
      content: content.trim(),
      openDate,
      theme,
      createdAt: Date.now(),
    };

    saveLetters([...letters, newLetter]);
    setTitle(""); setContent(""); setOpenDate(""); setTheme("pink");
    setShowAdd(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Hapus surat harapan ini?")) {
      saveLetters(letters.filter((l) => l.id !== id));
    }
  };

  const getDaysRemaining = (targetDate: string) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    const target = new Date(targetDate);
    target.setHours(0, 0, 0, 0);
    const diff = target.getTime() - today.getTime();
    return Math.max(0, Math.ceil(diff / 86400000));
  };

  const handleLetterClick = (letter: Letter) => {
    const remaining = getDaysRemaining(letter.openDate);
    if (remaining > 0) {
      // Shake animation to show locked status
      setShakeLetterId(letter.id);
      setTimeout(() => setShakeLetterId(null), 500);
    } else {
      setActiveReadLetter(letter);
    }
  };

  return (
    <div className="mx-5 mt-5 pb-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-display font-bold text-sm text-[#7A4A63]">Time Capsule Letter 🔒</p>
          <p className="text-[10px] text-lilac-400 font-display">Simpan surat harapan untuk dibuka nanti</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blush-400 to-lilac-400 text-white text-[10px] font-display font-bold px-3 py-1.5 rounded-2xl shadow-soft"
        >
          <Plus size={12} /> Tulis Surat
        </motion.button>
      </div>

      {/* Letters List */}
      {letters.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/60 text-center">
          <p className="text-3xl mb-2">✉️</p>
          <p className="font-display font-bold text-sm text-[#7A4A63]">Belum ada surat harapan</p>
          <p className="text-[10px] text-lilac-400 mt-1">Buat surat pertama untuk dibuka di masa depan!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3">
          {letters.map((letter) => {
            const remaining = getDaysRemaining(letter.openDate);
            const isLocked = remaining > 0;
            const style = THEMES[letter.theme];
            const isShaking = shakeLetterId === letter.id;

            return (
              <motion.button
                key={letter.id}
                onClick={() => handleLetterClick(letter)}
                whileTap={{ scale: 0.95 }}
                animate={isShaking ? { x: [-6, 6, -6, 6, 0] } : {}}
                transition={{ duration: 0.4 }}
                className={`relative rounded-3xl p-4 border text-left flex flex-col justify-between min-h-[140px] transition-all duration-300 ${style.bg} ${style.border} ${style.glow}`}
              >
                <div>
                  <div className="flex items-center justify-between">
                    <span className="text-xl">✉️</span>
                    <span className={`p-1 rounded-full ${style.headerBg} ${style.accent}`}>
                      {isLocked ? <Lock size={12} /> : <Unlock size={12} className="animate-pulse" />}
                    </span>
                  </div>
                  <p className="font-display font-bold text-xs text-[#7A4A63] mt-2 truncate w-full">
                    {letter.title}
                  </p>
                </div>

                <div className="mt-3">
                  {isLocked ? (
                    <div>
                      <p className="text-[10px] font-display font-bold text-[#8A5C74]/80">
                        Buka dalam:
                      </p>
                      <p className={`text-[11px] font-display font-bold ${style.accent}`}>
                        ⏳ {remaining} hari lagi
                      </p>
                    </div>
                  ) : (
                    <div>
                      <p className="text-[10px] font-display font-bold text-green-600 flex items-center gap-1">
                        <Sparkles size={10} className="animate-spin" /> Siap dibuka!
                      </p>
                      <p className="text-[8px] text-lilac-400 font-display mt-0.5">Ketuk untuk membaca</p>
                    </div>
                  )}
                </div>

                {/* Delete option */}
                <button
                  onClick={(e) => handleDelete(letter.id, e)}
                  className="absolute top-2 right-8 text-[9px] text-[#8A5C74]/40 hover:text-red-500 font-display font-semibold"
                >
                  Hapus
                </button>
              </motion.button>
            );
          })}
        </div>
      )}

      {/* Write Letter Sheet */}
      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 shadow-soft max-w-[420px] mx-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-display font-bold text-sm text-[#7A4A63]">Tulis Surat Harapan 💌</p>
                <button onClick={() => setShowAdd(false)}><X size={16} className="text-lilac-300" /></button>
              </div>

              {/* Theme Selector */}
              <div className="flex gap-2.5 mb-3">
                {Object.keys(THEMES).map((key) => {
                  const tKey = key as keyof typeof THEMES;
                  return (
                    <button
                      key={key}
                      onClick={() => setTheme(tKey)}
                      className={`flex-1 py-1.5 rounded-xl border text-[10px] font-display font-bold transition-all ${
                        theme === tKey ? "bg-blush-100 border-blush-300" : "bg-blush-50/50 border-transparent"
                      }`}
                    >
                      {key.charAt(0).toUpperCase() + key.slice(1)}
                    </button>
                  );
                })}
              </div>

              <input
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Judul Surat (misal: Harapan Ulang Tahun Kita)"
                className="w-full rounded-2xl border border-blush-200 bg-blush-50 px-4 py-2.5 text-xs font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 mb-2"
              />

              <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Tuliskan semua kata-kata, doa, harapan, dan perasaanmu di sini..."
                rows={4}
                className="w-full rounded-2xl border border-blush-200 bg-blush-50 px-4 py-2.5 text-xs font-display font-medium text-[#7A4A63] outline-none focus:border-blush-400 mb-3 resize-none"
              />

              <div className="mb-4">
                <label className="text-[10px] font-display font-bold text-lilac-400 block mb-1">
                  Tanggal Buka Surat (Kapan boleh dibaca?):
                </label>
                <input
                  type="date"
                  min={tomorrowStr()}
                  value={openDate}
                  onChange={(e) => setOpenDate(e.target.value)}
                  className="w-full rounded-2xl border border-blush-200 bg-blush-50 px-4 py-2.5 text-xs font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAdd}
                disabled={!title.trim() || !content.trim() || !openDate}
                className="w-full bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-sm py-3 rounded-2xl shadow-soft disabled:opacity-40"
              >
                Kunci & Simpan Surat 🔒
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>

      {/* Read Letter Modal Overlay */}
      <AnimatePresence>
        {activeReadLetter && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[100] bg-black/30 backdrop-blur-sm flex items-center justify-center p-5"
          >
            <motion.div
              initial={{ scale: 0.92, y: 20 }}
              animate={{ scale: 1, y: 0 }}
              exit={{ scale: 0.92, y: 20 }}
              className={`w-full max-w-[380px] rounded-[2.5rem] p-6 shadow-2xl border flex flex-col justify-between max-h-[85vh] relative ${
                THEMES[activeReadLetter.theme].bg
              } ${THEMES[activeReadLetter.theme].border}`}
            >
              {/* Close Button */}
              <button
                onClick={() => setActiveReadLetter(null)}
                className="absolute top-4 right-4 w-8 h-8 rounded-full bg-white/60 flex items-center justify-center shadow-soft text-[#7A4A63]"
              >
                <X size={16} />
              </button>

              <div className="flex-1 overflow-y-auto no-scrollbar pr-1 mt-4">
                <div className="text-center mb-4">
                  <span className="text-4xl">✉️🔓</span>
                  <h2 className="font-display font-bold text-lg text-[#7A4A63] mt-2 leading-tight">
                    {activeReadLetter.title}
                  </h2>
                  <p className="text-[9px] text-[#8A5C74]/70 font-display mt-0.5">
                    Ditulis pada: {new Date(activeReadLetter.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                  </p>
                </div>

                <div className="bg-white/80 rounded-3xl p-5 border border-white/65 shadow-inner text-xs text-[#7A4A63] font-display whitespace-pre-wrap leading-relaxed">
                  {activeReadLetter.content}
                </div>
              </div>

              <div className="mt-5 text-center">
                <div className="inline-flex items-center gap-1 text-[10px] text-green-600 font-display font-bold bg-white/70 px-3 py-1 rounded-full border border-white/50">
                  <Sparkles size={11} className="animate-pulse" /> Terbuka Sejak: {new Date(activeReadLetter.openDate).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
