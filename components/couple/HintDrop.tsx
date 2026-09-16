"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Gift, Bell, Trash2, ExternalLink } from "lucide-react";
import { useProfile } from "@/app/providers";
import IconBadge from "@/components/ui/IconBadge";

interface HintItem {
  id: string;
  name: string;
  link?: string;
  iconName: string;
  addedBy: "me" | "partner";
  createdAt: number;
}

const STORAGE_KEY = "couple:hints";

const ICON_OPTIONS = [
  { iconName: "Gift", label: "Kado" },
  { iconName: "ShoppingBag", label: "Tas / Belanja" },
  { iconName: "Sparkles", label: "Perawatan" },
  { iconName: "Smartphone", label: "Gadget" },
  { iconName: "Plane", label: "Tiket Liburan" },
  { iconName: "Heart", label: "Spesial" },
  { iconName: "BookOpen", label: "Buku" },
  { iconName: "Headphones", label: "Audio" },
  { iconName: "Watch", label: "Jam / Aksesoris" },
  { iconName: "Coffee", label: "Kafe / Kuliner" },
];

function loadHints(): HintItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((it: any) => ({
      ...it,
      iconName: it.iconName || "Gift",
    }));
  } catch {
    return [];
  }
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
  const [selectedIcon, setSelectedIcon] = useState("Gift");
  const [addedBy, setAddedBy] = useState<"me" | "partner">("me");

  useEffect(() => {
    setHints(loadHints());
  }, []);

  const addHint = () => {
    if (!name.trim()) return;
    const item: HintItem = {
      id: Date.now().toString(),
      name: name.trim(),
      link: link.trim() || undefined,
      iconName: selectedIcon,
      addedBy,
      createdAt: Date.now(),
    };
    const updated = [...hints, item];
    setHints(updated);
    saveHints(updated);
    setName("");
    setLink("");
    setSelectedIcon("Gift");
    setShowAdd(false);
  };

  const removeHint = (id: string) => {
    const updated = hints.filter((h) => h.id !== id);
    setHints(updated);
    saveHints(updated);
  };

  const myName = profile?.myName ?? "Aku";
  const partnerName = profile?.herName ?? "Dia";

  return (
    <div className="mx-4 sm:mx-5 mt-4">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div className="flex items-center gap-2.5">
          <IconBadge icon={Gift} tint="blush" size="sm" rounded="xl" />
          <div>
            <p className="font-display font-bold text-sm text-[#503043]">
              Hint Drop (Kode Kado)
            </p>
            <p className="text-[10px] text-[#7A4A63] font-display">
              Titip kode barang atau tempat yang lagi dipengen
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blush-400 to-lilac-400 text-white text-[10px] font-display font-bold px-3 py-1.5 rounded-xl shadow-soft"
        >
          <Plus size={13} /> Titip Kode
        </motion.button>
      </div>

      {/* Hints List */}
      {hints.length === 0 ? (
        <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-5 border border-white/80 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
          <IconBadge icon={Gift} tint="blush" size="lg" rounded="2xl" className="mx-auto mb-2" />
          <p className="font-display font-bold text-xs text-[#503043]">Belum ada kode kado</p>
          <p className="text-[10px] text-[#7A4A63] mt-1">
            Titip barang incaranmu biar pasangan tahu tanpa harus ditanya!
          </p>
        </div>
      ) : (
        <div className="space-y-2">
          {hints.map((h) => {
            const isMe = h.addedBy === "me";
            return (
              <motion.div
                key={h.id}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-white/80 backdrop-blur-xl rounded-2xl p-3 border border-white/80 shadow-softer flex items-center justify-between gap-3"
              >
                <div className="flex items-center gap-2.5 min-w-0">
                  <IconBadge icon={h.iconName} tint={isMe ? "blush" : "lilac"} size="sm" rounded="xl" />
                  <div className="min-w-0">
                    <p className="font-display font-bold text-xs text-[#503043] truncate">{h.name}</p>
                    <div className="flex items-center gap-2 text-[9px] text-[#7A4A63] mt-0.5">
                      <span className={`font-bold px-1.5 py-0.5 rounded-md ${
                        isMe ? "bg-blush-50 text-blush-600" : "bg-lilac-50 text-lilac-600"
                      }`}>
                        Kode dari {isMe ? myName : partnerName}
                      </span>
                      {h.link && (
                        <a
                          href={h.link.startsWith("http") ? h.link : `https://${h.link}`}
                          target="_blank"
                          rel="noreferrer"
                          className="flex items-center gap-0.5 text-blush-500 hover:underline font-semibold"
                        >
                          <span>Buka Link</span>
                          <ExternalLink size={10} />
                        </a>
                      )}
                    </div>
                  </div>
                </div>

                <button
                  onClick={() => removeHint(h.id)}
                  className="p-1.5 rounded-lg text-[#7A4A63]/50 hover:text-rose-500 hover:bg-rose-50 transition-colors shrink-0"
                >
                  <Trash2 size={13} />
                </button>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add Hint Modal */}
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
                <p className="font-display font-bold text-sm text-[#503043]">
                  Titip Kode Kado Baru
                </p>
                <button onClick={() => setShowAdd(false)} className="p-1 rounded-full text-[#7A4A63]">
                  <X size={16} />
                </button>
              </div>

              {/* Icon Selection */}
              <p className="text-[10px] font-display font-bold text-[#7A4A63] uppercase tracking-wider mb-2">
                Pilih Kategori:
              </p>
              <div className="flex gap-2 overflow-x-auto no-scrollbar pb-2 mb-3">
                {ICON_OPTIONS.map((opt) => (
                  <button
                    key={opt.iconName}
                    onClick={() => setSelectedIcon(opt.iconName)}
                    className={`p-1.5 rounded-xl border transition-all ${
                      selectedIcon === opt.iconName
                        ? "bg-blush-100 border-blush-400 scale-105"
                        : "bg-white/70 border-white/60 hover:bg-white"
                    }`}
                  >
                    <IconBadge icon={opt.iconName} tint="blush" size="xs" rounded="md" />
                  </button>
                ))}
              </div>

              <div className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Nama barang (misal: Parfum / Sepatu)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white/80 border border-blush-100 text-xs font-display text-[#503043] outline-none"
                />

                <input
                  type="url"
                  placeholder="Link produk / toko (opsional)"
                  value={link}
                  onChange={(e) => setLink(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white/80 border border-blush-100 text-xs font-display text-[#503043] outline-none"
                />

                <div className="flex gap-2 pt-1">
                  <button
                    type="button"
                    onClick={() => setAddedBy("me")}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-display font-bold border transition-all ${
                      addedBy === "me"
                        ? "bg-blush-400 text-white border-blush-400 shadow-soft"
                        : "bg-white/70 text-[#7A4A63] border-blush-100"
                    }`}
                  >
                    Dari {myName}
                  </button>
                  <button
                    type="button"
                    onClick={() => setAddedBy("partner")}
                    className={`flex-1 py-2 rounded-xl text-[10px] font-display font-bold border transition-all ${
                      addedBy === "partner"
                        ? "bg-lilac-400 text-white border-lilac-400 shadow-soft"
                        : "bg-white/70 text-[#7A4A63] border-lilac-100"
                    }`}
                  >
                    Dari {partnerName}
                  </button>
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={addHint}
                  disabled={!name.trim()}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-xs shadow-soft disabled:opacity-50 mt-1"
                >
                  Simpan Kode
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
