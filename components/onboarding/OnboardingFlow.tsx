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
    <div className="h-full w-full flex flex-col bg-gradient-to-b from-[#FFF2F9] via-[#F6EEFF] to-[#EBF9F1] relative overflow-hidden justify-between">
      {/* Decorative top blur blobs */}
      <div className="absolute top-[-10%] left-[-20%] w-[60%] h-[40%] rounded-full bg-blush-200/30 blur-[60px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[40%] rounded-full bg-lilac-200/30 blur-[60px] pointer-events-none" />

      {/* Floating hearts background */}
      {[...Array(8)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-blush-300/40 pointer-events-none select-none animate-float"
          style={{ left: `${8 + i * 12}%`, fontSize: 16 + (i % 4) * 6 }}
          initial={{ y: "115vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 0.7, 0.7, 0] }}
          transition={{
            duration: 7 + i,
            repeat: Infinity,
            delay: i * 0.9,
            ease: "easeInOut",
          }}
        >
          💗
        </motion.span>
      ))}

      {/* Progress bar */}
      <div className="pt-6 px-7 relative z-10">
        {step > 0 && step <= TOTAL_STEPS && (
          <div className="flex items-center justify-between">
            <div className="flex gap-2">
              {Array.from({ length: TOTAL_STEPS }).map((_, i) => (
                <div
                  key={i}
                  className={`h-2 rounded-full transition-all duration-300 ${
                    i + 1 === step
                      ? "w-8 bg-gradient-to-r from-blush-400 to-lilac-400"
                      : i + 1 < step
                      ? "w-2 bg-blush-300"
                      : "w-2 bg-blush-100"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-display font-bold text-lilac-400 bg-white/60 px-2.5 py-1 rounded-full border border-white/50 shadow-sm">
              Langkah {step} dari {TOTAL_STEPS}
            </span>
          </div>
        )}
      </div>

      {/* Main card area */}
      <div className="flex-1 flex flex-col justify-center px-6 relative z-10 my-4">
        <AnimatePresence mode="wait">
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center bg-white/70 backdrop-blur-xl rounded-[2rem] p-8 border border-white/60 shadow-soft"
            >
              <motion.div
                animate={{ y: [0, -10, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="text-7xl mb-6 inline-block"
              >
                💌
              </motion.div>
              <h1 className="font-display text-2xl font-bold text-[#7A4A63] leading-snug">
                Sebelum masuk, ada yang mau aku tahu dulu...
              </h1>
              <p className="text-xs text-lilac-500/90 mt-3 leading-relaxed">
                Dashboard ini bakal dibikin spesial dan personal buat pacar kamu. Yuk isi datanya dulu ✨
              </p>
            </motion.div>
          )}

          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-7 border border-white/60 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blush-100 p-2 rounded-xl text-blush-400">
                  <Heart size={22} fill="currentColor" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#7A4A63]">
                    Nama Panggilannya
                  </h2>
                  <p className="text-[10px] text-lilac-500">
                    Boleh nama asli atau nama panggilan sayang kalian
                  </p>
                </div>
              </div>
              <input
                autoFocus
                value={herName}
                onChange={(e) => setHerName(e.target.value)}
                placeholder="misal: Acha"
                className="w-full rounded-2xl border border-blush-200 bg-white/95 px-4 py-3.5 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition-all shadow-softer"
              />
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-7 border border-white/60 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blush-100 p-2 rounded-xl text-blush-400">
                  <CalendarHeart size={22} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#7A4A63]">
                    Kapan kalian jadian?
                  </h2>
                  <p className="text-[10px] text-lilac-500">
                    Biar bisa tahu udah berapa lama kalian bareng
                  </p>
                </div>
              </div>
              <input
                type="date"
                autoFocus
                max={todayStr()}
                value={anniversaryDate}
                onChange={(e) => setAnniversaryDate(e.target.value)}
                className="w-full rounded-2xl border border-blush-200 bg-white/95 px-4 py-3.5 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition-all shadow-softer"
              />
              {anniversaryDate && anniversaryDate <= todayStr() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-blush-50 rounded-xl border border-blush-100 text-center"
                >
                  <p className="text-xs text-blush-500 font-display font-bold">
                    Wah, udah {daysTogether(anniversaryDate)} hari nih bareng-bareng 🥹💗
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="bg-white/70 backdrop-blur-xl rounded-[2rem] p-7 border border-white/60 shadow-soft"
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-blush-100 p-2 rounded-xl text-blush-400">
                  <Cake size={22} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#7A4A63]">
                    Kapan ulang tahun dia?
                  </h2>
                  <p className="text-[10px] text-lilac-500">
                    Biar bisa dipersiapkan kejutan ulang tahunnya
                  </p>
                </div>
              </div>
              <input
                type="date"
                autoFocus
                max={todayStr()}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-2xl border border-blush-200 bg-white/95 px-4 py-3.5 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition-all shadow-softer"
              />
              {birthDate && birthDate <= todayStr() && (
                <motion.div
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-lilac-50 rounded-xl border border-lilac-100 text-center"
                >
                  <p className="text-xs text-lilac-500 font-display font-bold">
                    Zodiaknya {getZodiac(birthDate).name} {getZodiac(birthDate).emoji} ✨
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {step === 4 && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="text-center bg-white/70 backdrop-blur-xl rounded-[2rem] p-7 border border-white/60 shadow-soft"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-4 inline-block"
              >
                🎀
              </motion.div>
              <p className="text-[10px] text-lilac-400 font-display font-bold uppercase tracking-wider">
                Semua sudah siap
              </p>
              <h2 className="font-display text-2xl font-bold text-[#7A4A63] mt-1">
                Spesial untuk {herName} 💗
              </h2>

              <div className="mt-5 bg-white/80 rounded-2xl p-4 shadow-softer border border-blush-100 text-left space-y-3">
                <p className="text-xs text-[#8A5C74] flex items-center gap-2.5">
                  <Sparkles size={15} className="text-blush-400 shrink-0" />
                  <span>Udah jalanin <strong>{daysTogether(anniversaryDate)} hari</strong> indah bareng</span>
                </p>
                <p className="text-xs text-[#8A5C74] flex items-center gap-2.5">
                  <Cake size={15} className="text-lilac-400 shrink-0" />
                  <span>Zodiak <strong>{getZodiac(birthDate).name} {getZodiac(birthDate).emoji}</strong></span>
                </p>
              </div>

              <motion.button
                onClick={finish}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className="mt-6 w-full bg-gradient-to-r from-blush-400 to-pink-400 text-white font-display font-bold text-sm py-3.5 rounded-2xl shadow-soft"
              >
                Buka Dashboard {herName} 🌷
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer navigation */}
      <div className="px-7 pb-8 relative z-10 min-h-[60px] flex items-center justify-between">
        {step < TOTAL_STEPS && (
          <>
            <button
              onClick={goBack}
              className={`flex items-center gap-1.5 text-xs font-display font-bold text-lilac-400/90 hover:text-lilac-500 transition-all ${
                step === 0 ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              <ArrowLeft size={16} /> Kembali
            </button>
            <motion.button
              onClick={goNext}
              disabled={!canNext}
              whileTap={{ scale: 0.95 }}
              whileHover={canNext ? { scale: 1.03 } : {}}
              className="flex items-center gap-2 bg-gradient-to-r from-blush-400 to-pink-400 disabled:opacity-40 text-white font-display font-bold text-sm px-6 py-3 rounded-2xl shadow-soft transition-all"
            >
              {step === 0 ? "Yuk, Mulai" : "Lanjut"} <ArrowRight size={16} />
            </motion.button>
          </>
        )}
      </div>
    </div>
  );
}
