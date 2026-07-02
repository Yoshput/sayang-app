"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Gift, Bell, Trash2 } from "lucide-react";
import { useProfile } from "@/app/providers";

interface HintItem {
  id: string;
  name: string;
  link?: string;
  emoji: string;
  addedBy: "me" | "partner";
  createdAt: number;
}

const STORAGE_KEY = "couple:hints";
const EMOJIS = ["👜", "👟", "💍", "📱", "✈️", "🎁", "💄", "🧴", "🎸", "📚", "🎧", "🌸"];

function loadHints(): HintItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch { return []; }
}

function saveHints(items: HintItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function HintDrop() {
  const { profile } = useProfile();
  const [hints, setHints] = useState<HintItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [link, setLink] = useState("");
  const [emoji, setEmoji] = useState("🎁");
  const [addedBy, setAddedBy] = useState<"me" | "partner">("me");

  useEffect(() => { setHints(loadHints()); }, []);

  const addHint = () => {
    if (!name.trim()) return;
    const item: HintItem = {
      id: Date.now().toString(),
      name: name.trim(),
      link: link.trim() || undefined,
      emoji,
      addedBy,
      createdAt: Date.now(),
    };
    const updated = [...hints, item];
    setHints(updated);
    saveHints(updated);
    setName(""); setLink(""); setEmoji("🎁"); setShowAdd(false);
  };

  const removeHint = (id: string) => {
    const updated = hints.filter((h) => h.id !== id);
    setHints(updated);
    saveHints(updated);
  };

  return (
    <div className="mx-5 mt-5 pb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-display font-bold text-sm text-[#7A4A63]">Hint Drop 🎁</p>
          <p className="text-[10px] text-lilac-400 font-display">Kode keras buat yang tersayang</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-lilac-400 to-blush-400 text-white text-[10px] font-display font-bold px-3 py-1.5 rounded-2xl shadow-soft"
        >
          <Plus size={12} /> Drop Hint
        </motion.button>
      </div>

      {hints.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/60 text-center"
        >
          <p className="text-3xl mb-2">🎁</p>
          <p className="font-display font-bold text-sm text-[#7A4A63]">Belum ada hint</p>
          <p className="text-[10px] text-lilac-400 mt-1">Kasih kode keras pertama kamu!</p>
        </motion.div>
      ) : (
        <div className="space-y-2.5">
          {hints.map((hint, i) => (
            <motion.div
              key={hint.id}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.05 }}
              className={`flex items-center gap-3 p-3.5 rounded-2xl border shadow-softer ${
                hint.addedBy === "me"
                  ? "bg-blush-50/80 border-blush-100"
                  : "bg-lilac-50/80 border-lilac-100"
              }`}
            >
              <span className="text-2xl">{hint.emoji}</span>
              <div className="flex-1 min-w-0">
                <p className="font-display font-bold text-xs text-[#7A4A63] truncate">{hint.name}</p>
                <div className="flex items-center gap-1 mt-0.5">
                  <Bell size={9} className={hint.addedBy === "me" ? "text-blush-400" : "text-lilac-400"} />
                  <p className="text-[9px] text-lilac-400 font-display">
                    Hint dari{" "}
                    <span className="font-bold">
                      {hint.addedBy === "me" ? profile?.myName : profile?.herName}
                    </span>
                  </p>
                </div>
                {hint.link && (
                  <a
                    href={hint.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-[9px] text-lilac-400 underline font-display truncate block"
                  >
                    Lihat di sini →
                  </a>
                )}
              </div>
              <motion.button
                whileTap={{ scale: 0.9 }}
                onClick={() => removeHint(hint.id)}
                className="w-6 h-6 rounded-full bg-white/70 flex items-center justify-center"
              >
                <Trash2 size={11} className="text-lilac-300" />
              </motion.button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add sheet */}
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
                <p className="font-display font-bold text-sm text-[#7A4A63]">Drop Hint Baru 🎁</p>
                <button onClick={() => setShowAdd(false)}><X size={16} className="text-lilac-300" /></button>
              </div>

              {/* Who is hinting */}
              <div className="flex gap-2 mb-3">
                {(["me", "partner"] as const).map((by) => (
                  <button
                    key={by}
                    onClick={() => setAddedBy(by)}
                    className={`flex-1 py-2 rounded-2xl text-xs font-display font-bold transition-all ${
                      addedBy === by
                        ? "bg-blush-400 text-white shadow-soft"
                        : "bg-blush-50 text-[#8A5C74]"
                    }`}
                  >
                    {by === "me" ? `Hint ${profile?.myName ?? "kamu"}` : `Hint ${profile?.herName ?? "dia"}`}
                  </button>
                ))}
              </div>

              {/* Emoji */}
              <div className="flex gap-2 mb-3 overflow-x-auto no-scrollbar pb-1">
                {EMOJIS.map((e) => (
                  <button
                    key={e}
                    onClick={() => setEmoji(e)}
                    className={`text-xl w-9 h-9 rounded-xl shrink-0 flex items-center justify-center transition-all ${
                      emoji === e ? "bg-blush-100 scale-110 shadow-softer" : "bg-blush-50"
                    }`}
                  >
                    {e}
                  </button>
                ))}
              </div>

              <input
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder='Nama barang (misal: "Sepatu Nike Air Max")'
                className="w-full rounded-2xl border border-blush-200 bg-blush-50 px-4 py-2.5 text-xs font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 mb-2"
              />
              <input
                value={link}
                onChange={(e) => setLink(e.target.value)}
                placeholder="Link produk (opsional)"
                className="w-full rounded-2xl border border-blush-200 bg-blush-50 px-4 py-2.5 text-xs font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 mb-4"
              />

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={addHint}
                disabled={!name.trim()}
                className="w-full bg-gradient-to-r from-lilac-400 to-blush-400 text-white font-display font-bold text-sm py-3 rounded-2xl shadow-soft disabled:opacity-40"
              >
                Drop Hint 🎁
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
