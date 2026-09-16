"use client";

import { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowLeft,
  ArrowRight,
  Heart,
  Cake,
  CalendarHeart,
  Sparkles,
  User,
  HeartHandshake,
  Check,
  Calendar,
  Smile,
  ShieldCheck,
} from "lucide-react";
import { useProfile } from "@/app/providers";
import { daysTogether, getZodiac } from "@/lib/profile";
import { AppMode } from "@/lib/profile";
import IconBadge from "@/components/ui/IconBadge";

const todayStr = () => new Date().toISOString().split("T")[0];

export default function OnboardingFlow() {
  const { setProfile } = useProfile();
  const [step, setStep] = useState(0);
  const [mode, setMode] = useState<AppMode | null>(null);
  const [myName, setMyName] = useState("");
  const [birthDate, setBirthDate] = useState("");
  const [herName, setHerName] = useState("");
  const [partnerBirthDate, setPartnerBirthDate] = useState("");
  const [anniversaryDate, setAnniversaryDate] = useState("");
  const [trackPeriod, setTrackPeriod] = useState(false);

  // Single: 0=welcome, 1=mode, 2=myName, 3=birthDate, 4=periodToggle, 5=final
  // Couple: 0=welcome, 1=mode, 2=myName, 3=birthDate, 4=herName, 5=partnerBirth, 6=anniversary, 7=final
  const totalSteps = mode === "couple" ? 7 : 5;

  const canNext = useMemo(() => {
    if (step === 0) return true;
    if (step === 1) return mode !== null;
    if (step === 2) return myName.trim().length > 0;
    if (step === 3) return birthDate.length > 0 && birthDate <= todayStr();
    if (mode === "single" && step === 4) return true;
    if (step === 4) return herName.trim().length > 0;
    if (step === 5) return partnerBirthDate.length > 0 && partnerBirthDate <= todayStr();
    if (step === 6)
      return anniversaryDate.length > 0 && anniversaryDate <= todayStr();
    return true;
  }, [step, mode, myName, birthDate, herName, partnerBirthDate, anniversaryDate]);

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
      partnerBirthDate: mode === "couple" ? partnerBirthDate : undefined,
      anniversaryDate: mode === "couple" ? anniversaryDate : undefined,
      trackPeriod: mode === "single" ? trackPeriod : undefined,
    });
  };

  const finalStep = totalSteps;
  const isFinalStep = step === finalStep;

  return (
    <div className="relative w-full h-full flex flex-col justify-between overflow-hidden bg-gradient-to-b from-[#FFF5F9] via-[#FAF3FF] to-[#F1FBF6] select-none text-[#503043]">
      {/* Subtle Background Glow */}
      <div className="absolute top-[-15%] left-[-20%] w-[65%] h-[45%] rounded-full bg-blush-200/25 blur-[70px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-20%] w-[60%] h-[40%] rounded-full bg-lilac-200/25 blur-[70px] pointer-events-none" />

      {/* Progress Bar */}
      <div className="pt-4 px-6 relative z-10 min-h-[44px]">
        {step >= 2 && step < finalStep && (
          <div className="flex items-center justify-between">
            <div className="flex gap-1.5">
              {Array.from({ length: totalSteps - 1 }).map((_, i) => (
                <div
                  key={i}
                  className={`h-1.5 rounded-full transition-all duration-300 ${
                    i + 2 === step
                      ? "w-7 bg-gradient-to-r from-blush-400 to-lilac-400"
                      : i + 2 < step
                      ? "w-1.5 bg-blush-300"
                      : "w-1.5 bg-blush-100"
                  }`}
                />
              ))}
            </div>
            <span className="text-[10px] font-display font-bold text-lilac-500 bg-white/70 px-2.5 py-1 rounded-full border border-white/60 shadow-softer">
              {step - 1} dari {totalSteps - 1}
            </span>
          </div>
        )}
      </div>

      {/* Content Area */}
      <div className="flex-1 flex flex-col justify-center px-5 sm:px-6 relative z-10">
        <AnimatePresence mode="wait">
          {/* Step 0: Welcome */}
          {step === 0 && (
            <motion.div
              key="s0"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.25 }}
              className="text-center bg-white/80 backdrop-blur-2xl rounded-[32px] p-6 max-h-[78vh] overflow-y-auto no-scrollbar border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <div className="mb-3 flex justify-center">
                <IconBadge icon={HeartHandshake} tint="rose" size="lg" rounded="2xl" />
              </div>

              <h1 className="font-display text-xl font-bold text-[#503043] leading-snug">
                Untuk Dia
              </h1>
              <p className="text-[10px] text-blush-500 font-display font-bold uppercase tracking-wider mt-0.5">
                Self-Care &amp; Couple Companion
              </p>

              <div className="mt-4 p-3.5 bg-white/70 rounded-2xl border border-blush-100/60 text-left space-y-2 text-xs text-[#7A4A63] leading-relaxed">
                <p>
                  Aplikasi ini dibuat sebagai ruang hangat untuk merawat diri (<em>Self-Care</em>) serta menyelaraskan komunikasi dan cinta kasih bersama pasangan (<em>Couple Sync</em>).
                </p>
                <div className="h-px bg-blush-100/50 my-2" />
                <p>
                  <strong>Ide Awal:</strong> Digagas oleh <strong>Salsabilla Nurul Hassanah (Acha)</strong> untuk menciptakan ruang interaksi manis berdua.
                </p>
                <p>
                  <strong>Developer:</strong> Diwujudkan oleh <strong>Yossika Putra Erlangga</strong> (Teknik Informatika), selaku pasangan Acha.
                </p>
                <p>
                  <strong>AI Partner:</strong> Didukung oleh teknologi modern Antigravity AI &amp; Gemini 2.5.
                </p>
              </div>

              <p className="text-[11px] font-display font-bold text-blush-500 mt-4">
                Dibuat dengan segenap cinta untuk Acha
              </p>
            </motion.div>
          )}

          {/* Step 1: Mode Selection */}
          {step === 1 && (
            <motion.div
              key="s1"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
            >
              <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-5 mb-3.5 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]">
                <h2 className="font-display text-base font-bold text-[#503043]">
                  Pilih Mode Pengalaman
                </h2>
                <p className="text-xs text-[#7A4A63] font-display mt-0.5">
                  Sesuaikan dengan kebutuhanmu saat ini
                </p>
              </div>

              <div className="flex flex-col gap-3">
                {/* Single Mode */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setMode("single");
                    goNext();
                  }}
                  className={`bg-white/80 backdrop-blur-xl rounded-3xl p-4.5 text-left border-2 transition-all ${
                    mode === "single"
                      ? "border-blush-400 shadow-soft bg-white"
                      : "border-white/70 hover:bg-white/90"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <IconBadge icon={Sparkles} tint="blush" size="md" rounded="2xl" />
                    <div>
                      <p className="font-display font-bold text-sm text-[#503043]">Just Me (Self-Care)</p>
                      <p className="text-[10px] text-blush-500 font-display font-bold">Personal Wellness &amp; Daily Tracker</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#7A4A63] leading-relaxed">
                    Pelacak kebiasaan harian, ide me-time, target wishlist, dan asisten pintar Acabot.
                  </p>
                </motion.button>

                {/* Couple Mode */}
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setMode("couple");
                    goNext();
                  }}
                  className={`bg-white/80 backdrop-blur-xl rounded-3xl p-4.5 text-left border-2 transition-all ${
                    mode === "couple"
                      ? "border-blush-400 shadow-soft bg-white"
                      : "border-white/70 hover:bg-white/90"
                  }`}
                >
                  <div className="flex items-center gap-3 mb-1.5">
                    <IconBadge icon={HeartHandshake} tint="rose" size="md" rounded="2xl" />
                    <div>
                      <p className="font-display font-bold text-sm text-[#503043]">Us Together (Couple Mode)</p>
                      <p className="text-[10px] text-rose-500 font-display font-bold">Sinkronisasi Pasangan Romantis</p>
                    </div>
                  </div>
                  <p className="text-xs text-[#7A4A63] leading-relaxed">
                    Hitung hari jadian, galeri kenangan bersama, surat harapan, dan status pasangan realtime.
                  </p>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 2: My Name */}
          {step === 2 && (
            <motion.div
              key="s2"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <IconBadge icon={User} tint="blush" size="sm" rounded="xl" />
                <div>
                  <h2 className="font-display text-base font-bold text-[#503043]">
                    Siapa nama panggilanmu?
                  </h2>
                  <p className="text-xs text-[#7A4A63]">Agar sapaan di dashboard terasa lebih personal</p>
                </div>
              </div>
              <input
                type="text"
                autoFocus
                placeholder="Misal: Yossika / Acha"
                value={myName}
                onChange={(e) => setMyName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canNext && goNext()}
                className="w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm font-display font-semibold text-[#503043] outline-none focus:border-blush-400 transition-all shadow-softer"
              />
            </motion.div>
          )}

          {/* Step 3: Birth Date */}
          {step === 3 && (
            <motion.div
              key="s3"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <IconBadge icon={Cake} tint="lilac" size="sm" rounded="xl" />
                <div>
                  <h2 className="font-display text-base font-bold text-[#503043]">
                    Kapan hari ulang tahunmu?
                  </h2>
                  <p className="text-xs text-[#7A4A63]">Untuk menghitung hari hitung mundur dan zodiak</p>
                </div>
              </div>
              <input
                type="date"
                autoFocus
                max={todayStr()}
                value={birthDate}
                onChange={(e) => setBirthDate(e.target.value)}
                className="w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm font-display font-semibold text-[#503043] outline-none focus:border-blush-400 transition-all shadow-softer"
              />
              {birthDate && birthDate <= todayStr() && (
                <div className="mt-3.5 p-3 bg-lilac-50 rounded-2xl border border-lilac-100 text-center">
                  <p className="text-xs text-lilac-600 font-display font-bold">
                    Zodiakmu adalah {getZodiac(birthDate).name}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 4 (Single): Period Tracker Opt-in */}
          {step === 4 && mode === "single" && (
            <motion.div
              key="s4-single"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] text-center"
            >
              <div className="mb-3 flex justify-center">
                <IconBadge icon={CalendarHeart} tint="rose" size="lg" rounded="2xl" />
              </div>
              <h2 className="font-display text-base font-bold text-[#503043]">
                Lacak Siklus Bulanan?
              </h2>
              <p className="text-xs text-[#7A4A63] mt-1 max-w-xs mx-auto">
                Pantau fase biologis, fase ovulasi, dan prediksi siklus berikutnya di Home.
              </p>

              <div className="space-y-2.5 mt-5">
                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setTrackPeriod(true);
                    goNext();
                  }}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl border bg-white shadow-soft text-left border-blush-300"
                >
                  <IconBadge icon={Check} tint="mint" size="xs" rounded="md" />
                  <div>
                    <p className="font-display font-bold text-xs text-[#503043]">Ya, Aktifkan Pelacak Siklus</p>
                    <p className="text-[10px] text-[#7A4A63]">Tampilkan widget siklus di dashboard</p>
                  </div>
                </motion.button>

                <motion.button
                  whileTap={{ scale: 0.97 }}
                  onClick={() => {
                    setTrackPeriod(false);
                    goNext();
                  }}
                  className="w-full flex items-center gap-3 p-3.5 rounded-2xl border bg-white/60 text-left border-white/70"
                >
                  <IconBadge icon={ArrowRight} tint="neutral" size="xs" rounded="md" />
                  <div>
                    <p className="font-display font-bold text-xs text-[#503043]">Lewati Dahulu</p>
                    <p className="text-[10px] text-[#7A4A63]">Dapat diaktifkan sewaktu-waktu di Pengaturan</p>
                  </div>
                </motion.button>
              </div>
            </motion.div>
          )}

          {/* Step 4 (Couple): Partner Name */}
          {step === 4 && mode === "couple" && (
            <motion.div
              key="s4"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <IconBadge icon={Heart} tint="rose" size="sm" rounded="xl" />
                <div>
                  <h2 className="font-display text-base font-bold text-[#503043]">
                    Siapa nama panggilan pasanganmu?
                  </h2>
                  <p className="text-xs text-[#7A4A63]">Nama panggilan kesayangan untuknya</p>
                </div>
              </div>
              <input
                type="text"
                autoFocus
                placeholder="Misal: Acha / Sayang"
                value={herName}
                onChange={(e) => setHerName(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && canNext && goNext()}
                className="w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm font-display font-semibold text-[#503043] outline-none focus:border-blush-400 transition-all shadow-softer"
              />
            </motion.div>
          )}

          {/* Step 5 (Couple): Partner Birthday */}
          {step === 5 && mode === "couple" && (
            <motion.div
              key="s5"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <IconBadge icon={Cake} tint="rose" size="sm" rounded="xl" />
                <div>
                  <h2 className="font-display text-base font-bold text-[#503043]">
                    Kapan ulang tahun {herName}?
                  </h2>
                  <p className="text-xs text-[#7A4A63]">Untuk pengingat hari spesial dan zodiaknya</p>
                </div>
              </div>
              <input
                type="date"
                autoFocus
                max={todayStr()}
                value={partnerBirthDate}
                onChange={(e) => setPartnerBirthDate(e.target.value)}
                className="w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm font-display font-semibold text-[#503043] outline-none focus:border-blush-400 transition-all shadow-softer"
              />
              {partnerBirthDate && partnerBirthDate <= todayStr() && (
                <div className="mt-3.5 p-3 bg-rose-50 rounded-2xl border border-rose-100 text-center">
                  <p className="text-xs text-rose-600 font-display font-bold">
                    Zodiak {herName} adalah {getZodiac(partnerBirthDate).name}
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Step 6 (Couple): Anniversary */}
          {step === 6 && mode === "couple" && (
            <motion.div
              key="s6"
              initial={{ opacity: 0, x: 25 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -25 }}
              transition={{ duration: 0.25 }}
              className="bg-white/80 backdrop-blur-xl rounded-[32px] p-6 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <div className="flex items-center gap-2.5 mb-4">
                <IconBadge icon={CalendarHeart} tint="blush" size="sm" rounded="xl" />
                <div>
                  <h2 className="font-display text-base font-bold text-[#503043]">
                    Kapan tanggal jadian kalian?
                  </h2>
                  <p className="text-xs text-[#7A4A63]">Awal mula kisah cinta indah berdua</p>
                </div>
              </div>
              <input
                type="date"
                autoFocus
                max={todayStr()}
                value={anniversaryDate}
                onChange={(e) => setAnniversaryDate(e.target.value)}
                className="w-full rounded-2xl border border-blush-100 bg-white px-4 py-3 text-sm font-display font-semibold text-[#503043] outline-none focus:border-blush-400 transition-all shadow-softer"
              />
              {anniversaryDate && anniversaryDate <= todayStr() && (
                <div className="mt-3.5 p-3 bg-blush-50 rounded-2xl border border-blush-100 text-center">
                  <p className="text-xs text-blush-600 font-display font-bold">
                    Kalian sudah melangkah sejauh {daysTogether(anniversaryDate)} hari bersama
                  </p>
                </div>
              )}
            </motion.div>
          )}

          {/* Final Step: Summary */}
          {isFinalStep && (
            <motion.div
              key="final"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              transition={{ duration: 0.3 }}
              className="text-center bg-white/85 backdrop-blur-2xl rounded-[32px] p-6 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)]"
            >
              <div className="mb-3 flex justify-center">
                <IconBadge icon={mode === "couple" ? HeartHandshake : Sparkles} tint="rose" size="lg" rounded="2xl" />
              </div>

              <p className="text-[10px] text-blush-500 font-display font-bold uppercase tracking-wider">
                {mode === "couple" ? "Couple Mode Siap Digunakan" : "Self-Care Mode Siap Digunakan"}
              </p>
              <h2 className="font-display text-xl font-bold text-[#503043] mt-0.5">
                {mode === "couple" ? `Untuk ${herName} & ${myName}` : `Dashboard ${myName}`}
              </h2>

              <div className="mt-4 bg-white/80 rounded-2xl p-4 shadow-softer border border-blush-100 text-left space-y-2 text-xs text-[#7A4A63]">
                <p className="flex items-center gap-2">
                  <Sparkles size={13} className="text-blush-400 shrink-0" />
                  <span>Zodiakmu: <strong>{getZodiac(birthDate).name}</strong></span>
                </p>
                {mode === "couple" && partnerBirthDate && (
                  <p className="flex items-center gap-2">
                    <Sparkles size={13} className="text-lilac-400 shrink-0" />
                    <span>Zodiak {herName}: <strong>{getZodiac(partnerBirthDate).name}</strong></span>
                  </p>
                )}
                {mode === "couple" && anniversaryDate && (
                  <p className="flex items-center gap-2">
                    <Heart size={13} className="text-rose-500 shrink-0" fill="currentColor" />
                    <span>Udah <strong>{daysTogether(anniversaryDate)} hari</strong> bersama</span>
                  </p>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

      {/* Navigation Footer */}
      <div className="p-5 pb-6 relative z-10 flex gap-2.5">
        {step > 0 && (
          <motion.button
            whileTap={{ scale: 0.94 }}
            onClick={goBack}
            className="p-3.5 rounded-2xl bg-white/80 border border-white text-[#7A4A63] shadow-softer hover:bg-white"
          >
            <ArrowLeft size={16} />
          </motion.button>
        )}

        {/* Step 0 Single Button */}
        {step === 0 && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={() => setStep(1)}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-xs shadow-soft"
          >
            Yuk, Mulai Pengalaman Ini
          </motion.button>
        )}

        {/* Step 1-6 Navigation */}
        {!isFinalStep && step !== 1 && step !== 0 && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            disabled={!canNext}
            onClick={goNext}
            className="flex-1 py-3.5 rounded-2xl bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-xs shadow-soft disabled:opacity-50 flex items-center justify-center gap-1.5"
          >
            <span>Lanjut</span>
            <ArrowRight size={15} />
          </motion.button>
        )}

        {/* Final Step Button */}
        {isFinalStep && (
          <motion.button
            whileTap={{ scale: 0.96 }}
            onClick={finish}
            className="w-full py-3.5 rounded-2xl bg-gradient-to-r from-blush-400 via-lilac-400 to-blush-500 text-white font-display font-bold text-xs shadow-soft flex items-center justify-center gap-2"
          >
            <Sparkles size={16} />
            <span>Buka Dashboard Penuh Cinta</span>
          </motion.button>
        )}
      </div>
    </div>
  );
}
