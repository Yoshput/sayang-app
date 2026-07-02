"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Sparkles, Cake, CalendarHeart } from "lucide-react";
import { useProfile } from "@/app/providers";
import { daysTogether, getZodiac } from "@/lib/profile";

const TOTAL_STEPS = 4;

const todayStr = () => new Date().toISOString().split("T")[0];

export default function OnboardingFlow() {
  const { setProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [herName, setHerName] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const [birthDate, setBirthDate] = useState("");

  const canNext = useMemo(() => {
    if (step === 0) return true;
    if (step === 1) return herName.trim().length > 0;
    if (step === 2) return anniversaryDate.length > 0 && anniversaryDate <= todayStr();
    if (step === 3) return birthDate.length > 0 && birthDate <= todayStr();
    return true;
  }, [step, herName, anniversaryDate, birthDate]);

  const goNext = () => {
    if (!canNext) return;
    if (step < TOTAL_STEPS) setStep((s) => s + 1);
  };
  const goBack = () => step > 0 && setStep((s) => s - 1);

  const finish = () => {
    setProfile({ herName: herName.trim(), anniversaryDate, birthDate });
  };

  return (
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-[#FDE7F3] via-[#F3ECFF] to-[#E9F7EF] relative overflow-hidden">
      {/* floating hearts background */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-blush-300/60 pointer-events-none select-none"
          style={{ left: `${10 + i * 15}%`, fontSize: 14 + (i % 3) * 8 }}
          initial={{ y: "110%", opacity: 0 }}
          animate={{ y: "-20%", opacity: [0, 1, 1, 0] }}
          transition={{
            duration: 6 + i,
            repeat: Infinity,
            delay: i * 1.1,
            ease: "linear",
          }}
        >
          💗
        </motion.span>
      ))}

      {/* progress dots */}
      {step > 0 && step <= TOTAL_STEPS && (
        <div className="flex justify-center gap-1.5 pt-6 relative z-10">
          {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
            <div
              key={i}
              className={`h-1.5 rounded-full transition-all ${
                i + 1 === step ? "w-6 bg-blush-400" : i + 1 < step ? "w-1.5 bg-blush-300" : "w-1.5 bg-blush-100"
              }`}
            />
          ))}
        </div>
      )}

      <div className="flex-1 flex flex-col justify-center px-7 relative z-10">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -16 }}
              transition={{ duration: 0.35 }}
              className="text-center"
            >
              <motion.div
                animate={{ scale: [1, 1.15, 1] }}
                transition={{ repeat: Infinity, duration: 1.6 }}
                className="text-6xl mb-4"
              >
                💌
              </motion.div>
              <h1 className="font-display text-2xl font-bold text-[#7A4A63]">
                Sebelum masuk, ada yang mau aku tau dulu...
              </h1>
              <p className="text-sm text-lilac-500 mt-2">
                Dashboard ini bakal dibikin sesuai dia. Yuk isi dikit dulu ✨
              </p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <Heart className="text-blush-400 mb-3" size={28} fill="currentColor" />
              <h2 className="font-display text-xl font-bold text-[#7A4A63]">
                Siapa nama panggilan dia?
              </h2>
              <p className="text-xs text-lilac-500 mt-1 mb-4">
                Boleh nama asli, boleh panggilan sayang kalian berdua
              </p>
              <input
                autoFocus
                value={herName}
                onChange={(e) => setHerName(e.target.value)}
                placeholder="misal: Acha"
                className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 shadow-softer"
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <CalendarHeart className="text-blush-400 mb-3" size={28} />
              <h2 className="font-display text-xl font-bold text-[#7A4A63]">
                Kapan kalian jadian?
              </h2>
              <p className="text-xs text-lilac-500 mt-1 mb-4">
                Buat ngitung udah berapa lama kalian bareng
              </p>
              <input
                type="date"
                autoFocus
                max={todayStr()}
                value={anniversaryDate}
                onChange={(e) => setAnniversaryDate(e.target.value)}
                className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 shadow-softer"
              />
              {anniversaryDate && anniversaryDate <= todayStr() && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-blush-500 mt-3 font-display font-semibold"
                >
                  Wah, udah {daysTogether(anniversaryDate)} hari nih kalian bareng 🥹
                </motion.p>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 24 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -24 }}
              transition={{ duration: 0.3 }}
            >
              <Cake className="text-blush-400 mb-3" size={28} />
              <h2 className="font-display text-xl font-bold text-[#7A4A63]">
                Kapan ulang tahun dia?
              </h2>
              <p className="text-xs text-lilac-500 mt-1 mb-4">
                Biar ga lupa dan bisa disiapin kejutan
              </p>
              <input
                type="date"
                autoFocus
                max={todayStr()}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-2xl border border-blush-200 bg-white px-4 py-3 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 shadow-softer"
              />
              {birthDate && birthDate <= todayStr() && (
                <motion.p
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-xs text-blush-500 mt-3 font-display font-semibold"
                >
                  Zodiaknya {getZodiac(birthDate).name} {getZodiac(birthDate).emoji}
                </motion.p>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.92 }}
              transition={{ duration: 0.35, type: "spring" }}
              className="text-center"
            >
              <motion.div
                animate={{ rotate: [0, -6, 6, 0] }}
                transition={{ repeat: Infinity, duration: 2.2 }}
                className="text-5xl mb-3"
              >
                🎀
              </motion.div>
              <p className="text-xs text-lilac-500 font-display font-semibold uppercase tracking-wide">
                Semua siap
              </p>
              <h2 className="font-display text-2xl font-bold text-[#7A4A63] mt-1">
                Untuk {herName} 💗
              </h2>

              <div className="mt-5 bg-white/80 rounded-3xl p-4 shadow-soft border border-blush-100 text-left space-y-2">
                <p className="text-sm text-[#7A4A63] flex items-center gap-2">
                  <Sparkles size={14} className="text-blush-400" />
                  Udah {daysTogether(anniversaryDate)} hari kalian bareng
                </p>
                <p className="text-sm text-[#7A4A63] flex items-center gap-2">
                  <Cake size={14} className="text-blush-400" />
                  Zodiak {getZodiac(birthDate).name} {getZodiac(birthDate).emoji}
                </p>
              </div>

              <motion.button
                onClick={finish}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.03 }}
                className="mt-6 w-full bg-blush-400 text-white font-display font-bold text-sm py-3 rounded-2xl shadow-soft"
              >
                Buka Dashboard untuk {herName} 🌷
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {step < TOTAL_STEPS && (
        <div className="flex items-center justify-between px-7 pb-8 relative z-10">
          <button
            onClick={goBack}
            className={`flex items-center gap-1 text-xs font-display font-semibold text-lilac-400 ${
              step === 0 ? "opacity-0 pointer-events-none" : ""
            }`}
          >
            <ArrowLeft size={14} /> Kembali
          </button>
          <motion.button
            onClick={goNext}
            disabled={!canNext}
            whileTap={{ scale: 0.93 }}
            className="flex items-center gap-1.5 bg-blush-400 disabled:opacity-40 text-white font-display font-bold text-sm px-5 py-2.5 rounded-2xl shadow-soft"
          >
            {step === 0 ? "Yuk, Mulai" : "Lanjut"} <ArrowRight size={15} />
          </motion.button>
        </div>
      )}
    </div>
  );
}
