import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { AlertTriangle, FileWarning, UserX, TruckIcon } from "lucide-react";

interface Alert {
  id: number;
  type: "document" | "payment" | "driver" | "vehicle";
  severity: "high" | "medium" | "low";
  title: string;
  description: string;
  timestamp?: string;
}

interface AlertsNotificationsProps {
  alerts: Alert[];
}

export function AlertsNotifications({ alerts }: AlertsNotificationsProps) {
  const getIcon = (type: string) => {
    switch (type) {
      case "document":
        return <FileWarning className="h-4 w-4" />;
      case "payment":
        return <AlertTriangle className="h-4 w-4" />;
      case "driver":
        return <UserX className="h-4 w-4" />;
      case "vehicle":
        return <TruckIcon className="h-4 w-4" />;
      default:
        return <AlertTriangle className="h-4 w-4" />;
    }
  };

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case "high":
        return "bg-red-50 dark:bg-red-950/20 border-red-200 dark:border-red-900";
      case "medium":
        return "bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-900";
      case "low":
        return "bg-yellow-50 dark:bg-yellow-950/20 border-yellow-200 dark:border-yellow-900";
      default:
        return "";
    }
  };

  const getSeverityBadgeVariant = (severity: string) => {
    switch (severity) {
      case "high":
        return "destructive";
      case "medium":
        return "default";
      case "low":
        return "secondary";
      default:
        return "outline";
    }
  };

  return (
    <Card className="border-red-200 dark:border-red-900">
      <CardHeader>
        <div className="flex items-center justify-between">
          <CardTitle className="flex items-center gap-2 text-red-700 dark:text-red-400">
            <AlertTriangle className="h-5 w-5" />
            Alerts & Notifications
          </CardTitle>
          <Badge variant="destructive">{alerts.length}</Badge>
        </div>
      </CardHeader>
      <CardContent>
        {alerts.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No alerts at the moment
          </p>
        ) : (
          <ScrollArea className="h-[400px] pr-4">
            <div className="space-y-3">
              {alerts.map((alert) => (
                <div
                  key={alert.id}
                  className={`p-3 rounded-lg border ${getSeverityColor(
                    alert.severity
                  )}`}
                >
                  <div className="flex items-start gap-3">
                    <div
                      className={`mt-0.5 ${
                        alert.severity === "high"
                          ? "text-red-600"
                          : alert.severity === "medium"
                          ? "text-orange-600"
                          : "text-yellow-600"
                      }`}
                    >
                      {getIcon(alert.type)}
                    </div>
                    <div className="flex-1 space-y-1">
                      <div className="flex items-start justify-between gap-2">
                        <p className="text-sm font-semibold">{alert.title}</p>
                        <Badge
                          variant={getSeverityBadgeVariant(alert.severity)}
                          className="text-xs"
                        >
                          {alert.severity}
                        </Badge>
                      </div>
                      <p className="text-xs text-muted-foreground">
                        {alert.description}
                      </p>
                      {alert.timestamp && (
                        <p className="text-xs text-muted-foreground">
                          {alert.timestamp}
                        </p>
                      )}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </ScrollArea>
        )}
      </CardContent>
    </Card>
  );
}
