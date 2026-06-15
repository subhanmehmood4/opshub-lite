import { formatCurrency, formatPercent, metrics } from "@/lib/demoData";

interface KpiCardProps {
  label: string;
  value: string;
  changePct: number;
  changeLabel?: string;
}

function KpiCard({ label, value, changePct, changeLabel = "vs last month" }: KpiCardProps) {
  const isPositive = changePct >= 0;
  const isChurn = label.toLowerCase().includes("churn");
  const isGood = isChurn ? !isPositive : isPositive;

  return (
    <div className="glass-card p-5 shadow-soft transition hover:border-slate-700/80">
      <p className="text-sm font-medium text-slate-400">{label}</p>
      <p className="mt-2 text-3xl font-semibold tracking-tight text-white">{value}</p>
      <div className="mt-3 flex items-center gap-2">
        <span
          className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${
            isGood
              ? "bg-emerald-500/10 text-emerald-400"
              : "bg-red-500/10 text-red-400"
          }`}
        >
          {isPositive ? "+" : ""}
          {formatPercent(changePct)}
        </span>
        <span className="text-xs text-slate-500">{changeLabel}</span>
      </div>
    </div>
  );
}

export default function KpiGrid({ focus = "all" }: { focus?: "all" | "revenue" | "users" }) {
  const cards = {
    mrr: (
      <KpiCard label="MRR" value={formatCurrency(metrics.mrr)} changePct={metrics.mrrChangePct} />
    ),
    users: (
      <KpiCard
        label="Active Users"
        value={metrics.activeUsers.toLocaleString()}
        changePct={metrics.usersChangePct}
      />
    ),
    churn: (
      <KpiCard
        label="Churn Rate"
        value={formatPercent(metrics.churnPct)}
        changePct={metrics.churnChangePct}
      />
    ),
    arpu: (
      <KpiCard
        label="Avg Revenue / User"
        value={formatCurrency(metrics.avgRevenuePerUser)}
        changePct={metrics.arpuChangePct}
      />
    ),
  };

  const visible =
    focus === "revenue"
      ? [cards.mrr, cards.arpu]
      : focus === "users"
        ? [cards.users, cards.churn]
        : [cards.mrr, cards.users, cards.churn, cards.arpu];

  return (
    <div className={`grid gap-4 sm:grid-cols-2 ${focus === "all" ? "xl:grid-cols-4" : "xl:grid-cols-2"}`}>
      {visible}
    </div>
  );
}
