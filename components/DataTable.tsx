"use client";

import { useMemo, useState } from "react";
import { metrics, type MonthlyMetric } from "@/lib/demoData";

type SortKey = keyof MonthlyMetric;
type SortDir = "asc" | "desc";

export default function DataTable() {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("month");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const rows = useMemo(() => {
    const filtered = metrics.monthly.filter((row) =>
      row.month.toLowerCase().includes(filter.toLowerCase())
    );

    return [...filtered].sort((a, b) => {
      const aVal = a[sortKey];
      const bVal = b[sortKey];
      if (typeof aVal === "string" && typeof bVal === "string") {
        return sortDir === "asc" ? aVal.localeCompare(bVal) : bVal.localeCompare(aVal);
      }
      return sortDir === "asc"
        ? (aVal as number) - (bVal as number)
        : (bVal as number) - (aVal as number);
    });
  }, [filter, sortKey, sortDir]);

  function toggleSort(key: SortKey) {
    if (sortKey === key) {
      setSortDir((dir) => (dir === "asc" ? "desc" : "asc"));
    } else {
      setSortKey(key);
      setSortDir("asc");
    }
  }

  function sortIndicator(key: SortKey) {
    if (sortKey !== key) return "";
    return sortDir === "asc" ? " ↑" : " ↓";
  }

  return (
    <div className="glass-card overflow-hidden shadow-soft">
      <div className="flex flex-col gap-3 border-b border-slate-800 p-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <h3 className="text-sm font-semibold text-white">Monthly breakdown</h3>
          <p className="text-xs text-slate-500">Sort and filter performance by month</p>
        </div>
        <input
          type="search"
          placeholder="Filter by month..."
          value={filter}
          onChange={(e) => setFilter(e.target.value)}
          className="w-full rounded-xl border border-slate-700 bg-slate-950 px-3 py-2 text-sm text-white placeholder:text-slate-500 focus:border-emerald-500/50 focus:outline-none focus:ring-2 focus:ring-emerald-500/20 sm:w-56"
        />
      </div>

      <div className="overflow-x-auto">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-slate-900/80 text-xs uppercase tracking-wide text-slate-400">
            <tr>
              <th className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("month")} className="hover:text-white">
                  Month{sortIndicator("month")}
                </button>
              </th>
              <th className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("revenue")} className="hover:text-white">
                  Revenue{sortIndicator("revenue")}
                </button>
              </th>
              <th className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("users")} className="hover:text-white">
                  Users{sortIndicator("users")}
                </button>
              </th>
              <th className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("churn")} className="hover:text-white">
                  Churn %{sortIndicator("churn")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.month} className="border-t border-slate-800/80 text-slate-300">
                <td className="px-5 py-3 font-medium text-white">{row.month}</td>
                <td className="px-5 py-3">${row.revenue.toLocaleString()}</td>
                <td className="px-5 py-3">{row.users.toLocaleString()}</td>
                <td className="px-5 py-3">{row.churn.toFixed(1)}%</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={4} className="px-5 py-8 text-center text-slate-500">
                  No rows match your filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
