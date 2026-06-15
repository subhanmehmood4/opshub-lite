import { getMissingEnvVars } from "@/lib/env";
import { askCopilot } from "@/lib/google";
import { checkRateLimit, getClientIp } from "@/lib/rate-limit";
import { NextResponse } from "next/server";

export const runtime = "nodejs";
export const maxDuration = 30;

interface CopilotRequestBody {
  question?: string;
}

export async function POST(request: Request) {
  try {
    const missing = getMissingEnvVars();
    if (missing.length > 0) {
      return NextResponse.json(
        {
          error: `Server not configured. Add ${missing.join(", ")} to .env.local and restart the dev server.`,
        },
        { status: 503 }
      );
    }

    const ip = getClientIp(request);
    const rate = checkRateLimit(ip);
    if (!rate.ok) {
      return NextResponse.json(
        { error: `Too many requests. Try again in ${rate.retryAfter}s.` },
        { status: 429 }
      );
    }

    const body = (await request.json()) as CopilotRequestBody;
    const question = body.question?.trim();

    if (!question) {
      return NextResponse.json({ error: "Question is required." }, { status: 400 });
    }

    if (question.length > 500) {
      return NextResponse.json(
        { error: "Question is too long (max 500 characters)." },
        { status: 400 }
      );
    }

    const answer = await askCopilot(question);
    return NextResponse.json({ answer });
  } catch (error) {
    console.error("Copilot error:", error);
    const message = error instanceof Error ? error.message : "Failed to generate answer.";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
