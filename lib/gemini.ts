import { ChatGoogleGenerativeAI } from "@langchain/google-genai";

export const GEMINI_CONFIG = {
  apiKey: process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY,
  model: "gemini-flash-latest",
};

export async function generateWithGemini(prompt: string) {
  // Refresh config to ensure env vars are loaded
  const apiKey = process.env.GEMINI_API_KEY || process.env.GOOGLE_API_KEY;
  
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY or GOOGLE_API_KEY is not set in environment variables");
  }

  try {
    const model = new ChatGoogleGenerativeAI({
      model: GEMINI_CONFIG.model,
      apiKey: apiKey,
      maxOutputTokens: 2048,
    });

    // Invoke the model with the prompt
    const response = await model.invoke(prompt);
    
    return response.content;
  } catch (error) {
    console.error("Gemini Error:", error);
    throw error;
  }
}
