"use client";

import { motion } from "framer-motion";
import { Heart, Cake } from "lucide-react";
import { daysTogether, nextBirthdayCountdown, getZodiac } from "@/lib/profile";

export default function AnniversaryCard({
  anniversaryDate,
  birthDate,
}: {
  anniversaryDate: string;
  birthDate: string;
}) {
  const days = daysTogether(anniversaryDate);
  const { days: toBirthday, turning } = nextBirthdayCountdown(birthDate);
  const zodiac = getZodiac(birthDate);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.3 }}
      className="mx-5 mt-4 grid grid-cols-2 gap-2.5"
    >
      <div className="bg-white/80 rounded-3xl p-3.5 shadow-softer border border-blush-100">
        <div className="flex items-center gap-1.5 text-blush-400">
          <Heart size={13} fill="currentColor" />
          <span className="text-[10px] font-display font-bold uppercase tracking-wide">
            Bareng Kalian
          </span>
        </div>
        <p className="font-display font-bold text-lg text-[#7A4A63] mt-1">
          {days} hari
        </p>
      </div>

      <div className="bg-white/80 rounded-3xl p-3.5 shadow-softer border border-lilac-100">
        <div className="flex items-center gap-1.5 text-lilac-500">
          <Cake size={13} />
          <span className="text-[10px] font-display font-bold uppercase tracking-wide">
            Ultah ke-{turning}
          </span>
        </div>
        <p className="font-display font-bold text-lg text-[#7A4A63] mt-1">
          {toBirthday === 0 ? "Hari ini! 🎉" : `${toBirthday} hari lagi`}
        </p>
        <p className="text-[10px] text-lilac-400 mt-0.5">
          {zodiac.name} {zodiac.emoji}
        </p>
      </div>
    </motion.div>
  );
}
