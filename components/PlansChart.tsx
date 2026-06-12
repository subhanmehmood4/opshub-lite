"use client";

import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
} from "recharts";
import { metrics } from "@/lib/demoData";

const COLORS = ["#34d399", "#38bdf8", "#a78bfa"];

export default function PlansChart() {
  return (
    <div className="glass-card p-5 shadow-soft">
      <div className="mb-4">
        <h3 className="text-sm font-semibold text-white">Plan breakdown</h3>
        <p className="text-xs text-slate-500">MRR by subscription tier</p>
      </div>
      <div className="h-64 w-full">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={metrics.plans}
              dataKey="mrr"
              nameKey="name"
              cx="50%"
              cy="50%"
              innerRadius={55}
              outerRadius={85}
              paddingAngle={3}
            >
              {metrics.plans.map((_, index) => (
                <Cell key={metrics.plans[index].name} fill={COLORS[index % COLORS.length]} />
              ))}
            </Pie>
            <Tooltip
              contentStyle={{
                backgroundColor: "#0f172a",
                border: "1px solid #334155",
                borderRadius: "12px",
                color: "#f8fafc",
              }}
              formatter={(value, _name, item) => {
                const mrr = typeof value === "number" ? value : 0;
                const name = item && "payload" in item && item.payload?.name ? String(item.payload.name) : "Plan";
                return [`$${mrr.toLocaleString()} MRR`, name];
              }}
            />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="mt-2 flex flex-wrap justify-center gap-4">
        {metrics.plans.map((plan, index) => (
          <div key={plan.name} className="flex items-center gap-2 text-xs text-slate-400">
            <span
              className="h-2.5 w-2.5 rounded-full"
              style={{ backgroundColor: COLORS[index] }}
            />
            {plan.name} ({plan.customers})
          </div>
        ))}
      </div>
    </div>
  );
}
