"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle } from "lucide-react";
import { TREAT_YOURSELF_OPTIONS } from "@/lib/data";

export default function TreatRoulette() {
  const [spinning, setSpinning] = useState(false);
  const [result, setResult] = useState<(typeof TREAT_YOURSELF_OPTIONS)[number] | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const spin = () => {
    if (spinning) return;
    setSpinning(true);
    setResult(null);

    let ticks = 0;
    const maxTicks = 20;
    intervalRef.current = setInterval(() => {
      const random =
        TREAT_YOURSELF_OPTIONS[Math.floor(Math.random() * TREAT_YOURSELF_OPTIONS.length)];
      setResult(random);
      ticks += 1;
      if (ticks >= maxTicks) {
        if (intervalRef.current) clearInterval(intervalRef.current);
        setSpinning(false);
      }
    }, 80);
  };

  return (
    <div className="mx-5 mt-5">
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 border border-white/60 shadow-softer">
        <div className="flex items-center justify-between mb-3">
          <div>
            <p className="font-display font-bold text-sm text-[#7A4A63]">Treat Yo' Self 🎉</p>
            <p className="text-[10px] text-lilac-400 font-display">Bingung me-time ngapain? Spin!</p>
          </div>
          <span className="text-2xl">🎡</span>
        </div>

        {/* Spin window */}
        <div className="h-[90px] rounded-2xl bg-gradient-to-br from-magenta-50 via-blush-50 to-lilac-100 border border-blush-100 flex items-center justify-center overflow-hidden relative mb-3">
          {/* Decorative scan line */}
          <div className="absolute left-0 right-0 top-1/2 -translate-y-1/2 h-10 bg-white/20 border-y border-blush-200/40 pointer-events-none" />

          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={result.label + (spinning ? Math.random() : "final")}
                initial={{ y: 30, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -30, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="text-center px-4 z-10"
              >
                <p className="text-2xl mb-1">{result.emoji}</p>
                <p className="font-display font-bold text-sm text-[#7A4A63]">{result.label}</p>
                {!spinning && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] text-lilac-500 mt-0.5"
                  >
                    {result.note}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="text-sm text-lilac-300 font-display"
              >
                Klik spin dulu ✨
              </motion.p>
            )}
          </AnimatePresence>
        </div>

        <motion.button
          onClick={spin}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          disabled={spinning}
          className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-magenta-400 to-blush-400 disabled:opacity-60 text-white font-display font-bold text-sm py-3 rounded-2xl shadow-soft"
        >
          <motion.span
            animate={spinning ? { rotate: 360 } : {}}
            transition={spinning ? { repeat: Infinity, duration: 0.5, ease: "linear" } : {}}
          >
            <Shuffle size={16} />
          </motion.span>
          {spinning ? "Lagi mikir..." : "Spin Sekarang!"}
        </motion.button>
      </div>
    </div>
  );
}
