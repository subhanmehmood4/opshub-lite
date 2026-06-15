import CustomersTable from "@/components/CustomersTable";
import DataTable from "@/components/DataTable";
import KpiGrid from "@/components/KpiCard";
import UsersChart from "@/components/UsersChart";
import { metrics } from "@/lib/demoData";

export default function UsersPage() {
  const latest = metrics.monthly.at(-1)!;
  const previous = metrics.monthly.at(-2)!;
  const userGrowth = latest.users - previous.users;

  return (
    <>
      <KpiGrid focus="users" />

      <div className="grid gap-6 lg:grid-cols-3">
        <UsersChart />
        <div className="glass-card p-5 shadow-soft lg:col-span-2">
          <h3 className="text-sm font-semibold text-white">User snapshot</h3>
          <p className="text-xs text-slate-500">June 2026 vs May 2026</p>
          <dl className="mt-4 grid gap-4 sm:grid-cols-3">
            <div>
              <dt className="text-xs text-slate-500">Active users</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">
                {latest.users.toLocaleString()}
              </dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Net adds this month</dt>
              <dd className="mt-1 text-2xl font-semibold text-emerald-400">+{userGrowth}</dd>
            </div>
            <div>
              <dt className="text-xs text-slate-500">Churn rate</dt>
              <dd className="mt-1 text-2xl font-semibold text-white">{latest.churn}%</dd>
            </div>
          </dl>
        </div>
      </div>

      <CustomersTable />
      <DataTable />
    </>
  );
}
