"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, Send, Bot, ChevronDown } from "lucide-react";
import { useProfile } from "@/app/providers";

interface Message {
  role: "user" | "assistant";
  content: string;
}

interface AcabotChatProps {
  onClose: () => void;
}

const QUICK_PROMPTS_COUPLE = [
  "Ide date yang seru minggu ini apa?",
  "Kalau mau makan tapi beda selera, gimana?",
  "Kasih aku kata-kata buat bikin dia senyum 💗",
  "Gimana cara komunikasi yang lebih baik?",
];

const QUICK_PROMPTS_SINGLE = [
  "Aku lagi overthinking, tolong tenangkan aku",
  "Ide me-time yang seru buat hari ini?",
  "Kasih aku quotes penyemangat dong 🌸",
  "Aku lagi sedih, bisa cerita ga?",
];

export default function AcabotChat({ onClose }: AcabotChatProps) {
  const { profile } = useProfile();
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isCouple = profile?.mode === "couple";
  const botName = isCouple ? "Sayang-bot" : "Acabot";
  const botEmoji = isCouple ? "💑" : "🤖";
  const quickPrompts = isCouple ? QUICK_PROMPTS_COUPLE : QUICK_PROMPTS_SINGLE;

  // Greeting message on open
  useEffect(() => {
    const greeting = isCouple
      ? `Haii ${profile?.myName ?? ""}! Aku Sayang-bot 💑 Butuh bantuan soal kalian berdua? Mau ide date, mediasi debat kecil, atau apapun — aku siap! 🌹`
      : `Haii ${profile?.myName ?? ""}! Aku Acabot 🌸 Bestie virtual kamu yang selalu ada. Lagi gimana hari ini? Cerita aja ya, aku dengerin! 💗`;

    setMessages([{ role: "assistant", content: greeting }]);
  }, [isCouple, profile?.myName]);

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
          messages: newMessages,
          mode: profile?.mode ?? "single",
          myName: profile?.myName ?? "Kamu",
          partnerName: profile?.herName ?? "",
        }),
      });
      const data = await res.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.reply }]);
    } catch {
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Aduh aku error bentar 😅 Coba lagi ya!" },
      ]);
    } finally {
      setIsTyping(false);
    }
  };

  return (
    <motion.div
      initial={{ y: "100%", opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      exit={{ y: "100%", opacity: 0 }}
      transition={{ type: "spring", stiffness: 320, damping: 32 }}
      className="absolute inset-0 z-50 flex flex-col"
      style={{
        background: isCouple
          ? "linear-gradient(160deg, #FFF2F9 0%, #F6EEFF 60%, #EBF9F1 100%)"
          : "linear-gradient(160deg, #FFF7F0 0%, #FFF0FF 50%, #F6EEFF 100%)",
      }}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-5 pt-5 pb-3 border-b border-white/50">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-2xl flex items-center justify-center text-xl shadow-softer"
            style={{ background: isCouple ? "#FFD1E8" : "#FFE0FF" }}
          >
            {botEmoji}
          </div>
          <div>
            <p className="font-display font-bold text-sm text-[#7A4A63]">{botName}</p>
            <div className="flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse" />
              <p className="text-[10px] text-lilac-400 font-display">Online • AI powered ✨</p>
            </div>
          </div>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={onClose}
          className="w-8 h-8 rounded-full bg-white/70 backdrop-blur flex items-center justify-center shadow-softer"
        >
          <ChevronDown size={18} className="text-lilac-400" />
        </motion.button>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto no-scrollbar px-4 py-4 space-y-3">
        {messages.map((msg, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.2 }}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            {msg.role === "assistant" && (
              <div className="w-7 h-7 rounded-xl bg-blush-100 flex items-center justify-center text-sm mr-2 shrink-0 mt-1">
                {botEmoji}
              </div>
            )}
            <div
              className={`max-w-[78%] px-4 py-2.5 rounded-3xl text-xs font-display leading-relaxed shadow-softer ${
                msg.role === "user"
                  ? "bg-gradient-to-br from-blush-400 to-lilac-400 text-white rounded-br-sm"
                  : "bg-white/80 backdrop-blur text-[#7A4A63] rounded-bl-sm border border-white/60"
              }`}
            >
              {msg.content}
            </div>
          </motion.div>
        ))}

        {/* Typing indicator */}
        {isTyping && (
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-end gap-2"
          >
            <div className="w-7 h-7 rounded-xl bg-blush-100 flex items-center justify-center text-sm shrink-0">
              {botEmoji}
            </div>
            <div className="bg-white/80 backdrop-blur border border-white/60 rounded-3xl rounded-bl-sm px-4 py-3 flex gap-1 shadow-softer">
              {[0, 1, 2].map((i) => (
                <span
                  key={i}
                  className="w-1.5 h-1.5 rounded-full bg-blush-400 typing-dot inline-block"
                  style={{ animationDelay: `${i * 0.2}s` }}
                />
              ))}
            </div>
          </motion.div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {/* Quick prompts */}
      {messages.length <= 1 && (
        <div className="px-4 pb-2">
          <div className="flex gap-2 overflow-x-auto no-scrollbar pb-1">
            {quickPrompts.map((p) => (
              <motion.button
                key={p}
                whileTap={{ scale: 0.95 }}
                onClick={() => sendMessage(p)}
                className="shrink-0 text-[10px] font-display font-bold px-3 py-1.5 rounded-full bg-white/70 border border-blush-200 text-[#7A4A63] shadow-softer"
              >
                {p}
              </motion.button>
            ))}
          </div>
        </div>
      )}

      {/* Input bar */}
      <div className="px-4 pb-5 pt-2">
        <div className="flex items-center gap-2 bg-white/80 backdrop-blur rounded-3xl border border-white/60 shadow-softer px-3 py-2">
          <input
            ref={inputRef}
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && sendMessage(input)}
            placeholder={isCouple ? "Tanya Sayang-bot..." : "Cerita ke Acabot..."}
            className="flex-1 bg-transparent outline-none text-xs font-display text-[#7A4A63] placeholder:text-lilac-300"
          />
          <motion.button
            whileTap={{ scale: 0.9 }}
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isTyping}
            className="w-8 h-8 rounded-2xl bg-gradient-to-br from-blush-400 to-lilac-400 flex items-center justify-center disabled:opacity-40 shadow-soft"
          >
            <Send size={14} className="text-white" />
          </motion.button>
        </div>
      </div>
    </motion.div>
  );
}
