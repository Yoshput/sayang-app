"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Heart,
  Cake,
  Sparkles,
  HeartHandshake,
  PartyPopper,
  Calendar,
  ChevronRight,
} from "lucide-react";
import {
  daysTogether,
  nextBirthdayCountdown,
  getZodiac,
  getAnniversaryMilestone,
} from "@/lib/profile";
import AnniversaryCelebrationModal from "@/components/celebration/AnniversaryCelebrationModal";
import IconBadge from "@/components/ui/IconBadge";

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
  const [showCelebration, setShowCelebration] = useState(false);

  const days = daysTogether(anniversaryDate);
  const milestone = getAnniversaryMilestone(anniversaryDate);

  // My Birthday
  const myBd = nextBirthdayCountdown(birthDate);
  const myZodiac = getZodiac(birthDate);

  // Partner Birthday
  const partnerBd = partnerBirthDate ? nextBirthdayCountdown(partnerBirthDate) : null;
  const partnerZodiac = partnerBirthDate ? getZodiac(partnerBirthDate) : null;

  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 12 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
        className="mx-4 sm:mx-5 mt-4 space-y-3"
      >
        {/* 1. Milestone 2nd Anniversary Celebration Banner */}
        <motion.div
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.98 }}
          onClick={() => setShowCelebration(true)}
          className="relative overflow-hidden cursor-pointer rounded-3xl p-4 bg-gradient-to-r from-[#FFF0F7] via-[#F8EEFF] to-[#FFF5E6] border border-blush-200/80 shadow-[0_8px_30px_rgba(244,114,182,0.18)] group"
        >
          {/* Subtle Ambient Glow */}
          <div className="absolute -right-8 -top-8 w-24 h-24 bg-gradient-to-br from-blush-300 to-amber-200 rounded-full blur-2xl opacity-50 group-hover:scale-125 transition-transform duration-500 pointer-events-none" />

          <div className="relative z-10 flex items-center justify-between">
            <div className="flex items-center gap-3">
              <IconBadge icon={PartyPopper} tint="rose" size="md" rounded="2xl" />
              <div>
                <div className="flex items-center gap-1.5">
                  <span className="text-[10px] font-bold text-blush-500 uppercase tracking-wider">
                    Milestone 2nd Anniversary
                  </span>
                  <span className="inline-block w-1.5 h-1.5 rounded-full bg-blush-400 animate-ping" />
                </div>
                <p className="font-display font-bold text-sm text-[#503043] mt-0.5">
                  Perayaan 2 Tahun Cinta Kita
                </p>
                <p className="text-[10px] text-[#7A4A63] font-medium">
                  {days} hari bersama • Buka surat & confetti
                </p>
              </div>
            </div>

            <div className="flex items-center gap-1 text-blush-500 font-bold text-xs bg-white/80 px-3 py-1.5 rounded-xl border border-blush-100 shadow-softer">
              <span>Buka</span>
              <ChevronRight size={13} />
            </div>
          </div>
        </motion.div>

        {/* 2. Days Together Card */}
        <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4.5 shadow-[0_8px_30px_rgba(0,0,0,0.03)] border border-white/80 relative overflow-hidden group">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2.5">
              <IconBadge icon={HeartHandshake} tint="blush" size="sm" rounded="xl" />
              <span className="text-[11px] font-display font-bold uppercase tracking-wider text-[#7A4A63]">
                Perjalanan Cinta Kita
              </span>
            </div>
            <span className="text-[10px] font-bold text-blush-500 bg-blush-50 px-2.5 py-0.5 rounded-full border border-blush-100">
              Hari ke-{days}
            </span>
          </div>

          <div className="mt-3 flex items-baseline gap-2">
            <p className="font-display font-bold text-3xl text-[#503043]">
              {days}
            </p>
            <span className="text-xs text-[#7A4A63] font-display font-medium">
              hari penuh tawa, kasih, &amp; pengertian
            </span>
          </div>
        </div>

        {/* 3. Birthday Reminders Grid */}
        <div className="grid grid-cols-2 gap-3">
          {/* My Birthday */}
          <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="flex items-center gap-2">
              <IconBadge icon={Cake} tint="lilac" size="xs" rounded="lg" />
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-lilac-500">
                Ulang Tahunku
              </span>
            </div>
            <div className="mt-2.5">
              <p className="font-display font-bold text-base text-[#503043]">
                {myBd.days === 0 ? "Hari ini!" : `${myBd.days} hari lagi`}
              </p>
              <span className="text-[10px] text-[#7A4A63] font-medium block mt-0.5">
                Usia {myBd.turning} tahun • {myZodiac.name}
              </span>
            </div>
          </div>

          {/* Partner Birthday */}
          <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] relative overflow-hidden">
            <div className="flex items-center gap-2">
              <IconBadge icon={Heart} tint="rose" size="xs" rounded="lg" />
              <span className="text-[10px] font-display font-bold uppercase tracking-wider text-rose-500 truncate">
                Ultah {partnerName}
              </span>
            </div>
            <div className="mt-2.5">
              {partnerBd ? (
                <>
                  <p className="font-display font-bold text-base text-[#503043]">
                    {partnerBd.days === 0 ? "Hari ini!" : `${partnerBd.days} hari lagi`}
                  </p>
                  <span className="text-[10px] text-[#7A4A63] font-medium block mt-0.5 truncate">
                    Usia {partnerBd.turning} tahun • {partnerZodiac?.name}
                  </span>
                </>
              ) : (
                <p className="text-xs text-[#7A4A63] font-medium mt-1">Belum diatur</p>
              )}
            </div>
          </div>
        </div>
      </motion.div>

      {/* 2nd Anniversary Modal */}
      <AnniversaryCelebrationModal
        isOpen={showCelebration}
        onClose={() => setShowCelebration(false)}
      />
    </>
  );
}
