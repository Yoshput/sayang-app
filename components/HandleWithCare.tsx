"use client";

import { motion, AnimatePresence } from "framer-motion";
import { Heart, Sparkles, Headphones, ShoppingBag, MessageCircle, Moon, ShieldCheck } from "lucide-react";
import { CARE_OPTIONS } from "@/lib/data";
import IconBadge from "@/components/ui/IconBadge";

const ICON_MAP: Record<string, React.ElementType> = {
  hug: Heart,
  listen: Headphones,
  space: ShoppingBag,
  distract: MessageCircle,
  quiet: Moon,
  reassure: ShieldCheck,
};

export default function HandleWithCare({
  selected,
  onSelect,
}: {
  selected: string | null;
  onSelect: (key: string) => void;
}) {
  const active = CARE_OPTIONS.find((c) => c.key === selected);

  return (
    <div className="px-4 sm:px-5 pt-5 pb-3">
      <div className="flex items-center gap-2.5 mb-1">
        <IconBadge icon={Heart} tint="rose" size="sm" rounded="xl" />
        <div>
          <p className="font-display font-bold text-[#503043] text-base">
            Handle With Care
          </p>
          <p className="text-xs text-[#7A4A63]">
            Beri tahu pasangan perlakuan apa yang paling kamu butuhkan hari ini
          </p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-2.5 mt-3.5">
        {CARE_OPTIONS.map((opt, i) => {
          const isActive = selected === opt.key;
          const IconComp = ICON_MAP[opt.key] || Heart;

          return (
            <motion.button
              key={opt.key}
              onClick={() => onSelect(opt.key)}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: i * 0.04 }}
              whileTap={{ scale: 0.94 }}
              whileHover={{ y: -2 }}
              className={`text-left rounded-3xl p-3.5 border transition-all duration-200 flex items-start gap-2.5 ${
                isActive
                  ? "bg-white border-blush-300 shadow-soft scale-[1.02]"
                  : "bg-white/70 border-white/80 hover:bg-white"
              }`}
            >
              <IconBadge
                icon={IconComp}
                tint={isActive ? "rose" : "blush"}
                size="sm"
                rounded="xl"
              />
              <div className="min-w-0">
                <p className="font-display font-semibold text-xs text-[#503043] leading-snug">
                  {opt.label}
                </p>
              </div>
            </motion.button>
          );
        })}
      </div>

      <AnimatePresence mode="wait">
        {active && (
          <motion.div
            key={active.key}
            initial={{ opacity: 0, y: 10, height: 0 }}
            animate={{ opacity: 1, y: 0, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            className="mt-3.5 bg-mint-50 border border-mint-200/80 rounded-2xl p-3.5 overflow-hidden"
          >
            <p className="text-xs text-[#3D6B54] leading-relaxed font-medium">
              {active.desc}
            </p>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
