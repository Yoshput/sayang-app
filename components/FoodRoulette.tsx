"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";
import { FOOD_CATEGORIES } from "@/lib/data";

export default function FoodRoulette() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<(typeof FOOD_CATEGORIES)[number] | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    let ticks = 0;
    const maxTicks = 16;
    intervalRef.current = setInterval(() => {
      const random = FOOD_CATEGORIES[Math.floor(Math.random() * FOOD_CATEGORIES.length)];
      setResult(random);
      ticks += 1;
      if (ticks >= maxTicks) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setSpinning(false);
      }
    }, 90);
  };

  return (
    <div className="mx-5 mt-5 bg-white/80 rounded-3xl p-4 shadow-softer border border-lilac-100">
      <p className="font-display font-bold text-sm text-[#7A4A63]">
        Bingung Makan Apa? 🍜
      </p>

      <div className="mt-3 h-20 rounded-2xl bg-gradient-to-br from-blush-100 to-lilac-100 flex items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key={result.label + (spinning ? Math.random() : "final")}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="text-center px-3"
            >
              <p className="font-display font-bold text-lg text-[#7A4A63]">
                {result.label}
              </p>
              {!spinning && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-[11px] text-lilac-500"
                >
                  {result.note}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <p className="text-sm text-lilac-400">Klik tombol di bawah ✨</p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={spin}
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        disabled={spinning}
        className="mt-3 w-full flex items-center justify-center gap-2 bg-blush-400 disabled:opacity-70 text-white font-display font-bold text-sm py-2.5 rounded-2xl shadow-soft"
      >
        <motion.span
          animate={spinning ? { rotate: 360 } : {}}
          transition={spinning ? { repeat: Infinity, duration: 0.6, ease: "linear" } : {}}
        >
          <Shuffle size={16} />
        </motion.span>
        {spinning ? "Lagi mikir..." : "Terserah, Pilihin Dong!"}
      </motion.button>
    </div>
  );
}
