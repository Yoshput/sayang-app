"use client";

import { motion } from "framer-motion";
import { Sparkles, Palette, HeartHandshake } from "lucide-react";
import { MoodKey, SELF_CARE_RECOMMENDATIONS } from "@/lib/data";
import IconBadge from "@/components/ui/IconBadge";

export default function SelfCareRecommendation({ mood }: { mood: MoodKey }) {
  const reco = SELF_CARE_RECOMMENDATIONS[mood];
  if (!reco) return null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -10 }}
      transition={{ duration: 0.25 }}
      className="mx-4 sm:mx-5 mt-4 space-y-2.5"
    >
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80">
        <div className="flex items-center gap-2 mb-1.5">
          <IconBadge icon={Sparkles} tint="blush" size="xs" rounded="md" />
          <p className="text-[11px] font-display font-bold text-blush-500 uppercase tracking-wider">
            Ide Self-Care Sesuai Mood
          </p>
        </div>
        <p className="text-xs text-[#503043] leading-relaxed font-semibold">
          {reco.idea}
        </p>
      </div>

      <div className="grid grid-cols-2 gap-2.5">
        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80">
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

        <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80">
          <div className="flex items-center gap-2 mb-1.5">
            <IconBadge icon={HeartHandshake} tint="mint" size="xs" rounded="md" />
            <p className="text-[10px] font-display font-bold text-mint-500 uppercase tracking-wider">
              Tip Ketenangan
            </p>
          </div>
          <p className="text-[10px] text-[#3D6B54] leading-relaxed font-semibold">
            {reco.tip}
          </p>
        </div>
      </div>
    </motion.div>
  );
}
