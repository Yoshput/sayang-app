"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Camera, User } from "lucide-react";
import { useProfile } from "@/app/providers";

export default function SettingsButton() {
  const { profile, setProfile, resetProfile } = useProfile();
  const [open, setOpen] = useState(false);
  const myFileRef = useRef<HTMLInputElement>(null);
  const partnerFileRef = useRef<HTMLInputElement>(null);

  const modeLabel = profile?.mode === "couple" ? "💑 Couple Mode" : "🌸 Single Mode";

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "myAvatar" | "partnerAvatar") => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxDim = 120; // 120x120 is plenty for avatar bubble!
        let w = img.width;
        let h = img.height;
        if (w > h) {
          w = (w / h) * maxDim;
          h = maxDim;
        } else {
          h = (h / w) * maxDim;
          w = maxDim;
        }
        canvas.width = w;
        canvas.height = h;
        ctx?.drawImage(img, 0, 0, w, h);
        const compressedBase64 = canvas.toDataURL("image/jpeg", 0.7);
        setProfile({ ...profile, [field]: compressedBase64 });
      };
      img.src = event.target?.result as string;
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className="absolute top-4 right-4 z-20">
      {/* Hidden inputs */}
      <input
        type="file"
        ref={myFileRef}
        onChange={(e) => handleAvatarUpload(e, "myAvatar")}
        accept="image/*"
        className="hidden"
      />
      <input
        type="file"
        ref={partnerFileRef}
        onChange={(e) => handleAvatarUpload(e, "partnerAvatar")}
        accept="image/*"
        className="hidden"
      />

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
              className="absolute right-0 mt-2 w-64 bg-white/95 backdrop-blur-xl rounded-3xl shadow-soft border border-blush-100 p-4 z-40 max-h-[80vh] overflow-y-auto no-scrollbar"
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

              {/* Profile Photo Uploader Section */}
              {profile && (
                <div className="space-y-3 mb-4">
                  <p className="text-[10px] font-display font-bold text-lilac-500 uppercase tracking-wider">
                    Foto Profil:
                  </p>
                  
                  <div className="flex flex-col gap-2.5">
                    {/* User profile picture */}
                    <div className="flex items-center justify-between bg-blush-50/50 p-2 rounded-2xl border border-blush-100/50">
                      <div className="flex items-center gap-2">
                        {profile.myAvatar ? (
                          <img
                            src={profile.myAvatar}
                            alt="my avatar"
                            className="w-8 h-8 rounded-full object-cover border border-blush-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center text-[#7A4A63]">
                            <User size={14} />
                          </div>
                        )}
                        <span className="text-[11px] font-display font-bold text-[#7A4A63]">Foto Aku</span>
                      </div>
                      <button
                        onClick={() => myFileRef.current?.click()}
                        className="p-1.5 rounded-xl bg-white text-blush-400 shadow-softer hover:bg-blush-50 border border-blush-100"
                      >
                        <Camera size={12} />
                      </button>
                    </div>

                    {/* Partner profile picture (couple mode only) */}
                    {profile.mode === "couple" && (
                      <div className="flex items-center justify-between bg-lilac-50/50 p-2 rounded-2xl border border-lilac-100/50">
                        <div className="flex items-center gap-2">
                          {profile.partnerAvatar ? (
                            <img
                              src={profile.partnerAvatar}
                              alt="partner avatar"
                              className="w-8 h-8 rounded-full object-cover border border-lilac-200"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-lilac-100 flex items-center justify-center text-[#7A4A63]">
                              <User size={14} />
                            </div>
                          )}
                          <span className="text-[11px] font-display font-bold text-[#7A4A63]">
                            Foto {profile.herName ?? "Dia"}
                          </span>
                        </div>
                        <button
                          onClick={() => partnerFileRef.current?.click()}
                          className="p-1.5 rounded-xl bg-white text-lilac-400 shadow-softer hover:bg-lilac-50 border border-lilac-100"
                        >
                          <Camera size={12} />
                        </button>
                      </div>
                    )}
                  </div>
                  <div className="h-px bg-blush-100" />

                  {/* Period Tracker Toggle - Single Mode only */}
                  {profile.mode === "single" && (
                    <div className="flex items-center justify-between bg-pink-50/50 p-2.5 rounded-2xl border border-pink-100/50">
                      <div>
                        <p className="text-[11px] font-display font-bold text-[#7A4A63]">🌙 Pelacak Siklus Haid</p>
                        <p className="text-[9px] text-lilac-400 font-display mt-0.5">Aktifkan di tab Home</p>
                      </div>
                      <button
                        onClick={() => setProfile({ ...profile, trackPeriod: !profile.trackPeriod })}
                        className={`relative w-10 h-5 rounded-full transition-all duration-300 ${
                          profile.trackPeriod ? "bg-gradient-to-r from-blush-400 to-lilac-400" : "bg-gray-200"
                        }`}
                      >
                        <span className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                          profile.trackPeriod ? "left-5.5" : "left-0.5"
                        }`} />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[10px] text-lilac-500 leading-relaxed mb-3 font-medium">
                Reset profil akan menghapus semua data yang tersimpan di perangkat ini, termasuk mode, nama, foto, dan tanggal.
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
