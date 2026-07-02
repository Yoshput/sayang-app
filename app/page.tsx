"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import MoodTracker from "@/components/MoodTracker";
import FoodRoulette from "@/components/FoodRoulette";
import DeepTalkCards from "@/components/DeepTalkCards";
import HandleWithCare from "@/components/HandleWithCare";
import PeriodTracker from "@/components/PeriodTracker";
import DateRecommendation from "@/components/DateRecommendation";
import BottomNav, { TabKey } from "@/components/BottomNav";
import AnniversaryCard from "@/components/AnniversaryCard";
import SettingsButton from "@/components/SettingsButton";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import { useProfile } from "@/app/providers";
import { MOODS, MoodKey } from "@/lib/data";

export default function Home() {
  const { profile, ready } = useProfile();
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [tab, setTab] = useState<TabKey>("home");
  const [care, setCare] = useState<string | null>(null);

  // Still checking localStorage on first mount — avoid a flash of onboarding/dashboard.
  if (!ready) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-[#FDE7F3] via-[#F3ECFF] to-[#E9F7EF]">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-4xl"
        >
          💗
        </motion.span>
      </div>
    );
  }

  if (!profile) {
    return <OnboardingFlow />;
  }

  const activeGradient =
    MOODS.find((m) => m.key === mood)?.gradient ?? "from-[#FFE9F3] via-[#FFF6FA] to-[#F3ECFF]";

  return (
    <div className={`h-full w-full flex flex-col bg-gradient-to-b ${activeGradient} transition-colors duration-700`}>
      <SettingsButton />

      <motion.div
        className="pointer-events-none absolute -top-6 -right-6 w-28 h-28 rounded-full bg-blush-200/40 blur-2xl animate-float"
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute top-32 -left-8 w-24 h-24 rounded-full bg-lilac-200/40 blur-2xl animate-float"
        style={{ animationDelay: "1.2s" }}
        aria-hidden
      />

      <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
        <AnimatePresence mode="wait">
          {tab === "home" && (
            <motion.div
              key="home"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <MoodTracker herName={profile.herName} mood={mood} onSelect={setMood} />
              <AnniversaryCard
                anniversaryDate={profile.anniversaryDate}
                birthDate={profile.birthDate}
              />
              <FoodRoulette />
            </motion.div>
          )}

          {tab === "talk" && (
            <motion.div
              key="talk"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <DeepTalkCards />
            </motion.div>
          )}

          {tab === "care" && (
            <motion.div
              key="care"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <HandleWithCare selected={care} onSelect={setCare} />
            </motion.div>
          )}

          {tab === "cycle" && (
            <motion.div
              key="cycle"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <PeriodTracker />
            </motion.div>
          )}

          {tab === "date" && (
            <motion.div
              key="date"
              initial={{ opacity: 0, x: 12 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -12 }}
              transition={{ duration: 0.25 }}
            >
              <DateRecommendation />
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      <BottomNav active={tab} onChange={setTab} />
    </div>
  );
}
