"use client";

import { motion } from "framer-motion";
import { Heart, Cake, Sparkles } from "lucide-react";
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
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mx-5 mt-4 grid grid-cols-2 gap-3"
    >
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 shadow-softer border border-white/60 flex flex-col justify-between min-h-[95px] relative overflow-hidden group hover:bg-white/80 transition-all duration-300">
        <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-blush-100 rounded-full blur-xl opacity-70 group-hover:scale-125 transition-all duration-500" />
        <div className="flex items-center gap-1.5 text-blush-400">
          <Heart size={14} fill="currentColor" className="animate-pulse" />
          <span className="text-[10px] font-display font-bold uppercase tracking-wider">
            Bareng Kamu
          </span>
        </div>
        <div className="mt-2">
          <p className="font-display font-bold text-xl text-[#7A4A63]">
            {days} hari
          </p>
          <span className="text-[9px] text-[#8A5C74]/70 font-display font-medium">Udah lama kita bersama 💗</span>
        </div>
      </div>

      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 shadow-softer border border-white/60 flex flex-col justify-between min-h-[95px] relative overflow-hidden group hover:bg-white/80 transition-all duration-300">
        <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-lilac-100 rounded-full blur-xl opacity-70 group-hover:scale-125 transition-all duration-500" />
        <div className="flex items-center gap-1.5 text-lilac-500">
          <Cake size={14} />
          <span className="text-[10px] font-display font-bold uppercase tracking-wider">
            Ultah ke-{turning}
          </span>
        </div>
        <div className="mt-2">
          <p className="font-display font-bold text-xl text-[#7A4A63]">
            {toBirthday === 0 ? "Hari ini! 🎉" : `${toBirthday} hari lagi`}
          </p>
          <div className="flex items-center gap-1 mt-0.5 text-[9px] text-[#8A5C74]/70 font-display">
            <Sparkles size={8} className="text-lilac-400" />
            <span>{zodiac.name} {zodiac.emoji}</span>
          </div>
        </div>
      </div>
    </motion.div>
  );
}
