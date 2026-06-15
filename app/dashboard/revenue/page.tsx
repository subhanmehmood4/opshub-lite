import DataTable from "@/components/DataTable";
import KpiGrid from "@/components/KpiCard";
import PlansChart from "@/components/PlansChart";
import RevenueChart from "@/components/RevenueChart";

export default function RevenuePage() {
  return (
    <>
      <KpiGrid focus="revenue" />

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart />
        <PlansChart />
      </div>

      <DataTable />
    </>
  );
}
