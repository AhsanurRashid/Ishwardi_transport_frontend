import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ShipWheel, UserCheck, UserX } from "lucide-react";

interface DriverAvailabilityProps {
  totalDrivers: number;
  activeDrivers: number;
  onDuty: number;
  available: number;
}

export function DriverAvailability({
  totalDrivers,
  activeDrivers,
  onDuty,
  available,
}: DriverAvailabilityProps) {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <ShipWheel className="h-5 w-5" />
          Driver Availability
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-2 gap-4">
          <div className="space-y-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
            <div className="flex items-center gap-2">
              <UserCheck className="h-4 w-4 text-green-600" />
              <span className="text-xs text-muted-foreground">On Duty</span>
            </div>
            <p className="text-2xl font-bold text-green-600">{onDuty}</p>
          </div>
          <div className="space-y-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
            <div className="flex items-center gap-2">
              <UserX className="h-4 w-4 text-blue-600" />
              <span className="text-xs text-muted-foreground">Available</span>
            </div>
            <p className="text-2xl font-bold text-blue-600">{available}</p>
          </div>
        </div>

        <div className="space-y-2 pt-2 border-t">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Drivers</span>
            <Badge variant="outline">{totalDrivers}</Badge>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Active Status</span>
            <Badge variant="outline" className="bg-green-50 text-green-700">
              {activeDrivers}
            </Badge>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
