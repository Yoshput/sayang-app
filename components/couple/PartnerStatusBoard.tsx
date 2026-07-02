"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown } from "lucide-react";
import { PARTNER_STATUSES } from "@/lib/data";
import { useProfile } from "@/app/providers";

const STORAGE_KEY = "partner:status";

export default function PartnerStatusBoard() {
  const { profile } = useProfile();
  const [myStatus, setMyStatus] = useState<string | null>(null);
  const [partnerStatus, setPartnerStatus] = useState<string | null>(null);
  const [showMyPicker, setShowMyPicker] = useState(false);
  const [showPartnerPicker, setShowPartnerPicker] = useState(false);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        setMyStatus(parsed.my ?? null);
        setPartnerStatus(parsed.partner ?? null);
      }
    } catch {}
  }, []);

  const saveStatus = (my: string | null, partner: string | null) => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify({ my, partner }));
  };

  const selectMy = (key: string) => {
    setMyStatus(key);
    saveStatus(key, partnerStatus);
    setShowMyPicker(false);
  };

  const selectPartner = (key: string) => {
    setPartnerStatus(key);
    saveStatus(myStatus, key);
    setShowPartnerPicker(false);
  };

  const myStatusData = PARTNER_STATUSES.find((s) => s.key === myStatus);
  const partnerStatusData = PARTNER_STATUSES.find((s) => s.key === partnerStatus);

  const StatusCard = ({
    label,
    statusData,
    onClick,
    name,
  }: {
    label: string;
    statusData: (typeof PARTNER_STATUSES)[number] | undefined;
    onClick: () => void;
    name: string;
  }) => (
    <motion.button
      whileTap={{ scale: 0.97 }}
      onClick={onClick}
      className="flex-1 bg-white/60 backdrop-blur-md rounded-3xl p-4 border border-white/60 shadow-softer text-left relative overflow-hidden min-h-[110px] flex flex-col justify-between"
      style={statusData ? { background: statusData.bg + "cc" } : {}}
    >
      {statusData && (
        <div
          className="absolute -right-6 -bottom-6 w-20 h-20 rounded-full blur-2xl opacity-40"
          style={{ background: statusData.color }}
        />
      )}
      <div>
        <p className="text-[10px] font-display font-bold text-[#8A5C74] uppercase tracking-wide">
          {label}
        </p>
        <p className="text-xs font-display font-bold text-[#7A4A63] mt-0.5 truncate">{name}</p>
      </div>
      <div>
        {statusData ? (
          <div>
            <p className="text-2xl mb-1">{statusData.emoji}</p>
            <p className="text-[11px] font-display font-bold text-[#7A4A63] leading-tight">
              {statusData.label}
            </p>
          </div>
        ) : (
          <div className="flex items-center gap-1 text-lilac-300">
            <p className="text-xs font-display font-semibold">Set status</p>
            <ChevronDown size={12} />
          </div>
        )}
      </div>
    </motion.button>
  );

  const StatusPicker = ({
    title,
    onSelect,
    onClose,
  }: {
    title: string;
    onSelect: (key: string) => void;
    onClose: () => void;
  }) => (
    <>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="fixed inset-0 bg-black/20 z-40"
      />
      <motion.div
        initial={{ opacity: 0, y: 40 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 40 }}
        className="fixed bottom-0 left-0 right-0 z-50 bg-white rounded-t-3xl p-6 shadow-soft max-w-[420px] mx-auto"
      >
        <p className="font-display font-bold text-sm text-[#7A4A63] mb-4">{title}</p>
        <div className="grid grid-cols-2 gap-2 max-h-64 overflow-y-auto no-scrollbar">
          {PARTNER_STATUSES.map((s) => (
            <motion.button
              key={s.key}
              whileTap={{ scale: 0.95 }}
              onClick={() => onSelect(s.key)}
              className="flex items-center gap-2 p-3 rounded-2xl border text-left"
              style={{ background: s.bg, borderColor: s.color + "44" }}
            >
              <span className="text-xl">{s.emoji}</span>
              <span className="text-[11px] font-display font-bold text-[#7A4A63] leading-tight">
                {s.label}
              </span>
            </motion.button>
          ))}
        </div>
      </motion.div>
    </>
  );

  return (
    <div className="mx-5 mt-5">
      <div className="mb-2">
        <p className="font-display font-bold text-sm text-[#7A4A63]">Status Kalian 📡</p>
        <p className="text-[10px] text-lilac-400 font-display">Biar tau kondisi masing-masing</p>
      </div>

      <div className="flex gap-3">
        <StatusCard
          label="Status kamu"
          statusData={myStatusData}
          onClick={() => setShowMyPicker(true)}
          name={profile?.myName ?? "Kamu"}
        />
        <StatusCard
          label="Status dia"
          statusData={partnerStatusData}
          onClick={() => setShowPartnerPicker(true)}
          name={profile?.herName ?? "Dia"}
        />
      </div>

      <AnimatePresence>
        {showMyPicker && (
          <StatusPicker
            title={`Status ${profile?.myName ?? "kamu"} lagi...`}
            onSelect={selectMy}
            onClose={() => setShowMyPicker(false)}
          />
        )}
        {showPartnerPicker && (
          <StatusPicker
            title={`Status ${profile?.herName ?? "dia"} lagi...`}
            onSelect={selectPartner}
            onClose={() => setShowPartnerPicker(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}
