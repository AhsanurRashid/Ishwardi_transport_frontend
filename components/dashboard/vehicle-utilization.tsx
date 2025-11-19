import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Truck } from "lucide-react";

interface VehicleUtilizationProps {
  totalVehicles: number;
  activeVehicles: number;
  idleVehicles: number;
  underMaintenance: number;
}

export function VehicleUtilization({
  totalVehicles,
  activeVehicles,
  idleVehicles,
  underMaintenance,
}: VehicleUtilizationProps) {
  const utilizationRate =
    totalVehicles > 0 ? (activeVehicles / totalVehicles) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Truck className="h-5 w-5" />
          Vehicle Utilization
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Utilization Rate</span>
            <span className="font-semibold">{utilizationRate.toFixed(1)}%</span>
          </div>
          <Progress value={utilizationRate} className="h-2" />
        </div>

        <div className="grid grid-cols-3 gap-4">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Active</p>
            <p className="text-2xl font-bold text-green-600">
              {activeVehicles}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Idle</p>
            <p className="text-2xl font-bold text-orange-600">{idleVehicles}</p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Maintenance</p>
            <p className="text-2xl font-bold text-red-600">
              {underMaintenance}
            </p>
          </div>
        </div>

        <div className="pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Vehicles</span>
            <span className="text-lg font-bold">{totalVehicles}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
