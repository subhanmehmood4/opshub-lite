"use client";

import {
  Bar,
  BarChart,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from "recharts";
import { metrics } from "@/lib/demoData";

export default function UsersChart() {
  return (
    <div className="glass-card p-5 shadow-soft">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">Active users</h3>
        <p className="text-xs text-slate-500">Monthly active user count</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={metrics.monthly} margin={{ top: 8, right: 8, left: 0, bottom: 0 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#1e293b" vertical={false} />
            <XAxis dataKey="month" stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <YAxis stroke="#64748b" fontSize={12} tickLine={false} axisLine={false} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
              formatter={(value) => [
                typeof value === "number" ? value.toLocaleString() : String(value),
                "Users",
              ]}
            />
            <Bar dataKey="users" fill="#38bdf8" radius={[6, 6, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
