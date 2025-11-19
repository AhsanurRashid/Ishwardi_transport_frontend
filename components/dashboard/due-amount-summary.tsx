import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { DollarSign } from "lucide-react";

interface DueAmountSummaryProps {
  totalDue: number;
  collected: number;
  pending: number;
}

export function DueAmountSummary({
  totalDue,
  collected,
  pending,
}: DueAmountSummaryProps) {
  const collectionRate = totalDue > 0 ? (collected / totalDue) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <DollarSign className="h-5 w-5" />
          Due Amount Summary
        </CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-muted-foreground">Collection Rate</span>
            <span className="font-semibold">{collectionRate.toFixed(1)}%</span>
          </div>
          <Progress value={collectionRate} className="h-2" />
        </div>

        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Total Due</span>
            <span className="text-lg font-bold">
              ৳{totalDue.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between border-t pt-2">
            <span className="text-sm text-green-600">Collected</span>
            <span className="text-sm font-semibold text-green-600">
              ৳{collected.toLocaleString()}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span className="text-sm text-orange-600">Pending</span>
            <span className="text-sm font-semibold text-orange-600">
              ৳{pending.toLocaleString()}
            </span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
