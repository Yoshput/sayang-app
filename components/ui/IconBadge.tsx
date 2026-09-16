"use client";

import React from "react";
import * as LucideIcons from "lucide-react";

export type IconBadgeTint =
  | "blush"
  | "lilac"
  | "peach"
  | "mint"
  | "blue"
  | "rose"
  | "amber"
  | "slate"
  | "neutral";

interface IconBadgeProps {
  icon: React.ElementType | string;
  tint?: IconBadgeTint;
  size?: "xs" | "sm" | "md" | "lg" | "xl";
  className?: string;
  rounded?: "sm" | "md" | "lg" | "xl" | "2xl" | "full";
}

const TINT_MAP: Record<IconBadgeTint, { bg: string; text: string; border: string }> = {
  blush: {
    bg: "bg-blush-100/70",
    text: "text-blush-500",
    border: "border-blush-200/50",
  },
  lilac: {
    bg: "bg-lilac-100/70",
    text: "text-lilac-500",
    border: "border-lilac-200/50",
  },
  peach: {
    bg: "bg-peach-100/70",
    text: "text-peach-500",
    border: "border-peach-200/50",
  },
  mint: {
    bg: "bg-mint-100/70",
    text: "text-mint-500",
    border: "border-mint-200/50",
  },
  blue: {
    bg: "bg-[#EBF2FF]",
    text: "text-[#4B70F5]",
    border: "border-[#D6E4FF]",
  },
  rose: {
    bg: "bg-[#FFF0F5]",
    text: "text-[#E0245E]",
    border: "border-[#FFD6E5]",
  },
  amber: {
    bg: "bg-[#FFF6E6]",
    text: "text-[#D97706]",
    border: "border-[#FDE68A]",
  },
  slate: {
    bg: "bg-[#F1F5F9]",
    text: "text-[#64748B]",
    border: "border-[#E2E8F0]",
  },
  neutral: {
    bg: "bg-white/80",
    text: "text-[#7A4A63]",
    border: "border-white/60",
  },
};

const SIZE_MAP = {
  xs: { box: "w-6 h-6", icon: 12 },
  sm: { box: "w-8 h-8", icon: 16 },
  md: { box: "w-10 h-10", icon: 19 },
  lg: { box: "w-12 h-12", icon: 23 },
  xl: { box: "w-14 h-14", icon: 28 },
};

const ROUNDED_MAP = {
  sm: "rounded-md",
  md: "rounded-lg",
  lg: "rounded-xl",
  xl: "rounded-2xl",
  "2xl": "rounded-[22px]",
  full: "rounded-full",
};

export default function IconBadge({
  icon,
  tint = "blush",
  size = "md",
  rounded = "xl",
  className = "",
}: IconBadgeProps) {
  const tintStyles = TINT_MAP[tint] || TINT_MAP.blush;
  const sizeStyles = SIZE_MAP[size] || SIZE_MAP.md;
  const roundedStyle = ROUNDED_MAP[rounded] || "rounded-xl";

  let IconComponent: React.ElementType | null = null;
  if (typeof icon === "string") {
    IconComponent = (LucideIcons as any)[icon] || LucideIcons.Sparkles;
  } else {
    IconComponent = icon;
  }

  return (
    <div
      className={`inline-flex items-center justify-center shrink-0 border shadow-softer transition-transform duration-200 ${tintStyles.bg} ${tintStyles.text} ${tintStyles.border} ${sizeStyles.box} ${roundedStyle} ${className}`}
    >
      {IconComponent && <IconComponent size={sizeStyles.icon} strokeWidth={2.2} />}
    </div>
  );
}
