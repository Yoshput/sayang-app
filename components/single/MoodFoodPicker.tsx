"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, UtensilsCrossed, Sparkles, ChevronDown } from "lucide-react";
import { MoodKey, MOODS, FOODS_BY_MOOD, FoodItem } from "@/lib/data";
import IconBadge from "@/components/ui/IconBadge";

const MOOD_STYLES: Record<MoodKey, { bg: string; border: string; tint: "peach" | "blue" | "amber" | "rose" | "lilac"; label: string }> = {
  happy:  { bg: "from-[#FFF9FA] to-[#FFF4E6]", border: "border-peach-200", tint: "peach", label: "Senang" },
  sad:    { bg: "from-[#F4F7FF] to-[#FAF5FF]", border: "border-blue-200",  tint: "blue",  label: "Sedih" },
  angry:  { bg: "from-[#FFF5F5] to-[#FFF7ED]", border: "border-amber-200", tint: "amber", label: "Kesel" },
  cuddly: { bg: "from-[#FFF0F6] to-[#FAF5FF]", border: "border-rose-200",  tint: "rose",  label: "Manja" },
  tired:  { bg: "from-[#F5F8FF] to-[#FAF5FF]", border: "border-lilac-200", tint: "lilac", label: "Capek" },
};

export default function MoodFoodPicker({ currentMood }: { currentMood: MoodKey | null }) {
  const [selectedMood, setSelectedMood] = useState<MoodKey | null>(currentMood);
  const [result, setResult]             = useState<FoodItem | null>(null);
  const [spinning, setSpinning]         = useState(false);
  const [showMoodPicker, setShowMoodPicker] = useState(false);
  const [spinCount, setSpinCount]       = useState(0);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const spin = useCallback(() => {
    const mood = selectedMood ?? "happy";
    const pool = FOODS_BY_MOOD[mood];
    if (spinning) return;

    setSpinning(true);
    setSpinCount(0);

    let tick = 0;
    const total = 14;
    intervalRef.current = setInterval(() => {
      tick++;
      setResult(pool[Math.floor(Math.random() * pool.length)]);
      setSpinCount(tick);
      if (tick >= total) {
        clearInterval(intervalRef.current!);
        setSpinning(false);
      }
    }, 80 + tick * 5);
  }, [selectedMood, spinning]);

  const moodStyle = selectedMood ? MOOD_STYLES[selectedMood] : MOOD_STYLES.happy;

  return (
    <div className="mx-4 sm:mx-5 mt-4 mb-2">
      <div className={`bg-gradient-to-br ${moodStyle.bg} rounded-3xl p-4.5 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]`}>
        {/* Header */}
        <div className="flex items-center justify-between mb-3.5">
          <div className="flex items-center gap-2">
            <IconBadge icon={UtensilsCrossed} tint={moodStyle.tint} size="sm" rounded="xl" />
            <div>
              <p className="text-[10px] font-display font-bold text-blush-500 uppercase tracking-wider">
                Makan Apa Hari Ini?
              </p>
              <h3 className="font-display font-bold text-sm text-[#503043] mt-0.5">
                Rekomendasi Sesuai Mood
              </h3>
            </div>
          </div>

          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={() => setShowMoodPicker((v) => !v)}
            className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/90 border border-blush-100 text-[10px] font-display font-bold text-[#7A4A63] shadow-softer"
          >
            <span>{selectedMood ? MOOD_STYLES[selectedMood].label : "Pilih Mood"}</span>
            <ChevronDown size={12} className={`transition-transform duration-200 ${showMoodPicker ? "rotate-180" : ""}`} />
          </motion.button>
        </div>

        {/* Mood Selector Dropdown */}
        <AnimatePresence>
          {showMoodPicker && (
            <motion.div
              key="mood-picker"
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              transition={{ duration: 0.2 }}
              className="overflow-hidden mb-3"
            >
              <div className="flex gap-1.5 flex-wrap">
                {MOODS.map((m) => (
                  <motion.button
                    key={m.key}
                    whileTap={{ scale: 0.94 }}
                    onClick={() => {
                      setSelectedMood(m.key as MoodKey);
                      setShowMoodPicker(false);
                      setResult(null);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-[10px] font-display font-semibold transition-all ${
                      selectedMood === m.key
                        ? "bg-white shadow-soft text-[#503043] border border-blush-300 font-bold"
                        : "bg-white/50 text-[#7A4A63] border border-transparent hover:bg-white/80"
                    }`}
                  >
                    <IconBadge icon={m.iconName} tint={m.tint} size="xs" rounded="md" />
                    <span>{m.label}</span>
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Roulette Result Card */}
        <div className="relative min-h-[115px] flex items-center justify-center mb-3">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={`${result.name}-${spinCount}`}
                initial={{ scale: 0.85, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.85, opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="w-full bg-white/90 backdrop-blur-md rounded-2xl p-4 border border-white shadow-soft text-center flex flex-col items-center"
              >
                <IconBadge icon={result.iconName} tint={moodStyle.tint} size="md" rounded="2xl" className="mb-2" />
                <p className="font-display font-bold text-base text-[#503043]">{result.name}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="bg-blush-50 text-blush-600 text-[10px] font-display font-bold px-2.5 py-0.5 rounded-full border border-blush-100">
                    {result.category}
                  </span>
                </div>
                {!spinning && (
                  <motion.p
                    initial={{ opacity: 0, y: 3 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.15 }}
                    className="text-[10px] text-[#7A4A63] mt-2 font-medium"
                  >
                    {result.note}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full bg-white/60 backdrop-blur-md rounded-2xl p-4.5 border border-white/50 text-center flex flex-col items-center justify-center gap-1.5"
              >
                <IconBadge icon={UtensilsCrossed} tint={moodStyle.tint} size="md" rounded="2xl" />
                <p className="text-xs font-display font-bold text-[#503043] mt-1">
                  Bingung memilih santapan hari ini?
                </p>
                <p className="text-[10px] text-[#7A4A63]">
                  Pilih mood dan acak untuk mendapatkan ide menu terbaik!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Quick Menu Chips */}
        {selectedMood && !spinning && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex gap-1.5 flex-wrap mb-3.5">
            {FOODS_BY_MOOD[selectedMood].slice(0, 4).map((f) => (
              <button
                key={f.name}
                onClick={() => setResult(f)}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-white/75 rounded-xl text-[9px] font-display font-semibold text-[#503043] border border-white/80 hover:bg-white transition-all shadow-softer"
              >
                <IconBadge icon={f.iconName} tint={moodStyle.tint} size="xs" rounded="md" />
                <span className="truncate">{f.name}</span>
              </button>
            ))}
          </motion.div>
        )}

        {/* Spin Button */}
        <motion.button
          whileTap={{ scale: 0.96 }}
          whileHover={{ scale: 1.02 }}
          onClick={spin}
          disabled={spinning}
          className="w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-display font-bold text-xs text-white shadow-soft bg-gradient-to-r from-blush-400 via-lilac-400 to-blush-500 disabled:opacity-60 transition-all"
        >
          <Shuffle size={14} className={spinning ? "animate-spin" : ""} />
          {spinning ? "Menemukan menu terbaik..." : "Acak Menu Sesuai Mood"}
        </motion.button>
      </div>
    </div>
  );
}
