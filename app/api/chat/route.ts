import { NextRequest, NextResponse } from "next/server";
import { GoogleGenerativeAI } from "@google/generative-ai";

const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY ?? "");

export async function POST(req: NextRequest) {
  try {
    const { messages, mode, myName, partnerName } = await req.json();

    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    // Build a system persona based on mode
    const systemPrompt =
      mode === "couple"
        ? `Kamu adalah Sayang-bot — asisten AI yang lucu, hangat, dan supportif untuk pasangan. Kamu membantu ${myName} dan ${partnerName || "pasangannya"} dalam hubungan mereka. Kamu bisa:
- Bantu cari ide date yang romantis dan seru
- Jadi mediator netral dan lucu kalau ada debat kecil (misalnya mau makan apa)
- Kasih saran komunikasi yang hangat
- Reminder anniversary, ultah, dan momen penting
- Selalu pakai bahasa Indonesia yang santai, gaul, dan penuh emoji 💗

Jawab dengan singkat tapi bermakna. Pakai emoji banyak. Jangan terlalu formal!`
        : `Kamu adalah Acabot — asisten AI self-care yang suportif, ceria, dan penuh kasih sayang untuk ${myName}. Kamu adalah teman virtual yang selalu ada. Kamu bisa:
- Ingetin minum air, makan, istirahat, dan aktivitas sehat
- Kasih quotes penyemangat yang relatable dan tidak klise
- Dengerin curhatan dan berikan respons yang empati
- Bantu brainstorm ide me-time yang menyenangkan
- Motivasi positif tanpa toxic positivity
- Selalu pakai bahasa Indonesia santai dan gaul ✨

Jawab singkat, hangat, dan pakai banyak emoji! Kamu adalah bestie virtual ${myName} 🌸`;

    // Build chat history for the model
    const chat = model.startChat({
      history: [
        {
          role: "user",
          parts: [{ text: systemPrompt }],
        },
        {
          role: "model",
          parts: [{ text: "Siap! Aku siap jadi temanmu yang paling supportif 💗✨" }],
        },
        ...messages.slice(0, -1).map((m: { role: string; content: string }) => ({
          role: m.role === "user" ? "user" : "model",
          parts: [{ text: m.content }],
        })),
      ],
    });

    const lastMessage = messages[messages.length - 1];
    const result = await chat.sendMessage(lastMessage.content);
    const text = result.response.text();

    return NextResponse.json({ reply: text });
  } catch (error) {
    console.error("Gemini API error:", error);
    return NextResponse.json(
      { reply: "Aduh, aku lagi ga bisa mikir sekarang 😅 Coba lagi bentar ya!" },
      { status: 200 }
    );
  }
}
