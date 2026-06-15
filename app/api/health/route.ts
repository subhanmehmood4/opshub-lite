import { isFullyConfigured } from "@/lib/env";
import { NextResponse } from "next/server";

export async function GET() {
  const ready = isFullyConfigured();

  return NextResponse.json({
    ready,
    message: ready
      ? "OpsHub is configured and ready."
      : "Add Groq and Supabase keys to .env.local to enable all features.",
  });
}
