import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, TrendingUp } from "lucide-react";
import { format } from "date-fns";

interface RecentRent {
  id: number;
  company: string;
  vehicle: string;
  type: "up" | "down";
  rentAmount: number;
  date: string;
  status: number;
}

interface RecentRentActivitiesProps {
  rents: RecentRent[];
}

export function RecentRentActivities({ rents }: RecentRentActivitiesProps) {
  const getStatusBadge = (status: number) => {
    switch (status) {
      case 0:
        return <Badge variant="secondary">Pending</Badge>;
      case 1:
        return <Badge className="bg-blue-600">Active</Badge>;
      case 2:
        return <Badge className="bg-green-600">Completed</Badge>;
      case 3:
        return <Badge variant="destructive">Cancelled</Badge>;
      default:
        return <Badge variant="outline">Unknown</Badge>;
    }
  };

  const getTypeColor = (type: string) => {
    return type === "up" ? "text-green-600" : "text-blue-600";
  };

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Recent Rent Activities
        </CardTitle>
      </CardHeader>
      <CardContent>
        {rents.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No recent activities
          </p>
        ) : (
          <div className="space-y-4 max-h-[400px] overflow-y-auto">
            {rents.map((rent) => (
              <div
                key={rent.id}
                className="flex items-start gap-4 p-3 hover:bg-muted rounded-lg transition-colors"
              >
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{rent.company}</p>
                    {getStatusBadge(rent.status)}
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {rent.vehicle} •{" "}
                    <span className={getTypeColor(rent.type)}>
                      {rent.type.toUpperCase()}
                    </span>
                  </p>
                  <div className="flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3 w-3" />
                    {format(new Date(rent.date), "MMM dd, yyyy")}
                  </div>
                </div>
                <div className="text-right">
                  <p className="text-sm font-semibold text-primary">
                    ৳{rent.rentAmount.toLocaleString()}
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
