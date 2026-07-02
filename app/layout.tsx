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

        {/* Desktop: centered phone frame. Mobile: full DVH native app */}
        <div className="min-h-[100dvh] w-full flex justify-center items-start sm:items-center bg-gradient-to-b from-[#FDE7F3] via-[#F3ECFF] to-[#E9F7EF] sm:py-10">
          <div className="relative w-full h-[100dvh] sm:h-[850px] sm:max-w-[420px] sm:rounded-[3rem] sm:shadow-2xl sm:border-[10px] sm:border-white bg-[#FFF8FB] overflow-hidden flex flex-col">
            <ProfileProvider>{children}</ProfileProvider>
          </div>
        </div>
      </body>
    </html>
  );
}
