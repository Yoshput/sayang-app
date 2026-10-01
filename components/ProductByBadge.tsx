"use client";

import { motion } from "framer-motion";
import { ExternalLink, Globe, Github, Instagram, Linkedin, Heart } from "lucide-react";

interface ProductByBadgeProps {
  className?: string;
  variant?: "light" | "glass" | "pill-only";
}

export default function ProductByBadge({
  className = "",
  variant = "glass",
}: ProductByBadgeProps) {
  return (
    <div className={`flex items-center flex-wrap gap-2.5 sm:gap-3 text-xs select-none ${className}`}>
      {/* Label "Product by" */}
      <span className="font-display font-medium text-xs text-[#7A4A63]/80 tracking-wide">
        Product by
      </span>

      {/* Main Pill Button */}
      <motion.a
        href="https://yossikaputra.my.id/"
        target="_blank"
        rel="noopener noreferrer"
        whileHover={{ scale: 1.03, y: -1 }}
        whileTap={{ scale: 0.97 }}
        className="group inline-flex items-center gap-2.5 px-3 py-1.5 rounded-full bg-white/85 backdrop-blur-xl border border-white/90 shadow-[0_4px_20px_rgba(244,114,182,0.15)] hover:shadow-[0_6px_25px_rgba(244,114,182,0.3)] hover:bg-white transition-all cursor-pointer"
      >
        {/* Real photo avatar from portfolio */}
        <div className="relative w-7 h-7 rounded-full overflow-hidden shrink-0 border border-blush-200/80 shadow-sm ring-2 ring-white">
          <img
            src="/images/yossika-avatar.webp"
            alt="Yossika Putra Erlangga"
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
            onError={(e) => {
              // Fallback if local image has any issue
              (e.target as HTMLImageElement).src = "https://yossikaputra.my.id/assets/img/foto-jas-fresh.webp";
            }}
          />
        </div>

        {/* Creator Name */}
        <span className="font-display font-bold text-xs text-[#503043] group-hover:text-blush-600 transition-colors">
          Yossika Putra
        </span>

        {/* Tag Pill */}
        <span className="inline-flex items-center gap-1 px-2 py-0.5 rounded-full bg-gradient-to-r from-blush-50 to-lilac-50 border border-blush-200/60 text-blush-600 text-[10px] font-display font-bold">
          <Globe size={10} className="text-blush-400" />
          <span>Portofolio</span>
        </span>

        {/* External Link Arrow */}
        <ExternalLink
          size={12}
          className="text-[#7A4A63]/60 group-hover:text-blush-500 group-hover:translate-x-0.5 transition-all"
        />
      </motion.a>

      {/* Social Links (Like Discord in screenshot, but GitHub & Instagram) */}
      <div className="flex items-center gap-1.5">
        <motion.a
          href="https://github.com/yoshput"
          target="_blank"
          rel="noopener noreferrer"
          title="GitHub @yoshput"
          whileHover={{ scale: 1.1, y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/80 text-[#7A4A63] hover:text-[#503043] hover:bg-white shadow-softer transition-all"
        >
          <Github size={14} />
        </motion.a>

        <motion.a
          href="https://instagram.com/_yosput"
          target="_blank"
          rel="noopener noreferrer"
          title="Instagram @_yosput"
          whileHover={{ scale: 1.1, y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/80 text-[#7A4A63] hover:text-rose-500 hover:bg-white shadow-softer transition-all"
        >
          <Instagram size={14} />
        </motion.a>

        <motion.a
          href="https://www.linkedin.com/in/yossikaputraerlangga/"
          target="_blank"
          rel="noopener noreferrer"
          title="LinkedIn Yossika Putra"
          whileHover={{ scale: 1.1, y: -1 }}
          whileTap={{ scale: 0.95 }}
          className="p-1.5 rounded-full bg-white/75 backdrop-blur-md border border-white/80 text-[#7A4A63] hover:text-blue-500 hover:bg-white shadow-softer transition-all"
        >
          <Linkedin size={14} />
        </motion.a>
      </div>
    </div>
  );
}
