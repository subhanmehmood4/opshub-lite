import { GoogleGenerativeAI } from "@google/generative-ai";
import { CHAT_MODEL } from "./constants";
import { getMetricsJson } from "./demoData";

const SYSTEM_PROMPT = `You are the OpsHub analytics copilot. You answer questions about the SaaS metrics provided as JSON. Be concise and specific, use real numbers from the data, and format money and percentages clearly. If a question is outside the data, say you only have access to the dashboard metrics. Never invent numbers not present in the data.`;

function getClient() {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) {
    throw new Error("GEMINI_API_KEY is not configured");
  }
  return new GoogleGenerativeAI(apiKey);
}

export async function askCopilot(question: string): Promise<string> {
  const genAI = getClient();
  const metricsJson = getMetricsJson();

  const model = genAI.getGenerativeModel({
    model: CHAT_MODEL,
    systemInstruction: SYSTEM_PROMPT,
    generationConfig: { temperature: 0.2 },
  });

  const result = await model.generateContent(
    `Here is the current dashboard data as JSON:\n${metricsJson}\n\nQuestion: ${question}`
  );

  const answer = result.response.text()?.trim();
  if (!answer) {
    throw new Error("No response from the copilot");
  }

  return answer;
}
