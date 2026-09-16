"use client";

import { motion } from "framer-motion";
import {
  Home,
  Sparkles,
  HeartHandshake,
  CalendarHeart,
  MessageCircleHeart,
  CheckSquare,
  ShoppingBag,
  Bot,
} from "lucide-react";
import { AppMode } from "@/lib/profile";

// Couple mode tabs
export type CoupleTabKey = "home" | "talk" | "care" | "cycle" | "bot";
// Single mode tabs
export type SingleTabKey = "home" | "habits" | "treat" | "wishlist" | "bot";

export type TabKey = CoupleTabKey | SingleTabKey;

const COUPLE_TABS: { key: CoupleTabKey; label: string; icon: React.ElementType }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "talk", label: "Deep Talk", icon: MessageCircleHeart },
  { key: "care", label: "Care", icon: HeartHandshake },
  { key: "cycle", label: "Siklus", icon: CalendarHeart },
  { key: "bot", label: "Sayang AI", icon: Sparkles },
];

const SINGLE_TABS: { key: SingleTabKey; label: string; icon: React.ElementType }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "habits", label: "Habits", icon: CheckSquare },
  { key: "treat", label: "Me-Time", icon: Sparkles },
  { key: "wishlist", label: "Wishlist", icon: ShoppingBag },
  { key: "bot", label: "Acabot", icon: Bot },
];

export default function BottomNav({
  active,
  onChange,
  mode,
}: {
  active: TabKey;
  onChange: (t: TabKey) => void;
  mode: AppMode;
}) {
  const tabs = mode === "couple" ? COUPLE_TABS : SINGLE_TABS;
  const accentColor = mode === "couple" ? "text-blush-500" : "text-magenta-500";
  const activeBg = mode === "couple" ? "bg-blush-100/80" : "bg-magenta-100/80";

  return (
    <div className="absolute bottom-0 left-0 right-0 px-3 pb-[max(0.65rem,env(safe-area-inset-bottom))] pt-1 bg-gradient-to-t from-white/90 via-white/70 to-transparent backdrop-blur-sm z-30">
      <div className="flex items-center justify-between bg-white/90 backdrop-blur-2xl rounded-[28px] shadow-[0_8px_30px_rgba(244,114,182,0.18)] px-1.5 py-1.5 border border-white/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.key;
          return (
            <motion.button
              key={tab.key}
              onClick={() => onChange(tab.key as TabKey)}
              whileTap={{ scale: 0.92 }}
              className="relative flex flex-col items-center justify-center gap-0.5 px-2 py-1.5 rounded-2xl flex-1 transition-all"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className={`absolute inset-0 ${activeBg} rounded-2xl border border-white/60 shadow-softer`}
                  transition={{ type: "spring", stiffness: 450, damping: 32 }}
                />
              )}
              <Icon
                size={19}
                strokeWidth={2.4}
                className={`relative z-10 transition-colors ${
                  isActive ? accentColor : "text-[#9B7089]/70"
                }`}
              />
              <span
                className={`relative z-10 text-[10px] font-display font-semibold transition-colors ${
                  isActive ? `${accentColor} font-bold` : "text-[#9B7089]/70"
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
