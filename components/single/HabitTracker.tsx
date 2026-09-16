"use client";

import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { HABIT_ITEMS, HabitKey } from "@/lib/data";
import { CheckCircle2, Circle, CheckSquare, Sparkles } from "lucide-react";
import IconBadge from "@/components/ui/IconBadge";

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
    <div className="mx-4 sm:mx-5 mt-4">
      {/* Header + Apple Health Progress Ring */}
      <div className="bg-white/75 backdrop-blur-xl rounded-3xl p-4.5 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] mb-3">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2.5">
            <IconBadge icon={CheckSquare} tint="mint" size="sm" rounded="xl" />
            <div>
              <p className="font-display font-bold text-sm text-[#503043]">
                Daily Check-in
              </p>
              <p className="text-[10px] text-[#7A4A63] font-display">
                {done === 0
                  ? "Yuk mulai kebiasaan baik hari ini!"
                  : done === total
                  ? "Target tercapai sempurna! Luar biasa."
                  : `${done} dari ${total} selesai (${pct}%)`}
              </p>
            </div>
          </div>

          {/* Progress Circular Ring */}
          <div className="relative w-12 h-12 shrink-0">
            <svg className="w-12 h-12 -rotate-90" viewBox="0 0 36 36">
              <circle cx="18" cy="18" r="15" fill="none" stroke="#FFE9F3" strokeWidth="3.2" />
              <circle
                cx="18"
                cy="18"
                r="15"
                fill="none"
                stroke="#F98FC2"
                strokeWidth="3.2"
                strokeDasharray={`${pct * 0.942}, 100`}
                strokeLinecap="round"
                className="transition-all duration-500 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <span className="text-[10px] font-display font-bold text-[#503043]">{pct}%</span>
            </div>
          </div>
        </div>
      </div>

      {/* Habit Items Grid */}
      <div className="grid grid-cols-2 gap-2.5">
        {HABIT_ITEMS.map((item, i) => {
          const isDone = checked.has(item.key);
          return (
            <motion.button
              key={item.key}
              whileTap={{ scale: 0.96 }}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: i * 0.03 }}
              onClick={() => toggle(item.key)}
              className={`flex items-center justify-between p-3 rounded-2xl border text-left transition-all duration-200 ${
                isDone
                  ? "bg-white/90 border-blush-300 shadow-soft"
                  : "bg-white/60 border-white/70 hover:bg-white/80"
              }`}
            >
              <div className="flex items-center gap-2.5 min-w-0 pr-1">
                <IconBadge
                  icon={item.iconName}
                  tint={isDone ? "blush" : "neutral"}
                  size="xs"
                  rounded="lg"
                />
                <span
                  className={`text-xs font-display font-semibold truncate ${
                    isDone ? "text-[#503043] font-bold" : "text-[#7A4A63]"
                  }`}
                >
                  {item.label}
                </span>
              </div>

              <div className="shrink-0 ml-1">
                {isDone ? (
                  <CheckCircle2 size={17} className="text-blush-500 fill-blush-100" />
                ) : (
                  <Circle size={17} className="text-blush-200" />
                )}
              </div>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
