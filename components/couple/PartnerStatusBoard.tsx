"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { ChevronDown, HeartHandshake, Smile, X } from "lucide-react";
import { PARTNER_STATUSES } from "@/lib/data";
import { useProfile } from "@/app/providers";
import IconBadge from "@/components/ui/IconBadge";

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
      className="flex-1 bg-white/75 backdrop-blur-xl rounded-3xl p-4 border border-white/80 shadow-[0_8px_30px_rgba(0,0,0,0.03)] text-left relative overflow-hidden min-h-[115px] flex flex-col justify-between transition-all"
    >
      <div>
        <p className="text-[10px] font-display font-bold text-blush-500 uppercase tracking-wider">
          {label}
        </p>
        <p className="text-xs font-display font-bold text-[#503043] mt-0.5 truncate">{name}</p>
      </div>

      <div className="mt-2 flex items-center justify-between">
        {statusData ? (
          <div className="flex items-center gap-2">
            <IconBadge icon={statusData.iconName} tint="blush" size="sm" rounded="xl" />
            <div>
              <p className="font-display font-bold text-xs text-[#503043] leading-tight">
                {statusData.label}
              </p>
              <span className="text-[9px] text-[#7A4A63] font-medium">Klik ubah</span>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-2 text-[#7A4A63]/60">
            <div className="w-8 h-8 rounded-xl bg-white/60 border border-white flex items-center justify-center">
              <ChevronDown size={14} />
            </div>
            <span className="text-[11px] font-display font-medium">Pilih status...</span>
          </div>
        )}
      </div>
    </motion.button>
  );

  return (
    <div className="mx-4 sm:mx-5 mt-4">
      {/* Title */}
      <div className="flex items-center gap-2 mb-2.5">
        <IconBadge icon={HeartHandshake} tint="blush" size="xs" rounded="md" />
        <p className="text-[11px] font-display font-bold text-[#7A4A63] uppercase tracking-wider">
          Status Pasangan Realtime
        </p>
      </div>

      {/* Cards */}
      <div className="flex gap-3">
        <StatusCard
          label="Status Aku"
          name={profile?.myName ?? "Kamu"}
          statusData={myStatusData}
          onClick={() => setShowMyPicker(true)}
        />
        <StatusCard
          label={`Status ${profile?.herName ?? "Dia"}`}
          name={profile?.herName ?? "Dia"}
          statusData={partnerStatusData}
          onClick={() => setShowPartnerPicker(true)}
        />
      </div>

      {/* Picker Modal (My Status) */}
      <AnimatePresence>
        {showMyPicker && (
          <PickerModal
            title="Update Status Kamu"
            current={myStatus}
            onSelect={selectMy}
            onClose={() => setShowMyPicker(false)}
          />
        )}
      </AnimatePresence>

      {/* Picker Modal (Partner Status) */}
      <AnimatePresence>
        {showPartnerPicker && (
          <PickerModal
            title={`Update Status ${profile?.herName ?? "Dia"}`}
            current={partnerStatus}
            onSelect={selectPartner}
            onClose={() => setShowPartnerPicker(false)}
          />
        )}
      </AnimatePresence>
    </div>
  );
}

function PickerModal({
  title,
  current,
  onSelect,
  onClose,
}: {
  title: string;
  current: string | null;
  onSelect: (key: string) => void;
  onClose: () => void;
}) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/30 backdrop-blur-md">
      <motion.div
        initial={{ opacity: 0, scale: 0.94 }}
        animate={{ opacity: 1, scale: 1 }}
        exit={{ opacity: 0, scale: 0.94 }}
        className="w-full max-w-sm bg-white/95 backdrop-blur-2xl rounded-3xl p-5 border border-white/80 shadow-2xl"
      >
        <div className="flex items-center justify-between mb-4">
          <p className="font-display font-bold text-sm text-[#503043]">{title}</p>
          <button
            onClick={onClose}
            className="p-1 rounded-full text-[#7A4A63] hover:bg-blush-50"
          >
            <X size={16} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-2">
          {PARTNER_STATUSES.map((s) => {
            const isSelected = current === s.key;
            return (
              <motion.button
                key={s.key}
                whileTap={{ scale: 0.95 }}
                onClick={() => onSelect(s.key)}
                className={`flex items-center gap-2 p-2.5 rounded-2xl border text-left transition-all ${
                  isSelected
                    ? "bg-blush-50 border-blush-300 shadow-softer"
                    : "bg-white/70 border-white/60 hover:bg-white"
                }`}
              >
                <IconBadge icon={s.iconName} tint="blush" size="xs" rounded="lg" />
                <span className="font-display font-semibold text-[11px] text-[#503043] truncate">
                  {s.label}
                </span>
              </motion.button>
            );
          })}
        </div>
      </motion.div>
    </div>
  );
}
