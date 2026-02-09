export const OLLAMA_CONFIG = {
  baseUrl: process.env.OLLAMA_BASE_URL || "http://127.0.0.1:11434",
  model: "llama3.2:latest",
};

export async function generateWithOllama(prompt: string) {
  try {
    const response = await fetch(`${OLLAMA_CONFIG.baseUrl}/api/generate`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: OLLAMA_CONFIG.model,
        prompt: prompt,
        stream: false,
      }),
    });

    if (!response.ok) {
      throw new Error(`Ollama API error: ${response.statusText}`);
    }

    const data = await response.json();
    return data.response;
  } catch (error) {
    console.error("Ollama Error:", error);
    throw error;
  }
}
