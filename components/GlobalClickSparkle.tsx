"use client";

import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface Sparkle {
  id: number;
  x: number;
  y: number;
  emojis: string[];
}

const HEART_EMOJIS = ["💗", "💖", "✨", "🌸", "💕", "⭐", "💫", "🌟"];

let counter = 0;

/** Renders a burst of mini hearts/sparkles wherever the user clicks or taps */
export default function GlobalClickSparkle() {
  const [sparkles, setSparkles] = useState<Sparkle[]>([]);

  useEffect(() => {
    const handleClick = (e: MouseEvent | TouchEvent) => {
      let x: number, y: number;
      if ("touches" in e) {
        x = e.touches[0]?.clientX ?? e.changedTouches[0]?.clientX ?? 0;
        y = e.touches[0]?.clientY ?? e.changedTouches[0]?.clientY ?? 0;
      } else {
        x = (e as MouseEvent).clientX;
        y = (e as MouseEvent).clientY;
      }

      // Pick 4-6 random emojis for this burst
      const count = 4 + Math.floor(Math.random() * 3);
      const chosen = Array.from({ length: count }, () =>
        HEART_EMOJIS[Math.floor(Math.random() * HEART_EMOJIS.length)]
      );

      const id = ++counter;
      setSparkles((prev) => [...prev.slice(-12), { id, x, y, emojis: chosen }]);

      // Remove after animation completes
      setTimeout(() => {
        setSparkles((prev) => prev.filter((s) => s.id !== id));
      }, 900);
    };

    window.addEventListener("click", handleClick);
    window.addEventListener("touchstart", handleClick, { passive: true });
    return () => {
      window.removeEventListener("click", handleClick);
      window.removeEventListener("touchstart", handleClick);
    };
  }, []);

  return (
    <div className="pointer-events-none fixed inset-0 z-[9999] overflow-hidden">
      <AnimatePresence>
        {sparkles.map((s) =>
          s.emojis.map((emoji, i) => {
            const angle = (i / s.emojis.length) * 360 + Math.random() * 30 - 15;
            const distance = 30 + Math.random() * 40;
            const rad = (angle * Math.PI) / 180;
            const dx = Math.cos(rad) * distance;
            const dy = Math.sin(rad) * distance;
            const size = 12 + Math.random() * 10;

            return (
              <motion.span
                key={`${s.id}-${i}`}
                initial={{ x: s.x, y: s.y, scale: 0, opacity: 1 }}
                animate={{
                  x: s.x + dx,
                  y: s.y + dy,
                  scale: [0, 1.3, 0.9, 0],
                  opacity: [1, 1, 0.7, 0],
                }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.75, ease: "easeOut" }}
                className="absolute select-none"
                style={{ fontSize: size, left: 0, top: 0, transform: "translate(-50%, -50%)" }}
              >
                {emoji}
              </motion.span>
            );
          })
        )}
      </AnimatePresence>
    </div>
  );
}
