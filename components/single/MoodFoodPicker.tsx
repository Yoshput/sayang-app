"use client";

import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Shuffle, UtensilsCrossed, Sparkles, ChevronDown } from "lucide-react";
import { MoodKey, MOODS, FOODS_BY_MOOD, FoodItem } from "@/lib/data";

const MOOD_LABELS: Record<MoodKey, { bg: string; ring: string; label: string }> = {
  happy:  { bg: "from-yellow-50 to-pink-50",   ring: "ring-yellow-200", label: "Senang 😊" },
  sad:    { bg: "from-blue-50 to-purple-50",    ring: "ring-blue-200",   label: "Sedih 😢" },
  angry:  { bg: "from-red-50 to-orange-50",     ring: "ring-red-200",    label: "Kesel 😤" },
  cuddly: { bg: "from-pink-50 to-purple-50",    ring: "ring-pink-200",   label: "Manja 🥰" },
  tired:  { bg: "from-indigo-50 to-blue-50",    ring: "ring-indigo-200", label: "Capek 😴" },
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
    const total = 14; // number of "flips" before landing
    intervalRef.current = setInterval(() => {
      tick++;
      setResult(pool[Math.floor(Math.random() * pool.length)]);
      setSpinCount(tick);
      if (tick >= total) {
        clearInterval(intervalRef.current!);
        setSpinning(false);
      }
    }, 80 + tick * 5); // gradually slow down
  }, [selectedMood, spinning]);

  const moodStyle = selectedMood ? MOOD_LABELS[selectedMood] : MOOD_LABELS.happy;

  return (
    <div className="mx-5 mt-4 mb-2">
      <div className={`bg-gradient-to-br ${moodStyle.bg} rounded-3xl p-5 border border-white/80 shadow-softer`}>
        
        {/* Header */}
        <div className="flex items-center justify-between mb-4">
          <div>
            <p className="text-[10px] font-display font-bold text-blush-400 uppercase tracking-wider flex items-center gap-1">
              <UtensilsCrossed size={11} /> Makan Apa Ya?
            </p>
            <h3 className="font-display font-bold text-sm text-[#7A4A63] mt-0.5">
              Food Roulette 🎰
            </h3>
          </div>
          <motion.button
            whileTap={{ scale: 0.93 }}
            onClick={() => setShowMoodPicker((v) => !v)}
            className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/80 border ${moodStyle.ring} ring-1 text-[10px] font-display font-bold text-[#7A4A63] shadow-softer`}
          >
            {selectedMood ? MOODS.find((m) => m.key === selectedMood)?.emoji : "😊"}
            {selectedMood ? MOOD_LABELS[selectedMood].label.split(" ")[0] : "Pilih Mood"}
            <ChevronDown size={10} className={`transition-transform ${showMoodPicker ? "rotate-180" : ""}`} />
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
              className="overflow-hidden mb-4"
            >
              <div className="flex gap-2 flex-wrap">
                {MOODS.map((m) => (
                  <motion.button
                    key={m.key}
                    whileTap={{ scale: 0.92 }}
                    onClick={() => {
                      setSelectedMood(m.key as MoodKey);
                      setShowMoodPicker(false);
                      setResult(null);
                    }}
                    className={`flex items-center gap-1.5 px-3 py-2 rounded-2xl text-[10px] font-display font-bold transition-all ${
                      selectedMood === m.key
                        ? "bg-white shadow-soft text-[#7A4A63] ring-2 ring-blush-300"
                        : "bg-white/50 text-[#9A6A83]"
                    }`}
                  >
                    <span className="text-sm">{m.emoji}</span> {m.label}
                  </motion.button>
                ))}
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Roulette Result Card */}
        <div className="relative min-h-[110px] flex items-center justify-center mb-4">
          <AnimatePresence mode="wait">
            {result ? (
              <motion.div
                key={`${result.name}-${spinCount}`}
                initial={{ scale: 0.8, opacity: 0, rotateY: -30 }}
                animate={{ scale: 1, opacity: 1, rotateY: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ duration: 0.12 }}
                className="w-full bg-white/90 rounded-2xl p-4 border border-white shadow-soft text-center"
              >
                <motion.div
                  animate={spinning ? { rotate: [0, -5, 5, -5, 5, 0] } : {}}
                  transition={{ duration: 0.3, repeat: spinning ? Infinity : 0 }}
                  className="text-4xl mb-2"
                >
                  {result.emoji}
                </motion.div>
                <p className="font-display font-bold text-base text-[#7A4A63]">{result.name}</p>
                <div className="flex items-center justify-center gap-2 mt-1">
                  <span className="bg-blush-100 text-blush-500 text-[9px] font-display font-bold px-2 py-0.5 rounded-full">
                    {result.category}
                  </span>
                </div>
                {!spinning && (
                  <motion.p
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.2 }}
                    className="text-[10px] text-lilac-500 mt-2 font-medium italic"
                  >
                    ✨ {result.note}
                  </motion.p>
                )}
              </motion.div>
            ) : (
              <motion.div
                key="empty"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="w-full bg-white/60 rounded-2xl p-5 border border-white/50 text-center"
              >
                <p className="text-3xl mb-2">🍽️</p>
                <p className="text-xs font-display font-bold text-[#9A6A83]">
                  Bingung mau makan apa?
                </p>
                <p className="text-[10px] text-lilac-400 mt-1">
                  Pilih mood & spin untuk dapat rekomendasi!
                </p>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* Mood food list preview */}
        {selectedMood && !spinning && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="flex gap-1.5 flex-wrap mb-4"
          >
            {FOODS_BY_MOOD[selectedMood].slice(0, 5).map((f) => (
              <button
                key={f.name}
                onClick={() => setResult(f)}
                className="flex items-center gap-1 px-2.5 py-1 bg-white/70 rounded-xl text-[9px] font-display font-semibold text-[#7A4A63] border border-white/80 hover:bg-white transition-all"
              >
                {f.emoji} {f.name}
              </button>
            ))}
            <span className="flex items-center px-2.5 py-1 bg-white/40 rounded-xl text-[9px] text-lilac-400 font-display">
              +{FOODS_BY_MOOD[selectedMood].length - 5} lagi
            </span>
          </motion.div>
        )}

        {/* Spin Button */}
        <motion.button
          whileTap={{ scale: 0.95 }}
          whileHover={{ scale: 1.02 }}
          onClick={spin}
          disabled={spinning || !selectedMood}
          className={`w-full flex items-center justify-center gap-2 py-3 rounded-2xl font-display font-bold text-sm text-white shadow-soft transition-all ${
            spinning
              ? "bg-gradient-to-r from-lilac-300 to-blush-300"
              : selectedMood
              ? "bg-gradient-to-r from-blush-400 via-lilac-400 to-blush-500"
              : "bg-gray-200 text-gray-400 cursor-not-allowed"
          }`}
        >
          <motion.span
            animate={spinning ? { rotate: 360 } : { rotate: 0 }}
            transition={spinning ? { duration: 0.5, repeat: Infinity, ease: "linear" } : {}}
          >
            {spinning ? <Sparkles size={15} /> : <Shuffle size={15} />}
          </motion.span>
          {spinning ? "Nyari yang terbaik buat kamu..." : "Spin! Acak Makanan 🎰"}
        </motion.button>

        {result && !spinning && (
          <motion.button
            initial={{ opacity: 0, y: 4 }}
            animate={{ opacity: 1, y: 0 }}
            whileTap={{ scale: 0.95 }}
            onClick={spin}
            className="w-full mt-2 text-[10px] font-display font-bold text-lilac-400 py-1.5"
          >
            🔄 Gak cocok? Spin lagi!
          </motion.button>
        )}
      </div>
    </div>
  );
}
