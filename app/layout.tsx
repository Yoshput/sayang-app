import type { Metadata, Viewport } from "next";
import { Poppins, Quicksand } from "next/font/google";
import "./globals.css";
import { ProfileProvider } from "@/app/providers";
import GlobalClickSparkle from "@/components/GlobalClickSparkle";
import AppShell from "@/components/AppShell";

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
      <head>
        {/* Apple PWA — required for iPhone "Add to Home Screen" install */}
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="apple-mobile-web-app-status-bar-style" content="default" />
        <meta name="apple-mobile-web-app-title" content="Untuk Dia" />
        <link rel="apple-touch-icon" sizes="192x192" href="/icons/icon-192.png" />
        <link rel="apple-touch-icon" sizes="512x512" href="/icons/icon-512.png" />
      </head>
      <body
        className={`${poppins.variable} ${quicksand.variable} font-sans bg-[#FDEFF6] antialiased`}
      >
        {/* ProfileProvider wraps everything — AppShell & LandingPanel can both read profile */}
        <ProfileProvider>
          <GlobalClickSparkle />
          {/* AppShell handles: full-screen mobile when logged in, landing+app when not */}
          <AppShell>{children}</AppShell>
        </ProfileProvider>
      </body>
    </html>
  );
}
