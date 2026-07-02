"use client";

import { motion } from "framer-motion";
import { Heart, Cake, Sparkles, User, HeartHandshake } from "lucide-react";
import { daysTogether, nextBirthdayCountdown, getZodiac } from "@/lib/profile";

export default function AnniversaryCard({
  anniversaryDate,
  birthDate,
  partnerBirthDate,
  partnerName = "Dia",
}: {
  anniversaryDate: string;
  birthDate: string;
  partnerBirthDate?: string;
  partnerName?: string;
}) {
  const days = daysTogether(anniversaryDate);
  
  // My Birthday
  const myBd = nextBirthdayCountdown(birthDate);
  const myZodiac = getZodiac(birthDate);

  // Partner Birthday
  const partnerBd = partnerBirthDate ? nextBirthdayCountdown(partnerBirthDate) : null;
  const partnerZodiac = partnerBirthDate ? getZodiac(partnerBirthDate) : null;

  return (
    <motion.div
      initial={{ opacity: 0, y: 12 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.25 }}
      className="mx-5 mt-4 space-y-3"
    >
      {/* 1. Days Together (Full Width Card) */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 shadow-softer border border-white/60 relative overflow-hidden group hover:bg-white/80 transition-all duration-300">
        <div className="absolute -right-6 -bottom-6 w-16 h-16 bg-blush-100 rounded-full blur-xl opacity-70 group-hover:scale-125 transition-all duration-500" />
        <div className="flex items-center gap-1.5 text-blush-400">
          <HeartHandshake size={15} className="animate-pulse" />
          <span className="text-[10px] font-display font-bold uppercase tracking-wider">
            Perjalanan Cinta Kita 💗
          </span>
        </div>
        <div className="mt-2 flex items-baseline gap-2">
          <p className="font-display font-bold text-2xl text-[#7A4A63]">
            {days} hari
          </p>
          <span className="text-[10px] text-[#8A5C74]/70 font-display font-medium">bersama & bahagia ✨</span>
        </div>
      </div>

      {/* 2. Birthday Reminders Grid */}
      <div className="grid grid-cols-2 gap-3">
        {/* My Birthday */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 border border-white/60 relative overflow-hidden group hover:bg-white/80 transition-all duration-300">
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-lilac-100 rounded-full blur-xl opacity-70 group-hover:scale-125 transition-all duration-500" />
          <div className="flex items-center gap-1.5 text-lilac-500">
            <Cake size={13} />
            <span className="text-[10px] font-display font-bold uppercase tracking-wider">
              Ulang Tahunku
            </span>
          </div>
          <div className="mt-2">
            <p className="font-display font-bold text-base text-[#7A4A63]">
              {myBd.days === 0 ? "Hari ini! 🎉" : `${myBd.days} hari lagi`}
            </p>
            <span className="text-[9px] text-[#8A5C74]/70 font-display font-medium block mt-0.5">
              Turning {myBd.turning} ({myZodiac.name} {myZodiac.emoji})
            </span>
          </div>
        </div>

        {/* Partner Birthday */}
        <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 border border-white/60 relative overflow-hidden group hover:bg-white/80 transition-all duration-300">
          <div className="absolute -right-4 -bottom-4 w-12 h-12 bg-blush-100 rounded-full blur-xl opacity-70 group-hover:scale-125 transition-all duration-500" />
          <div className="flex items-center gap-1.5 text-blush-400">
            <Heart size={13} fill="currentColor" />
            <span className="text-[10px] font-display font-bold uppercase tracking-wider truncate">
              Ultah {partnerName}
            </span>
          </div>
          <div className="mt-2">
            <p className="font-display font-bold text-base text-[#7A4A63]">
              {partnerBd
                ? partnerBd.days === 0
                  ? "Hari ini! 🎉"
                  : `${partnerBd.days} hari lagi`
                : "Belum diset"}
            </p>
            {partnerBd && partnerZodiac && (
              <span className="text-[9px] text-[#8A5C74]/70 font-display font-medium block mt-0.5">
                Turning {partnerBd.turning} ({partnerZodiac.name} {partnerZodiac.emoji})
              </span>
            )}
          </div>
        </div>
      </div>
    </motion.div>
  );
}
