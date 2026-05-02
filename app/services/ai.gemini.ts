import { GoogleGenAI } from "@google/genai";

const googleApiKey =
  process.env.GEMINI_API_KEY ||
  process.env.GOOGLE_API_KEY ||
  process.env.GOOGLE_GENAI_API_KEY;

let ai: GoogleGenAI | undefined;

function getAi() {
  ai ??= googleApiKey
    ? new GoogleGenAI({ apiKey: googleApiKey })
    : new GoogleGenAI({});
  return ai;
}

export async function generateText({
  maxOutputTokens,
  prompt,
  system,
  temperature,
}: {
  maxOutputTokens: number;
  prompt: string;
  system: string;
  temperature: number;
}) {
  const response = await getAi().models.generateContent({
    model: "gemini-2.5-flash-lite",
    contents: prompt,
    config: {
      systemInstruction: system,
      temperature,
      maxOutputTokens,
    },
  });

  return response.text;
}
