import Link from "next/link";

const STEPS = [
  {
    step: "1",
    title: "Connect your data",
    description: "Pull revenue, users, and churn from billing, product, and support tools into one workspace.",
  },
  {
    step: "2",
    title: "See live metrics",
    description: "KPI cards, trend charts, and sortable tables — no more reconciling spreadsheets every Monday.",
  },
  {
    step: "3",
    title: "Ask in plain English",
    description: "Phase 2 AI Copilot answers ad-hoc questions about your metrics without exporting to Excel.",
  },
];

const USE_CASES = [
  {
    title: "Ops manager weekly report",
    description: "Replace twelve spreadsheet tabs with one dashboard. Automated digests land in Slack every Monday.",
  },
  {
    title: "Founder board prep",
    description: "MRR, churn, and plan mix in one view — ready for investor updates without a data analyst.",
  },
  {
    title: "CS churn review",
    description: "Spot churn spikes early, drill into plan breakdown, and ask the copilot what changed this month.",
  },
];

export default function HomePage() {
  return (
    <div className="min-h-screen bg-slate-950">
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-32 top-0 h-96 w-96 rounded-full bg-emerald-500/10 blur-3xl" />
        <div className="absolute bottom-0 right-0 h-80 w-80 rounded-full bg-sky-500/10 blur-3xl" />
      </div>

      <header className="relative mx-auto flex max-w-6xl items-center justify-between px-4 py-6 sm:px-6">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-emerald-500/15 ring-1 ring-emerald-500/30">
            <span className="font-bold text-emerald-400">O</span>
          </div>
          <span className="text-lg font-semibold text-white">OpsHub</span>
        </div>
        <Link
          href="/login"
          className="rounded-xl bg-emerald-500 px-4 py-2 text-sm font-medium text-slate-950 transition hover:bg-emerald-400"
        >
          Sign in
        </Link>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20">
        <section className="mx-auto max-w-3xl text-center animate-slide-up">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
            Trusted by 50+ ops teams
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Stop reconciling ops data
            <span className="block text-emerald-400">in spreadsheets.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            Unified analytics for operations teams — revenue, users, churn, and plan mix
            in one dashboard. Ask questions in plain English with the AI copilot.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="w-full rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 sm:w-auto"
            >
              Get started
            </Link>
            <Link
              href="/login"
              className="w-full rounded-xl border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white sm:w-auto"
            >
              View dashboard
            </Link>
          </div>
        </section>

        <section className="mt-20 grid gap-4 sm:grid-cols-3">
          {STEPS.map((item) => (
            <div key={item.step} className="glass-card p-6 shadow-soft">
              <span className="inline-flex h-7 w-7 items-center justify-center rounded-full bg-emerald-500/15 text-xs font-semibold text-emerald-400 ring-1 ring-emerald-500/25">
                {item.step}
              </span>
              <h3 className="mt-4 text-sm font-semibold text-white">{item.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16">
          <h2 className="text-center text-sm font-semibold uppercase tracking-widest text-slate-500">
            Built for real ops workflows
          </h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-3">
            {USE_CASES.map((item) => (
              <div key={item.title} className="glass-card p-6 shadow-soft">
                <h3 className="text-sm font-semibold text-white">{item.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{item.description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-16 glass-card overflow-hidden shadow-card">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="border-b border-slate-800 p-6 lg:border-b-0 lg:border-r">
              <p className="text-xs uppercase tracking-wide text-slate-500">Live MRR</p>
              <p className="mt-2 text-3xl font-semibold text-white">$18,450</p>
              <p className="mt-1 text-sm text-emerald-400">+12.4% vs last month</p>
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500">AI Copilot · Phase 2</p>
              <p className="mt-2 text-sm italic text-slate-300">
                &ldquo;Which month had the highest revenue?&rdquo;
              </p>
              <p className="mt-3 text-sm text-slate-400">
                June — $18,450, with 1,240 active users and 3.2% churn.
              </p>
            </div>
          </div>
        </section>
      </main>

      <footer className="relative border-t border-slate-800 py-8 text-center">
        <p className="text-xs text-slate-500">
          &copy; OpsHub · Engineered by{" "}
          <a
            href="https://devaxon.com"
            target="_blank"
            rel="noopener noreferrer"
            className="font-medium text-slate-400 transition hover:text-emerald-400"
          >
            DevAxon
          </a>
        </p>
      </footer>
    </div>
  );
}
