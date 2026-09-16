"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Sparkles, Palette, Wand2, Compass } from "lucide-react";
import { MOODS, MoodKey, DATE_RECOMMENDATIONS } from "@/lib/data";
import IconBadge from "@/components/ui/IconBadge";

export default function DateRecommendation() {
  const [selected, setSelected] = useState<MoodKey>("happy");
  const reco = DATE_RECOMMENDATIONS[selected];

  return (
    <div className="px-4 sm:px-5 pt-5 pb-2">
      <div className="flex items-center gap-2.5 mb-1">
        <IconBadge icon={Compass} tint="blush" size="sm" rounded="xl" />
        <div>
          <p className="font-display font-bold text-[#503043] text-base">
            Rekomendasi Kencan &amp; Styling
          </p>
          <p className="text-xs text-[#7A4A63]">
            Pilih mood hari ini untuk mendapatkan ide date dan panduan busana
          </p>
        </div>
      </div>

      <div className="flex gap-2 mt-3 overflow-x-auto no-scrollbar pb-1">
        {MOODS.map((m) => (
          <motion.button
            key={m.key}
            onClick={() => setSelected(m.key)}
            whileTap={{ scale: 0.94 }}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-display font-semibold whitespace-nowrap border transition-all ${
              selected === m.key
                ? "bg-white text-[#503043] font-bold border-blush-300 shadow-softer"
                : "bg-white/60 text-[#7A4A63] border-white/70 hover:bg-white"
            }`}
          >
            <IconBadge icon={m.iconName} tint={m.tint} size="xs" rounded="md" />
            <span>{m.label}</span>
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
          className="mt-3.5 space-y-2.5"
        >
          <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80">
            <div className="flex items-center gap-2 mb-1.5">
              <IconBadge icon={Sparkles} tint="blush" size="xs" rounded="md" />
              <p className="text-[10px] font-display font-bold text-blush-500 uppercase tracking-wider">
                Ide Kencan Romantis
              </p>
            </div>
            <p className="text-xs text-[#503043] leading-relaxed font-semibold">
              {reco.dateIdea}
            </p>
          </div>

          <div className="grid grid-cols-2 gap-2.5">
            <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80">
              <div className="flex items-center gap-2 mb-2">
                <IconBadge icon={Palette} tint="lilac" size="xs" rounded="md" />
                <p className="text-[10px] font-display font-bold text-lilac-500 uppercase tracking-wider">
                  Outfit Palette
                </p>
              </div>
              <div className="flex gap-1.5 mt-1">
                {reco.outfit.map((c) => (
                  <div
                    key={c}
                    className="w-6 h-6 rounded-xl shadow-inner border border-white"
                    style={{ backgroundColor: c }}
                  />
                ))}
              </div>
            </div>

            <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80">
              <div className="flex items-center gap-2 mb-1.5">
                <IconBadge icon={Wand2} tint="rose" size="xs" rounded="md" />
                <p className="text-[10px] font-display font-bold text-rose-500 uppercase tracking-wider">
                  Makeup Look
                </p>
              </div>
              <p className="text-[10px] text-[#503043] leading-relaxed font-medium">
                {reco.makeup}
              </p>
            </div>
          </div>
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
