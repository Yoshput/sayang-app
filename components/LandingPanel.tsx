"use client";

import dynamic from "next/dynamic";
import { motion } from "framer-motion";
import {
  Sparkles,
  Heart,
  Code2,
  Palette,
  Bot,
  Zap,
  Cpu,
  Smartphone,
  CalendarHeart,
  ShieldCheck,
  ChevronRight,
} from "lucide-react";
import { useProfile } from "@/app/providers";
import TiltCard from "@/components/TiltCard";
import IconBadge from "@/components/ui/IconBadge";

// Floating minimalist vector nodes
const FLOATING_NODES = [
  { icon: Heart, x: "8%", y: "14%", size: 22, color: "text-blush-400", delay: 0, dur: 4.2 },
  { icon: Sparkles, x: "88%", y: "10%", size: 18, color: "text-amber-400", delay: 0.8, dur: 3.6 },
  { icon: CalendarHeart, x: "78%", y: "32%", size: 20, color: "text-lilac-400", delay: 1.5, dur: 5.1 },
  { icon: ShieldCheck, x: "6%", y: "58%", size: 18, color: "text-mint-400", delay: 0.4, dur: 4.8 },
  { icon: Heart, x: "90%", y: "68%", size: 20, color: "text-rose-400", delay: 2.0, dur: 3.9 },
  { icon: Sparkles, x: "14%", y: "82%", size: 20, color: "text-blush-400", delay: 1.1, dur: 4.5 },
];

export default function LandingPanel() {
  const { profile, ready } = useProfile();
  const isLoggedIn = ready && profile !== null;

  if (isLoggedIn) {
    return (
      <div className="hidden lg:flex flex-col flex-1 max-w-[560px]">
        <LandingInner />
      </div>
    );
  }

  return (
    <div className="flex flex-col flex-1 max-w-[560px] w-full">
      <LandingInner showMobileButton />
    </div>
  );
}

