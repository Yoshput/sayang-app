"use client";

import { motion } from "framer-motion";
import { MOODS, MoodKey } from "@/lib/data";
import { useProfile } from "@/app/providers";

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
    <div className="px-5 pt-6">
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.4 }}
        className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 shadow-softer mb-4"
      >
        <div className="flex items-center justify-between gap-3">
          <div className="flex-1 min-w-0">
            <p className="text-[10px] font-bold text-lilac-500/80 tracking-wider uppercase">
              Halo, {herName} 🌷
            </p>
            <h1 className="font-display text-[15px] font-bold text-[#7A4A63] leading-snug mt-1 break-words">
              Lagi ngerasa gimana hari ini, Princess?
            </h1>
          </div>
          
          {/* Avatar bubbles */}
          <div className="flex items-center gap-1.5 shrink-0 bg-white/40 p-1 rounded-2xl border border-white/30 shadow-inner">
            {profile?.myAvatar ? (
              <img
                src={profile.myAvatar}
                alt={profile.myName}
                className="w-8 h-8 rounded-full object-cover border border-blush-200 shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center text-[10px] font-bold text-[#7A4A63]">
                {profile?.myName?.slice(0, 2).toUpperCase()}
              </div>
            )}
            <span className="text-[10px] text-blush-400 animate-pulse">❤️</span>
            {profile?.partnerAvatar ? (
              <img
                src={profile.partnerAvatar}
                alt={profile.herName}
                className="w-8 h-8 rounded-full object-cover border border-lilac-200 shadow-sm"
              />
            ) : (
              <div className="w-8 h-8 rounded-full bg-lilac-100 flex items-center justify-center text-[10px] font-bold text-[#7A4A63]">
                {profile?.herName?.slice(0, 2).toUpperCase()}
              </div>
            )}
          </div>
        </div>
      </motion.div>

      <div className="flex justify-between gap-2">
        {MOODS.map((m, i) => {
          const isActive = mood === m.key;
          return (
            <motion.button
              key={m.key}
              onClick={() => onSelect(m.key)}
              whileTap={{ scale: 0.88, rotate: -3 }}
              whileHover={{ scale: 1.05, y: -2 }}
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.05 + i * 0.04, type: "spring", stiffness: 350 }}
              className={`flex flex-col items-center gap-1.5 px-2 py-3 rounded-2xl flex-1 border transition-all duration-300 ${
                isActive
                  ? "bg-white border-blush-300 shadow-soft scale-105"
                  : "bg-white/50 border-white/40 hover:bg-white/80"
              }`}
            >
              <motion.span
                className="text-2xl"
                animate={isActive ? { scale: [1, 1.3, 1], rotate: [0, 8, -8, 0] } : {}}
                transition={{ duration: 0.5 }}
              >
                {m.emoji}
              </motion.span>
              <span className="text-[10px] font-display font-bold text-[#8A5C74]">
                {m.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
