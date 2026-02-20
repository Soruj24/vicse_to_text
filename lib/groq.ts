import Groq from "groq-sdk";

export async function generateWithGroq(prompt: string) {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not set in environment variables");
  }
  const client = new Groq({ apiKey });
  const completion = await client.chat.completions.create({
    model: "llama-3.3-70b-versatile",
    messages: [{ role: "user", content: prompt }],
    temperature: 0.3,
    max_tokens: 2048,
  });
  const text =
    completion.choices?.[0]?.message?.content?.trim() ?? "";
  return text;
}
