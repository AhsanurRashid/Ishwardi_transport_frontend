import { getDashboardDataAction } from "@/app/actions/dashboard-action";
import { QuickStats } from "./quick-stats";

export async function QuickStatsWrapper() {
  const dashboardData = await getDashboardDataAction();

  if (dashboardData?.error) {
    return (
      <div className="text-sm text-muted-foreground">
        Failed to load statistics
      </div>
    );
  }
    
    const activeVehicle = {
      active: dashboardData?.activeVehicle || 0,
      total: dashboardData?.totalVehicle || 0,
    };

  return (
    <QuickStats
      totalActiveRents={dashboardData?.active_rent || 0}
      monthlyRevenue={dashboardData?.thisMonthRevenue || 0}
      pendingDues={dashboardData?.thisMonthPaymentDue || 0}
      activeVehicles={activeVehicle}
    />
  );
}
