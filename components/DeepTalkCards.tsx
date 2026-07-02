"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { RefreshCw, Sparkles } from "lucide-react";
import { DEEP_TALK_QUESTIONS } from "@/lib/data";

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
    <div className="px-5 pt-6 flex flex-col items-center">
      <p className="font-display font-bold text-[#7A4A63] text-base self-start flex items-center gap-1.5">
        <Sparkles size={16} className="text-blush-400" /> Deep Talk Buat Kita
      </p>
      <p className="text-xs text-lilac-500 self-start mt-0.5">
        Klik kartunya buat lihat pertanyaannya
      </p>

      <div className="mt-5 w-full h-56 [perspective:1200px]">
        <motion.div
          className="relative w-full h-full cursor-pointer card-3d"
          onClick={() => setFlipped((f) => !f)}
          animate={{ rotateY: flipped ? 180 : 0 }}
          transition={{ duration: 0.55, ease: "easeInOut" }}
        >
          {/* Front */}
          <div className="absolute inset-0 backface-hidden rounded-3xl bg-gradient-to-br from-blush-300 via-blush-200 to-lilac-200 shadow-soft flex flex-col items-center justify-center gap-2 p-6">
            <motion.span
              animate={{ y: [0, -6, 0] }}
              transition={{ repeat: Infinity, duration: 2 }}
              className="text-4xl"
            >
              💌
            </motion.span>
            <p className="font-display font-bold text-white text-center text-sm drop-shadow">
              Ketuk buat buka kartu
            </p>
          </div>

          {/* Back */}
          <div
            className="absolute inset-0 backface-hidden rounded-3xl bg-white shadow-soft border border-blush-100 flex items-center justify-center p-6"
            style={{ transform: "rotateY(180deg)" }}
          >
            <AnimatePresence mode="wait">
              <motion.p
                key={index}
                initial={{ opacity: 0 }}
                animate={{ opacity: flipped ? 1 : 0 }}
                transition={{ delay: flipped ? 0.25 : 0, duration: 0.3 }}
                className="text-center font-display font-semibold text-[#7A4A63] text-base leading-relaxed"
              >
                {DEEP_TALK_QUESTIONS[index]}
              </motion.p>
            </AnimatePresence>
          </div>
        </motion.div>
      </div>

      <motion.button
        onClick={drawNew}
        whileTap={{ scale: 0.95, rotate: -4 }}
        whileHover={{ scale: 1.03 }}
        className="mt-5 flex items-center gap-2 bg-lilac-400 text-white font-display font-bold text-sm px-5 py-2.5 rounded-2xl shadow-softer"
      >
        <RefreshCw size={16} />
        Kartu Baru
      </motion.button>
    </div>
  );
}
