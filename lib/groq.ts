import OpenAI from "openai";
import { CHAT_MODEL, GROQ_BASE_URL } from "./constants";
import { getMetricsJson } from "./demoData";

const SYSTEM_PROMPT = `You are the OpsHub analytics copilot. You answer questions about the SaaS metrics provided as JSON. Be concise and specific, use real numbers from the data, and format money and percentages clearly. If a question is outside the data, say you only have access to the dashboard metrics. Never invent numbers not present in the data.`;

function getClient() {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) {
    throw new Error("GROQ_API_KEY is not configured");
  }

  return new OpenAI({
    apiKey,
    baseURL: GROQ_BASE_URL,
  });
}

export async function askCopilot(question: string): Promise<string> {
  const client = getClient();
  const metricsJson = getMetricsJson();

  const response = await client.chat.completions.create({
    model: CHAT_MODEL,
    temperature: 0.2,
    messages: [
      { role: "system", content: SYSTEM_PROMPT },
      {
        role: "user",
        content: `Here is the current dashboard data as JSON:\n${metricsJson}\n\nQuestion: ${question}`,
      },
    ],
  });

  const answer = response.choices[0]?.message?.content?.trim();
  if (!answer) {
    throw new Error("No response from the copilot");
  }

  return answer;
}
