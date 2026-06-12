import Link from "next/link";

const FEATURES = [
  {
    title: "Real SaaS dashboard",
    description: "KPI cards, revenue charts, user growth, and plan breakdown — the core of every MVP we ship.",
  },
  {
    title: "AI analytics copilot",
    description: "Ask questions in plain English and get answers grounded in your actual metrics data.",
  },
  {
    title: "Auth + protected routes",
    description: "Supabase authentication with middleware-protected dashboard — production-ready patterns.",
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
          Sign in to demo
        </Link>
      </header>

      <main className="relative mx-auto max-w-6xl px-4 pb-20 pt-12 sm:px-6 sm:pt-20">
        <section className="mx-auto max-w-3xl text-center animate-slide-up">
          <span className="inline-flex items-center rounded-full bg-emerald-500/10 px-3 py-1 text-xs font-medium text-emerald-400 ring-1 ring-emerald-500/20">
            SaaS MVP demo
          </span>
          <h1 className="mt-6 text-4xl font-semibold tracking-tight text-white sm:text-6xl">
            Your metrics.
            <span className="block text-emerald-400">One dashboard. One copilot.</span>
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-slate-400 sm:text-lg">
            OpsHub is a live demo of what DevAxon builds in 6–8 weeks: authentication,
            a polished analytics dashboard, and an AI copilot that understands your data.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              href="/login"
              className="w-full rounded-xl bg-emerald-500 px-6 py-3 text-sm font-semibold text-slate-950 transition hover:bg-emerald-400 sm:w-auto"
            >
              Enter demo
            </Link>
            <a
              href="https://devaxon.com"
              target="_blank"
              rel="noopener noreferrer"
              className="w-full rounded-xl border border-slate-700 px-6 py-3 text-sm font-medium text-slate-300 transition hover:border-slate-600 hover:text-white sm:w-auto"
            >
              Built by DevAxon
            </a>
          </div>
        </section>

        <section className="mt-20 grid gap-4 sm:grid-cols-3">
          {FEATURES.map((feature) => (
            <div key={feature.title} className="glass-card p-6 shadow-soft">
              <h3 className="text-sm font-semibold text-white">{feature.title}</h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-400">{feature.description}</p>
            </div>
          ))}
        </section>

        <section className="mt-16 glass-card overflow-hidden shadow-card">
          <div className="grid gap-0 lg:grid-cols-2">
            <div className="border-b border-slate-800 p-6 lg:border-b-0 lg:border-r">
              <p className="text-xs uppercase tracking-wide text-slate-500">Sample metrics</p>
              <p className="mt-2 text-3xl font-semibold text-white">$18,450 MRR</p>
              <p className="mt-1 text-sm text-emerald-400">+12.4% vs last month</p>
            </div>
            <div className="p-6">
              <p className="text-xs uppercase tracking-wide text-slate-500">Try asking the copilot</p>
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
          Demo product by{" "}
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
