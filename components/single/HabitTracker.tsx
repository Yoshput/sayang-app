"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { HABIT_ITEMS, HabitKey } from "@/lib/data";
import { CheckCircle2, Circle } from "lucide-react";

const TODAY_KEY = () => `habits:${new Date().toISOString().split("T")[0]}`;

export default function HabitTracker() {
  const [checked, setChecked] = useState<Set<HabitKey>>(new Set());
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(TODAY_KEY());
      if (raw) setChecked(new Set(JSON.parse(raw)));
    } catch {}
    setLoaded(true);
  }, []);

  const toggle = (key: HabitKey) => {
    setChecked((prev) => {
      const next = new Set(prev);
      next.has(key) ? next.delete(key) : next.add(key);
      localStorage.setItem(TODAY_KEY(), JSON.stringify([...next]));
      return next;
    });
  };

  const done = checked.size;
  const total = HABIT_ITEMS.length;
  const pct = Math.round((done / total) * 100);

  if (!loaded) return null;

  return (
    <div className="mx-5 mt-5">
      {/* Header + progress */}
      <div className="bg-white/60 backdrop-blur-md rounded-3xl p-4 border border-white/60 shadow-softer mb-3">
        <div className="flex items-center justify-between mb-2">
          <div>
            <p className="font-display font-bold text-sm text-[#7A4A63]">Daily Check-in ✨</p>
            <p className="text-[10px] text-lilac-400 font-display">
              {done === 0
                ? "Yuk mulai hari ini!"
                : done === total
                ? "Sempurna! Kamu luar biasa 🎉"
                : `${done} dari ${total} done!`}
            </p>
          </div>
          <div className="relative w-12 h-12">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#FFE9F3" strokeWidth="3" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#F98FC2"
                strokeWidth="3"
                strokeLinecap="round"
                strokeDasharray={`${(pct / 100) * 94.2} 94.2`}
                className="transition-all duration-500"
              />
            </svg>
            <span className="absolute inset-0 flex items-center justify-center text-[10px] font-display font-bold text-[#7A4A63]">
              {pct}%
            </span>
          </div>
        </div>

        {/* Progress bar */}
        <div className="h-1.5 bg-blush-100 rounded-full overflow-hidden">
          <motion.div
            className="h-full bg-gradient-to-r from-blush-400 to-lilac-400 rounded-full"
            initial={{ width: 0 }}
            animate={{ width: `${pct}%` }}
            transition={{ duration: 0.6, ease: "easeOut" }}
          />
        </div>
      </div>

      {/* Habit items */}
      <div className="grid grid-cols-2 gap-2">
        {HABIT_ITEMS.map((item, i) => {
          const isDone = checked.has(item.key);
          return (
            <motion.button
              key={item.key}
              onClick={() => toggle(item.key)}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2.5 p-3 rounded-2xl border text-left transition-all duration-300 ${
                isDone
                  ? "bg-gradient-to-br from-blush-100 to-lilac-100 border-blush-200 shadow-soft"
                  : "bg-white/60 border-white/50 backdrop-blur-md"
              }`}
            >
              <motion.span
                animate={isDone ? { scale: [1, 1.3, 1] } : {}}
                transition={{ duration: 0.3 }}
                className="text-xl shrink-0"
              >
                {item.emoji}
              </motion.span>
              <div className="flex-1 min-w-0">
                <p className={`text-[11px] font-display font-bold truncate ${isDone ? "text-[#7A4A63]" : "text-[#8A5C74]/70"}`}>
                  {item.label}
                </p>
              </div>
              <AnimatePresence>
                {isDone ? (
                  <motion.span
                    key="check"
                    initial={{ scale: 0 }}
                    animate={{ scale: 1 }}
                    exit={{ scale: 0 }}
                  >
                    <CheckCircle2 size={14} className="text-blush-400 shrink-0" />
                  </motion.span>
                ) : (
                  <motion.span key="circle" initial={{ scale: 0 }} animate={{ scale: 1 }}>
                    <Circle size={14} className="text-lilac-200 shrink-0" />
                  </motion.span>
                )}
              </AnimatePresence>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
