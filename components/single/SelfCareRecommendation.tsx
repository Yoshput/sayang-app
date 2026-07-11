"use client";

import { motion } from "framer-motion";
import { Sparkles, Palette, Heart } from "lucide-react";
import { MoodKey, SELF_CARE_RECOMMENDATIONS } from "@/lib/data";

export default function SelfCareRecommendation({ mood }: { mood: MoodKey }) {
  const reco = SELF_CARE_RECOMMENDATIONS[mood];
  if (!reco) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="px-5 mt-4 space-y-3"
    >
      <div className="bg-white/80 rounded-3xl p-4 shadow-softer border border-blush-100">
        <p className="text-[11px] font-display font-bold text-blush-400 flex items-center gap-1">
          <Sparkles size={12} /> Ide Me-Time
        </p>
        <p className="text-xs text-[#7A4A63] mt-1.5 leading-relaxed font-semibold">
          {reco.idea}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-3">
        <div className="bg-white/80 rounded-3xl p-4 shadow-softer border border-lilac-100">
          <p className="text-[10px] font-display font-bold text-lilac-500 flex items-center gap-1">
            <Palette size={11} /> Outfit Palette
          </p>
          <div className="flex gap-1.5 mt-2">
            {reco.outfit.map((c) => (
              <div
                key={c}
                className="w-6 h-6 rounded-xl shadow-inner border border-white"
                style={{ backgroundColor: c }}
              />
            ))}
          </div>
        </div>

        <div className="bg-white/80 rounded-3xl p-4 shadow-softer border border-mint-100">
          <p className="text-[10px] font-display font-bold text-mint-500 flex items-center gap-1">
            <Heart size={11} fill="currentColor" /> Daily Tip
          </p>
          <p className="text-[10px] text-[#3D6B54] mt-1.5 leading-relaxed font-semibold">
            {reco.tip}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
