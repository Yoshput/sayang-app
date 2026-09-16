"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ShoppingBag, Target, Trash2, CheckCircle } from "lucide-react";
import IconBadge from "@/components/ui/IconBadge";

interface WishItem {
  id: string;
  name: string;
  price: number;
  saved: number;
  iconName: string;
}

const STORAGE_KEY = "wishlist:items";

const ICON_OPTIONS = [
  { iconName: "ShoppingBag", label: "Tas / Belanja" },
  { iconName: "Sparkles", label: "Skincare / Make up" },
  { iconName: "Smartphone", label: "Gadget" },
  { iconName: "Plane", label: "Traveling" },
  { iconName: "Music", label: "Alat Musik" },
  { iconName: "Camera", label: "Fotografi" },
  { iconName: "Gamepad2", label: "Gaming" },
  { iconName: "Gift", label: "Hadiah" },
  { iconName: "BookOpen", label: "Buku" },
  { iconName: "Headphones", label: "Audio" },
  { iconName: "Watch", label: "Aksesoris" },
  { iconName: "Heart", label: "Spesial" },
];

function loadItems(): WishItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return parsed.map((it: any) => ({
      ...it,
      iconName: it.iconName || "ShoppingBag",
    }));
  } catch {
    return [];
  }
}

function saveItems(items: WishItem[]) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
}

