"use client";

import { usePathname } from "next/navigation";
import { useState } from "react";
import CopilotPanel from "@/components/CopilotPanel";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";

const PAGE_TITLES: Record<string, string> = {
  "/dashboard": "Overview",
  "/dashboard/revenue": "Revenue",
  "/dashboard/users": "Users",
  "/dashboard/settings": "Settings",
};

interface DashboardShellProps {
  userEmail?: string | null;
  children: React.ReactNode;
}

export default function DashboardShell({ userEmail, children }: DashboardShellProps) {
  const pathname = usePathname();
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

  const title = PAGE_TITLES[pathname] ?? "Dashboard";

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title={title}
          userEmail={userEmail}
          copilotOpen={copilotOpen}
          onToggleCopilot={() => setCopilotOpen((open) => !open)}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 space-y-6 p-4 sm:p-6 animate-fade-in">{children}</main>
      </div>

      <CopilotPanel open={copilotOpen} onClose={() => setCopilotOpen(false)} />
    </div>
  );
}
