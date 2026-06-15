"use client";

interface SettingsPanelProps {
  userEmail?: string | null;
}

const NOTIFICATIONS = [
  { label: "Weekly revenue digest", description: "Summary every Monday at 9:00 AM", enabled: true },
  { label: "Churn alerts", description: "Notify when churn exceeds 4%", enabled: true },
  { label: "New signup alerts", description: "Real-time alerts for new customers", enabled: false },
];

export default function SettingsPanel({ userEmail }: SettingsPanelProps) {
  return (
    <div className="mx-auto max-w-2xl space-y-6">
      <div className="glass-card p-6 shadow-soft">
        <h2 className="text-sm font-semibold text-white">Profile</h2>
        <p className="mt-1 text-xs text-slate-500">Demo account — read-only in this preview</p>

        <div className="mt-5 space-y-4">
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Email</label>
            <input
              readOnly
              value={userEmail ?? "demo@opshub.dev"}
              className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2.5 text-sm text-slate-300"
            />
          </div>
          <div>
            <label className="mb-1.5 block text-xs font-medium text-slate-400">Workspace</label>
            <input
              readOnly
              value="OpsHub Demo"
              className="w-full rounded-xl border border-slate-800 bg-slate-900/50 px-3 py-2.5 text-sm text-slate-300"
            />
          </div>
        </div>
      </div>

      <div className="glass-card p-6 shadow-soft">
        <h2 className="text-sm font-semibold text-white">Notifications</h2>
        <p className="mt-1 text-xs text-slate-500">Visual preview — toggles are disabled in demo mode</p>

        <ul className="mt-5 divide-y divide-slate-800">
          {NOTIFICATIONS.map((item) => (
            <li key={item.label} className="flex items-center justify-between gap-4 py-4 first:pt-0 last:pb-0">
              <div>
                <p className="text-sm font-medium text-slate-200">{item.label}</p>
                <p className="text-xs text-slate-500">{item.description}</p>
              </div>
              <button
                type="button"
                disabled
                aria-pressed={item.enabled}
                className={`relative h-6 w-11 shrink-0 rounded-full transition ${
                  item.enabled ? "bg-emerald-500/80" : "bg-slate-700"
                } cursor-not-allowed opacity-70`}
              >
                <span
                  className={`absolute top-0.5 h-5 w-5 rounded-full bg-white transition ${
                    item.enabled ? "left-5" : "left-0.5"
                  }`}
                />
              </button>
            </li>
          ))}
        </ul>
      </div>

      <div className="rounded-2xl border border-amber-500/20 bg-amber-500/5 px-4 py-3 text-sm text-amber-200/90">
        This is a live demo environment. Settings are shown for product preview only and are not saved.
      </div>
    </div>
  );
}