export default function WishlistTracker() {
  const [items, setItems] = useState<WishItem[]>([]);
  const [showAdd, setShowAdd] = useState(false);
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [selectedIcon, setSelectedIcon] = useState("ShoppingBag");
  const [addSavedFor, setAddSavedFor] = useState<string | null>(null);
  const [addAmount, setAddAmount] = useState("");

  useEffect(() => {
    setItems(loadItems());
  }, []);

  const addItem = () => {
    if (!name.trim() || !price) return;
    const newItem: WishItem = {
      id: Date.now().toString(),
      name: name.trim(),
      price: parseFloat(price),
      saved: 0,
      iconName: selectedIcon,
    };
    const updated = [...items, newItem];
    setItems(updated);
    saveItems(updated);
    setName("");
    setPrice("");
    setSelectedIcon("ShoppingBag");
    setShowAdd(false);
  };

  const addSavings = (id: string, amount: number) => {
    const updated = items.map((item) =>
      item.id === id ? { ...item, saved: Math.min(item.price, item.saved + amount) } : item
    );
    setItems(updated);
    saveItems(updated);
    setAddSavedFor(null);
    setAddAmount("");
  };

  const deleteItem = (id: string) => {
    const updated = items.filter((i) => i.id !== id);
    setItems(updated);
    saveItems(updated);
  };

  const totalTarget = items.reduce((acc, i) => acc + i.price, 0);
  const totalSaved = items.reduce((acc, i) => acc + i.saved, 0);
  const overallPct = totalTarget > 0 ? Math.round((totalSaved / totalTarget) * 100) : 0;

  return (
    <div className="mx-4 sm:mx-5 mt-4 pb-6">
      {/* Overview Card */}
      <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4.5 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] mb-4">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <IconBadge icon={ShoppingBag} tint="rose" size="sm" rounded="xl" />
            <div>
              <p className="font-display font-bold text-sm text-[#503043]">Wishlist Impian</p>
              <p className="text-[10px] text-[#7A4A63] font-display">
                {items.length === 0
                  ? "Tabung impianmu satu per satu"
                  : `${items.length} impian sedang diperjuangkan`}
              </p>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setShowAdd(true)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-[10px] shadow-softer"
          >
            <Plus size={13} />
            <span>Tambah</span>
          </motion.button>
        </div>

        {/* Progress Bar */}
        {items.length > 0 && (
          <div>
            <div className="flex justify-between text-[10px] font-display font-semibold text-[#7A4A63] mb-1.5">
              <span>Terkumpul: Rp {totalSaved.toLocaleString("id-ID")}</span>
              <span>{overallPct}%</span>
            </div>
            <div className="w-full h-2 bg-blush-100 rounded-full overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-blush-400 to-lilac-400 rounded-full"
                animate={{ width: `${overallPct}%` }}
                transition={{ duration: 0.5 }}
              />
            </div>
          </div>
        )}
      </div>

      {/* Add Item Modal / Drawer */}
      <AnimatePresence>
        {showAdd && (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 15 }}
            className="bg-white/90 backdrop-blur-xl rounded-3xl p-5 border border-blush-200/80 shadow-soft mb-4"
          >
            <div className="flex items-center justify-between mb-4">
              <p className="font-display font-bold text-xs text-[#503043]">
                Tambah Wishlist Baru
              </p>
              <button
                onClick={() => setShowAdd(false)}
                className="p-1 rounded-full text-[#7A4A63] hover:bg-blush-50"
              >
                <X size={15} />
              </button>
            </div>

            {/* Icon Picker */}
            <p className="text-[10px] font-display font-bold text-[#7A4A63] uppercase tracking-wider mb-2">
              Pilih Kategori Ikon:
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
                  <IconBadge icon={opt.iconName} tint="rose" size="xs" rounded="md" />
                </button>
              ))}
            </div>

            {/* Form Fields */}
            <div className="space-y-2.5">
              <input
                type="text"
                placeholder="Nama barang / impian"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white/80 border border-blush-100 text-xs font-display text-[#503043] focus:border-blush-400 outline-none"
              />
              <input
                type="number"
                placeholder="Target harga (Rp)"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-2xl bg-white/80 border border-blush-100 text-xs font-display text-[#503043] focus:border-blush-400 outline-none"
              />
              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={addItem}
                className="w-full py-2.5 rounded-2xl bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-xs shadow-soft"
              >
                Simpan ke Wishlist
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Wishlist Items List */}
      {items.length === 0 ? (
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/60 text-center">
          <IconBadge icon={ShoppingBag} tint="rose" size="lg" rounded="2xl" className="mx-auto mb-2" />
          <p className="font-display font-bold text-sm text-[#503043]">Wishlist masih kosong</p>
          <p className="text-[10px] text-[#7A4A63] mt-1">Tambahkan barang impian yang ingin kamu wujudkan!</p>
        </div>
      ) : (
        <div className="space-y-3">
          {items.map((item) => {
            const pct = Math.round((item.saved / item.price) * 100);
            const isCompleted = item.saved >= item.price;

            return (
              <div
                key={item.id}
                className="bg-white/75 backdrop-blur-xl rounded-3xl p-4 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-3">
                    <IconBadge icon={item.iconName} tint="rose" size="sm" rounded="xl" />
                    <div>
                      <p className="font-display font-bold text-xs text-[#503043]">{item.name}</p>
                      <p className="text-[10px] text-[#7A4A63]">
                        Target: Rp {item.price.toLocaleString("id-ID")}
                      </p>
                    </div>
                  </div>

                  <button
                    onClick={() => deleteItem(item.id)}
                    className="p-1.5 rounded-full text-[#7A4A63]/50 hover:text-rose-500 hover:bg-rose-50 transition-colors"
                  >
                    <Trash2 size={13} />
                  </button>
                </div>

                {/* Progress */}
                <div className="mt-2.5">
                  <div className="flex justify-between text-[10px] font-display font-semibold text-[#7A4A63] mb-1">
                    <span>Tersimpan: Rp {item.saved.toLocaleString("id-ID")}</span>
                    <span>{pct}%</span>
                  </div>
                  <div className="w-full h-1.5 bg-blush-100 rounded-full overflow-hidden">
                    <motion.div
                      className="h-full bg-gradient-to-r from-blush-400 to-lilac-400 rounded-full"
                      animate={{ width: `${Math.min(100, pct)}%` }}
                    />
                  </div>
                </div>

                {/* Actions */}
                <div className="mt-3 flex items-center justify-between pt-2 border-t border-blush-50">
                  {isCompleted ? (
                    <span className="inline-flex items-center gap-1 text-[10px] font-bold text-emerald-600 bg-emerald-50 px-2.5 py-1 rounded-lg">
                      <CheckCircle size={12} /> Impian Terwujud
                    </span>
                  ) : (
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => addSavings(item.id, 50000)}
                        className="text-[9px] font-bold font-display text-blush-500 bg-blush-50 px-2 py-1 rounded-lg border border-blush-100 hover:bg-blush-100"
                      >
                        +50rb
                      </button>
                      <button
                        onClick={() => addSavings(item.id, 100000)}
                        className="text-[9px] font-bold font-display text-blush-500 bg-blush-50 px-2 py-1 rounded-lg border border-blush-100 hover:bg-blush-100"
                      >
                        +100rb
                      </button>
                    </div>
                  )}

                  {!isCompleted && (
                    <button
                      onClick={() => setAddSavedFor(addSavedFor === item.id ? null : item.id)}
                      className="text-[10px] font-display font-bold text-lilac-500 hover:underline"
                    >
                      {addSavedFor === item.id ? "Batal" : "+ Nominal Lain"}
                    </button>
                  )}
                </div>

                {/* Custom Add Savings Field */}
                {addSavedFor === item.id && (
                  <div className="mt-2.5 flex gap-2">
                    <input
                      type="number"
                      placeholder="Masukkan nominal (Rp)"
                      value={addAmount}
                      onChange={(e) => setAddAmount(e.target.value)}
                      className="flex-1 px-3 py-1.5 rounded-xl bg-white border border-blush-100 text-[10px] font-display text-[#503043] outline-none"
                    />
                    <button
                      onClick={() => {
                        const val = parseFloat(addAmount);
                        if (val > 0) addSavings(item.id, val);
                      }}
                      className="px-3 py-1.5 rounded-xl bg-blush-400 text-white font-display font-bold text-[10px] shadow-soft"
                    >
                      Tambah
                    </button>
                  </div>
                )}
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}
