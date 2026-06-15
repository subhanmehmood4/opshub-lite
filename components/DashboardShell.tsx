"use client";

import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import AlertsBanner from "@/components/AlertsBanner";
import CopilotPanel from "@/components/CopilotPanel";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/revenue": "Revenue",
  "/dashboard/users": "Users",
  "/dashboard/settings": "Settings",
};

const COPILOT_TOOLTIP_KEY = "opshub-copilot-tooltip-seen";

interface DashboardShellProps {
  userEmail?: string | null;
  children: React.ReactNode;
}

export default function DashboardShell({ userEmail, children }: DashboardShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(false);

  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  useEffect(() => {
    try {
      const seen = localStorage.getItem(COPILOT_TOOLTIP_KEY);
      if (!seen) setShowTooltip(true);
    } catch {
      setShowTooltip(false);
    }
  }, []);

  function dismissTooltip() {
    setShowTooltip(false);
    try {
      localStorage.setItem(COPILOT_TOOLTIP_KEY, "1");
    } catch {
      // ignore
    }
  }

  function openCopilot() {
    dismissTooltip();
    setCopilotOpen(true);
  }

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="relative flex min-w-0 flex-1 flex-col">
        <Topbar
          title={title}
          userEmail={userEmail}
          copilotOpen={copilotOpen}
          onToggleCopilot={() => {
            if (copilotOpen) {
              setCopilotOpen(false);
            } else {
              openCopilot();
            }
          }}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <AlertsBanner />

        {showTooltip && !copilotOpen && (
          <div className="absolute right-4 top-[4.5rem] z-20 max-w-xs rounded-2xl border border-emerald-500/30 bg-slate-900 p-4 shadow-glow sm:right-6">
            <p className="text-xs font-semibold uppercase tracking-wide text-emerald-400">New · Phase 2</p>
            <p className="mt-2 text-sm text-white">
              AI Copilot answers questions about your metrics — try &ldquo;What&apos;s our churn this month?&rdquo;
            </p>
            <div className="mt-3 flex gap-2">
              <button
                type="button"
                onClick={openCopilot}
                className="rounded-lg bg-emerald-500 px-3 py-1.5 text-xs font-semibold text-slate-950 transition hover:bg-emerald-400"
              >
                Try it
              </button>
              <button
                type="button"
                onClick={dismissTooltip}
                className="rounded-lg px-3 py-1.5 text-xs text-slate-400 transition hover:text-white"
              >
                Dismiss
              </button>
            </div>
          </div>
        )}

        <main className="flex-1 space-y-6 p-4 sm:p-6 animate-fade-in">{children}</main>
      </div>

      <CopilotPanel open={copilotOpen} onClose={() => setCopilotOpen(false)} />
    </div>
  );
}
