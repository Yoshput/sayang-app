"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import { useProfile } from "@/app/providers";

export default function SettingsButton() {
  const { profile, resetProfile } = useProfile();
  const [open, setOpen] = useState(false);

  const modeLabel = profile?.mode === "couple" ? "💑 Couple Mode" : "🌸 Single Mode";

  return (
    <div className="absolute top-4 right-4 z-20">
      <motion.button
        whileTap={{ scale: 0.9, rotate: 40 }}
        onClick={() => setOpen(true)}
        className="w-8 h-8 rounded-full bg-white/70 backdrop-blur flex items-center justify-center shadow-softer"
      >
        <Settings size={15} className="text-lilac-400" />
      </motion.button>

      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/20 z-30"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: -8 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: -8 }}
              className="absolute right-0 mt-2 w-60 bg-white/95 backdrop-blur-xl rounded-3xl shadow-soft border border-blush-100 p-4 z-40"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-lilac-300"
              >
                <X size={14} />
              </button>
              <div className="mb-3">
                <p className="font-display font-bold text-sm text-[#7A4A63]">
                  Pengaturan
                </p>
                <p className="text-[10px] text-lilac-400 font-display mt-0.5">
                  Mode aktif: <span className="font-bold">{modeLabel}</span>
                </p>
              </div>
              <div className="h-px bg-blush-100 mb-3" />
              <p className="text-[11px] text-lilac-500 leading-relaxed mb-3">
                Reset profil akan menghapus semua data yang tersimpan di perangkat ini, termasuk mode, nama, dan tanggal.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={resetProfile}
                className="w-full bg-gradient-to-r from-blush-400 to-lilac-400 text-white text-xs font-display font-bold py-2.5 rounded-2xl shadow-soft"
              >
                Reset & Isi Ulang Profil
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
