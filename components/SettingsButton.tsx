"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X } from "lucide-react";
import { useProfile } from "@/app/providers";

export default function SettingsButton() {
  const { resetProfile } = useProfile();
  const [open, setOpen] = useState(false);

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
              className="absolute right-0 mt-2 w-56 bg-white rounded-3xl shadow-soft border border-blush-100 p-4 z-40"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-3 right-3 text-lilac-300"
              >
                <X size={14} />
              </button>
              <p className="font-display font-bold text-sm text-[#7A4A63] pr-4">
                Ganti profil?
              </p>
              <p className="text-[11px] text-lilac-500 mt-1 leading-relaxed">
                Ini bakal hapus nama, tanggal jadian & ulang tahun yang udah diisi di HP ini.
              </p>
              <motion.button
                whileTap={{ scale: 0.95 }}
                onClick={resetProfile}
                className="mt-3 w-full bg-blush-400 text-white text-xs font-display font-bold py-2 rounded-2xl"
              >
                Ya, Isi Ulang
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
