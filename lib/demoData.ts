export interface MonthlyMetric {
  month: string;
  revenue: number;
  users: number;
  churn: number;
}

export interface PlanMetric {
  name: string;
  customers: number;
  mrr: number;
}

export interface ActivityItem {
  id: string;
  type: "signup" | "churn" | "upgrade" | "milestone";
  title: string;
  detail: string;
  time: string;
}

export interface AlertItem {
  id: string;
  severity: "info" | "warning" | "success";
  title: string;
  message: string;
}

export interface Customer {
  id: string;
  name: string;
  plan: string;
  status: "active" | "churned" | "trial";
  mrr: number;
  joined: string;
}

export const metrics = {
  mrr: 18450,
  mrrChangePct: 12.4,
  activeUsers: 1240,
  usersChangePct: 12.7,
  churnPct: 3.2,
  churnChangePct: -0.3,
  avgRevenuePerUser: 14.88,
  arpuChangePct: 5.2,
  monthly: [
    { month: "Jul", revenue: 7200, users: 380, churn: 4.8 },
    { month: "Aug", revenue: 8100, users: 450, churn: 4.5 },
    { month: "Sep", revenue: 8900, users: 510, churn: 4.3 },
    { month: "Oct", revenue: 9200, users: 520, churn: 4.2 },
    { month: "Nov", revenue: 9500, users: 530, churn: 4.1 },
    { month: "Dec", revenue: 9600, users: 535, churn: 4.1 },
    { month: "Jan", revenue: 9800, users: 540, churn: 4.1 },
    { month: "Feb", revenue: 11200, users: 690, churn: 3.8 },
    { month: "Mar", revenue: 13400, users: 820, churn: 3.5 },
    { month: "Apr", revenue: 15100, users: 960, churn: 3.4 },
    { month: "May", revenue: 16800, users: 1100, churn: 3.3 },
    { month: "Jun", revenue: 18450, users: 1240, churn: 3.2 },
  ] satisfies MonthlyMetric[],
  plans: [
    { name: "Starter", customers: 540, mrr: 5400 },
    { name: "Growth", customers: 410, mrr: 8200 },
    { name: "Scale", customers: 90, mrr: 4850 },
  ] satisfies PlanMetric[],
};

export const recentActivity: ActivityItem[] = [
  {
    id: "1",
    type: "signup",
    title: "New Growth plan signup",
    detail: "Northwind Labs — $199/mo",
    time: "12 min ago",
  },
  {
    id: "2",
    type: "upgrade",
    title: "Plan upgrade",
    detail: "Brightline moved Starter → Growth",
    time: "1 hr ago",
  },
  {
    id: "3",
    type: "milestone",
    title: "MRR milestone",
    detail: "Crossed $18,000 MRR",
    time: "3 hrs ago",
  },
  {
    id: "4",
    type: "churn",
    title: "Churn event",
    detail: "Summit Co. cancelled Scale plan",
    time: "Yesterday",
  },
  {
    id: "5",
    type: "signup",
    title: "Trial started",
    detail: "Harbor Analytics — 14-day trial",
    time: "Yesterday",
  },
];

export const alerts: AlertItem[] = [
  {
    id: "churn-spike",
    severity: "warning",
    title: "Churn trending down",
    message: "Churn dropped to 3.2% this month — lowest in 12 months. Review what changed in onboarding.",
  },
  {
    id: "mrr-milestone",
    severity: "success",
    title: "MRR up 12.4%",
    message: "June revenue hit $18,450 — your strongest month yet.",
  },
];

export const customers: Customer[] = [
  { id: "1", name: "Northwind Labs", plan: "Growth", status: "active", mrr: 199, joined: "Jun 2026" },
  { id: "2", name: "Brightline", plan: "Growth", status: "active", mrr: 199, joined: "May 2026" },
  { id: "3", name: "Summit Co.", plan: "Scale", status: "churned", mrr: 0, joined: "Mar 2026" },
  { id: "4", name: "Harbor Analytics", plan: "Starter", status: "trial", mrr: 49, joined: "Jun 2026" },
  { id: "5", name: "Vertex Systems", plan: "Scale", status: "active", mrr: 499, joined: "Apr 2026" },
  { id: "6", name: "Clearpath", plan: "Growth", status: "active", mrr: 199, joined: "Feb 2026" },
  { id: "7", name: "Ironclad Ops", plan: "Starter", status: "active", mrr: 49, joined: "Jan 2026" },
  { id: "8", name: "Pulse Metrics", plan: "Growth", status: "active", mrr: 199, joined: "May 2026" },
  { id: "9", name: "Atlas Revenue", plan: "Scale", status: "active", mrr: 499, joined: "Jun 2026" },
  { id: "10", name: "Fieldstone", plan: "Starter", status: "active", mrr: 49, joined: "Mar 2026" },
];

export function formatCurrency(value: number): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(value);
}

export function formatPercent(value: number, decimals = 1): string {
  return `${value.toFixed(decimals)}%`;
}

export function getMetricsJson(): string {
  return JSON.stringify(metrics, null, 2);
}
