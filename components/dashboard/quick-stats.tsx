import { StatsCard } from "./stats-card";
import { TrendingUp, DollarSign, AlertCircle, Truck } from "lucide-react";

interface QuickStatsProps {
  totalActiveRents: number;
  monthlyRevenue: number;
  pendingDues: number;
  activeVehicles: {
    active: number;
    total: number;
  };
}

export function QuickStats({
  totalActiveRents,
  monthlyRevenue,
  pendingDues,
  activeVehicles,
}: QuickStatsProps) {
  return (
    <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
      <StatsCard
        title="Active Rents"
        value={totalActiveRents}
        icon={TrendingUp}
        description="Currently ongoing rentals"
      />
      <StatsCard
        title="Monthly Revenue"
        value={`৳${monthlyRevenue.toLocaleString()}`}
        icon={DollarSign}
        description="Revenue this month"
      />
      <StatsCard
        title="Pending Dues"
        value={`৳${pendingDues.toLocaleString()}`}
        icon={AlertCircle}
        description="Outstanding payments"
        className="border-orange-200"
      />
      <StatsCard
        title="Active Vehicles"
        value={`${activeVehicles.active}/${activeVehicles.total}`}
        icon={Truck}
        description="Vehicles on rent"
      />
    </div>
  );
}
