"use client";

import { useProfile } from "@/app/providers";

export default function LandingPanel() {
  const { profile, ready } = useProfile();

  // On mobile: hide if user already has a profile (they're inside the app)
  // On desktop (lg+): always show side-by-side
  if (ready && profile !== null) {
    // Logged in → only show on desktop
    return (
      <div className="hidden lg:flex flex-col flex-1 max-w-[550px] text-[#7A4A63] space-y-6 px-6 lg:px-0 items-start text-left">
        <LandingContent />
      </div>
    );
  }

  // Not logged in → show on all screens (mobile shows landing + button to scroll to app)
  return (
    <div className="flex flex-col flex-1 max-w-[550px] text-[#7A4A63] space-y-6 px-6 lg:px-0 items-center lg:items-start text-center lg:text-left">
      <LandingContent showMobileButton />
    </div>
  );
}

function LandingContent({ showMobileButton }: { showMobileButton?: boolean }) {
  return (
    <>
      <div className="inline-block bg-white/60 backdrop-blur-md border border-blush-200/50 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-blush-500 shadow-softer">
        ✨ Project Anniversary &amp; Self-Care Companion
      </div>

      <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
        Hubungkan Hati, <br />
        <span className="bg-gradient-to-r from-blush-500 via-[#B58AF5] to-magenta-400 bg-clip-text text-transparent">
          Rawat Diri Sendiri.
        </span>
      </h1>

      <p className="text-sm leading-relaxed text-[#8A5C74]/90 font-medium">
        Aplikasi interaktif yang dirancang khusus untuk membantu merawat
        kesehatan mental pribadi (<em>Self-Care</em>) sekaligus menyelaraskan
        komunikasi dan kebersamaan dengan pasangan (<em>Couple Sync</em>).
      </p>

      {/* Creator Cards */}
      <div className="grid grid-cols-2 gap-4 w-full text-left">
        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-softer flex flex-col justify-between">
          <div>
            <span className="text-2xl">👩‍🎨</span>
            <h3 className="font-display font-bold text-xs mt-2 text-[#7A4A63]">
              Salsabilla Nurul H. (Acha)
            </h3>
            <p className="text-[9px] text-lilac-400 font-bold uppercase tracking-wider mt-0.5">
              Ideator &amp; Inspirasi
            </p>
          </div>
          <p className="text-[10px] text-[#8A5C74]/80 mt-2 leading-relaxed">
            Pemilik ide awal dan inspirasi utama pembuatan web manis ini. 💖
          </p>
        </div>

        <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-softer flex flex-col justify-between">
          <div>
            <span className="text-2xl">👨‍💻</span>
            <h3 className="font-display font-bold text-xs mt-2 text-[#7A4A63]">
              Yossika Putra Erlangga
            </h3>
            <p className="text-[9px] text-lilac-400 font-bold uppercase tracking-wider mt-0.5">
              Developer
            </p>
          </div>
          <p className="text-[10px] text-[#8A5C74]/80 mt-2 leading-relaxed">
            Mahasiswa S1 Teknik Informatika, selaku implementator program.
          </p>
        </div>
      </div>

      {/* AI & Tech Stack Section */}
      <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 shadow-softer w-full text-left">
        <p className="text-[9px] font-display font-bold uppercase tracking-wider text-lilac-500 mb-3">
          Implementasi &amp; Teknologi:
        </p>
        <div className="flex flex-wrap gap-2">
          {[
            "🤖 Antigravity AI (Asisten)",
            "⚡ Next.js 14 (App Router)",
            "🎨 Tailwind CSS",
            "✨ Framer Motion",
            "🔮 Gemini 2.5 Flash API",
            "📱 PWA Offline-ready",
          ].map((t) => (
            <span
              key={t}
              className="bg-white/90 border border-blush-100 px-3 py-1 rounded-full text-[10px] font-semibold text-[#8A5C74]"
            >
              {t}
            </span>
          ))}
        </div>
      </div>

      {/* Jump button for mobile — only when not logged in */}
      {showMobileButton && (
        <a
          href="#app-frame"
          className="lg:hidden mt-4 inline-flex items-center justify-center gap-2 bg-gradient-to-r from-blush-400 to-lilac-400 text-white font-display font-bold text-xs px-6 py-3 rounded-2xl shadow-soft"
        >
          Buka Aplikasi 📱
        </a>
      )}
    </>
  );
}
