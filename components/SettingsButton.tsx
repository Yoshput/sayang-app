"use client";

import { useState, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Settings, X, Camera, User, HeartHandshake, Sparkles, CalendarHeart } from "lucide-react";
import { useProfile } from "@/app/providers";
import IconBadge from "@/components/ui/IconBadge";

export default function SettingsButton() {
  const { profile, setProfile, resetProfile } = useProfile();
  const [open, setOpen] = useState(false);
  const myFileRef = useRef<HTMLInputElement>(null);
  const partnerFileRef = useRef<HTMLInputElement>(null);

  const isCouple = profile?.mode === "couple";
  const modeLabel = isCouple ? "Couple Mode" : "Single Mode";

  const handleAvatarUpload = (e: React.ChangeEvent<HTMLInputElement>, field: "myAvatar" | "partnerAvatar") => {
    const file = e.target.files?.[0];
    if (!file || !profile) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        const maxDim = 120;
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

      {/* Settings Toggle Trigger Button */}
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={() => setOpen((o) => !o)}
        className="p-2.5 rounded-2xl bg-white/80 backdrop-blur-xl border border-white/80 shadow-softer text-[#7A4A63] hover:text-[#503043] transition-colors"
      >
        <Settings size={15} />
      </motion.button>

      {/* Settings Apple Sheet Modal */}
      <AnimatePresence>
        {open && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setOpen(false)}
              className="fixed inset-0 bg-black/30 backdrop-blur-sm z-40"
            />
            <motion.div
              initial={{ opacity: 0, scale: 0.94, y: 15 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.94, y: 15 }}
              className="absolute right-0 top-12 z-50 w-72 bg-white/95 backdrop-blur-2xl rounded-3xl p-5 shadow-2xl border border-white/80 text-left"
            >
              <button
                onClick={() => setOpen(false)}
                className="absolute top-4 right-4 text-[#7A4A63]/60 hover:text-[#7A4A63]"
              >
                <X size={15} />
              </button>

              <div className="mb-3 flex items-center gap-2">
                <IconBadge icon={isCouple ? HeartHandshake : Sparkles} tint="blush" size="xs" rounded="md" />
                <div>
                  <p className="font-display font-bold text-sm text-[#503043]">
                    Pengaturan
                  </p>
                  <p className="text-[10px] text-[#7A4A63] font-display">
                    Mode aktif: <span className="font-bold text-blush-500">{modeLabel}</span>
                  </p>
                </div>
              </div>

              <div className="h-px bg-blush-100/70 mb-3" />

              {/* Profile Photo Uploader Section */}
              {profile && (
                <div className="space-y-2.5 mb-3.5">
                  <p className="text-[10px] font-display font-bold text-[#7A4A63] uppercase tracking-wider">
                    Foto Profil:
                  </p>

                  <div className="flex flex-col gap-2">
                    {/* User profile picture */}
                    <div className="flex items-center justify-between bg-blush-50/60 p-2.5 rounded-2xl border border-blush-100/60">
                      <div className="flex items-center gap-2">
                        {profile.myAvatar ? (
                          <img
                            src={profile.myAvatar}
                            alt="my avatar"
                            className="w-8 h-8 rounded-full object-cover border border-blush-200"
                          />
                        ) : (
                          <div className="w-8 h-8 rounded-full bg-blush-100 flex items-center justify-center text-[#503043]">
                            <User size={14} />
                          </div>
                        )}
                        <span className="text-xs font-display font-bold text-[#503043]">Foto Aku</span>
                      </div>
                      <button
                        onClick={() => myFileRef.current?.click()}
                        className="p-1.5 rounded-xl bg-white text-blush-500 shadow-softer hover:bg-blush-50 border border-blush-100"
                      >
                        <Camera size={12} />
                      </button>
                    </div>

                    {/* Partner profile picture (couple mode only) */}
                    {isCouple && (
                      <div className="flex items-center justify-between bg-lilac-50/60 p-2.5 rounded-2xl border border-lilac-100/60">
                        <div className="flex items-center gap-2">
                          {profile.partnerAvatar ? (
                            <img
                              src={profile.partnerAvatar}
                              alt="partner avatar"
                              className="w-8 h-8 rounded-full object-cover border border-lilac-200"
                            />
                          ) : (
                            <div className="w-8 h-8 rounded-full bg-lilac-100 flex items-center justify-center text-[#503043]">
                              <User size={14} />
                            </div>
                          )}
                          <span className="text-xs font-display font-bold text-[#503043]">
                            Foto {profile.herName ?? "Dia"}
                          </span>
                        </div>
                        <button
                          onClick={() => partnerFileRef.current?.click()}
                          className="p-1.5 rounded-xl bg-white text-lilac-500 shadow-softer hover:bg-lilac-50 border border-lilac-100"
                        >
                          <Camera size={12} />
                        </button>
                      </div>
                    )}
                  </div>

                  {/* Period Tracker Toggle - Single Mode only */}
                  {profile.mode === "single" && (
                    <div className="flex items-center justify-between bg-blush-50/60 p-2.5 rounded-2xl border border-blush-100/60 mt-2">
                      <div className="flex items-center gap-2">
                        <IconBadge icon={CalendarHeart} tint="rose" size="xs" rounded="md" />
                        <div>
                          <p className="text-xs font-display font-bold text-[#503043]">Pelacak Siklus</p>
                          <p className="text-[9px] text-[#7A4A63] font-display">Tampilkan di Home</p>
                        </div>
                      </div>
                      <button
                        onClick={() => setProfile({ ...profile, trackPeriod: !profile.trackPeriod })}
                        className={`relative w-9 h-5 rounded-full transition-all duration-300 ${
                          profile.trackPeriod ? "bg-gradient-to-r from-blush-400 to-lilac-400" : "bg-gray-200"
                        }`}
                      >
                        <span
                          className={`absolute top-0.5 w-4 h-4 bg-white rounded-full shadow transition-all duration-300 ${
                            profile.trackPeriod ? "left-4.5" : "left-0.5"
                          }`}
                        />
                      </button>
                    </div>
                  )}
                </div>
              )}

              <p className="text-[10px] text-[#7A4A63] leading-relaxed mb-3 font-medium">
                Reset profil akan menghapus data nama, foto, dan tanggal di perangkat ini.
              </p>

              <motion.button
                whileTap={{ scale: 0.96 }}
                onClick={resetProfile}
                className="w-full bg-gradient-to-r from-blush-400 to-lilac-400 text-white text-xs font-display font-bold py-2.5 rounded-2xl shadow-soft"
              >
                Reset &amp; Isi Ulang Profil
              </motion.button>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </div>
  );
}
