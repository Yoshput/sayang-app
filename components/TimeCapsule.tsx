"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Lock, Unlock, Mail, Calendar, Sparkles, Clock, Trash2 } from "lucide-react";
import { useProfile } from "@/app/providers";
import IconBadge from "@/components/ui/IconBadge";

interface Letter {
  id: string;
  title: string;
  content: string;
  openDate: string; // yyyy-mm-dd
  theme: "pink" | "purple" | "mint" | "cream";
  createdAt: number;
}

const STORAGE_KEY = "couple:letters";

const THEMES = {
  pink: {
    bg: "bg-gradient-to-br from-[#FFF0F6] to-[#FFE4EF]",
    border: "border-blush-200",
    tint: "blush" as const,
    badge: "bg-blush-100 text-blush-500",
  },
  purple: {
    bg: "bg-gradient-to-br from-[#FAF5FF] to-[#EFE8FF]",
    border: "border-lilac-200",
    tint: "lilac" as const,
    badge: "bg-lilac-100 text-lilac-500",
  },
  mint: {
    bg: "bg-gradient-to-br from-[#F0FDF4] to-[#DCFCE7]",
    border: "border-mint-200",
    tint: "mint" as const,
    badge: "bg-mint-100 text-mint-600",
  },
  cream: {
    bg: "bg-gradient-to-br from-[#FFFDF5] to-[#FEF3C7]",
    border: "border-amber-200",
    tint: "amber" as const,
    badge: "bg-amber-100 text-amber-700",
  },
};

