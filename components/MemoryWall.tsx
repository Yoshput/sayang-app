"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, Camera, Image, Trash2, Calendar, MapPin, Sparkles } from "lucide-react";
import IconBadge from "@/components/ui/IconBadge";

interface Memory {
  id: string;
  image: string; // compressed base64
  caption: string;
  date: string; // yyyy-mm-dd
  location?: string;
}

const STORAGE_KEY = "couple:memories";

function loadMemories(): Memory[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

function saveMemories(mems: Memory[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(mems));
}

export default function MemoryWall() {
  const [memories, setMemories] = useState<Memory[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [caption, setCaption] = useState("");
  const [date, setDate] = useState(new Date().toISOString().split("T")[0]);
  const [location, setLocation] = useState("");
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [viewingMemory, setViewingMemory] = useState<Memory | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    setMemories(loadMemories());
  }, []);

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new window.Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxDim = 800; // compress for localStorage efficiency
        let w = img.width;
        let h = img.height;
        if (w > h) {
          if (w > maxDim) {
            h = (h * maxDim) / w;
            w = maxDim;
          }
        } else {
          if (h > maxDim) {
            w = (w * maxDim) / h;
            h = maxDim;
          }
        }
        canvas.width = w;
        canvas.height = h;
        ctx?.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.75);
        setSelectedImage(compressedBase64);
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  const handleAdd = () => {
    if (!selectedImage || !caption.trim()) return;

    const newMem: Memory = {
      id: Date.now().toString(),
      image: selectedImage,
      caption: caption.trim(),
      date,
      location: location.trim() || undefined,
    };

    const updated = [newMem, ...memories];
    setMemories(updated);
    saveMemories(updated);

    setSelectedImage(null);
    setCaption("");
    setLocation("");
    setShowAdd(false);
  };

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    if (confirm("Hapus foto kenangan ini?")) {
      const updated = memories.filter((m) => m.id !== id);
      setMemories(updated);
      saveMemories(updated);
      if (viewingMemory?.id === id) setViewingMemory(null);
    }
  };

  return (
    <div className="mx-4 sm:mx-5 mt-4 pb-6">
      <input
        type="file"
        ref={fileInputRef}
        onChange={handleImageChange}
        accept="image/*"
        className="hidden"
      />

      {/* Header */}
      <div className="flex items-center justify-between mb-3.5">
        <div className="flex items-center gap-2.5">
          <IconBadge icon={Camera} tint="rose" size="sm" rounded="xl" />
          <div>
            <p className="font-display font-bold text-sm text-[#503043]">
              Galeri Kenangan Kita
            </p>
            <p className="text-[10px] text-[#7A4A63] font-display">
              Momen berharga dan kisah manis berdua
            </p>
          </div>
        </div>

        <motion.button
          whileTap={{ scale: 0.94 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blush-400 to-lilac-400 text-white text-[10px] font-display font-bold px-3 py-1.5 rounded-xl shadow-soft"
        >
          <Plus size={13} /> Tambah Foto
        </motion.button>
      </div>

      {/* Grid */}
      {memories.length === 0 ? (
        <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-6 border border-white/80 text-center shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
          <IconBadge icon={Image} tint="rose" size="lg" rounded="2xl" className="mx-auto mb-2" />
          <p className="font-display font-bold text-sm text-[#503043]">Belum ada foto kenangan</p>
          <p className="text-[10px] text-[#7A4A63] mt-1">
            Abadikan momen pertama kalian jalan bareng di sini!
          </p>
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-3 pb-2">
          {memories.map((mem) => (
            <motion.div
              key={mem.id}
              whileTap={{ scale: 0.97 }}
              onClick={() => setViewingMemory(mem)}
              className="cursor-pointer bg-white/85 backdrop-blur-md rounded-2xl p-2.5 border border-white shadow-softer flex flex-col group relative overflow-hidden"
            >
              <div className="w-full aspect-square rounded-xl overflow-hidden bg-blush-50 relative">
                <img
                  src={mem.image}
                  alt={mem.caption}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <button
                  onClick={(e) => handleDelete(mem.id, e)}
                  className="absolute top-1.5 right-1.5 p-1 rounded-full bg-black/40 text-white hover:bg-rose-500 transition-colors"
                >
                  <Trash2 size={11} />
                </button>
              </div>

              <div className="mt-2 px-1">
                <p className="font-display font-bold text-xs text-[#503043] truncate">
                  {mem.caption}
                </p>
                <div className="flex items-center gap-1 text-[9px] text-[#7A4A63] mt-0.5">
                  <Calendar size={9} />
                  <span>{mem.date}</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      )}

      {/* Add Memory Modal */}
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
                  Tambah Foto Kenangan
                </p>
                <button
                  onClick={() => setShowAdd(false)}
                  className="p-1 rounded-full text-[#7A4A63] hover:bg-blush-50"
                >
                  <X size={16} />
                </button>
              </div>

              {/* Photo Area */}
              <div
                onClick={() => fileInputRef.current?.click()}
                className="w-full h-40 rounded-2xl border-2 border-dashed border-blush-200 bg-blush-50/50 flex flex-col items-center justify-center cursor-pointer overflow-hidden relative mb-3 hover:bg-blush-50"
              >
                {selectedImage ? (
                  <img src={selectedImage} alt="preview" className="w-full h-full object-cover" />
                ) : (
                  <div className="text-center">
                    <IconBadge icon={Camera} tint="blush" size="md" rounded="xl" className="mx-auto mb-1.5" />
                    <p className="font-display font-bold text-xs text-[#503043]">
                      Pilih Foto dari Galeri
                    </p>
                    <p className="text-[9px] text-[#7A4A63]">Tap untuk memilih gambar</p>
                  </div>
                )}
              </div>

              <div className="space-y-2.5">
                <input
                  type="text"
                  placeholder="Cerita singkat (misal: Main di Jogja)"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  className="w-full px-3.5 py-2.5 rounded-2xl bg-white/80 border border-blush-100 text-xs font-display text-[#503043] outline-none"
                />

                <div className="grid grid-cols-2 gap-2">
                  <input
                    type="date"
                    value={date}
                    onChange={(e) => setDate(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-blush-100 text-xs font-display text-[#503043] outline-none"
                  />
                  <input
                    type="text"
                    placeholder="Lokasi (opsional)"
                    value={location}
                    onChange={(e) => setLocation(e.target.value)}
                    className="w-full px-3 py-2 rounded-xl bg-white border border-blush-100 text-xs font-display text-[#503043] outline-none"
                  />
                </div>

                <motion.button
                  whileTap={{ scale: 0.96 }}
                  onClick={handleAdd}
                  disabled={!selectedImage || !caption.trim()}
                  className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-xs shadow-soft disabled:opacity-50 mt-1"
                >
                  Simpan Kenangan
                </motion.button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

      {/* View Memory Detail Modal */}
      <AnimatePresence>
        {viewingMemory && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-md">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              className="w-full max-w-sm bg-white rounded-3xl p-3.5 shadow-2xl overflow-hidden relative text-left"
            >
              <button
                onClick={() => setViewingMemory(null)}
                className="absolute top-5 right-5 p-1.5 rounded-full bg-black/40 text-white z-10 hover:bg-black/60"
              >
                <X size={15} />
              </button>

              <div className="w-full max-h-80 rounded-2xl overflow-hidden bg-black flex items-center justify-center">
                <img
                  src={viewingMemory.image}
                  alt={viewingMemory.caption}
                  className="w-full h-auto max-h-80 object-contain"
                />
              </div>

              <div className="p-3">
                <h3 className="font-display font-bold text-sm text-[#503043]">
                  {viewingMemory.caption}
                </h3>
                <div className="flex items-center gap-3 text-[10px] text-[#7A4A63] mt-1">
                  <span className="flex items-center gap-1">
                    <Calendar size={11} /> {viewingMemory.date}
                  </span>
                  {viewingMemory.location && (
                    <span className="flex items-center gap-1">
                      <MapPin size={11} /> {viewingMemory.location}
                    </span>
                  )}
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
