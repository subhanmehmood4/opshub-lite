"use client";

import { useMemo, useState } from "react";
import { customers, formatCurrency, type Customer } from "@/lib/demoData";

type SortKey = keyof Pick<Customer, "name" | "plan" | "status" | "mrr" | "joined">;
type SortDir = "asc" | "desc";

const STATUS_STYLES: Record<Customer["status"], string> = {
  active: "bg-emerald-500/10 text-emerald-400",
  trial: "bg-sky-500/10 text-sky-400",
  churned: "bg-red-500/10 text-red-400",
};

export default function CustomersTable() {
  const [filter, setFilter] = useState("");
  const [sortKey, setSortKey] = useState<SortKey>("name");
  const [sortDir, setSortDir] = useState<SortDir>("asc");

  const rows = useMemo(() => {
    const filtered = customers.filter((row) =>
      row.name.toLowerCase().includes(filter.toLowerCase()) ||
      row.plan.toLowerCase().includes(filter.toLowerCase())
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
          <h3 className="text-sm font-semibold text-white">Customers</h3>
          <p className="text-xs text-slate-500">{customers.length} accounts · sorted by activity</p>
        </div>
        <input
          type="search"
          placeholder="Search customers..."
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
                <button type="button" onClick={() => toggleSort("name")} className="hover:text-white">
                  Customer{sortIndicator("name")}
                </button>
              </th>
              <th className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("plan")} className="hover:text-white">
                  Plan{sortIndicator("plan")}
                </button>
              </th>
              <th className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("status")} className="hover:text-white">
                  Status{sortIndicator("status")}
                </button>
              </th>
              <th className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("mrr")} className="hover:text-white">
                  MRR{sortIndicator("mrr")}
                </button>
              </th>
              <th className="px-5 py-3">
                <button type="button" onClick={() => toggleSort("joined")} className="hover:text-white">
                  Joined{sortIndicator("joined")}
                </button>
              </th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.id} className="border-t border-slate-800/80 text-slate-300">
                <td className="px-5 py-3 font-medium text-white">{row.name}</td>
                <td className="px-5 py-3">{row.plan}</td>
                <td className="px-5 py-3">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-xs font-medium capitalize ${STATUS_STYLES[row.status]}`}
                  >
                    {row.status}
                  </span>
                </td>
                <td className="px-5 py-3">{row.mrr > 0 ? formatCurrency(row.mrr) : "—"}</td>
                <td className="px-5 py-3">{row.joined}</td>
              </tr>
            ))}
            {rows.length === 0 && (
              <tr>
                <td colSpan={5} className="px-5 py-8 text-center text-slate-500">
                  No customers match your search.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
