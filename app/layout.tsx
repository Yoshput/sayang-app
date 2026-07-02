import type { Metadata, Viewport } from "next";
import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import { ProfileProvider } from "@/app/providers";
import GlobalClickSparkle from "@/components/GlobalClickSparkle";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-poppins",
  display: "swap",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  weight: ["500", "600", "700"],
  variable: "--font-quicksand",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Untuk Dia 🌸",
  description:
    "Aplikasi self-care & couple sync — untuk kamu yang sendiri maupun yang berpasangan.",
  manifest: "/manifest.json",
  appleWebApp: {
    capable: true,
    statusBarStyle: "default",
    title: "Untuk Dia",
  },
  icons: {
    icon: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
    apple: [{ url: "/icons/icon-192.png", sizes: "192x192", type: "image/png" }],
  },
};

export const viewport: Viewport = {
  themeColor: "#F98FC2",
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="id">
      <body
        className={`${poppins.variable} ${quicksand.variable} font-sans bg-[#FDEFF6] antialiased`}
      >
        {/* Global sparkle click effect */}
        <GlobalClickSparkle />

        {/* Outer Split Layout Container */}
        <div className="min-h-[100dvh] w-full flex justify-center items-start lg:items-center bg-gradient-to-b from-[#FDE7F3] via-[#F3ECFF] to-[#E9F7EF] py-0 lg:py-10 px-0 lg:px-6">
          <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-7xl w-full mx-auto">
            
            {/* Left side: Premium Desktop Landing Page (Hidden on Mobile/Tablet) */}
            <div className="hidden lg:flex flex-col flex-1 max-w-[550px] text-[#7A4A63] space-y-6">
              <div className="inline-block bg-white/60 backdrop-blur-md border border-blush-200/50 rounded-full px-4 py-1.5 text-xs font-semibold tracking-wide text-blush-500 shadow-softer self-start">
                ✨ Project Anniversary & Self-Care Companion
              </div>
              
              <h1 className="font-display text-4xl lg:text-5xl font-bold leading-tight">
                Hubungkan Hati, <br />
                <span className="bg-gradient-to-r from-blush-500 via-[#B58AF5] to-magenta-400 bg-clip-text text-transparent">
                  Rawat Diri Sendiri.
                </span>
              </h1>
              
              <p className="text-sm leading-relaxed text-[#8A5C74]/90 font-medium">
                Aplikasi interaktif yang dirancang khusus untuk membantu merawat kesehatan mental pribadi (*Self-Care*) sekaligus menyelaraskan komunikasi dan kebersamaan dengan pasangan (*Couple Sync*).
              </p>
              
              {/* Creator Cards */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-softer flex flex-col justify-between">
                  <div>
                    <span className="text-2xl">👩‍🎨</span>
                    <h3 className="font-display font-bold text-xs mt-2 text-[#7A4A63]">Salsabilla Nurul H. (Acha)</h3>
                    <p className="text-[9px] text-lilac-400 font-bold uppercase tracking-wider mt-0.5">Ideator & Inspirasi</p>
                  </div>
                  <p className="text-[10px] text-[#8A5C74]/80 mt-2 leading-relaxed">
                    Pemilik ide awal dan inspirasi utama pembuatan web manis ini. 💖
                  </p>
                </div>
                
                <div className="bg-white/70 backdrop-blur-md rounded-2xl p-4 border border-white/60 shadow-softer flex flex-col justify-between">
                  <div>
                    <span className="text-2xl">👨‍💻</span>
                    <h3 className="font-display font-bold text-xs mt-2 text-[#7A4A63]">Yossika Putra Erlangga</h3>
                    <p className="text-[9px] text-lilac-400 font-bold uppercase tracking-wider mt-0.5">Developer</p>
                  </div>
                  <p className="text-[10px] text-[#8A5C74]/80 mt-2 leading-relaxed">
                    Mahasiswa S1 Teknik Informatika, selaku implementator program.
                  </p>
                </div>
              </div>
              
              {/* AI & Tech Stack Section */}
              <div className="bg-white/40 backdrop-blur-md rounded-3xl p-5 border border-white/50 shadow-softer">
                <p className="text-[9px] font-display font-bold uppercase tracking-wider text-lilac-500 mb-3">
                  Implementasi & Teknologi:
                </p>
                <div className="flex flex-wrap gap-2">
                  <span className="bg-white/90 border border-blush-100 px-3 py-1 rounded-full text-[10px] font-semibold text-[#8A5C74]">🤖 Antigravity AI (Asisten)</span>
                  <span className="bg-white/90 border border-blush-100 px-3 py-1 rounded-full text-[10px] font-semibold text-[#8A5C74]">⚡ Next.js 14 (App Router)</span>
                  <span className="bg-white/90 border border-blush-100 px-3 py-1 rounded-full text-[10px] font-semibold text-[#8A5C74]">🎨 Tailwind CSS</span>
                  <span className="bg-white/90 border border-blush-100 px-3 py-1 rounded-full text-[10px] font-semibold text-[#8A5C74]">✨ Framer Motion</span>
                  <span className="bg-white/90 border border-blush-100 px-3 py-1 rounded-full text-[10px] font-semibold text-[#8A5C74]">🔮 Gemini 2.5 Flash API</span>
                  <span className="bg-white/90 border border-blush-100 px-3 py-1 rounded-full text-[10px] font-semibold text-[#8A5C74]">📱 PWA Offline-ready</span>
                </div>
              </div>
            </div>
            
            {/* Right side: Mobile Mockup Container */}
            <div className="relative w-full h-[100dvh] sm:h-[850px] sm:max-w-[420px] sm:rounded-[3rem] sm:shadow-2xl sm:border-[10px] sm:border-white bg-[#FFF8FB] overflow-hidden flex flex-col shrink-0">
              <ProfileProvider>{children}</ProfileProvider>
            </div>
            
          </div>
        </div>
      </body>
    </html>
  );
}
