"use client";

import { motion } from "framer-motion";
import { Home, Sparkles, HeartHandshake, CalendarHeart, MessageCircleHeart } from "lucide-react";

export type TabKey = "home" | "talk" | "care" | "cycle" | "date";

const TABS: { key: TabKey; label: string; icon: React.ElementType }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "talk", label: "Deep Talk", icon: MessageCircleHeart },
  { key: "care", label: "Handle", icon: HeartHandshake },
  { key: "cycle", label: "Siklus", icon: CalendarHeart },
  { key: "date", label: "Date", icon: Sparkles },
];

export default function BottomNav({
  active,
  onChange,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
}) {
  return (
    <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-1 bg-gradient-to-t from-[#FFF8FB] via-[#FFF8FB]/95 to-transparent">
      <div className="flex items-center justify-between bg-white/90 backdrop-blur rounded-3xl shadow-soft px-2 py-2 border border-blush-100">
        {TABS.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.key;
          return (
            <motion.button
              key={tab.key}
              onClick={() => onChange(tab.key)}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 rounded-2xl flex-1"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className="absolute inset-0 bg-blush-200/70 rounded-2xl"
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={2.3}
                className={`relative z-10 ${isActive ? "text-blush-500" : "text-lilac-400/70"}`}
              />
              <span
                className={`relative z-10 text-[10px] font-display font-semibold ${
                  isActive ? "text-blush-500" : "text-lilac-400/70"
                }`}
              >
                {tab.label}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
}
