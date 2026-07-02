"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// Common components
import BottomNav, { TabKey } from "@/components/BottomNav";
import SettingsButton from "@/components/SettingsButton";
import AcabotChat from "@/components/AcabotChat";
import OnboardingFlow from "@/components/onboarding/OnboardingFlow";
import TimeCapsule from "@/components/TimeCapsule";
import { useProfile } from "@/app/providers";
import { MOODS, MoodKey } from "@/lib/data";

// Couple mode components
import MoodTracker from "@/components/MoodTracker";
import AnniversaryCard from "@/components/AnniversaryCard";
import FoodRoulette from "@/components/FoodRoulette";
import DeepTalkCards from "@/components/DeepTalkCards";
import HandleWithCare from "@/components/HandleWithCare";
import PeriodTracker from "@/components/PeriodTracker";
import DateRecommendation from "@/components/DateRecommendation";
import PartnerStatusBoard from "@/components/couple/PartnerStatusBoard";
import HintDrop from "@/components/couple/HintDrop";

// Single mode components
import SingleMoodHeader from "@/components/single/SingleMoodHeader";
import HabitTracker from "@/components/single/HabitTracker";
import TreatRoulette from "@/components/single/TreatRoulette";
import WishlistTracker from "@/components/single/WishlistTracker";

export default function Home() {
  const { profile, ready } = useProfile();
  const [mood, setMood] = useState<MoodKey | null>(null);
  const [tab, setTab] = useState<TabKey>("home");
  const [care, setCare] = useState<string | null>(null);
  const [showBot, setShowBot] = useState(false);

  // Loading state
  if (!ready) {
    return (
      <div className="h-full w-full flex items-center justify-center bg-gradient-to-b from-[#FFF2F9] via-[#F6EEFF] to-[#EBF9F1]">
        <motion.span
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ repeat: Infinity, duration: 1 }}
          className="text-5xl"
        >
          💗
        </motion.span>
      </div>
    );
  }

  // Onboarding if no profile
  if (!profile) return <OnboardingFlow />;

  const isCouple = profile.mode === "couple";
  const isSingle = profile.mode === "single";

  // Gradient from active mood
  const activeGradient =
    MOODS.find((m) => m.key === mood)?.gradient ??
    (isCouple
      ? "from-[#FFF2F9] via-[#F6EEFF] to-[#EBF9F1]"
      : "from-[#FFF7F0] via-[#FFF0FF] to-[#F6EEFF]");

  // Handle bot tab - open overlay instead of tab switch
  const handleTabChange = (t: TabKey) => {
    if (t === "bot") {
      setShowBot(true);
    } else {
      setShowBot(false);
      setTab(t);
    }
  };

  return (
    <div
      className={`h-full w-full flex flex-col bg-gradient-to-b ${activeGradient} transition-colors duration-700 relative`}
    >
      {/* Settings button */}
      <SettingsButton />

      {/* Floating background blobs */}
      <div className="pointer-events-none absolute -top-10 -right-10 w-40 h-40 rounded-full bg-blush-200/20 blur-3xl animate-float" />
      <div
        className="pointer-events-none absolute top-1/3 -left-12 w-32 h-32 rounded-full bg-lilac-200/20 blur-3xl animate-float"
        style={{ animationDelay: "1.5s" }}
      />

      {/* === COUPLE MODE === */}
      {isCouple && (
        <>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
            <AnimatePresence mode="wait">
              {tab === "home" && (
                <motion.div
                  key="couple-home"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <MoodTracker herName={profile.herName ?? "Dia"} mood={mood} onSelect={setMood} />
                  <PartnerStatusBoard />
                  <AnniversaryCard
                    anniversaryDate={profile.anniversaryDate ?? ""}
                    birthDate={profile.birthDate}
                    partnerBirthDate={profile.partnerBirthDate}
                    partnerName={profile.herName}
                  />
                  <FoodRoulette />
                  <HintDrop />
                  {mood && <DateRecommendation />}
                  <TimeCapsule />
                </motion.div>
              )}
              {tab === "talk" && (
                <motion.div
                  key="couple-talk"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <DeepTalkCards />
                </motion.div>
              )}
              {tab === "care" && (
                <motion.div
                  key="couple-care"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <HandleWithCare selected={care} onSelect={setCare} />
                </motion.div>
              )}
              {tab === "cycle" && (
                <motion.div
                  key="couple-cycle"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <PeriodTracker />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <BottomNav active={tab} onChange={handleTabChange} mode="couple" />
        </>
      )}

      {/* === SINGLE MODE === */}
      {isSingle && (
        <>
          <div className="flex-1 overflow-y-auto no-scrollbar pb-28">
            <AnimatePresence mode="wait">
              {tab === "home" && (
                <motion.div
                  key="single-home"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <SingleMoodHeader mood={mood} onSelect={setMood} />
                  <HabitTracker />
                  <TimeCapsule />
                </motion.div>
              )}
              {tab === "habits" && (
                <motion.div
                  key="single-habits"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="pt-6 px-5 pb-2">
                    <p className="text-[10px] font-bold text-lilac-500/80 tracking-wider uppercase">Daily Habits</p>
                    <h2 className="font-display text-xl font-bold text-[#7A4A63]">Kebiasaan Sehatmu ✨</h2>
                  </div>
                  <HabitTracker />
                </motion.div>
              )}
              {tab === "treat" && (
                <motion.div
                  key="single-treat"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="pt-6 px-5 pb-2">
                    <p className="text-[10px] font-bold text-lilac-500/80 tracking-wider uppercase">Me-Time</p>
                    <h2 className="font-display text-xl font-bold text-[#7A4A63]">Treat Yo' Self 🎉</h2>
                  </div>
                  <TreatRoulette />
                </motion.div>
              )}
              {tab === "wishlist" && (
                <motion.div
                  key="single-wishlist"
                  initial={{ opacity: 0, x: 12 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0, x: -12 }}
                  transition={{ duration: 0.22 }}
                >
                  <div className="pt-6 px-5 pb-2">
                    <p className="text-[10px] font-bold text-lilac-500/80 tracking-wider uppercase">Goals</p>
                    <h2 className="font-display text-xl font-bold text-[#7A4A63]">Wishlist & Goals 🛍️</h2>
                  </div>
                  <WishlistTracker />
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <BottomNav active={tab} onChange={handleTabChange} mode="single" />
        </>
      )}

      {/* === ACABOT / SAYANG-BOT OVERLAY === */}
      <AnimatePresence>
        {showBot && <AcabotChat onClose={() => setShowBot(false)} />}
      </AnimatePresence>
    </div>
  );
}
