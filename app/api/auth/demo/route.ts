import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";
import { NextResponse } from "next/server";
import { getDemoCredentials } from "@/lib/env";

export async function POST() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
  const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

  if (!url || !anonKey) {
    return NextResponse.json(
      {
        error:
          "Supabase is not configured. Add NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY in Vercel (or .env.local).",
      },
      { status: 503 }
    );
  }

  const cookieStore = await cookies();
  let response = NextResponse.json({ ok: true });

  const supabase = createServerClient(url, anonKey, {
    cookies: {
      getAll() {
        return cookieStore.getAll();
      },
      setAll(cookiesToSet) {
        cookiesToSet.forEach(({ name, value, options }) =>
          cookieStore.set(name, value, options)
        );
        response = NextResponse.json({ ok: true });
        cookiesToSet.forEach(({ name, value, options }) =>
          response.cookies.set(name, value, options)
        );
      },
    },
  });

  const credentials = getDemoCredentials();

  if (credentials) {
    const { error } = await supabase.auth.signInWithPassword(credentials);
    if (error) {
      return NextResponse.json({ error: error.message }, { status: 401 });
    }
    return response;
  }

  const { error } = await supabase.auth.signInAnonymously();
  if (error) {
    return NextResponse.json(
      {
        error:
          "Anonymous demo login failed. Enable Anonymous sign-in in Supabase (Authentication → Providers), or set DEMO_EMAIL and DEMO_PASSWORD.",
      },
      { status: 401 }
    );
  }

  return response;
}
