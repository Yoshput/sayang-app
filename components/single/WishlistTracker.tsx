"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Plus, X, ShoppingBag, Target, Trash2 } from "lucide-react";

interface WishItem {
  id: string;
  name: string;
  price: number;
  saved: number;
  emoji: string;
}

const STORAGE_KEY = "wishlist:items";
const EMOJIS = ["👜", "👟", "💄", "📱", "✈️", "🎸", "📷", "🎮", "💍", "🌸", "📚", "🎧"];

function loadItems(): WishItem[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    return raw ? JSON.parse(raw) : [];
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
  const [emoji, setEmoji] = useState("👜");
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
      emoji,
    };
    const updated = [...items, newItem];
    setItems(updated);
    saveItems(updated);
    setName(""); setPrice(""); setEmoji("👜"); setShowAdd(false);
  };

  const addSavings = (id: string, amount: number) => {
    const updated = items.map((item) =>
      item.id === id
        ? { ...item, saved: Math.min(item.price, item.saved + amount) }
        : item
    );
    setItems(updated);
    saveItems(updated);
    setAddSavedFor(null);
    setAddAmount("");
  };

  const removeItem = (id: string) => {
    const updated = items.filter((item) => item.id !== id);
    setItems(updated);
    saveItems(updated);
  };

  const formatK = (n: number) =>
    n >= 1000000
      ? `${(n / 1000000).toFixed(1)}jt`
      : n >= 1000
      ? `${(n / 1000).toFixed(0)}rb`
      : `${n}`;

  return (
    <div className="mx-5 mt-5 pb-4">
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="font-display font-bold text-sm text-[#7A4A63]">Wishlist Goals 🛍️</p>
          <p className="text-[10px] text-lilac-400 font-display">Nabung dikit-dikit, lama-lama kumpul ✨</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.92 }}
          onClick={() => setShowAdd(true)}
          className="flex items-center gap-1.5 bg-gradient-to-r from-blush-400 to-lilac-400 text-white text-[10px] font-display font-bold px-3 py-1.5 rounded-2xl shadow-soft"
        >
          <Plus size={12} /> Tambah
        </motion.button>
      </div>

      {/* Items list */}
      {items.length === 0 ? (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="bg-white/60 backdrop-blur-md rounded-3xl p-8 border border-white/60 text-center"
        >
          <p className="text-3xl mb-2">🌸</p>
          <p className="font-display font-bold text-sm text-[#7A4A63]">Belum ada wishlist</p>
          <p className="text-[10px] text-lilac-400 mt-1">Tambah impian pertama kamu!</p>
        </motion.div>
      ) : (
        <div className="space-y-3">
          {items.map((item, i) => {
            const pct = Math.round((item.saved / item.price) * 100);
            const done = item.saved >= item.price;
            return (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                className={`bg-white/70 backdrop-blur-md rounded-3xl p-4 border shadow-softer ${
                  done ? "border-blush-200" : "border-white/60"
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-2xl">{item.emoji}</span>
                    <div>
                      <p className="font-display font-bold text-xs text-[#7A4A63]">{item.name}</p>
                      <p className="text-[10px] text-lilac-400 font-display">
                        {formatK(item.saved)} / Rp {formatK(item.price)}
                      </p>
                    </div>
                  </div>
                  <div className="flex items-center gap-1">
                    {done && <span className="text-sm">🎉</span>}
                    <motion.button
                      whileTap={{ scale: 0.9 }}
                      onClick={() => removeItem(item.id)}
                      className="w-6 h-6 rounded-full bg-blush-50 flex items-center justify-center"
                    >
                      <Trash2 size={11} className="text-blush-300" />
                    </motion.button>
                  </div>
                </div>

                {/* Progress */}
                <div className="h-2 bg-blush-50 rounded-full overflow-hidden mb-2">
                  <motion.div
                    className={`h-full rounded-full ${done ? "bg-gradient-to-r from-blush-400 to-lilac-400" : "bg-gradient-to-r from-blush-300 to-lilac-300"}`}
                    initial={{ width: 0 }}
                    animate={{ width: `${pct}%` }}
                    transition={{ duration: 0.7, ease: "easeOut" }}
                  />
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-[10px] font-display font-bold text-lilac-400">{pct}% terkumpul</span>
                  {!done && (
                    addSavedFor === item.id ? (
                      <div className="flex items-center gap-1">
                        <input
                          autoFocus
                          value={addAmount}
                          onChange={(e) => setAddAmount(e.target.value)}
                          placeholder="nominal..."
                          type="number"
                          className="w-24 text-[10px] font-display font-bold px-2 py-1 rounded-xl border border-blush-200 bg-white outline-none text-[#7A4A63]"
                        />
                        <motion.button
                          whileTap={{ scale: 0.92 }}
                          onClick={() => addSavings(item.id, parseFloat(addAmount) || 0)}
                          className="text-[10px] font-display font-bold px-2 py-1 rounded-xl bg-blush-400 text-white"
                        >
                          Simpan
                        </motion.button>
                        <button onClick={() => setAddSavedFor(null)} className="text-lilac-300">
                          <X size={12} />
                        </button>
                      </div>
                    ) : (
                      <motion.button
                        whileTap={{ scale: 0.92 }}
                        onClick={() => setAddSavedFor(item.id)}
                        className="text-[10px] font-display font-bold px-2.5 py-1 rounded-xl bg-lilac-100 text-lilac-500"
                      >
                        + Nabung
                      </motion.button>
                    )
                  )}
                </div>
              </motion.div>
            );
          })}
        </div>
      )}

      {/* Add modal */}
      <AnimatePresence>
        {showAdd && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setShowAdd(false)}
              className="fixed inset-0 bg-black/20 z-40"
            />
            <motion.div
              initial={{ opacity: 0, y: 40 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 40 }}
              className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 shadow-soft max-w-[420px] mx-auto"
            >
              <div className="flex items-center justify-between mb-4">
                <p className="font-display font-bold text-sm text-[#7A4A63]">Tambah Wishlist</p>
                <button onClick={() => setShowAdd(false)}>
                  <X size={16} className="text-lilac-300" />
                </button>
              </div>

              {/* Emoji picker */}
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
                placeholder="Nama barang / impian"
                className="w-full rounded-2xl border border-blush-200 bg-blush-50 px-4 py-2.5 text-xs font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 mb-2"
              />
              <input
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                placeholder="Target harga (Rp)"
                type="number"
                className="w-full rounded-2xl border border-blush-200 bg-blush-50 px-4 py-2.5 text-xs font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 mb-4"
              />

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={addItem}
                disabled={!name.trim() || !price}
                className="w-full bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-sm py-3 rounded-2xl shadow-soft disabled:opacity-40"
              >
                Tambah ke Wishlist 🌸
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
