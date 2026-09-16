"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, MessageCircleHeart } from "lucide-react";
import { DEEP_TALK_QUESTIONS } from "@/lib/data";
import IconBadge from "@/components/ui/IconBadge";

export default function DeepTalkCards() {
  const [index, setIndex] = useState(0);
  const [flipped, setFlipped] = useState(false);

  const drawNew = () => {
    let next = index;
    while (next === index) {
      next = Math.floor(Math.random() * DEEP_TALK_QUESTIONS.length);
    }
    setFlipped(false);
    setTimeout(() => setIndex(next), 150);
  };

  return (
    <div className="px-4 sm:px-5 pt-5 flex flex-col items-center">
      <div className="flex items-center gap-2.5 self-start mb-1">
        <IconBadge icon={MessageCircleHeart} tint="rose" size="sm" rounded="xl" />
        <div>
          <p className="font-display font-bold text-[#503043] text-base">
            Deep Talk Untuk Kita
          </p>
          <p className="text-xs text-[#7A4A63]">
            Ketuk kartu untuk membuka pertanyaan yang mempererat rasa
          </p>
        </div>
      </div>

      <div className="mt-4 w-full h-56 [perspective:1200px]">
        <motion.div
          className="relative w-full h-full cursor-pointer card-3d"
          onClick={() => setFlipped((f) => !f)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-blush-400 via-lilac-400 to-blush-500 shadow-soft flex flex-col items-center justify-center gap-2.5 p-6 text-white text-center">
            <IconBadge icon={MessageCircleHeart} tint="neutral" size="lg" rounded="2xl" className="bg-white/25 border-white/30 text-white" />
            <p className="font-display font-bold text-sm drop-shadow">
              Ketuk untuk membuka pertanyaan
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 backface-hidden rounded-3xl bg-white/95 backdrop-blur-xl shadow-soft border border-blush-100 flex items-center justify-center p-6 text-center"
            style={{ transform: "rotateY(180deg)" }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0, y: 6 }}
                animate={{ opacity: flipped ? 1 : 0, y: flipped ? 0 : 6 }}
                exit={{ opacity: 0 }}
                className="font-display font-bold text-[#503043] text-sm sm:text-base leading-relaxed"
              >
                "{DEEP_TALK_QUESTIONS[index]}"
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.button
        whileTap={{ scale: 0.95 }}
        whileHover={{ scale: 1.02 }}
        onClick={drawNew}
        className="mt-4 flex items-center gap-2 px-5 py-2.5 rounded-2xl bg-white/80 border border-blush-200 text-[#7A4A63] text-xs font-display font-bold shadow-softer hover:bg-blush-50"
      >
        <RefreshCw size={13} />
        <span>Ganti Pertanyaan Lain</span>
      </motion.button>
    </div>
  );
}
