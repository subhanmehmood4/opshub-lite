# OpsHub Lite

Live demo SaaS dashboard for [DevAxon](https://devaxon.com) — authentication, analytics KPIs, charts, sortable tables, and an AI copilot that answers questions about the metrics.

## Features

- **Landing page** with product overview and one-click demo entry
- **Supabase auth** — guest demo login, email sign-in, and sign-up
- **Protected dashboard** via Next.js middleware
- **KPI cards** — MRR, active users, churn, ARPU
- **Charts** — revenue (area), users (bar), plan breakdown (pie)
- **Data table** — monthly metrics with sort and filter
- **AI Copilot** — GPT-4o-mini answers grounded in `lib/demoData.ts`

## Tech stack

- Next.js 14 (App Router) + TypeScript
- Tailwind CSS
- Supabase (Auth)
- Recharts
- OpenAI API (`gpt-4o-mini`)

## Quick start

```bash
cd opshub-lite
npm install
cp .env.example .env.local
# Fill in your keys (see below)
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Environment variables

Create `.env.local` from `.env.example`:

| Variable | Description |
|----------|-------------|
| `OPENAI_API_KEY` | OpenAI API key (server-side only) |
| `NEXT_PUBLIC_SUPABASE_URL` | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Supabase anon/public key |
| `DEMO_EMAIL` | Shared demo account email |
| `DEMO_PASSWORD` | Shared demo account password |

## Live demo

**Production URL:** [https://opshub-lite.vercel.app](https://opshub-lite.vercel.app)

Linked from the DevAxon website on the **PayFlow** and **OpsHub** case studies.

## Supabase setup (required for auth)

1. Create a project at [supabase.com](https://supabase.com).
2. Enable **Email** auth under Authentication → Providers.
3. **Easiest demo path:** also enable **Anonymous** sign-in (Authentication → Providers → Anonymous). Then "Enter Demo" works without creating a user.
4. **Optional:** create a shared demo user and set `DEMO_EMAIL` / `DEMO_PASSWORD` in env (takes priority over anonymous login).
5. Copy project URL + anon key into `.env.local` and Vercel env vars.

No database tables are required — metrics live in `lib/demoData.ts`.

## Vercel environment variables

Add these in [Vercel → opshub-lite → Settings → Environment Variables](https://vercel.com/dev-axon/opshub-lite/settings/environment-variables):

| Variable | Required | Description |
|----------|----------|-------------|
| `OPENAI_API_KEY` | Yes (copilot) | OpenAI API key |
| `NEXT_PUBLIC_SUPABASE_URL` | Yes (auth) | Supabase project URL |
| `NEXT_PUBLIC_SUPABASE_ANON_KEY` | Yes (auth) | Supabase anon key |
| `DEMO_EMAIL` | Optional | Shared demo account email |
| `DEMO_PASSWORD` | Optional | Shared demo account password |

Redeploy after adding variables.

## Deploy to Vercel

Already deployed at **https://opshub-lite.vercel.app**. To redeploy:

```bash
cd opshub-lite
npx vercel --prod
```

## Project structure

```
opshub-lite/
  app/
    page.tsx              Landing
    login/page.tsx        Auth + Enter Demo
    dashboard/page.tsx    Protected dashboard
    api/copilot/route.ts  AI copilot
    api/auth/demo/route.ts One-click demo login
  components/             UI (KPI, charts, table, copilot)
  lib/
    demoData.ts           Single source of truth for metrics
    openai.ts             Copilot prompt + API call
    supabase/             Auth clients
  middleware.ts           Protect /dashboard routes
```

## Demo flow

1. Visit the landing page → **Enter demo**
2. Sign in with one click (or email/password)
3. Explore KPIs, charts, and the monthly table
4. Open **AI Copilot** and try:
   - "What's our churn this month?"
   - "Best revenue month?"
   - "How many Growth-plan customers?"

---

Built by [DevAxon](https://devaxon.com) as an in-house SaaS MVP showcase.
