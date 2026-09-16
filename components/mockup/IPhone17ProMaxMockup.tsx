"use client";

import React, { useState } from "react";
import { motion } from "framer-motion";
import { Wifi, Battery, Heart, Sparkles } from "lucide-react";

interface IPhone17ProMaxMockupProps {
  children: React.ReactNode;
  className?: string;
}

export default function IPhone17ProMaxMockup({
  children,
  className = "",
}: IPhone17ProMaxMockupProps) {
  const [islandExpanded, setIslandExpanded] = useState(false);

  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Outer Titanium Chassis Frame */}
      <div
        className="relative w-full max-w-[425px] h-[870px] rounded-[55px] p-[3.5px] shadow-[0_25px_80px_rgba(244,114,182,0.3),0_15px_30px_rgba(0,0,0,0.12)] transition-all duration-300"
        style={{
          background:
            "linear-gradient(135deg, #F5E8EF 0%, #D8C3D0 25%, #EFE1E9 50%, #BBA5B2 75%, #E6D2DE 100%)",
        }}
      >
        {/* Hardware Action Button (Left side top) */}
        <div className="absolute -left-[5px] top-[115px] w-[3px] h-[26px] bg-[#9F8A96] rounded-l-md shadow-sm" />

        {/* Hardware Volume Up Button (Left side) */}
        <div className="absolute -left-[5px] top-[155px] w-[3px] h-[48px] bg-[#9F8A96] rounded-l-md shadow-sm" />

        {/* Hardware Volume Down Button (Left side) */}
        <div className="absolute -left-[5px] top-[215px] w-[3px] h-[48px] bg-[#9F8A96] rounded-l-md shadow-sm" />

        {/* Hardware Power Button (Right side) */}
        <div className="absolute -right-[5px] top-[170px] w-[3px] h-[72px] bg-[#9F8A96] rounded-r-md shadow-sm" />

        {/* Hardware Camera Control Button (Right side lower) */}
        <div className="absolute -right-[4.5px] top-[540px] w-[2.5px] h-[42px] bg-[#8B7582] rounded-r-sm shadow-inner" />

        {/* Inner Black Bezel Layer */}
        <div className="relative w-full h-full rounded-[51px] bg-black p-[3px] overflow-hidden flex flex-col shadow-inner">
          {/* OLED Screen Canvas */}
          <div className="relative w-full h-full rounded-[48px] bg-[#FFF8FB] overflow-hidden flex flex-col">
            
            {/* iOS Status Bar Area & Dynamic Island */}
            <div className="relative z-30 w-full h-11 px-7 flex items-center justify-between text-[11px] font-semibold text-[#503043] shrink-0 pointer-events-auto">
              {/* iOS Clock */}
              <span className="font-display tracking-tight text-xs font-bold pl-1">
                9:41
              </span>

              {/* Dynamic Island (Interactive) */}
              <motion.div
                onClick={() => setIslandExpanded((v) => !v)}
                animate={{
                  width: islandExpanded ? 200 : 108,
                  height: islandExpanded ? 38 : 26,
                  borderRadius: islandExpanded ? 20 : 13,
                }}
                transition={{ type: "spring", stiffness: 450, damping: 28 }}
                className="absolute left-1/2 -translate-x-1/2 top-2 bg-black flex items-center justify-between px-2.5 cursor-pointer shadow-lg overflow-hidden group"
              >
                {/* Front Camera Lens Glint */}
                <div className="w-2.5 h-2.5 rounded-full bg-[#111] border border-[#222] relative flex items-center justify-center shrink-0">
                  <div className="w-1 h-1 rounded-full bg-[#1a237e]/40" />
                </div>

                {/* Island Inner Content */}
                {islandExpanded ? (
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    className="flex items-center gap-2 text-[10px] text-white font-medium truncate px-1"
                  >
                    <Heart size={12} className="text-blush-400 fill-blush-400 animate-pulse shrink-0" />
                    <span className="truncate">Sayang Sync • 2nd Aniv</span>
                    <Sparkles size={11} className="text-amber-300 shrink-0" />
                  </motion.div>
                ) : (
                  <div className="flex items-center gap-1.5 opacity-60 group-hover:opacity-100 transition-opacity">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                    <Heart size={10} className="text-blush-400 fill-blush-400" />
                  </div>
                )}

                {/* FaceID / Mic Sensor */}
                <div className="w-2 h-2 rounded-full bg-[#0a0a0a] shrink-0" />
              </motion.div>

              {/* iOS Right Icons (Cellular, Wifi, Battery) */}
              <div className="flex items-center gap-1.5 pr-1">
                <div className="flex items-end gap-0.5 h-2.5">
                  <span className="w-0.5 h-1 bg-[#503043] rounded-full" />
                  <span className="w-0.5 h-1.5 bg-[#503043] rounded-full" />
                  <span className="w-0.5 h-2 bg-[#503043] rounded-full" />
                  <span className="w-0.5 h-2.5 bg-[#503043] rounded-full" />
                </div>
                <Wifi size={12} strokeWidth={2.5} />
                <div className="flex items-center gap-0.5">
                  <div className="w-4 h-2.5 rounded-[3px] border border-[#503043] p-0.5 flex items-center">
                    <div className="w-full h-full bg-[#503043] rounded-[1px]" />
                  </div>
                  <div className="w-0.5 h-1 bg-[#503043] rounded-r-sm" />
                </div>
              </div>
            </div>

            {/* Application Inside Screen */}
            <div className="relative flex-1 w-full overflow-hidden flex flex-col">
              {children}
            </div>

            {/* iOS Home Indicator Bar */}
            <div className="relative z-30 w-full pb-2 pt-1 flex justify-center pointer-events-none bg-gradient-to-t from-white/30 to-transparent">
              <div className="w-32 h-1 bg-black/30 rounded-full" />
            </div>

            {/* Specular Front Glass Highlight (Diagonal Glint) */}
            <div
              className="absolute inset-0 pointer-events-none z-40 opacity-20"
              style={{
                background:
                  "linear-gradient(115deg, rgba(255,255,255,0.7) 0%, rgba(255,255,255,0.1) 25%, transparent 50%)",
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
