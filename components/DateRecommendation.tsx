"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Palette, Wand2 } from "lucide-react";
import { MOODS, MoodKey, DATE_RECOMMENDATIONS } from "@/lib/data";

export default function DateRecommendation() {
  const [selected, setSelected] = useState<MoodKey>("happy");
  const reco = DATE_RECOMMENDATIONS[selected];

  return (
    <div className="px-5 pt-6 pb-2">
      <p className="font-display font-bold text-[#7A4A63] text-base flex items-center gap-1.5">
        <Sparkles size={16} className="text-blush-400" /> Rekomendasi Date & Styling
      </p>
      <p className="text-xs text-lilac-500 mt-0.5">
        Pilih mood kamu sekarang, aku kasih rekomendasinya
      </p>

      <div className="flex gap-1.5 mt-3 overflow-x-auto no-scrollbar pb-1">
        {MOODS.map((m) => (
          <motion.button
            key={m.key}
            onClick={() => setSelected(m.key)}
            whileTap={{ scale: 0.92 }}
            className={`flex items-center gap-1 px-3 py-1.5 rounded-full text-xs font-display font-semibold whitespace-nowrap border ${
              selected === m.key
                ? "bg-blush-400 text-white border-blush-400"
                : "bg-white/70 text-[#8A5C74] border-transparent"
            }`}
          >
            <span>{m.emoji}</span> {m.label}
          </motion.button>
        ))}
      </div>

      <AnimatePresence mode="wait">
        <motion.div
          key={selected}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -10 }}
          transition={{ duration: 0.25 }}
          className="mt-4 space-y-3"
        >
          <div className="bg-white/80 rounded-3xl p-4 shadow-softer border border-blush-100">
            <p className="text-[11px] font-display font-bold text-blush-400 flex items-center gap-1">
              <Sparkles size={12} /> Ide Date
            </p>
            <p className="text-sm text-[#7A4A63] mt-1 leading-relaxed">{reco.dateIdea}</p>
          </div>

          <div className="bg-white/80 rounded-3xl p-4 shadow-softer border border-lilac-100">
            <p className="text-[11px] font-display font-bold text-lilac-500 flex items-center gap-1">
              <Palette size={12} /> Outfit Palette
            </p>
            <div className="flex gap-2 mt-2">
              {reco.outfit.map((c) => (
                <div
                  key={c}
                  className="w-9 h-9 rounded-2xl shadow-inner border border-white"
                  style={{ backgroundColor: c }}
                />
              ))}
            </div>
          </div>

          <div className="bg-white/80 rounded-3xl p-4 shadow-softer border border-mint-100">
            <p className="text-[11px] font-display font-bold text-mint-500 flex items-center gap-1">
              <Wand2 size={12} /> Makeup Look
            </p>
            <p className="text-sm text-[#3D6B54] mt-1 leading-relaxed">{reco.makeup}</p>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
