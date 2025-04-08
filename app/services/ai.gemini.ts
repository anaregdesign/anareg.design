import { gemini20FlashLite, googleAI } from "@genkit-ai/googleai";
import { genkit } from "genkit";

export const ai = genkit({
  plugins: [googleAI()],
  model: gemini20FlashLite,
});
