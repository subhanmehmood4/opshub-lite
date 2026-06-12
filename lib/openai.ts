import OpenAI from "openai";
import { getMetricsJson } from "./demoData";

const SYSTEM_PROMPT = `You are the OpsHub analytics copilot. You answer questions about the SaaS metrics provided as JSON. Be concise and specific, use real numbers from the data, and format money and percentages clearly. If a question is outside the data, say you only have access to the dashboard metrics. Never invent numbers not present in the data.`;

let client: OpenAI | null = null;

function getOpenAI(): OpenAI {
  if (client) return client;

  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) {
    throw new Error("OPENAI_API_KEY is not configured");
  }

  client = new OpenAI({ apiKey });
  return client;
}

export async function askCopilot(question: string): Promise<string> {
  const openai = getOpenAI();
  const metricsJson = getMetricsJson();

  const response = await openai.chat.completions.create({
    model: "gpt-4o-mini",
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
