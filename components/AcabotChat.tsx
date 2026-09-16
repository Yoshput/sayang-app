"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, ChevronDown, Sparkles, Heart } from "lucide-react";
import { useProfile } from "@/app/providers";
import IconBadge from "@/components/ui/IconBadge";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AcabotChatProps {
  onClose: () => void;
}

const QUICK_PROMPTS_COUPLE = [
  "Ide date yang seru minggu ini apa?",
  "Kalau mau makan tapi beda selera, solusinya gimana?",
  "Kasih kata-kata manis penyemangat buat dia",
  "Gimana cara komunikasi yang lebih hangat dan terbuka?",
];

const QUICK_PROMPTS_SINGLE = [
  "Aku lagi overthinking, tolong tenangkan pikiranku",
  "Rekomendasi me-time yang bikin relaks hari ini",
  "Beri aku motivasi untuk terus berkembang",
  "Aku merasa lelah dan butuh ruang bercerita",
];

export default function AcabotChat({ onClose }: AcabotChatProps) {
  const { profile } = useProfile();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isCouple = profile?.mode === "couple";
  const botName = isCouple ? "Sayang AI" : "Acabot AI";
  const quickPrompts = isCouple ? QUICK_PROMPTS_COUPLE : QUICK_PROMPTS_SINGLE;

  useEffect(() => {
    const greeting = isCouple
      ? `Halo ${profile?.myName ?? ""}! Aku ${botName}, asisten pendamping hubungan kalian. Mau cari ide kencan, cara mengungkapkan perasaan, atau tips komunikasi harmonis? Ceritakan padaku.`
      : `Halo ${profile?.myName ?? ""}! Aku ${botName}, teman self-care virtualmu. Bagaimana harimu? Apapun yang sedang kamu rasakan, aku di sini siap mendengarkan.`;

    setMessages([{ role: "assistant", content: greeting }]);
  }, [isCouple, profile?.myName, botName]);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, isTyping]);

  const sendMessage = async (text: string) => {
    if (!text.trim() || isTyping) return;

    const userMessage: Message = { role: "user", content: text.trim() };
    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInput("");
    setIsTyping(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: newMessages.map((m) => ({ role: m.role, content: m.content })),
          profile,
        }),
      });

      if (!res.ok) throw new Error("Gagal menghubungi server");

      const data = await res.json();
      setMessages([...newMessages, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages([
        ...newMessages,
        {
          role: "assistant",
          content: "Koneksi sedang sedikit terhambat. Silakan coba kirim kembali pesanmu ya.",
        },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <div className="flex flex-col h-full bg-[#FFF8FB]">
      {/* iOS App Header */}
      <div className="flex items-center justify-between px-5 py-3.5 bg-white/85 backdrop-blur-xl border-b border-blush-100/80 shrink-0">
        <div className="flex items-center gap-2.5">
          <IconBadge icon={isCouple ? Heart : Bot} tint="rose" size="sm" rounded="xl" />
          <div>
            <p className="font-display font-bold text-xs text-[#503043]">{botName}</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-[10px] text-emerald-600 font-medium">Aktif • Gemini 2.5</span>
            </div>
          </div>
        </div>

        <button
          onClick={onClose}
          className="p-1.5 rounded-full text-[#7A4A63] hover:bg-blush-50 transition-colors"
        >
          <X size={17} />
        </button>
      </div>

      {/* Messages Scroll Area */}
      <div className="flex-1 overflow-y-auto no-scrollbar p-4 space-y-3">
        {messages.map((m, i) => (
          <div
            key={i}
            className={`flex ${m.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-[82%] px-4 py-2.5 rounded-2xl text-xs font-display leading-relaxed shadow-softer ${
                m.role === "user"
                  ? "bg-gradient-to-r from-blush-400 to-lilac-400 text-white rounded-br-none"
                  : "bg-white border border-blush-100/70 text-[#503043] rounded-bl-none"
              }`}
            >
              {m.content}
            </div>
          </div>
        ))}

        {isTyping && (
          <div className="flex justify-start">
            <div className="bg-white border border-blush-100 px-4 py-2.5 rounded-2xl rounded-bl-none shadow-softer flex gap-1 items-center">
              <span className="w-1.5 h-1.5 rounded-full bg-blush-400 animate-bounce" />
              <span className="w-1.5 h-1.5 rounded-full bg-blush-400 animate-bounce [animation-delay:0.15s]" />
              <span className="w-1.5 h-1.5 rounded-full bg-blush-400 animate-bounce [animation-delay:0.3s]" />
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick Prompts */}
      <div className="px-4 py-1.5 flex gap-1.5 overflow-x-auto no-scrollbar shrink-0">
        {quickPrompts.map((q) => (
          <button
            key={q}
            onClick={() => sendMessage(q)}
            className="text-[10px] font-display font-medium text-[#7A4A63] bg-white/80 border border-blush-100 px-3 py-1 rounded-xl whitespace-nowrap hover:bg-blush-50 transition-all shadow-softer"
          >
            {q}
          </button>
        ))}
      </div>

      {/* Input Field */}
      <div className="p-3 bg-white/90 backdrop-blur-xl border-t border-blush-100/70 shrink-0">
        <form
          onSubmit={(e) => {
            e.preventDefault();
            sendMessage(input);
          }}
          className="flex items-center gap-2"
        >
          <input
            ref={inputRef}
            type="text"
            placeholder="Ketik pesanmu di sini..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            className="flex-1 px-4 py-2.5 rounded-2xl bg-blush-50/60 border border-blush-100 text-xs font-display text-[#503043] focus:border-blush-300 outline-none"
          />
          <motion.button
            type="submit"
            whileTap={{ scale: 0.92 }}
            disabled={!input.trim() || isTyping}
            className="p-2.5 rounded-2xl bg-gradient-to-r from-blush-400 to-lilac-400 text-white shadow-soft disabled:opacity-50"
          >
            <Send size={15} />
          </motion.button>
        </form>
      </div>
    </div>
  );
}
