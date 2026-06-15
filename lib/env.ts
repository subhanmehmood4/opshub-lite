export function getMissingEnvVars(): string[] {
  const missing: string[] = [];
  if (!process.env.GROQ_API_KEY) missing.push("GROQ_API_KEY");
  if (!process.env.NEXT_PUBLIC_SUPABASE_URL) missing.push("NEXT_PUBLIC_SUPABASE_URL");
  if (!process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY) missing.push("NEXT_PUBLIC_SUPABASE_ANON_KEY");
  return missing;
}

export function isFullyConfigured(): boolean {
  return getMissingEnvVars().length === 0;
}

export function getDemoCredentials(): { email: string; password: string } | null {
  const email = process.env.DEMO_EMAIL;
  const password = process.env.DEMO_PASSWORD;
  if (!email || !password) return null;
  return { email, password };
}
