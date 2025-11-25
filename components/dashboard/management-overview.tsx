import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Users, Building2Icon, Truck, ShipWheel } from "lucide-react";

interface ManagementOverviewProps {
  usersByRole: {
    role: string;
    count: number;
  }[];
  totalCompanies: {
    active: number;
    inactive: number;
  };
  totalVehicles: {
    total: number;
    byType: { type: string; count: number }[];
  };
  totalDrivers: {
    active: number;
    inactive: number;
  };
}

export function ManagementOverview({
  usersByRole,
  totalCompanies,
  totalVehicles,
  totalDrivers,
}: ManagementOverviewProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle>Management Overview</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Users by Role */}
        <div className="space-y-3">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Users className="h-4 w-4" />
            <span>Users by Role</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pl-6">
            {usersByRole.map((role, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-accent rounded-md text-white"
              >
                <span className="text-xs capitalize">
                  {role.role}
                </span>
                <span className="text-sm font-semibold">{role.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Companies */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <Building2Icon className="h-4 w-4" />
            <span>Companies</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pl-6">
            <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded-md">
              <span className="text-xs text-muted-foreground">Active</span>
              <span className="text-sm font-semibold text-green-600">
                {totalCompanies.active}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-950/20 rounded-md">
              <span className="text-xs text-muted-foreground">Inactive</span>
              <span className="text-sm font-semibold text-muted-foreground">
                {totalCompanies.inactive}
              </span>
            </div>
          </div>
        </div>

        {/* Vehicles */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 text-sm font-medium">
              <Truck className="h-4 w-4" />
              <span>Vehicles</span>
            </div>
            <span className="text-lg font-bold">{totalVehicles.total}</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pl-6">
            {totalVehicles.byType.map((vehicle, index) => (
              <div
                key={index}
                className="flex items-center justify-between p-2 bg-accent rounded-md text-white"
              >
                <span className="text-xs capitalize">
                  {vehicle.type}
                </span>
                <span className="text-sm font-semibold">{vehicle.count}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Drivers */}
        <div className="space-y-3 border-t pt-4">
          <div className="flex items-center gap-2 text-sm font-medium">
            <ShipWheel className="h-4 w-4" />
            <span>Drivers</span>
          </div>
          <div className="grid grid-cols-2 gap-2 pl-6">
            <div className="flex items-center justify-between p-2 bg-green-50 dark:bg-green-950/20 rounded-md">
              <span className="text-xs text-muted-foreground">Active</span>
              <span className="text-sm font-semibold text-green-600">
                {totalDrivers.active}
              </span>
            </div>
            <div className="flex items-center justify-between p-2 bg-gray-50 dark:bg-gray-950/20 rounded-md">
              <span className="text-xs text-muted-foreground">Inactive</span>
              <span className="text-sm font-semibold text-muted-foreground">
                {totalDrivers.inactive}
              </span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
