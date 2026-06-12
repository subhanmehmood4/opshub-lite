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
