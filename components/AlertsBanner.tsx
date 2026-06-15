"use client";

import { useState } from "react";
import { alerts } from "@/lib/demoData";

const SEVERITY_STYLES = {
  info: "border-sky-500/30 bg-sky-500/10 text-sky-200",
  warning: "border-amber-500/30 bg-amber-500/10 text-amber-200",
  success: "border-emerald-500/30 bg-emerald-500/10 text-emerald-200",
};

export default function AlertsBanner() {
  const [dismissed, setDismissed] = useState<string[]>([]);

  const visible = alerts.filter((alert) => !dismissed.includes(alert.id));
  const primary = visible[0];

  if (!primary) return null;

  return (
    <div
      className={`flex items-start justify-between gap-4 border-b px-4 py-3 sm:px-6 ${SEVERITY_STYLES[primary.severity]}`}
    >
      <div className="min-w-0">
        <p className="text-sm font-semibold">{primary.title}</p>
        <p className="mt-0.5 text-xs opacity-90">{primary.message}</p>
      </div>
      <button
        type="button"
        onClick={() => setDismissed((prev) => [...prev, primary.id])}
        className="shrink-0 rounded-lg px-2 py-1 text-xs opacity-70 transition hover:opacity-100"
        aria-label="Dismiss alert"
      >
        Dismiss
      </button>
    </div>
  );
}
