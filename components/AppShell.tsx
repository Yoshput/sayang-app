"use client";

import { useProfile } from "@/app/providers";
import LandingPanel from "@/components/LandingPanel";

/**
 * AppShell handles the responsive layout:
 * - Mobile + logged in  → app frame fills 100dvh, no landing, no padding
 * - Mobile + not logged → landing page scrolls above app frame
 * - Desktop            → side-by-side layout always
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const { profile, ready } = useProfile();
  const isLoggedIn = ready && profile !== null;

  if (isLoggedIn) {
    return (
      <>
        {/* Mobile: pure full-screen app, no landing */}
        <div className="lg:hidden w-full h-[100dvh] bg-[#FFF8FB] overflow-hidden flex flex-col">
          {children}
        </div>

        {/* Desktop: side-by-side with landing */}
        <div className="hidden lg:flex w-full justify-center items-center min-h-[100dvh] bg-gradient-to-b from-[#FDE7F3] via-[#F3ECFF] to-[#E9F7EF] py-10 px-6">
          <div className="flex flex-row items-center justify-center gap-16 max-w-7xl w-full mx-auto">
            <LandingPanel />
            <div className="relative h-[850px] max-w-[420px] w-full rounded-[3rem] shadow-2xl border-[10px] border-white bg-[#FFF8FB] overflow-hidden flex flex-col shrink-0">
              {children}
            </div>
          </div>
        </div>
      </>
    );
  }

  // Not logged in: scrollable landing + app frame
  return (
    <div className="min-h-[100dvh] w-full flex justify-center items-start lg:items-center bg-gradient-to-b from-[#FDE7F3] via-[#F3ECFF] to-[#E9F7EF] lg:py-10 px-0 lg:px-6 overflow-y-auto scroll-smooth">
      <div className="flex flex-col lg:flex-row items-center justify-center gap-8 lg:gap-16 max-w-7xl w-full mx-auto py-10 lg:py-0">
        <LandingPanel />
        <div
          id="app-frame"
          className="relative w-full h-[100dvh] sm:h-[850px] sm:max-w-[420px] sm:rounded-[3rem] sm:shadow-2xl sm:border-[10px] sm:border-white bg-[#FFF8FB] overflow-hidden flex flex-col shrink-0 scroll-mt-4"
        >
          {children}
        </div>
      </div>
    </div>
  );
}
