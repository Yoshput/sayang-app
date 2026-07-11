"use client";

import { useRef } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

interface TiltCardProps {
  children: React.ReactNode;
  className?: string;
  depth?: number; // max tilt degrees
}

export default function TiltCard({ children, className = "", depth = 12 }: TiltCardProps) {
  const ref = useRef<HTMLDivElement>(null);

  const rawX = useMotionValue(0);
  const rawY = useMotionValue(0);

  const rotateX = useSpring(useTransform(rawY, [-0.5, 0.5], [depth, -depth]), { stiffness: 180, damping: 20 });
  const rotateY = useSpring(useTransform(rawX, [-0.5, 0.5], [-depth, depth]), { stiffness: 180, damping: 20 });
  const gloss   = useSpring(useTransform(rawX, [-0.5, 0.5], [0.05, 0.18]),   { stiffness: 180, damping: 20 });

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!ref.current) return;
    const rect = ref.current.getBoundingClientRect();
    rawX.set((e.clientX - rect.left) / rect.width  - 0.5);
    rawY.set((e.clientY - rect.top)  / rect.height - 0.5);
  };

  const handleMouseLeave = () => {
    rawX.set(0);
    rawY.set(0);
  };

  return (
    <motion.div
      ref={ref}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ rotateX, rotateY, transformPerspective: 800, transformStyle: "preserve-3d" }}
      className={`relative cursor-default ${className}`}
    >
      {children}
      {/* Gloss overlay */}
      <motion.div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: "linear-gradient(135deg, rgba(255,255,255,0.6) 0%, transparent 60%)",
          borderRadius: "inherit",
          opacity: gloss,
        }}
      />
    </motion.div>
  );
}
