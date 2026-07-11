"use client";

import dynamic from "next/dynamic";
import { motion, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";
import { useProfile } from "@/app/providers";
import TiltCard from "@/components/TiltCard";

// Canvas is client-only, load with no SSR
const LandingCanvas = dynamic(() => import("@/components/LandingCanvas"), { ssr: false });

// Floating decorative elements
const FLOATS = [
  { emoji: "💖", x: "8%",  y: "12%", size: 28, delay: 0,    dur: 4.2 },
  { emoji: "✨", x: "88%", y: "8%",  size: 20, delay: 0.8,  dur: 3.6 },
  { emoji: "🌸", x: "75%", y: "30%", size: 24, delay: 1.5,  dur: 5.1 },
  { emoji: "💫", x: "5%",  y: "55%", size: 18, delay: 0.4,  dur: 4.8 },
  { emoji: "🌷", x: "92%", y: "65%", size: 22, delay: 2.0,  dur: 3.9 },
  { emoji: "💝", x: "15%", y: "80%", size: 26, delay: 1.1,  dur: 4.5 },
  { emoji: "⭐", x: "80%", y: "85%", size: 18, delay: 0.6,  dur: 5.3 },
  { emoji: "🦋", x: "50%", y: "5%",  size: 20, delay: 1.8,  dur: 4.0 },
];

export default function LandingPanel() {
  const { profile, ready } = useProfile();
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ container: containerRef });
  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -40]);

  // When logged in → desktop only
  const isLoggedIn = ready && profile !== null;

  if (isLoggedIn) {
    return (
      <div className="hidden lg:flex flex-col flex-1 max-w-[560px]">
        <LandingInner />
      </div>
    );
  }

  // Not logged in → show on all screens
  return (
    <div className="flex flex-col flex-1 max-w-[560px] w-full">
      <LandingInner showMobileButton />
    </div>
  );
}

