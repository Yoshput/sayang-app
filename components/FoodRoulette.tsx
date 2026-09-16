"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, UtensilsCrossed, Sparkles } from "lucide-react";
import { FOOD_CATEGORIES } from "@/lib/data";
import IconBadge from "@/components/ui/IconBadge";

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
    <div className="mx-4 sm:mx-5 mt-4 bg-white/75 backdrop-blur-xl rounded-3xl p-4.5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <IconBadge icon={UtensilsCrossed} tint="peach" size="sm" rounded="xl" />
          <div>
            <p className="font-display font-bold text-sm text-[#503043]">
              Rekomendasi Menu Makanan
            </p>
            <p className="text-[10px] text-[#7A4A63]">Bingung mau makan apa berdua? Spin yuk!</p>
          </div>
        </div>
      </div>

      <div className="mt-3.5 h-24 rounded-2xl bg-gradient-to-br from-[#FFF5F8] via-[#FAF3FF] to-[#F1FBF6] border border-blush-100/70 flex items-center justify-center overflow-hidden relative">
        <AnimatePresence mode="wait">
          {result ? (
            <motion.div
              key={result.label + (spinning ? Math.random() : "final")}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -20, opacity: 0 }}
              transition={{ duration: 0.12 }}
              className="text-center px-4 flex flex-col items-center gap-1"
            >
              <IconBadge icon={result.iconName} tint="peach" size="sm" rounded="xl" />
              <p className="font-display font-bold text-base text-[#503043]">
                {result.label}
              </p>
              {!spinning && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.15 }}
                  className="text-[10px] text-[#7A4A63] font-medium"
                >
                  {result.note}
                </motion.p>
              )}
            </motion.div>
          ) : (
            <p className="text-xs text-[#7A4A63] font-medium font-display text-center px-4">
              Tekan tombol acak untuk dapat ide makanan lezat
            </p>
          )}
        </AnimatePresence>
      </div>

      <motion.button
        onClick={spin}
        disabled={spinning}
        whileTap={{ scale: 0.96 }}
        whileHover={{ scale: 1.02 }}
        className="w-full mt-3 py-3 rounded-2xl bg-gradient-to-r from-blush-400 via-lilac-400 to-blush-500 text-white font-display font-bold text-xs flex items-center justify-center gap-2 shadow-soft disabled:opacity-60"
      >
        <Shuffle size={14} className={spinning ? "animate-spin" : ""} />
        {spinning ? "Memilihkan menu lezat..." : "Acak Menu Sekarang"}
      </motion.button>
    </div>
  );
}
