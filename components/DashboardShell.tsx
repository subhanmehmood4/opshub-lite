"use client";

import { useState } from "react";
import CopilotPanel from "@/components/CopilotPanel";
import DataTable from "@/components/DataTable";
import KpiGrid from "@/components/KpiCard";
import PlansChart from "@/components/PlansChart";
import RevenueChart from "@/components/RevenueChart";
import Sidebar from "@/components/Sidebar";
import Topbar from "@/components/Topbar";
import UsersChart from "@/components/UsersChart";

interface DashboardShellProps {
  userEmail?: string | null;
}

export default function DashboardShell({ userEmail }: DashboardShellProps) {
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [copilotOpen, setCopilotOpen] = useState(false);

  return (
    <div className="flex min-h-screen bg-slate-950">
      <Sidebar open={sidebarOpen} onClose={() => setSidebarOpen(false)} />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar
          title="Overview"
          userEmail={userEmail}
          copilotOpen={copilotOpen}
          onToggleCopilot={() => setCopilotOpen((open) => !open)}
          onMenuClick={() => setSidebarOpen(true)}
        />

        <main className="flex-1 space-y-6 p-4 sm:p-6 animate-fade-in">
          <KpiGrid />

          <div className="grid gap-6 xl:grid-cols-2">
            <RevenueChart />
            <UsersChart />
          </div>

          <div className="grid gap-6 xl:grid-cols-3">
            <div className="xl:col-span-2">
              <DataTable />
            </div>
            <PlansChart />
          </div>
        </main>
      </div>

      <CopilotPanel open={copilotOpen} onClose={() => setCopilotOpen(false)} />
    </div>
  );
}