function LandingInner({ showMobileButton }: { showMobileButton?: boolean }) {
  return (
    <div className="relative w-full overflow-visible">
      {/* === Aurora gradient blobs === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-3xl" style={{ zIndex: 0 }}>
        <motion.div
          animate={{ x: [0, 30, 0], y: [0, -20, 0], scale: [1, 1.1, 1] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-20 -left-20 w-72 h-72 rounded-full opacity-40"
          style={{ background: "radial-gradient(circle, #FBBDE6 0%, transparent 70%)", filter: "blur(40px)" }}
        />
        <motion.div
          animate={{ x: [0, -25, 0], y: [0, 25, 0], scale: [1, 0.95, 1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/3 -right-10 w-64 h-64 rounded-full opacity-35"
          style={{ background: "radial-gradient(circle, #C9A8F8 0%, transparent 70%)", filter: "blur(50px)" }}
        />
        <motion.div
          animate={{ x: [0, 15, 0], y: [0, 30, 0], scale: [1, 1.05, 1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute -bottom-10 left-1/4 w-56 h-56 rounded-full opacity-30"
          style={{ background: "radial-gradient(circle, #FFB3D9 0%, transparent 70%)", filter: "blur(45px)" }}
        />
      </div>

      {/* === Floating emoji decorations === */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {FLOATS.map((f, i) => (
          <motion.span
            key={i}
            animate={{ y: [0, -12, 0], rotate: [0, 8, -8, 0], opacity: [0.7, 1, 0.7] }}
            transition={{ duration: f.dur, repeat: Infinity, ease: "easeInOut", delay: f.delay }}
            className="absolute select-none"
            style={{ left: f.x, top: f.y, fontSize: f.size }}
          >
            {f.emoji}
          </motion.span>
        ))}
      </div>

      {/* === Main content === */}
      <motion.div
        className="relative flex flex-col gap-6 px-6 lg:px-2 items-center lg:items-start text-center lg:text-left"
        style={{ zIndex: 2 }}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.12 } },
        }}
      >
        {/* Badge */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="inline-flex items-center gap-2 bg-white/70 backdrop-blur-md border border-blush-200/60 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-blush-500 shadow-soft"
        >
          <motion.span animate={{ rotate: [0, 20, -20, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
            ✨
          </motion.span>
          Project Anniversary &amp; Self-Care Companion
        </motion.div>

        {/* Headline */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 30 }, show: { opacity: 1, y: 0 } }}
        >
          <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight text-[#7A4A63]">
            Hubungkan Hati,{" "}
            <br />
            <motion.span
              className="inline-block bg-gradient-to-r from-blush-500 via-[#B58AF5] to-[#FF69B4] bg-clip-text text-transparent"
              animate={{ backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"] }}
              transition={{ duration: 5, repeat: Infinity, ease: "linear" }}
              style={{ backgroundSize: "200% 200%" }}
            >
              Rawat Diri Sendiri.
            </motion.span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="text-sm leading-relaxed text-[#8A5C74]/90 font-medium max-w-md"
        >
          Aplikasi interaktif untuk merawat kesehatan mental pribadi{" "}
          <em>(Self-Care)</em> sekaligus menyelaraskan komunikasi &amp;
          kebersamaan dengan pasangan <em>(Couple Sync)</em>.
        </motion.p>

        {/* === 3D Creator Cards === */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="grid grid-cols-2 gap-4 w-full text-left"
        >
          <TiltCard depth={10} className="rounded-2xl">
            <div className="bg-white/75 backdrop-blur-md rounded-2xl p-4 border border-white/70 shadow-soft flex flex-col justify-between h-full">
              <div>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 2.5, repeat: Infinity }}
                  className="text-3xl inline-block"
                >
                  👩‍🎨
                </motion.span>
                <h3 className="font-display font-bold text-xs mt-2 text-[#7A4A63]">
                  Salsabilla Nurul H. (Acha)
                </h3>
                <p className="text-[9px] text-lilac-500 font-bold uppercase tracking-wider mt-0.5">
                  Ideator &amp; Inspirasi
                </p>
              </div>
              <p className="text-[10px] text-[#8A5C74]/80 mt-2 leading-relaxed">
                Pemilik ide &amp; inspirasi utama pembuatan web ini. 💖
              </p>
            </div>
          </TiltCard>

          <TiltCard depth={10} className="rounded-2xl">
            <div className="bg-white/75 backdrop-blur-md rounded-2xl p-4 border border-white/70 shadow-soft flex flex-col justify-between h-full">
              <div>
                <motion.span
                  animate={{ rotate: [0, -10, 10, 0] }}
                  transition={{ duration: 3, repeat: Infinity }}
                  className="text-3xl inline-block"
                >
                  👨‍💻
                </motion.span>
                <h3 className="font-display font-bold text-xs mt-2 text-[#7A4A63]">
                  Yossika Putra Erlangga
                </h3>
                <p className="text-[9px] text-lilac-500 font-bold uppercase tracking-wider mt-0.5">
                  Developer &amp; AI Partner
                </p>
              </div>
              <p className="text-[10px] text-[#8A5C74]/80 mt-2 leading-relaxed">
                Mahasiswa S1 Teknik Informatika, implementator program.
              </p>
            </div>
          </TiltCard>
        </motion.div>

        {/* === Interactive 3D Tech Stack Card === */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}
          className="w-full"
        >
          <TiltCard depth={6} className="rounded-3xl w-full">
            <div className="relative overflow-hidden bg-white/50 backdrop-blur-md rounded-3xl p-5 border border-white/60 shadow-soft w-full text-left">
              {/* Shimmer line */}
              <motion.div
                animate={{ x: ["-100%", "200%"] }}
                transition={{ duration: 3, repeat: Infinity, ease: "linear", repeatDelay: 2 }}
                className="absolute top-0 left-0 h-full w-24 pointer-events-none"
                style={{
                  background: "linear-gradient(90deg, transparent, rgba(255,255,255,0.4), transparent)",
                  zIndex: 1,
                }}
              />
              <p className="text-[9px] font-display font-bold uppercase tracking-wider text-lilac-500 mb-3 relative z-10">
                🛠 Implementasi &amp; Teknologi:
              </p>
              <div className="flex flex-wrap gap-2 relative z-10">
                {[
                  { icon: "🤖", label: "Antigravity AI" },
                  { icon: "⚡", label: "Next.js 14" },
                  { icon: "🎨", label: "Tailwind CSS" },
                  { icon: "✨", label: "Framer Motion" },
                  { icon: "🔮", label: "Gemini 2.5 Flash" },
                  { icon: "📱", label: "PWA Ready" },
                ].map(({ icon, label }, idx) => (
                  <motion.span
                    key={label}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.6 + idx * 0.07 }}
                    whileHover={{ scale: 1.08, y: -2 }}
                    className="bg-white/90 border border-blush-100 px-3 py-1.5 rounded-full text-[10px] font-semibold text-[#8A5C74] cursor-default shadow-softer"
                  >
                    {icon} {label}
                  </motion.span>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Mobile CTA */}
        {showMobileButton && (
          <motion.a
            variants={{ hidden: { opacity: 0, scale: 0.9 }, show: { opacity: 1, scale: 1 } }}
            href="#app-frame"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.96 }}
            className="lg:hidden mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blush-400 via-[#E06CB5] to-lilac-500 text-white font-display font-bold text-sm px-8 py-3.5 rounded-2xl shadow-soft"
          >
            <motion.span animate={{ rotate: [0, 15, -15, 0] }} transition={{ duration: 2, repeat: Infinity }}>
              📱
            </motion.span>
            Buka Aplikasi
          </motion.a>
        )}
      </motion.div>
    </div>
  );
}
