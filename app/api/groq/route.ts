import { NextResponse } from "next/server";
import { generateWithGroq } from "@/lib/groq";

export async function POST(req: Request) {
  try {
    const { prompt } = await req.json();
    if (!prompt) {
      return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
    }
    const result = await generateWithGroq(prompt);
    return NextResponse.json({ result });
  } catch (error: unknown) {
    console.error("GROQ API Error:", error);
    const message =
      error instanceof Error ? error.message : "Failed to generate response";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