export default function TimeCapsule() {
  const { profile } = useProfile();
  const [letters, setLetters] = useState<Letter[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [openDate, setOpenDate] = useState("");
  const [theme, setTheme] = useState<"pink" | "purple" | "mint" | "cream">("pink");
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
    setTitle("");
    setContent("");
    setOpenDate("");
    setTheme("pink");
    setShowAdd(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Hapus surat harapan ini?")) {
      saveLetters(letters.filter((l) => l.id !== id));
      if (activeReadLetter?.id === id) setActiveReadLetter(null);
    }
  };

  const daysRemaining = (targetDate: string) => {
    const target = new Date(targetDate);
    const now = new Date();
    target.setHours(0, 0, 0, 0);
    now.setHours(0, 0, 0, 0);
    return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  const handleLetterClick = (letter: Letter) => {
    const remaining = daysRemaining(letter.openDate);
    if (remaining > 0) {
      setShakeLetterId(letter.id);
      setTimeout(() => setShakeLetterId(null), 500);
    } else {
      setActiveReadLetter(letter);
    }
  };

  return (
    <div className="mx-4 sm:mx-5 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <IconBadge icon={Mail} tint="blush" size="sm" rounded="xl" />
          <div>
            <p className="font-display font-bold text-sm text-[#503043]">
              Surat Harapan Waktu
            </p>
            <p className="text-[10px] text-[#7A4A63] font-display">
              Terkunci hingga tanggal pembukaan tiba
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blush-400 to-lilac-400 text-white text-[10px] font-display font-bold px-3 py-1.5 rounded-xl shadow-soft"
        >
          <Plus size={13} /> Tulis Surat
        </motion.button>
      </div>

      {/* Letters List */}
      {letters.length === 0 ? (
        <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-6 border border-white/80 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
          <IconBadge icon={Mail} tint="blush" size="lg" rounded="2xl" className="mx-auto mb-2" />
          <p className="font-display font-bold text-sm text-[#503043]">Belum ada surat harapan</p>
          <p className="text-[10px] text-[#7A4A63] mt-1">
            Tulis pesan cinta atau impian masa depan untuk dibuka nanti!
          </p>
        </div>
      ) : (
        <div className="space-y-2.5">
          {letters.map((letter) => {
            const remaining = daysRemaining(letter.openDate);
            const isLocked = remaining > 0;
            const themeConfig = THEMES[letter.theme] || THEMES.pink;

            return (
              <motion.div
                key={letter.id}
                animate={shakeLetterId === letter.id ? { x: [-6, 6, -4, 4, 0] } : {}}
                transition={{ duration: 0.4 }}
                onClick={() => handleLetterClick(letter)}
                className={`cursor-pointer rounded-2xl p-3.5 border backdrop-blur-md shadow-softer flex items-center justify-between transition-all hover:scale-[1.01] ${themeConfig.bg} ${themeConfig.border}`}
              >
                <div className="flex items-center gap-3 min-w-0 pr-2">
                  <IconBadge
                    icon={isLocked ? Lock : Unlock}
                    tint={themeConfig.tint}
                    size="sm"
                    rounded="xl"
                  />
                  <div className="min-w-0">
                    <p className="font-display font-bold text-xs text-[#503043] truncate">
                      {letter.title}
                    </p>
                    <p className="text-[10px] text-[#7A4A63] flex items-center gap-1 mt-0.5">
                      <Calendar size={10} />
                      <span>Buka: {letter.openDate}</span>
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2 shrink-0">
                  {isLocked ? (
                    <span className="text-[10px] font-bold text-blush-500 bg-white/80 px-2.5 py-1 rounded-xl border border-blush-100 flex items-center gap-1 shadow-softer">
                      <Clock size={11} /> {remaining} hari lagi
                    </span>
                  ) : (
                    <span className="text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-xl border border-emerald-100 flex items-center gap-1 shadow-softer">
                      <Unlock size={11} /> Siap Dibaca!
                    </span>
                  )}

                  <button
                    onClick={(e) => handleDelete(letter.id, e)}
                    className="p-1.5 rounded-lg text-[#7A4A63]/50 hover:text-rose-500 hover:bg-white/60 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add Letter Modal */}
      <AnimatePresence>
        {showAdd && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/35 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.94 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.94 }}
              className="w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl p-5 border border-white/80 shadow-2xl"
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-2">
                  <IconBadge icon={Mail} tint="blush" size="xs" rounded="md" />
                  <p className="font-display font-bold text-sm text-[#503043]">
                    Tulis Surat Harapan
                  </p>
                </div>
                <button
                  onClick={() => setShowAdd(false)}
                  className="p-1 rounded-full text-[#7A4A63] hover:bg-blush-50"
                >
                  <X size={16} />
                </button>
              </div>

              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Judul surat harapan..."
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white/80 border border-blush-100 text-xs font-display text-[#503043] outline-none focus:border-blush-400"
                />

                <textarea
                  rows={4}
                  placeholder="Tuliskan harapan, pesan cinta, atau doa di masa depan..."
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                  className="w-full p-3.5 rounded-2xl bg-white/80 border border-blush-100 text-xs font-display text-[#503043] outline-none focus:border-blush-400 resize-none leading-relaxed"
                />

                <div>
                  <label className="text-[10px] font-display font-bold text-[#7A4A63] block mb-1">
                    Tanggal Buka Surat (Terkunci hingga hari ini):
                  </label>
                  <input
                    type="date"
                    min={tomorrowStr()}
                    value={openDate}
                    onChange={(e) => setOpenDate(e.target.value)}
                    className="w-full px-3.5 py-2 rounded-xl bg-white border border-blush-100 text-xs font-display text-[#503043] outline-none"
                  />
                </div>

                {/* Theme Selector */}
                <div>
                  <label className="text-[10px] font-display font-bold text-[#7A4A63] block mb-1.5">
                    Warna Kertas Surat:
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {(["pink", "purple", "mint", "cream"] as const).map((t) => (
                      <button
                        key={t}
                        onClick={() => setTheme(t)}
                        className={`py-1.5 rounded-xl border text-[10px] font-bold capitalize transition-all ${
                          theme === t ? "border-blush-400 shadow-softer bg-white font-black scale-105" : "bg-white/60 border-transparent"
                        }`}
                      >
                        {t}
                      </button>
                    ))}
                  </div>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdd}
                  className="w-full py-3 rounded-2xl bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-xs shadow-soft flex items-center justify-center gap-1.5 mt-2"
                >
                  <Lock size={14} /> Kunci &amp; Simpan Surat
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* Read Opened Letter Modal */}
      <AnimatePresence>
        {activeReadLetter && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/40 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 20 }}
              className="w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl p-6 border border-white/80 shadow-2xl relative text-left"
            >
              <button
                onClick={() => setActiveReadLetter(null)}
                className="absolute top-4 right-4 p-1 rounded-full text-[#7A4A63] hover:bg-blush-50"
              >
                <X size={17} />
              </button>

              <div className="flex items-center gap-2 mb-3">
                <IconBadge icon={Unlock} tint="rose" size="sm" rounded="xl" />
                <div>
                  <h3 className="font-display font-bold text-base text-[#503043]">
                    {activeReadLetter.title}
                  </h3>
                  <p className="text-[10px] text-[#7A4A63]">
                    Dibuka pada: {activeReadLetter.openDate}
                  </p>
                </div>
              </div>

              <div className="mt-4 p-4 rounded-2xl bg-gradient-to-br from-[#FFF5F8] to-[#FAF5FF] border border-blush-100/80 max-h-60 overflow-y-auto no-scrollbar">
                <p className="text-xs text-[#503043] leading-relaxed whitespace-pre-line font-medium">
                  {activeReadLetter.content}
                </p>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
