import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { MapPin, TrendingUp } from "lucide-react";

interface PopularRoute {
  from: string;
  to: string;
  count: number;
  revenue: number;
}

interface PopularRoutesProps {
  routes: PopularRoute[];
}

export function PopularRoutes({ routes }: PopularRoutesProps) {
  const maxCount = Math.max(...routes.map((r) => r.count), 1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5" />
          Popular Routes
        </CardTitle>
      </CardHeader>
      <CardContent>
        {routes.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No route data available
          </p>
        ) : (
          <div className="space-y-4">
            {routes.map((route, index) => {
              const percentage = (route.count / maxCount) * 100;
              return (
                <div key={index} className="space-y-2">
                  <div className="flex items-start justify-between gap-2">
                    <div className="flex items-start gap-2 flex-1">
                      <MapPin className="h-4 w-4 text-primary mt-0.5" />
                      <div className="flex-1 min-w-0">
                        <p className="text-sm font-medium truncate">
                          {route.from} → {route.to}
                        </p>
                        <p className="text-xs text-muted-foreground">
                          {route.count} trips • ৳
                          {route.revenue.toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                  <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
                    <div
                      className="h-full bg-primary transition-all duration-500"
                      style={{ width: `${percentage}%` }}
                    />
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </CardContent>
    </Card>
  );
}
