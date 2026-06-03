import express from "express";
import path from "path";
import dotenv from "dotenv";
import { GoogleGenAI } from "@google/genai";
import { createServer as createViteServer } from "vite";

dotenv.config();

const app = express();
const PORT = 3000;

app.use(express.json());

// Initialize Gemini Client
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    }
  }
});

// Category descriptions & Prompt Engineering Instructions
const getSystemInstruction = (lang: string) => {
  if (lang === "bn") {
    return `আপনি একজন বিশ্বমানের প্রম্পট ইঞ্জিনিয়ার বা প্রম্পট অপটিমাইজার। আপনার কাজ হলো ব্যবহারকারীর টপিক, ক্যাটাগরি এবং টোনের উপর ভিত্তি করে অন্যান্য এআই (যেমন ChatGPT, Gemini বা Claude) এর জন্য একটি অত্যন্ত শক্তিশালী, আকর্ষণীয় এবং প্রফেশনাল প্রম্পট তৈরি করা।
প্রম্পটটি অবশ্যই সুন্দর স্ট্রাকচারড (ভূমিকা, এআই-এর ভূমিকা যেমন 'Act as...', সুনির্দিষ্ট নির্দেশনা, সীমাবদ্ধতা, এবং আউটপুট ফরম্যাট) হতে হবে।

প্রম্পটটি সম্পূর্ণরূপে বাংলায় তৈরি করুন (প্রয়োজনে টেকনিক্যাল টার্ম ইংরেজি রাখতে পারেন, তবে মূল ভাষা বাংলা হবে)।
অপ্রয়োজনীয় কথা বা কোনো অতিরিক্ত ব্যাখ্যার প্রয়োজন নেই। সরাসরি ব্যবহার করার জন্য প্রস্তুত প্রম্পটটি দিন যাতে ব্যবহারকারী সহজে কপি করতে পারেন।`;
  } else {
    return `You are a world-class Prompt Engineer and Prompt Optimizer. Your task is to craft an incredibly powerful, detailed, and professional AI prompt based on the user's topic, category, target tool, and tone.
The output prompt must follow advanced prompt engineering patterns (e.g., Role/Persona 'Act as...', Context, Detailed Steps, Constraints, Tone, and Output Format).

The output prompt must be written entirely in English.
Do not include conversational conversational introductions or extra meta-explanations. Just output the optimized prompt itself in a beautifully structured, ready-to-copy markdown style.`;
  }
};

app.post("/api/prompt/generate", async (req, res) => {
  try {
    const { topic, category, language, tool, tone } = req.body;

    if (!topic || !category) {
      return res.status(400).json({ error: "Topic and Category are required." });
    }

    const lang = language === "bn" ? "bn" : "en";
    const selectedTone = tone || "Professional";
    const selectedTool = tool || "General Prompt Generator";

    const promptText = lang === "bn" 
      ? `ক্যাটাগরি: ${category}
টুল/টাইপ: ${selectedTool}
টপিক বা বিবরণ: ${topic}
টোন: ${selectedTone}

উপরের বিবরণের জন্য একটি অসাধারণ, বিস্তারিত এবং অত্যন্ত কার্যকর প্রম্পট তৈরি করুন যাতে এআই টপিকটিকে নির্ভুলভাবে সম্পন্ন করতে পারে।`
      : `Category: ${category}
Tool/Type: ${selectedTool}
Topic or Description: ${topic}
Tone: ${selectedTone}

Generate a masterfully engineered, comprehensive, and highly effective prompt for this request so that other LLMs (like ChatGPT, Gemini, or Claude) can accomplish it perfectly.`;

    const systemInstruction = getSystemInstruction(lang);

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: promptText,
      config: {
        systemInstruction: systemInstruction,
        temperature: 0.7,
      },
    });

    const generatedPrompt = response.text || "";
    res.json({ prompt: generatedPrompt });
  } catch (err: any) {
    console.error("Gemini Generation Error:", err);
    res.status(500).json({ error: err.message || "Failed to generate prompt" });
  }
});

// Configure Vite or Static Assets serving
async function setupMiddlewares() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }
}

setupMiddlewares().then(() => {
  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on port ${PORT}`);
  });
});
