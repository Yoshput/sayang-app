"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Camera, Calendar, Trash2, Heart } from "lucide-react";
import { useProfile } from "@/app/providers";

interface Memory {
  id: string;
  imageUrl: string; // Compressed Base64 data URL
  caption: string;
  date: string; // yyyy-mm-dd
  rotation: number; // Random tilt for scrapbook feel
}

const STORAGE_KEY = "capsule:memories";

export default function MemoryWall() {
  const { profile } = useProfile();
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState("");
  const [tempImage, setTempImage] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setMemories(JSON.parse(raw));
    } catch {}
  }, []);

  const saveMemories = (newMemories: Memory[]) => {
    setMemories(newMemories);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(newMemories));
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxDim = 320; // 320px is perfect for Polaroid width!
        let w = img.width;
        let h = img.height;
        if (w > h) {
          w = (w / h) * maxDim;
          h = maxDim;
        } else {
          h = (h / w) * maxDim;
          w = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        ctx?.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.65); // High compression for storage
        setTempImage(compressedBase64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!tempImage || !caption.trim() || !date) return;

    const newMemory: Memory = {
      id: Date.now().toString(),
      imageUrl: tempImage,
      caption: caption.trim(),
      date,
      rotation: Math.floor(Math.random() * 12) - 6, // Random rotation between -6 and +6
    };

    const updated = [newMemory, ...memories];
    saveMemories(updated);
    setCaption(""); setDate(""); setTempImage(null);
    setShowAdd(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Hapus memori indah ini? 🥺")) {
      saveMemories(memories.filter((m) => m.id !== id));
    }
  };

  const formatDate = (dateStr: string) => {
    try {
      return new Date(dateStr).toLocaleDateString("id-ID", {
        day: "numeric",
        month: "short",
        year: "numeric",
      });
    } catch {
      return dateStr;
    }
  };

  return (
    <div className="mx-5 mt-5 pb-6">
      {/* Input file helper */}
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div>
          <p className="font-display font-bold text-sm text-[#7A4A63]">Galeri Kenangan Kita 📸</p>
          <p className="text-[10px] text-lilac-400 font-display">Simpan momen berharga dan deskripsi lucunya</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-lilac-400 to-blush-400 text-white text-[10px] font-display font-bold px-3 py-1.5 rounded-2xl shadow-soft"
        >
          <Plus size={12} /> Tambah Foto
        </motion.button>
      </div>

      {/* Memory Grid */}
      {memories.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/60 text-center">
          <p className="text-3xl mb-2">🖼️</p>
          <p className="font-display font-bold text-sm text-[#7A4A63]">Belum ada foto kenangan</p>
          <p className="text-[10px] text-lilac-400 mt-1">Upload momen pertama kalian bersama!</p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-4 pb-2">
          {memories.map((memory, i) => (
            <motion.div
              key={memory.id}
              initial={{ opacity: 0, scale: 0.9, y: 10 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              transition={{ delay: i * 0.06 }}
              style={{ rotate: `${memory.rotation}deg` }}
              className="bg-white p-3 rounded-lg shadow-md border border-gray-100/60 flex flex-col items-center relative group hover:shadow-xl hover:scale-105 transition-all duration-300 scroll-mt-2"
            >
              {/* Retro masking tape */}
              <div className="absolute -top-3 w-10 h-4 bg-white/60 backdrop-blur-sm border-x border-dashed border-[#7A4A63]/10 rotate-[4deg] shadow-sm pointer-events-none" />

              {/* Photo */}
              <img
                src={memory.imageUrl}
                alt={memory.caption}
                className="w-full aspect-square object-cover rounded-sm border border-gray-50 bg-gray-50"
              />

              {/* Polaroid Caption */}
              <div className="w-full mt-2 text-center select-text">
                <p className="font-display font-bold text-[10px] text-[#7A4A63] leading-tight break-words">
                  {memory.caption}
                </p>
                <div className="flex items-center justify-center gap-1 mt-1 text-[8px] text-lilac-400">
                  <Calendar size={8} />
                  <span>{formatDate(memory.date)}</span>
                </div>
              </div>

              {/* Delete button */}
              <button
                onClick={(e) => handleDelete(memory.id, e)}
                className="absolute top-1.5 right-1.5 w-5 h-5 rounded-full bg-white/90 shadow-soft flex items-center justify-center text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity"
              >
                <Trash2 size={10} />
              </button>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Memory Modal */}
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
                <p className="font-display font-bold text-sm text-[#7A4A63]">Tambah Kenangan Indah 📸</p>
                <button onClick={() => setShowAdd(false)}><X size={16} className="text-lilac-300" /></button>
              </div>

              {/* Photo Area */}
              <div className="flex flex-col items-center mb-4">
                {tempImage ? (
                  <div className="relative w-40 h-40 bg-gray-50 rounded-2xl overflow-hidden shadow-inner border border-blush-100">
                    <img src={tempImage} alt="preview" className="w-full h-full object-cover" />
                    <button
                      onClick={() => setTempImage(null)}
                      className="absolute top-2 right-2 w-7 h-7 rounded-full bg-black/40 text-white flex items-center justify-center"
                    >
                      <X size={14} />
                    </button>
                  </div>
                ) : (
                  <motion.button
                    whileTap={{ scale: 0.95 }}
                    onClick={() => fileInputRef.current?.click()}
                    className="w-40 h-40 rounded-2xl bg-blush-50/50 border border-dashed border-blush-300 flex flex-col items-center justify-center text-blush-400 gap-1.5 shadow-inner"
                  >
                    <Camera size={26} />
                    <span className="text-[10px] font-display font-bold">Pilih Foto Kenangan</span>
                  </motion.button>
                )}
              </div>

              <input
                value={caption}
                onChange={(e) => setCaption(e.target.value)}
                placeholder="Tulis caption (misal: Ini waktu main di Jogja 🍦)"
                className="w-full rounded-2xl border border-blush-200 bg-blush-50 px-4 py-2.5 text-xs font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 mb-2"
              />

              <div className="mb-4">
                <label className="text-[10px] font-display font-bold text-lilac-400 block mb-1">
                  Kapan kejadiannya?
                </label>
                <input
                  type="date"
                  value={date}
                  max={new Date().toISOString().split("T")[0]}
                  onChange={(e) => setDate(e.target.value)}
                  className="w-full rounded-2xl border border-blush-200 bg-blush-50 px-4 py-2.5 text-xs font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400"
                />
              </div>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={handleAdd}
                disabled={!tempImage || !caption.trim() || !date}
                className="w-full bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-sm py-3 rounded-2xl shadow-soft disabled:opacity-40"
              >
                Simpan Kenangan 🌸
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
