"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { WORKSPACE_ENV, WORKSPACE_NAME } from "@/lib/constants";

interface SidebarProps {
  open: boolean;
  onClose: () => void;
}

const NAV_ITEMS = [
  { label: "Overview", href: "/dashboard" },
  { label: "Revenue", href: "/dashboard/revenue" },
  { label: "Users", href: "/dashboard/users" },
  { label: "Settings", href: "/dashboard/settings" },
];

function isActive(pathname: string, href: string) {
  if (href === "/dashboard") return pathname === "/dashboard";
  return pathname.startsWith(href);
}

export default function Sidebar({ open, onClose }: SidebarProps) {
  const pathname = usePathname();

  return (
    <>
      {open && (
        <button
          type="button"
          aria-label="Close sidebar"
          className="fixed inset-0 z-40 bg-black/60 lg:hidden"
          onClick={onClose}
        />
      )}

      <aside
        className={`fixed inset-y-0 left-0 z-50 flex w-64 flex-col border-r border-slate-800 bg-slate-950 transition-transform duration-300 lg:static lg:translate-x-0 ${
          open ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex h-16 items-center gap-3 border-b border-slate-800 px-6">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <span className="text-sm font-bold text-emerald-400">O</span>
          </div>
          <div>
            <p className="text-sm font-semibold text-white">OpsHub</p>
            <p className="text-xs text-slate-500">Analytics</p>
          </div>
        </div>

        <nav className="flex-1 space-y-1 p-4">
          {NAV_ITEMS.map((item) => {
            const active = isActive(pathname, item.href);
            return (
              <Link
                key={item.label}
                href={item.href}
                onClick={onClose}
                className={`flex items-center rounded-xl px-3 py-2.5 text-sm font-medium transition ${
                  active
                    ? "bg-emerald-500/10 text-emerald-400 ring-1 ring-emerald-500/20"
                    : "text-slate-400 hover:bg-slate-900 hover:text-slate-200"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        <div className="border-t border-slate-800 p-4">
          <p className="text-xs text-slate-500">
            {WORKSPACE_NAME} · {WORKSPACE_ENV}
          </p>
        </div>
      </aside>
    </>
  );
}
