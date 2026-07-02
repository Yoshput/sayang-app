"use client";

import { motion } from "framer-motion";
import { MOODS, MoodKey } from "@/lib/data";

export default function MoodTracker({
  herName,
  mood,
  onSelect,
}: {
  herName: string;
  mood: MoodKey | null;
  onSelect: (m: MoodKey) => void;
}) {
  return (
    <div className="px-5 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
      >
        <p className="text-xs font-semibold text-lilac-500/80 tracking-wide">
          Halo, {herName} 🌷
        </p>
        <h1 className="font-display text-2xl font-bold text-[#7A4A63] leading-snug mt-0.5">
          Lagi ngerasa gimana hari ini, Princess?
        </h1>
      </motion.div>

      <div className="flex justify-between mt-5 gap-1.5">
        {MOODS.map((m, i) => {
          const isActive = mood === m.key;
          return (
            <motion.button
              key={m.key}
              onClick={() => onSelect(m.key)}
              whileTap={{ scale: 0.85, rotate: -6 }}
              whileHover={{ scale: 1.08, y: -3 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 + i * 0.05, type: "spring", stiffness: 300 }}
              className={`flex flex-col items-center gap-1 px-2 py-2.5 rounded-3xl flex-1 border transition-colors ${
                isActive
                  ? "bg-white border-blush-300 shadow-soft"
                  : "bg-white/60 border-transparent"
              }`}
            >
              <motion.span
                className="text-2xl"
                animate={isActive ? { scale: [1, 1.25, 1] } : {}}
                transition={{ duration: 0.4 }}
              >
                {m.emoji}
              </motion.span>
              <span className="text-[10px] font-display font-semibold text-[#8A5C74]">
                {m.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
