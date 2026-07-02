"use client";

import { motion, AnimatePresence } from "framer-motion";
import { CARE_OPTIONS } from "@/lib/data";

export default function HandleWithCare({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (key: string) => void;
}) {
  const active = CARE_OPTIONS.find((c) => c.key === selected);

  return (
    <div className="px-5 pt-6 pb-2">
      <p className="font-display font-bold text-[#7A4A63] text-base">
        Handle With Care 🎀
      </p>
      <p className="text-xs text-lilac-500 mt-0.5">
        Pilih gimana kamu pengen diperlakukan hari ini
      </p>

      <div className="grid grid-cols-2 gap-2.5 mt-4">
        {CARE_OPTIONS.map((opt, i) => {
          const isActive = selected === opt.key;
          return (
            <motion.button
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.05 }}
              whileTap={{ scale: 0.93 }}
              whileHover={{ y: -2 }}
              className={`text-left rounded-3xl p-3 border transition-colors ${
                isActive
                  ? "bg-blush-100 border-blush-300 shadow-soft"
                  : "bg-white/70 border-transparent"
              }`}
            >
              <span className="text-xl">{opt.emoji}</span>
              <p className="font-display font-semibold text-xs text-[#7A4A63] mt-1 leading-snug">
                {opt.label}
              </p>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-4 bg-mint-100 border border-mint-200 rounded-2xl p-3 overflow-hidden"
          >
            <p className="text-xs text-[#3D6B54] leading-relaxed">
              <span className="font-display font-bold">Catatan buat pasangan kamu:</span>{" "}
              {active.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
