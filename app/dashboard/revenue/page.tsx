import DataTable from "@/components/DataTable";
import KpiGrid from "@/components/KpiCard";
import PlansChart from "@/components/PlansChart";
import RevenueChart from "@/components/RevenueChart";

export default function RevenuePage() {
  return (
    <>
      <div className="rounded-2xl border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 text-sm text-emerald-200/90">
        All revenue sources connected — Stripe, billing exports, and manual adjustments synced.
      </div>

      <KpiGrid focus="revenue" />

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart />
        <PlansChart />
      </div>

      <DataTable />
    </>
  );
}
