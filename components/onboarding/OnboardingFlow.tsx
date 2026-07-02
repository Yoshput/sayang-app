"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ArrowLeft, ArrowRight, Heart, Cake, CalendarHeart, Sparkles, User } from "lucide-react";
import { useProfile } from "@/app/providers";
import { daysTogether, getZodiac } from "@/lib/profile";
import { AppMode } from "@/lib/profile";

const todayStr = () => new Date().toISOString().split("T")[0];

// Steps differ by mode:
// Common: 0=welcome, 1=mode select, 2=myName, 3=birthDate
// Single: done at step 3 → final step 4
// Couple: 4=herName, 5=anniversaryDate → final step 6

export default function OnboardingFlow() {
  const { setProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<AppMode | null>(null);
  const [myName, setMyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [herName, setHerName] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");

  const totalSteps = mode === "couple" ? 6 : 4;

  const canNext = useMemo(() => {
    if (step === 0) return true;
    if (step === 1) return mode !== null;
    if (step === 2) return myName.trim().length > 0;
    if (step === 3) return birthDate.length > 0 && birthDate <= todayStr();
    if (step === 4) return herName.trim().length > 0; // couple only
    if (step === 5)
      return anniversaryDate.length > 0 && anniversaryDate <= todayStr(); // couple only
    return true;
  }, [step, mode, myName, birthDate, herName, anniversaryDate]);

  const goNext = () => {
    if (!canNext) return;
    if (step < totalSteps) setStep((s) => s + 1);
  };
  const goBack = () => step > 0 && setStep((s) => s - 1);

  const finish = () => {
    if (!mode) return;
    setProfile({
      mode,
      myName: myName.trim(),
      birthDate,
      herName: mode === "couple" ? herName.trim() : undefined,
      anniversaryDate: mode === "couple" ? anniversaryDate : undefined,
    });
  };

  const finalStep = totalSteps;
  const isFinalStep = step === finalStep;

  // BG per mode
  const bg =
    mode === "single"
      ? "from-[#FFF7F0] via-[#FFF0FF] to-[#F6EEFF]"
      : mode === "couple"
      ? "from-[#FFF2F9] via-[#F6EEFF] to-[#EBF9F1]"
      : "from-[#FFF2F9] via-[#F6EEFF] to-[#EBF9F1]";

  return (
    <div
      className={`h-full w-full flex flex-col bg-gradient-to-b ${bg} relative overflow-hidden justify-between transition-colors duration-700`}
    >
      {/* Decorative blobs */}
      <div className="absolute top-[-15%] left-[-20%] w-[65%] h-[45%] rounded-full bg-blush-200/25 blur-[70px] pointer-events-none blob-drift" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[40%] rounded-full bg-lilac-200/25 blur-[70px] pointer-events-none blob-drift" style={{ animationDelay: "4s" }} />

      {/* Floating hearts */}
      {[...Array(6)].map((_, i) => (
        <motion.span
          key={i}
          className="absolute text-blush-300/30 pointer-events-none select-none"
          style={{ left: `${10 + i * 15}%`, fontSize: 14 + (i % 4) * 6 }}
          initial={{ y: "115vh", opacity: 0 }}
          animate={{ y: "-20vh", opacity: [0, 0.6, 0.6, 0] }}
          transition={{ duration: 8 + i, repeat: Infinity, delay: i * 1.1, ease: "easeInOut" }}
        >
          💗
        </motion.span>
      ))}

      {/* Progress bar (steps 2+) */}
      <div className="pt-5 px-6 relative z-10 min-h-[44px]">
        {step >= 2 && step < finalStep && (
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps - 1 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-400 ${
                    i + 2 === step
                      ? "w-7 bg-gradient-to-r from-blush-400 to-lilac-400"
                      : i + 2 < step
                      ? "w-1.5 bg-blush-300"
                      : "w-1.5 bg-blush-100"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-display font-bold text-lilac-400 bg-white/60 px-2.5 py-1 rounded-full border border-white/50">
              {step - 1}/{totalSteps - 1}
            </span>
          </div>
        )}
      </div>

      {/* Content */}
      <div className="flex-1 flex flex-col justify-center px-6 relative z-10">
        <AnimatePresence mode="wait">
          {/* ---- Step 0: Welcome ---- */}
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center glass rounded-[2rem] p-6 max-h-[78vh] overflow-y-auto no-scrollbar"
            >
              <motion.div
                animate={{ y: [0, -8, 0] }}
                transition={{ repeat: Infinity, duration: 2.5, ease: "easeInOut" }}
                className="text-5xl mb-4 inline-block"
              >
                💌
              </motion.div>
              <h1 className="font-display text-xl font-bold text-[#7A4A63] leading-snug">
                Untuk Dia 🌸
              </h1>
              <p className="text-[10px] text-lilac-500 font-display font-semibold uppercase tracking-wider mt-1">
                Self-Care & Couple Sync Companion
              </p>
              
              <div className="mt-4 p-3 bg-white/50 rounded-2xl border border-blush-100/50 text-left space-y-2.5 text-[11px] text-[#8A5C74] leading-relaxed">
                <p>
                  Aplikasi ini dibuat sebagai ruang hangat untuk merawat diri (*Self-Care*) bagi yang sedang sendiri, serta menyelaraskan hubungan (*Couple Sync*) bagi yang berpasangan.
                </p>
                <div className="h-px bg-blush-100/40 my-2" />
                <p>
                  💡 <strong>Ide Awal:</strong> Digagas oleh <strong>Salsabilla Nurul Hassanah (Baby Acha)</strong> yang ingin membuat ruang komunikasi yang lucu dan interaktif.
                </p>
                <p>
                  👨‍💻 <strong>Developer:</strong> Diwujudkan oleh <strong>Yossika Putra Erlangga</strong> (Mahasiswa S1 Teknik Informatika), selaku kesayangannya Acha.
                </p>
                <p>
                  🤖 <strong>AI Assistant:</strong> Dibantu oleh <strong>AI Antigravity</strong> untuk implementasi kode dan detail interaksinya.
                </p>
              </div>

              <p className="text-[10px] font-display font-bold text-blush-500 mt-4 animate-pulse">
                Terima kasih banyak untuk Acha! 💖✨
              </p>
            </motion.div>
          )}

          {/* ---- Step 1: Mode select ---- */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
            >
              <div className="glass rounded-[2rem] p-6 mb-4">
                <h2 className="font-display text-lg font-bold text-[#7A4A63] mb-1">
                  Kamu lagi dalam mode apa?
                </h2>
                <p className="text-[11px] text-lilac-400 font-display">Pilih yang sesuai kondisi kamu sekarang</p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Single */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMode("single"); goNext(); }}
                  className={`glass rounded-3xl p-5 text-left border-2 transition-all ${
                    mode === "single" ? "border-magenta-300 shadow-glow-magenta" : "border-white/50"
                  }`}
                  style={mode === "single" ? { background: "rgba(255,240,255,0.85)" } : {}}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-magenta-100 to-blush-100 flex items-center justify-center text-xl">
                      🌸
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-[#7A4A63]">Just Me</p>
                      <p className="text-[10px] text-lilac-400 font-display">Self-Care & Daily Tracker</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#8A5C74] font-display leading-relaxed">
                    Habits, me-time ideas, wishlist goals, dan Acabot sebagai bestie virtual kamu ✨
                  </p>
                </motion.button>

                {/* Couple */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => { setMode("couple"); goNext(); }}
                  className={`glass rounded-3xl p-5 text-left border-2 transition-all ${
                    mode === "couple" ? "border-blush-300 shadow-glow" : "border-white/50"
                  }`}
                  style={mode === "couple" ? { background: "rgba(255,242,249,0.85)" } : {}}
                >
                  <div className="flex items-center gap-3 mb-2">
                    <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-blush-100 to-lilac-100 flex items-center justify-center text-xl">
                      💑
                    </div>
                    <div>
                      <p className="font-display font-bold text-sm text-[#7A4A63]">Us Together</p>
                      <p className="text-[10px] text-lilac-400 font-display">Couple Sync Mode</p>
                    </div>
                  </div>
                  <p className="text-[10px] text-[#8A5C74] font-display leading-relaxed">
                    Mood tracker, deep talk, period tracker, hint drop, dan Sayang-bot buat kalian berdua 💗
                  </p>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* ---- Step 2: My Name ---- */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-[2rem] p-7"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-blush-100 p-2 rounded-xl text-blush-400">
                  <User size={22} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#7A4A63]">
                    Nama panggilanmu?
                  </h2>
                  <p className="text-[10px] text-lilac-400">Ini buat nyapa kamu di dashboard</p>
                </div>
              </div>
              <input
                autoFocus
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canNext && goNext()}
                placeholder={mode === "couple" ? "misal: Yossa" : "misal: Mimin"}
                className="w-full rounded-2xl border border-blush-200 bg-white/90 px-4 py-3.5 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition-all shadow-softer"
              />
            </motion.div>
          )}

          {/* ---- Step 3: My Birthday ---- */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-[2rem] p-7"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-lilac-100 p-2 rounded-xl text-lilac-500">
                  <Cake size={22} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#7A4A63]">
                    Kapan ulang tahunmu?
                  </h2>
                  <p className="text-[10px] text-lilac-400">Buat tau zodiak & countdown ultahmu</p>
                </div>
              </div>
              <input
                type="date"
                autoFocus
                max={todayStr()}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-2xl border border-blush-200 bg-white/90 px-4 py-3.5 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition-all shadow-softer"
              />
              {birthDate && birthDate <= todayStr() && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
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

          {/* ---- Step 4: Partner Name (couple only) ---- */}
          {step === 4 && mode === "couple" && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-[2rem] p-7"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-blush-100 p-2 rounded-xl text-blush-400">
                  <Heart size={22} fill="currentColor" />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#7A4A63]">
                    Nama panggilan dia?
                  </h2>
                  <p className="text-[10px] text-lilac-400">Boleh nama asli atau nama sayang kalian</p>
                </div>
              </div>
              <input
                autoFocus
                value={herName}
                onChange={(e) => setHerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canNext && goNext()}
                placeholder="misal: Acha"
                className="w-full rounded-2xl border border-blush-200 bg-white/90 px-4 py-3.5 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition-all shadow-softer"
              />
            </motion.div>
          )}

          {/* ---- Step 5: Anniversary (couple only) ---- */}
          {step === 5 && mode === "couple" && (
            <motion.div
              key="s5"
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -30 }}
              transition={{ duration: 0.3 }}
              className="glass rounded-[2rem] p-7"
            >
              <div className="flex items-center gap-2 mb-5">
                <div className="bg-blush-100 p-2 rounded-xl text-blush-400">
                  <CalendarHeart size={22} />
                </div>
                <div>
                  <h2 className="font-display text-lg font-bold text-[#7A4A63]">
                    Kapan kalian jadian?
                  </h2>
                  <p className="text-[10px] text-lilac-400">Buat ngitung udah berapa lama bareng</p>
                </div>
              </div>
              <input
                type="date"
                autoFocus
                max={todayStr()}
                value={anniversaryDate}
                onChange={(e) => setAnniversaryDate(e.target.value)}
                className="w-full rounded-2xl border border-blush-200 bg-white/90 px-4 py-3.5 text-base font-display font-semibold text-[#7A4A63] outline-none focus:border-blush-400 focus:ring-4 focus:ring-blush-100 transition-all shadow-softer"
              />
              {anniversaryDate && anniversaryDate <= todayStr() && (
                <motion.div
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="mt-4 p-3 bg-blush-50 rounded-xl border border-blush-100 text-center"
                >
                  <p className="text-xs text-blush-500 font-display font-bold">
                    Wah, udah {daysTogether(anniversaryDate)} hari bareng 🥹💗
                  </p>
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ---- Final Step: Summary ---- */}
          {isFinalStep && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.4, type: "spring" }}
              className="text-center glass rounded-[2rem] p-7"
            >
              <motion.div
                animate={{ rotate: [0, -10, 10, 0] }}
                transition={{ repeat: Infinity, duration: 2 }}
                className="text-6xl mb-4 inline-block"
              >
                {mode === "couple" ? "🎀" : "🌸"}
              </motion.div>
              <p className="text-[10px] text-lilac-400 font-display font-bold uppercase tracking-wider">
                {mode === "couple" ? "Couple Mode siap!" : "Self-Care Mode siap!"}
              </p>
              <h2 className="font-display text-2xl font-bold text-[#7A4A63] mt-1">
                {mode === "couple" ? `Untuk ${herName} & ${myName} 💗` : `Dashboard ${myName} ✨`}
              </h2>

              <div className="mt-5 bg-white/80 rounded-2xl p-4 shadow-softer border border-blush-100 text-left space-y-2.5">
                <p className="text-xs text-[#8A5C74] flex items-center gap-2">
                  <Sparkles size={13} className="text-lilac-400 shrink-0" />
                  <span>Zodiak {getZodiac(birthDate).name} {getZodiac(birthDate).emoji}</span>
                </p>
                {mode === "couple" && anniversaryDate && (
                  <p className="text-xs text-[#8A5C74] flex items-center gap-2">
                    <Heart size={13} className="text-blush-400 shrink-0" fill="currentColor" />
                    <span>Udah <strong>{daysTogether(anniversaryDate)} hari</strong> bareng</span>
                  </p>
                )}
              </div>

              <motion.button
                onClick={finish}
                whileTap={{ scale: 0.95 }}
                whileHover={{ scale: 1.02 }}
                className={`mt-6 w-full text-white font-display font-bold text-sm py-3.5 rounded-2xl shadow-soft ${
                  mode === "couple"
                    ? "bg-gradient-to-r from-blush-400 to-lilac-400"
                    : "bg-gradient-to-r from-magenta-400 to-lilac-400"
                }`}
              >
                {mode === "couple" ? `Buka Dashboard 💑` : `Mulai Self-Care 🌸`}
              </motion.button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Footer nav */}
      <div className="px-6 pb-7 relative z-10 min-h-[68px] flex items-center justify-between">
        {!isFinalStep && step !== 1 && step !== 0 && (
          <>
            <button
              onClick={goBack}
              className={`flex items-center gap-1.5 text-xs font-display font-bold text-lilac-400/90 transition-all ${
                step === 0 ? "opacity-0 pointer-events-none" : ""
              }`}
            >
              <ArrowLeft size={16} /> Kembali
            </button>
            <motion.button
              onClick={goNext}
              disabled={!canNext}
              whileTap={{ scale: 0.95 }}
              className={`flex items-center gap-2 disabled:opacity-40 text-white font-display font-bold text-sm px-6 py-3 rounded-2xl shadow-soft ${
                mode === "single"
                  ? "bg-gradient-to-r from-magenta-400 to-lilac-400"
                  : "bg-gradient-to-r from-blush-400 to-lilac-400"
              }`}
            >
              {step === 0 ? "Yuk, Mulai!" : "Lanjut"} <ArrowRight size={16} />
            </motion.button>
          </>
        )}
        {step === 0 && (
          <motion.button
            onClick={goNext}
            whileTap={{ scale: 0.95 }}
            className="w-full flex items-center justify-center gap-2 bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-sm px-6 py-3.5 rounded-2xl shadow-soft"
          >
            Yuk, Mulai! <ArrowRight size={16} />
          </motion.button>
        )}
      </div>
    </div>
  );
}