function LandingInner({ showMobileButton }: { showMobileButton?: boolean }) {
  return (
    <div className="relative w-full overflow-visible">
      {/* Ambient Aurora Glow */}
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
      </div>

      {/* Floating Vector Badges (Zero Emoji Slop) */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" style={{ zIndex: 1 }}>
        {FLOATING_NODES.map((node, i) => {
          const Icon = node.icon;
          return (
            <motion.div
              key={i}
              animate={{ y: [0, -12, 0], rotate: [0, 6, -6, 0], opacity: [0.5, 0.85, 0.5] }}
              transition={{ duration: node.dur, repeat: Infinity, ease: "easeInOut", delay: node.delay }}
              className={`absolute p-2 rounded-2xl bg-white/60 backdrop-blur-md border border-white/60 shadow-softer ${node.color}`}
              style={{ left: node.x, top: node.y }}
            >
              <Icon size={node.size} strokeWidth={2.2} />
            </motion.div>
          );
        })}
      </div>

      {/* Main Content */}
      <motion.div
        className="relative flex flex-col gap-6 px-4 lg:px-2 items-center lg:items-start text-center lg:text-left"
        style={{ zIndex: 2 }}
        initial="hidden"
        animate="show"
        variants={{
          hidden: {},
          show: { transition: { staggerChildren: 0.1 } },
        }}
      >
        {/* Apple Pill Badge */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
          className="inline-flex items-center gap-2 bg-white/80 backdrop-blur-xl border border-blush-200/60 rounded-full px-4 py-2 text-xs font-semibold tracking-wide text-blush-500 shadow-softer"
        >
          <Sparkles size={14} className="text-blush-400 animate-pulse" />
          <span>Anniversary Milestone & Self-Care Companion</span>
        </motion.div>

        {/* Headline */}
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, show: { opacity: 1, y: 0 } }}>
          <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight text-[#503043]">
            Hubungkan Hati,{" "}
            <br />
            <span className="inline-block bg-gradient-to-r from-blush-500 via-[#B58AF5] to-[#FF69B4] bg-clip-text text-transparent">
              Rawat Diri Sendiri.
            </span>
          </h1>
        </motion.div>

        {/* Description */}
        <motion.p
          variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
          className="text-sm leading-relaxed text-[#7A4A63] font-medium max-w-md"
        >
          Dirancang dengan estetika Apple Human Interface untuk merawat kesehatan
          mental pribadi (<em>Self-Care</em>) sekaligus mempererat komunikasi dan
          merayakan perjalanan cinta bersama pasangan (<em>Couple Sync</em>).
        </motion.p>

        {/* 3D Creator Cards (Anti-Slop Iconography) */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
          className="grid grid-cols-2 gap-3.5 w-full text-left"
        >
          {/* Acha Card */}
          <TiltCard depth={8} className="rounded-3xl">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
              <div>
                <IconBadge icon={Palette} tint="rose" size="md" rounded="2xl" />
                <h3 className="font-display font-bold text-xs mt-3 text-[#503043]">
                  Salsabilla Nurul H. (Acha)
                </h3>
                <p className="text-[10px] text-blush-500 font-bold uppercase tracking-wider mt-0.5">
                  Ideator & Inspirasi
                </p>
              </div>
              <p className="text-[10px] text-[#7A4A63] mt-2.5 leading-relaxed font-medium">
                Pemilik ide awal dan inspirasi utama pembuatan web ini.
              </p>
            </div>
          </TiltCard>

          {/* Yossika Card */}
          <TiltCard depth={8} className="rounded-3xl">
            <div className="bg-white/80 backdrop-blur-xl rounded-3xl p-4 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] flex flex-col justify-between h-full">
              <div>
                <IconBadge icon={Code2} tint="lilac" size="md" rounded="2xl" />
                <h3 className="font-display font-bold text-xs mt-3 text-[#503043]">
                  Yossika Putra Erlangga
                </h3>
                <p className="text-[10px] text-lilac-500 font-bold uppercase tracking-wider mt-0.5">
                  Developer & AI Engineer
                </p>
              </div>
              <p className="text-[10px] text-[#7A4A63] mt-2.5 leading-relaxed font-medium">
                Mahasiswa S1 Teknik Informatika, implementator program.
              </p>
            </div>
          </TiltCard>
        </motion.div>

        {/* 3D Tech Stack Card */}
        <motion.div
          variants={{ hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0 } }}
          className="w-full"
        >
          <TiltCard depth={6} className="rounded-3xl w-full">
            <div className="relative overflow-hidden bg-white/70 backdrop-blur-xl rounded-3xl p-4.5 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] w-full text-left">
              <p className="text-[10px] font-display font-bold uppercase tracking-wider text-lilac-500 mb-2.5">
                Implementasi & Teknologi Modern:
              </p>
              <div className="flex flex-wrap gap-2">
                {[
                  { icon: Bot, label: "Antigravity AI" },
                  { icon: Zap, label: "Next.js 14" },
                  { icon: Palette, label: "Tailwind CSS" },
                  { icon: Sparkles, label: "Framer Motion" },
                  { icon: Cpu, label: "Gemini 2.5 Flash" },
                  { icon: Smartphone, label: "iOS PWA Standalone" },
                ].map(({ icon: Icon, label }) => (
                  <span
                    key={label}
                    className="inline-flex items-center gap-1.5 bg-white/90 border border-blush-100/80 px-3 py-1.5 rounded-xl text-[10px] font-semibold text-[#7A4A63] shadow-softer"
                  >
                    <Icon size={12} className="text-blush-400" />
                    <span>{label}</span>
                  </span>
                ))}
              </div>
            </div>
          </TiltCard>
        </motion.div>

        {/* Mobile Jump Button */}
        {showMobileButton && (
          <motion.a
            variants={{ hidden: { opacity: 0, scale: 0.95 }, show: { opacity: 1, scale: 1 } }}
            href="#app-frame"
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.96 }}
            className="lg:hidden mt-2 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blush-400 via-lilac-400 to-blush-500 text-white font-display font-bold text-xs px-7 py-3 rounded-2xl shadow-soft"
          >
            <span>Mulai Sekarang</span>
            <ChevronRight size={14} />
          </motion.a>
        )}
      </motion.div>
    </div>
  );
}
