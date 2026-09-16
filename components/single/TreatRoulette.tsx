"use client";

import { useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, Gift, Sparkles } from "lucide-react";
import { TREAT_YOURSELF_OPTIONS } from "@/lib/data";
import IconBadge from "@/components/ui/IconBadge";

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
    <div className="mx-4 sm:mx-5 mt-4">
      <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4.5 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <IconBadge icon={Gift} tint="rose" size="sm" rounded="xl" />
            <div>
              <p className="font-display font-bold text-sm text-[#503043]">Treat Yourself</p>
              <p className="text-[10px] text-[#7A4A63] font-display">Bingung mau me-time ngapain? Acak yuk!</p>
            </div>
          </div>
        </div>

        {/* Spin Window */}
        <div className="h-[95px] rounded-2xl bg-gradient-to-br from-[#FFF5F8] via-[#FAF3FF] to-[#FFF6E6] border border-blush-100 flex items-center justify-center overflow-hidden relative mb-3">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={result.label + (spinning ? Math.random() : "final")}
                initial={{ y: 25, opacity: 0 }}
                animate={{ y: 0, opacity: 1 }}
                exit={{ y: -25, opacity: 0 }}
                transition={{ duration: 0.1 }}
                className="text-center px-4 flex flex-col items-center gap-1"
              >
                <IconBadge icon={result.iconName} tint="rose" size="sm" rounded="xl" />
                <p className="font-display font-bold text-sm text-[#503043]">{result.label}</p>
                {!spinning && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.12 }}
                    className="text-[10px] text-[#7A4A63] font-medium"
                  >
                    {result.note}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <p className="text-xs text-[#7A4A63] font-medium font-display text-center px-4">
                Tekan tombol di bawah untuk ide me-time yang menyenangkan
              </p>
            )}
          </AnimatePresence>
        </div>

        {/* Spin Button */}
        <motion.button
          onClick={spin}
          disabled={spinning}
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          className="w-full py-3 rounded-2xl bg-gradient-to-r from-blush-400 via-lilac-400 to-blush-500 text-white font-display font-bold text-xs flex items-center justify-center gap-2 shadow-soft disabled:opacity-60 transition-all"
        >
          <Shuffle size={14} className={spinning ? "animate-spin" : ""} />
          {spinning ? "Memilihkan ide me-time..." : "Acak Ide Me-Time"}
        </motion.button>
      </div>
    </div>
  );
}
