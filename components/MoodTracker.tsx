"use client";

import { motion } from "framer-motion";
import { Heart, Smile, CloudRain, Flame, Moon, Sparkles } from "lucide-react";
import { MOODS, MoodKey } from "@/lib/data";
import { useProfile } from "@/app/providers";
import IconBadge from "@/components/ui/IconBadge";

const MOOD_ICONS: Record<MoodKey, React.ElementType> = {
  happy: Smile,
  sad: CloudRain,
  angry: Flame,
  cuddly: Heart,
  tired: Moon,
};

export default function MoodTracker({
  herName,
  mood,
  onSelect,
}: {
  herName: string;
  mood: MoodKey | null;
  onSelect: (m: MoodKey) => void;
}) {
  const { profile } = useProfile();

  return (
    <div className="px-4 sm:px-5 pt-5">
      {/* Header Greeting */}
      <motion.div
        initial={{ opacity: 0, y: -8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.3 }}
        className="bg-white/80 backdrop-blur-xl rounded-3xl p-4.5 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] mb-3.5"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-blush-500 tracking-wider uppercase">
              Halo, {herName}
            </p>
            <h1 className="font-display text-sm sm:text-base font-bold text-[#503043] leading-snug mt-0.5 break-words">
              Bagaimana perasaanmu hari ini, Princess?
            </h1>
          </div>

          {/* Avatar bubbles connected by heart */}
          <div className="flex items-center gap-1.5 shrink-0 bg-white/70 p-1 rounded-2xl border border-blush-100 shadow-softer">
            {profile?.myAvatar ? (
              <img
                src={profile.myAvatar}
                alt={profile.myName}
                className="w-8 h-8 rounded-full object-cover border border-blush-200 shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center text-[10px] font-bold text-blush-600">
                {profile?.myName?.slice(0, 2).toUpperCase()}
              </div>
            )}

            <div className="w-5 h-5 rounded-full bg-blush-50 flex items-center justify-center text-blush-500">
              <Heart size={11} fill="currentColor" />
            </div>

            {profile?.partnerAvatar ? (
              <img
                src={profile.partnerAvatar}
                alt={profile.herName}
                className="w-8 h-8 rounded-full object-cover border border-lilac-200 shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-lilac-100 flex items-center justify-center text-[10px] font-bold text-lilac-600">
                {profile?.herName?.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mood Selector Buttons */}
      <div className="grid grid-cols-5 gap-2">
        {MOODS.map((m, i) => {
          const isActive = mood === m.key;
          const IconComponent = MOOD_ICONS[m.key] || Smile;

          return (
            <motion.button
              key={m.key}
              onClick={() => onSelect(m.key)}
              whileTap={{ scale: 0.92 }}
              whileHover={{ scale: 1.04, y: -2 }}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.03, type: "spring", stiffness: 380 }}
              className={`flex flex-col items-center gap-1.5 px-1 py-3 rounded-2xl border transition-all duration-200 ${
                isActive
                  ? "bg-white border-blush-300 shadow-soft scale-105"
                  : "bg-white/60 border-white/60 hover:bg-white/80"
              }`}
            >
              <IconBadge
                icon={IconComponent}
                tint={m.tint}
                size="sm"
                rounded="xl"
                className={isActive ? "scale-110 shadow-sm" : ""}
              />
              <span className={`text-[10px] font-display font-semibold transition-colors ${
                isActive ? "text-[#503043] font-bold" : "text-[#7A4A63]"
              }`}>
                {m.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
