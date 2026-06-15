import ActivityFeed from "@/components/ActivityFeed";
import DataTable from "@/components/DataTable";
import KpiGrid from "@/components/KpiCard";
import PlansChart from "@/components/PlansChart";
import RevenueChart from "@/components/RevenueChart";
import UsersChart from "@/components/UsersChart";

export default function OverviewPage() {
  return (
    <>
      <KpiGrid />

      <div className="grid gap-6 xl:grid-cols-2">
        <RevenueChart />
        <UsersChart />
      </div>

      <div className="grid gap-6 xl:grid-cols-3">
        <div className="xl:col-span-2">
          <DataTable />
        </div>
        <ActivityFeed />
      </div>

      <PlansChart />
    </>
  );
}
