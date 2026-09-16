"use client";

import { useEffect, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Heart,
  Sparkles,
  Calendar,
  Clock,
  Award,
  X,
  Copy,
  Check,
  PartyPopper,
  Flame,
} from "lucide-react";
import { useProfile } from "@/app/providers";
import { daysTogether, getAnniversaryMilestone } from "@/lib/profile";

// Particle for confetti explosion
interface Particle {
  x: number;
  y: number;
  vx: number;
  vy: number;
  size: number;
  color: string;
  rotation: number;
  vRot: number;
  alpha: number;
  type: "circle" | "ribbon" | "heart";
}

const CONFETTI_COLORS = [
  "#F98FC2",
  "#B58AF5",
  "#FFA877",
  "#94DCB6",
  "#F59E0B",
  "#EC4899",
  "#8B5CF6",
  "#FFFFFF",
];

export default function AnniversaryCelebrationModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  const { profile } = useProfile();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const rafRef = useRef<number>(0);
  const particlesRef = useRef<Particle[]>([]);
  const [copied, setCopied] = useState(false);

  const days = daysTogether(profile?.anniversaryDate ?? "");
  const milestone = getAnniversaryMilestone(profile?.anniversaryDate);

  const myName = profile?.myName || "Yossika";
  const partnerName = profile?.herName || "Acha";

  const fireConfetti = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const newParticles: Particle[] = [];
    const count = 90;

    for (let i = 0; i < count; i++) {
      const angle = (Math.random() * Math.PI) - (Math.PI / 2);
      const speed = Math.random() * 12 + 6;
      newParticles.push({
        x: canvas.width / 2 + (Math.random() * 80 - 40),
        y: canvas.height * 0.45,
        vx: Math.cos(angle) * speed * (Math.random() > 0.5 ? 1 : -1),
        vy: -Math.sin(Math.random() * Math.PI) * speed - 3,
        size: Math.random() * 8 + 4,
        color: CONFETTI_COLORS[Math.floor(Math.random() * CONFETTI_COLORS.length)],
        rotation: Math.random() * 360,
        vRot: (Math.random() - 0.5) * 12,
        alpha: 1,
        type: Math.random() < 0.3 ? "heart" : Math.random() < 0.6 ? "ribbon" : "circle",
      });
    }

    particlesRef.current = [...particlesRef.current, ...newParticles];
  };

  useEffect(() => {
    if (!isOpen) return;

    const canvas = canvasRef.current;
    if (!canvas) return;
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    particlesRef.current = [];
    fireConfetti();

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    const render = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height);

      particlesRef.current.forEach((p) => {
        p.x += p.vx;
        p.y += p.vy;
        p.vy += 0.35; // gravity
        p.vx *= 0.98; // friction
        p.rotation += p.vRot;
        p.alpha -= 0.007;

        if (p.alpha <= 0) return;

        ctx.save();
        ctx.globalAlpha = Math.max(0, p.alpha);
        ctx.translate(p.x, p.y);
        ctx.rotate((p.rotation * Math.PI) / 180);
        ctx.fillStyle = p.color;

        if (p.type === "heart") {
          const s = p.size * 0.8;
          ctx.beginPath();
          ctx.moveTo(0, -s * 0.3);
          ctx.bezierCurveTo(s * 0.5, -s, s, -s * 0.2, 0, s * 0.6);
          ctx.bezierCurveTo(-s, -s * 0.2, -s * 0.5, -s, 0, -s * 0.3);
          ctx.fill();
        } else if (p.type === "ribbon") {
          ctx.fillRect(-p.size / 2, -p.size * 1.5, p.size * 0.6, p.size * 2);
        } else {
          ctx.beginPath();
          ctx.arc(0, 0, p.size / 2, 0, Math.PI * 2);
          ctx.fill();
        }

        ctx.restore();
      });

      particlesRef.current = particlesRef.current.filter((p) => p.alpha > 0);
      rafRef.current = requestAnimationFrame(render);
    };

    render();

    return () => {
      cancelAnimationFrame(rafRef.current);
    };
  }, [isOpen]);

  const letterText = `Untuk Bidadari Kesayangan Mamas, ${partnerName} (Acha) ❤️

Selamat 2 Tahun Kebersamaan Kita!
Tidak terasa, hari ini kita sudah melangkah sejauh ${days} hari bersama. Dua tahun penuh tawa, cerita, tangis haru, belajar saling memahami, dan bertumbuh menjadi versi terbaik satu sama lain.

Mamas masih ingat betul bagaimana awal mula kita dekat, obrolan-obrolan sederhana sampai larut malam, senyum Acha yang selalu jadi obat paling ampuh setelah seharian lelah kuliah dan ngoding, hingga momen-momen indah saat kita jalan berdua ke Jogja, Wonosobo, dan tempat-tempat hangat lainnya.

Dua tahun ini bukan waktu yang sebentar, tapi bersama Acha rasanya waktu selalu berjalan begitu cepat dan membahagiakan. Terima kasih banyak ya sayang, sudah selalu sabar, pengertian, tetap setia ada di samping Mamas, dan selalu memilih Mamas setiap hari.

Di tahun kedua ini dan tahun-tahun berikutnya, doa dan janji Mamas tetap sama: Mamas akan selalu menjaga Acha, melindungi senyum manis Acha, dan terus berjuang agar masa depan yang kita impikan bisa terwujud bersama.

Happy 2nd Anniversary, my sweetest baby princess Acha. I love you more than words could ever describe, always and forever! ❤️`;

  const copyLetter = () => {
    navigator.clipboard.writeText(letterText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 overflow-y-auto no-scrollbar">
          {/* Backdrop Blur */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="fixed inset-0 bg-[#351C2C]/50 backdrop-blur-xl"
          />

          {/* Fullscreen Canvas Confetti */}
          <canvas
            ref={canvasRef}
            className="fixed inset-0 pointer-events-none z-50 w-full h-full"
          />

          {/* iOS Card Modal */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.92, y: 30 }}
            transition={{ type: "spring", stiffness: 380, damping: 28 }}
            className="relative z-50 w-full max-w-lg bg-white/95 backdrop-blur-2xl rounded-[36px] shadow-[0_25px_70px_rgba(244,114,182,0.35)] border border-white/80 p-6 sm:p-8 my-auto overflow-hidden text-[#503043]"
          >
            {/* Top decorative glow */}
            <div className="absolute -top-24 left-1/2 -translate-x-1/2 w-64 h-64 bg-gradient-to-br from-blush-300 via-lilac-200 to-amber-200 rounded-full blur-3xl opacity-40 pointer-events-none" />

            {/* Close Button */}
            <motion.button
              whileTap={{ scale: 0.9 }}
              onClick={onClose}
              className="absolute top-5 right-5 p-2 rounded-full bg-black/5 hover:bg-black/10 text-[#7A4A63] transition-colors"
            >
              <X size={18} />
            </motion.button>

            {/* Header Badge */}
            <div className="text-center pt-2">
              <div className="inline-flex items-center gap-2 bg-gradient-to-r from-blush-500 via-[#B58AF5] to-amber-500 text-white text-[11px] font-bold px-4 py-1.5 rounded-full shadow-soft mb-3">
                <PartyPopper size={13} />
                <span>MILESTONE 2ND ANNIVERSARY</span>
                <Sparkles size={13} />
              </div>

              {/* Couple Avatars with Connected Heart */}
              <div className="flex items-center justify-center gap-3 my-3">
                <div className="relative">
                  {profile?.myAvatar ? (
                    <img
                      src={profile.myAvatar}
                      alt={myName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-blush-300 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-blush-100 flex items-center justify-center text-sm font-bold text-blush-600 border-2 border-blush-300 shadow-md">
                      {myName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full p-0.5 shadow">
                    👨‍💻
                  </span>
                </div>

                <motion.div
                  animate={{ scale: [1, 1.25, 1] }}
                  transition={{ repeat: Infinity, duration: 1.8, ease: "easeInOut" }}
                  className="w-9 h-9 rounded-full bg-gradient-to-r from-blush-400 to-lilac-400 flex items-center justify-center text-white shadow-soft"
                >
                  <Heart size={18} fill="currentColor" />
                </motion.div>

                <div className="relative">
                  {profile?.partnerAvatar ? (
                    <img
                      src={profile.partnerAvatar}
                      alt={partnerName}
                      className="w-14 h-14 rounded-full object-cover border-2 border-lilac-300 shadow-md"
                    />
                  ) : (
                    <div className="w-14 h-14 rounded-full bg-lilac-100 flex items-center justify-center text-sm font-bold text-lilac-600 border-2 border-lilac-300 shadow-md">
                      {partnerName.slice(0, 2).toUpperCase()}
                    </div>
                  )}
                  <span className="absolute -bottom-1 -right-1 text-xs bg-white rounded-full p-0.5 shadow">
                    👩‍🎨
                  </span>
                </div>
              </div>

              <h2 className="font-display text-2xl font-bold text-[#503043] mt-2">
                Selamat 2 Tahun Bersama!
              </h2>
              <p className="text-xs text-[#7A4A63] font-medium mt-1">
                {myName} & {partnerName} • Dua Tahun Penuh Cinta & Kebahagiaan
              </p>
            </div>

            {/* Milestone Numbers Grid */}
            <div className="grid grid-cols-3 gap-2.5 my-5">
              <div className="bg-blush-50/70 border border-blush-100 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-blush-500 font-bold uppercase tracking-wider">
                  Hari Bersama
                </p>
                <p className="font-display font-bold text-xl text-[#503043] mt-0.5">
                  {days}
                </p>
              </div>
              <div className="bg-lilac-50/70 border border-lilac-100 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-lilac-500 font-bold uppercase tracking-wider">
                  Bulan
                </p>
                <p className="font-display font-bold text-xl text-[#503043] mt-0.5">
                  24
                </p>
              </div>
              <div className="bg-amber-50/70 border border-amber-100 rounded-2xl p-3 text-center">
                <p className="text-[10px] text-amber-600 font-bold uppercase tracking-wider">
                  Jam Bersama
                </p>
                <p className="font-display font-bold text-xl text-[#503043] mt-0.5">
                  {(days * 24).toLocaleString("id-ID")}
                </p>
              </div>
            </div>

            {/* Long-Form Heartfelt Letter Card */}
            <div className="bg-gradient-to-b from-white/90 to-blush-50/50 rounded-2xl p-4 border border-blush-100/80 shadow-inner max-h-56 overflow-y-auto no-scrollbar text-left text-xs leading-relaxed text-[#6B3E59] whitespace-pre-line font-medium space-y-2">
              <p className="font-bold text-[#503043] text-sm flex items-center gap-1.5">
                <Heart size={14} className="text-blush-500" fill="currentColor" />
                Surat Cinta 2 Tahun Perjalanan Kita
              </p>
              <p>{letterText}</p>
            </div>

            {/* Interactive Actions */}
            <div className="flex items-center gap-2 mt-5">
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={fireConfetti}
                className="flex-1 flex items-center justify-center gap-2 bg-gradient-to-r from-blush-400 via-lilac-400 to-amber-400 text-white font-display font-bold text-xs py-3.5 rounded-2xl shadow-soft"
              >
                <PartyPopper size={16} />
                Hujani Confetti 🎉
              </motion.button>

              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={copyLetter}
                className="flex items-center justify-center gap-1.5 px-4 py-3.5 rounded-2xl bg-white border border-blush-200 text-[#7A4A63] text-xs font-bold shadow-softer hover:bg-blush-50"
              >
                {copied ? <Check size={15} className="text-emerald-500" /> : <Copy size={15} />}
                {copied ? "Tersalin!" : "Salin"}
              </motion.button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
}
