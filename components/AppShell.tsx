"use client";

import React from "react";
import dynamic from "next/dynamic";
import { useProfile } from "@/app/providers";
import LandingPanel from "@/components/LandingPanel";
import IPhone17ProMaxMockup from "@/components/mockup/IPhone17ProMaxMockup";

// Canvas loaded client-only for background performance
const LandingCanvas = dynamic(() => import("@/components/LandingCanvas"), { ssr: false });

/**
 * AppShell: Apple HIG Responsive Engine
 * - Mobile + Logged In: Native 100dvh edge-to-edge iOS experience (zero borders, smooth inertia scroll).
 * - Desktop + Logged In: Full responsive Apple iPad / macOS Catalyst styled dashboard (centered, comfortable, crystal-clear readability).
 * - Desktop + Not Logged In: Split showcase with 3D Landing Panel on left & iPhone 17 Pro Max Titanium mockup on right.
 * - Mobile + Not Logged In: Fluid mobile landing that smoothly flows into the onboarding screen.
 */
export default function AppShell({ children }: { children: React.ReactNode }) {
  const { profile, ready } = useProfile();
  const isLoggedIn = ready && profile !== null;

  if (isLoggedIn) {
    return (
      <>
        {/* Mobile Viewport: 100% Native Edge-to-Edge Experience */}
        <div className="lg:hidden w-full h-[100dvh] bg-[#FFF8FB] overflow-hidden flex flex-col">
          {children}
        </div>

        {/* Desktop / Laptop / PC Viewport: Spacious Responsive Apple Catalyst Experience */}
        <div className="hidden lg:flex relative w-full justify-center items-center min-h-[100dvh] bg-gradient-to-b from-[#FDE7F3] via-[#F3ECFF] to-[#E9F7EF] py-8 px-6 overflow-hidden">
          {/* Ambient Canvas Particles */}
          <LandingCanvas />

          {/* Centered Responsive App Window */}
          <div className="relative z-10 w-full max-w-xl h-[92vh] rounded-[36px] shadow-[0_20px_60px_rgba(244,114,182,0.22),0_4px_20px_rgba(0,0,0,0.04)] border-[6px] border-white/80 bg-[#FFF8FB] overflow-hidden flex flex-col transition-all duration-300">
            {children}
          </div>
        </div>
      </>
    );
  }

  // Not logged in: Show Landing Showcase + iPhone 17 Pro Max Hardware Mockup
  return (
    <div className="relative min-h-[100dvh] w-full flex justify-center items-start lg:items-center bg-gradient-to-b from-[#FDE7F3] via-[#F3ECFF] to-[#E9F7EF] lg:py-10 px-0 lg:px-6 overflow-y-auto scroll-smooth">
      {/* Interactive canvas background on desktop */}
      <div className="hidden lg:block absolute inset-0 pointer-events-none">
        <LandingCanvas />
      </div>

      <div className="relative z-10 flex flex-col lg:flex-row items-center justify-center gap-10 lg:gap-14 max-w-7xl w-full mx-auto py-8 lg:py-0 px-4 sm:px-6">
        {/* Left Side: 3D Animated Landing Panel */}
        <LandingPanel />

        {/* Right Side: iPhone 17 Pro Max Titanium Mockup */}
        <div id="app-frame" className="w-full flex justify-center scroll-mt-6">
          <IPhone17ProMaxMockup>
            {children}
          </IPhone17ProMaxMockup>
        </div>
      </div>
    </div>
  );
}
