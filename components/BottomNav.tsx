"use client";

import { motion } from "framer-motion";
import {
  Home, Sparkles, HeartHandshake, CalendarHeart,
  MessageCircleHeart, CheckSquare, ShoppingBag, Bot,
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
  { key: "care", label: "Handle", icon: HeartHandshake },
  { key: "cycle", label: "Siklus", icon: CalendarHeart },
  { key: "bot", label: "Sayang-bot", icon: Sparkles },
];

const SINGLE_TABS: { key: SingleTabKey; label: string; icon: React.ElementType }[] = [
  { key: "home", label: "Home", icon: Home },
  { key: "habits", label: "Habits", icon: CheckSquare },
  { key: "treat", label: "Treat Me", icon: Sparkles },
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
  const accentColor = mode === "couple" ? "text-blush-500" : "text-magenta-400";
  const activeBg = mode === "couple" ? "bg-blush-200/70" : "bg-magenta-100/80";

  return (
    <div className="absolute bottom-0 left-0 right-0 px-3 pb-3 pt-1 bg-gradient-to-t from-white/80 via-white/60 to-transparent backdrop-blur-sm">
      <div className="flex items-center justify-between bg-white/90 backdrop-blur rounded-3xl shadow-soft px-2 py-2 border border-blush-100/80">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = active === tab.key;
          return (
            <motion.button
              key={tab.key}
              onClick={() => onChange(tab.key as TabKey)}
              whileTap={{ scale: 0.9 }}
              className="relative flex flex-col items-center justify-center gap-0.5 px-2.5 py-1.5 rounded-2xl flex-1"
            >
              {isActive && (
                <motion.div
                  layoutId="nav-pill"
                  className={`absolute inset-0 ${activeBg} rounded-2xl`}
                  transition={{ type: "spring", stiffness: 400, damping: 30 }}
                />
              )}
              <Icon
                size={20}
                strokeWidth={2.3}
                className={`relative z-10 transition-colors ${isActive ? accentColor : "text-lilac-400/70"}`}
              />
              <span
                className={`relative z-10 text-[10px] font-display font-semibold transition-colors ${
                  isActive ? accentColor : "text-lilac-400/70"
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
