"use client";

import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { CalendarHeart, HeartPulse, Sparkles, Sun, Moon, ShieldAlert } from "lucide-react";
import IconBadge from "@/components/ui/IconBadge";

type Phase = {
  label: string;
  icon: React.ElementType;
  tint: "rose" | "mint" | "lilac" | "amber" | "slate";
  warning: string;
  color: string;
};

function getPhase(dayInCycle: number, cycleLength: number): Phase {
  const periodLength = 5;
  const ovulationDay = cycleLength - 14;

  if (dayInCycle <= periodLength) {
    return {
      label: "Fase Menstruasi",
      icon: HeartPulse,
      tint: "rose",
      warning: "Energi sedang menurun. Pastikan minum air hangat, istirahat cukup, dan kurangi beban stres.",
      color: "bg-blush-50 border-blush-200 text-[#7A4A63]",
    };
  }
  if (dayInCycle > periodLength && dayInCycle < ovulationDay - 2) {
    return {
      label: "Fase Folikular (Ketenangan)",
      icon: Sparkles,
      tint: "mint",
      warning: "Mood dan energi mulai stabil. Waktu yang ideal untuk berdiskusi, belajar, dan produktif.",
      color: "bg-mint-50 border-mint-200 text-[#3D6B54]",
    };
  }
  if (dayInCycle >= ovulationDay - 2 && dayInCycle <= ovulationDay + 1) {
    return {
      label: "Masa Subur (Ovulasi)",
      icon: Sun,
      tint: "lilac",
      warning: "Tingkat energi dan rasa percaya diri mencapai puncak. Sangat ceria dan bersemangat.",
      color: "bg-lilac-50 border-lilac-200 text-[#5B4A8A]",
    };
  }
  if (dayInCycle > cycleLength - 5) {
    return {
      label: "Fase Pra-Menstruasi (PMS)",
      icon: ShieldAlert,
      tint: "amber",
      warning: "Fluktuasi hormon dapat membuat perasaan sensitif. Berikan pelukan, camilan manis, dan pengertian.",
      color: "bg-amber-50 border-amber-200 text-[#8A6A3D]",
    };
  }
  return {
    label: "Fase Luteal",
    icon: Moon,
    tint: "slate",
    warning: "Tubuh mulai mempersiapkan siklus berikutnya. Prioritaskan relaksasi dan tidur berkualitas.",
    color: "bg-blush-50 border-blush-200 text-[#7A4A63]",
  };
}

export default function PeriodTracker() {
  const [lastPeriodDate, setLastPeriodDate] = useState("");
  const [cycleLength, setCycleLength] = useState(28);

  const cycleData = useMemo(() => {
    if (!lastPeriodDate) return null;

    const start = new Date(lastPeriodDate);
    const today = new Date();
    start.setHours(0, 0, 0, 0);
    today.setHours(0, 0, 0, 0);

    const diffDays = Math.floor(
      (today.getTime() - start.getTime()) / (1000 * 60 * 60 * 24)
    );

    const dayInCycle = ((diffDays % cycleLength) + cycleLength) % cycleLength + 1;
    const daysUntilNext = cycleLength - dayInCycle + 1;

    const nextPeriod = new Date(start);
    const cyclesPassed = Math.floor(diffDays / cycleLength) + 1;
    nextPeriod.setDate(start.getDate() + cyclesPassed * cycleLength);

    const phase = getPhase(dayInCycle, cycleLength);

    return { dayInCycle, daysUntilNext, nextPeriod, phase };
  }, [lastPeriodDate, cycleLength]);

  return (
    <div className="mx-4 sm:mx-5 mt-4">
      <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4.5 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
        <div className="flex items-center gap-2.5 mb-3">
          <IconBadge icon={CalendarHeart} tint="rose" size="sm" rounded="xl" />
          <div>
            <p className="font-display font-bold text-sm text-[#503043]">
              Pelacak Siklus Bulanan
            </p>
            <p className="text-[10px] text-[#7A4A63] font-display">
              Pantau fase biologis dan pahami kebutuhan pasangan
            </p>
          </div>
        </div>

        {/* Form Input */}
        <div className="grid grid-cols-2 gap-2 mb-3">
          <div>
            <label className="text-[10px] font-display font-semibold text-[#7A4A63] block mb-1">
              Hari Pertama Haid Terakhir:
            </label>
            <input
              type="date"
              value={lastPeriodDate}
              onChange={(e) => setLastPeriodDate(e.target.value)}
              className="w-full px-3 py-2 rounded-xl bg-white border border-blush-100 text-xs font-display text-[#503043] outline-none"
            />
          </div>

          <div>
            <label className="text-[10px] font-display font-semibold text-[#7A4A63] block mb-1">
              Panjang Siklus (Hari):
            </label>
            <input
              type="number"
              min={21}
              max={40}
              value={cycleLength}
              onChange={(e) => setCycleLength(Number(e.target.value))}
              className="w-full px-3 py-2 rounded-xl bg-white border border-blush-100 text-xs font-display text-[#503043] outline-none"
            />
          </div>
        </div>

        {/* Cycle Results */}
        {cycleData ? (
          <div className="space-y-2.5">
            <div className={`p-3.5 rounded-2xl border ${cycleData.phase.color}`}>
              <div className="flex items-center gap-2 mb-1">
                <IconBadge icon={cycleData.phase.icon} tint={cycleData.phase.tint} size="xs" rounded="md" />
                <p className="font-display font-bold text-xs">{cycleData.phase.label}</p>
              </div>
              <p className="text-xs font-medium leading-relaxed mt-1">
                {cycleData.phase.warning}
              </p>
            </div>

            <div className="grid grid-cols-2 gap-2 text-center">
              <div className="p-2.5 rounded-xl bg-blush-50/60 border border-blush-100/60">
                <p className="text-[9px] font-bold text-blush-500 uppercase tracking-wider">
                  Hari Siklus
                </p>
                <p className="font-display font-bold text-base text-[#503043] mt-0.5">
                  Hari ke-{cycleData.dayInCycle}
                </p>
              </div>

              <div className="p-2.5 rounded-xl bg-lilac-50/60 border border-lilac-100/60">
                <p className="text-[9px] font-bold text-lilac-500 uppercase tracking-wider">
                  Prediksi Haid Berikutnya
                </p>
                <p className="font-display font-bold text-base text-[#503043] mt-0.5">
                  {cycleData.daysUntilNext} hari lagi
                </p>
              </div>
            </div>
          </div>
        ) : (
          <p className="text-xs text-[#7A4A63] font-display text-center py-2">
            Masukkan tanggal haid terakhir untuk melihat fase siklus
          </p>
        )}
      </div>
    </div>
  );
}
