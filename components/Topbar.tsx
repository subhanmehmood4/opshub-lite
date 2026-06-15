"use client";

import { useRouter } from "next/navigation";
import { DEFAULT_USER_NAME } from "@/lib/constants";
import { createClient } from "@/lib/supabase/client";

interface TopbarProps {
  title: string;
  userEmail?: string | null;
  copilotOpen: boolean;
  onToggleCopilot: () => void;
  onMenuClick: () => void;
}

const DATE_RANGES = ["Last 7 days", "Last 30 days", "Last 12 months"];

export default function Topbar({
  title,
  userEmail,
  copilotOpen,
  onToggleCopilot,
  onMenuClick,
}: TopbarProps) {
  const router = useRouter();

  async function handleSignOut() {
    const supabase = createClient();
    await supabase.auth.signOut();
    router.push("/");
    router.refresh();
  }

  const displayName = userEmail?.split("@")[0] ?? DEFAULT_USER_NAME;

  return (
    <header className="sticky top-0 z-30 flex h-16 items-center justify-between border-b border-slate-800 bg-slate-950/90 px-4 backdrop-blur-md sm:px-6">
      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={onMenuClick}
          className="rounded-lg p-2 text-slate-400 transition hover:bg-slate-900 hover:text-white lg:hidden"
          aria-label="Open menu"
        >
          <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
          </svg>
        </button>
        <div>
          <h1 className="text-lg font-semibold text-white">{title}</h1>
          <p className="hidden text-xs text-slate-500 sm:block">June 2026 snapshot</p>
        </div>
      </div>

      <div className="flex items-center gap-2 sm:gap-3">
        <select
          defaultValue="Last 12 months"
          aria-label="Date range"
          className="hidden rounded-xl border border-slate-800 bg-slate-900 px-3 py-2 text-xs text-slate-300 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 md:block"
        >
          {DATE_RANGES.map((range) => (
            <option key={range} value={range}>
              {range}
            </option>
          ))}
        </select>

        <button
          type="button"
          onClick={onToggleCopilot}
          className={`inline-flex items-center gap-2 rounded-xl px-3 py-2 text-sm font-medium transition ${
            copilotOpen
              ? "bg-emerald-500/15 text-emerald-400 ring-1 ring-emerald-500/30"
              : "bg-slate-900 text-slate-300 ring-1 ring-slate-800 hover:text-white"
          }`}
        >
          <span className="hidden sm:inline">AI Copilot</span>
          <span className="sm:hidden">Copilot</span>
          <span className="rounded-full bg-emerald-500 px-1.5 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-slate-950">
            New
          </span>
        </button>

        <div className="hidden items-center gap-2 rounded-xl bg-slate-900 px-3 py-2 ring-1 ring-slate-800 sm:flex">
          <span className="flex h-6 w-6 items-center justify-center rounded-full bg-emerald-500/20 text-[10px] font-semibold text-emerald-400">
            {displayName.charAt(0).toUpperCase()}
          </span>
          <span className="max-w-[140px] truncate text-xs text-slate-300">{displayName}</span>
        </div>

        <button
          type="button"
          onClick={handleSignOut}
          className="rounded-xl px-3 py-2 text-sm text-slate-400 transition hover:bg-slate-900 hover:text-white"
        >
          Sign out
        </button>
      </div>
    </header>
  );
}
