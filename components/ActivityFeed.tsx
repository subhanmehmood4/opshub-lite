import { recentActivity } from "@/lib/demoData";

const TYPE_STYLES: Record<string, string> = {
  signup: "bg-emerald-500/10 text-emerald-400",
  churn: "bg-red-500/10 text-red-400",
  upgrade: "bg-sky-500/10 text-sky-400",
  milestone: "bg-amber-500/10 text-amber-400",
};

const TYPE_LABELS: Record<string, string> = {
  signup: "Signup",
  churn: "Churn",
  upgrade: "Upgrade",
  milestone: "Milestone",
};

export default function ActivityFeed() {
  return (
    <div className="glass-card flex h-full flex-col overflow-hidden shadow-soft">
      <div className="border-b border-slate-800 p-5">
        <h3 className="text-sm font-semibold text-white">Recent activity</h3>
        <p className="text-xs text-slate-500">Live events across your workspace</p>
      </div>

      <ul className="flex-1 divide-y divide-slate-800/80 overflow-y-auto scrollbar-thin">
        {recentActivity.map((item) => (
          <li key={item.id} className="px-5 py-4">
            <div className="flex items-start justify-between gap-3">
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2">
                  <span
                    className={`inline-flex rounded-full px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide ${
                      TYPE_STYLES[item.type]
                    }`}
                  >
                    {TYPE_LABELS[item.type]}
                  </span>
                  <span className="text-xs text-slate-500">{item.time}</span>
                </div>
                <p className="mt-1.5 text-sm font-medium text-white">{item.title}</p>
                <p className="mt-0.5 text-xs text-slate-400">{item.detail}</p>
              </div>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}
