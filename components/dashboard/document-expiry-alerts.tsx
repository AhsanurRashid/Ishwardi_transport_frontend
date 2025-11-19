import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { AlertTriangle, Calendar } from "lucide-react";
import { format } from "date-fns";

interface ExpiringDocument {
  vehicleId: number;
  vehicleNumber: string;
  documentType: "fitness" | "tax" | "insurance";
  expiryDate: string;
  daysRemaining: number;
}

interface DocumentExpiryAlertsProps {
  expiringDocuments: ExpiringDocument[];
}

export function DocumentExpiryAlerts({
  expiringDocuments,
}: DocumentExpiryAlertsProps) {
  const getDocumentLabel = (type: string) => {
    switch (type) {
      case "fitness":
        return "Fitness Certificate";
      case "tax":
        return "Tax Token";
      case "insurance":
        return "Insurance Policy";
      default:
        return type;
    }
  };

  const getSeverityColor = (days: number) => {
    if (days < 0) return "destructive";
    if (days <= 7) return "destructive";
    if (days <= 15) return "default";
    return "secondary";
  };

  return (
    <Card className="border-orange-200 dark:border-orange-900">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-orange-700 dark:text-orange-400">
          <AlertTriangle className="h-5 w-5" />
          Document Expiry Alerts
        </CardTitle>
      </CardHeader>
      <CardContent>
        {expiringDocuments.length === 0 ? (
          <p className="text-sm text-muted-foreground text-center py-4">
            No documents expiring soon
          </p>
        ) : (
          <div className="space-y-3 max-h-[300px] overflow-y-auto">
            {expiringDocuments.map((doc, index) => (
              <div
                key={index}
                className="flex items-start gap-3 p-3 bg-orange-50 dark:bg-orange-950/20 rounded-lg border border-orange-100 dark:border-orange-900"
              >
                <Calendar className="h-4 w-4 text-orange-600 mt-0.5" />
                <div className="flex-1 space-y-1">
                  <div className="flex items-center justify-between">
                    <p className="text-sm font-medium">{doc.vehicleNumber}</p>
                    <Badge variant={getSeverityColor(doc.daysRemaining)}>
                      {doc.daysRemaining < 0
                        ? "Expired"
                        : `${doc.daysRemaining}d`}
                    </Badge>
                  </div>
                  <p className="text-xs text-muted-foreground">
                    {getDocumentLabel(doc.documentType)}
                  </p>
                  <p className="text-xs text-orange-600">
                    Expires: {format(new Date(doc.expiryDate), "MMM dd, yyyy")}
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
