"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarHeart } from "lucide-react";

type Phase = {
  label: string;
  emoji: string;
  warning: string;
  color: string;
};

function getPhase(dayInCycle: number, cycleLength: number): Phase {
  const periodLength = 5;
  const ovulationDay = cycleLength - 14;

  if (dayInCycle <= periodLength) {
    return {
      label: "Lagi Menstruasi",
      emoji: "🩸",
      warning: "⚠️ Senggol Bacok Mode Aktif. Sedia coklat & air anget.",
      color: "bg-blush-100 border-blush-300 text-[#7A4A63]",
    };
  }
  if (dayInCycle > periodLength && dayInCycle < ovulationDay - 2) {
    return {
      label: "Fase Tenang (Follicular)",
      emoji: "🌱",
      warning: "Mood lagi lumayan stabil, cocok buat quality time seru.",
      color: "bg-mint-100 border-mint-200 text-[#3D6B54]",
    };
  }
  if (dayInCycle >= ovulationDay - 2 && dayInCycle <= ovulationDay + 1) {
    return {
      label: "Masa Subur (Ovulasi)",
      emoji: "🌸",
      warning: "Energi lagi tinggi-tingginya, semangat banget!",
      color: "bg-lilac-100 border-lilac-200 text-[#5B4A8A]",
    };
  }
  if (dayInCycle > cycleLength - 5) {
    return {
      label: "PMS",
      emoji: "🍫",
      warning: "⚠️ Need Chocolate. Mood gampang naik turun, sabar ya Mamas.",
      color: "bg-cream-200 border-cream-100 text-[#8A6A3D]",
    };
  }
  return {
    label: "Fase Luteal",
    emoji: "🌙",
    warning: "Mulai gampang capek, jangan lupa istirahat cukup.",
    color: "bg-blush-50 border-blush-200 text-[#7A4A63]",
  };
}

export default function PeriodTracker() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);

  const phase = useMemo(() => {
    if (!lastPeriodDate) return null;
    const start = new Date(lastPeriodDate);
    const today = new Date();
    const diffDays = Math.floor((today.getTime() - start.getTime()) / 86400000);
    const dayInCycle = ((diffDays % cycleLength) + cycleLength) % cycleLength || cycleLength;
    return { ...getPhase(dayInCycle, cycleLength), dayInCycle };
  }, [lastPeriodDate, cycleLength]);

  return (
    <div className="px-5 pt-6 pb-2">
      <p className="font-display font-bold text-[#7A4A63] text-base flex items-center gap-1.5">
        <CalendarHeart size={16} className="text-blush-400" /> Siklus & Mood Tracker
      </p>

      <div className="mt-3 bg-white/80 rounded-3xl p-4 shadow-softer border border-lilac-100 space-y-3">
        <div>
          <label className="text-[11px] font-display font-semibold text-lilac-500">
            Hari pertama haid terakhir
          </label>
          <input
            type="date"
            value={lastPeriodDate}
            onChange={(e) => setLastPeriodDate(e.target.value)}
            className="mt-1 w-full rounded-2xl border border-lilac-200 bg-lilac-50/60 px-3 py-2 text-sm text-[#5B4A8A] outline-none focus:border-lilac-400"
          />
        </div>
        <div>
          <label className="text-[11px] font-display font-semibold text-lilac-500">
            Panjang siklus (hari): {cycleLength}
          </label>
          <input
            type="range"
            min={21}
            max={35}
            value={cycleLength}
            onChange={(e) => setCycleLength(Number(e.target.value))}
            className="w-full accent-blush-400 mt-1"
          />
        </div>
      </div>

      {phase ? (
        <motion.div
          key={phase.label}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          className={`mt-3 rounded-3xl p-4 border ${phase.color}`}
        >
          <div className="flex items-center gap-2">
            <span className="text-2xl">{phase.emoji}</span>
            <div>
              <p className="font-display font-bold text-sm">{phase.label}</p>
              <p className="text-[11px] opacity-70">Hari ke-{phase.dayInCycle} dari siklus</p>
            </div>
          </div>
          <p className="text-xs mt-2 leading-relaxed">{phase.warning}</p>
        </motion.div>
      ) : (
        <p className="text-xs text-lilac-400 mt-3 text-center">
          Isi tanggal di atas buat lihat status siklus ✨
        </p>
      )}
    </div>
  );
}
