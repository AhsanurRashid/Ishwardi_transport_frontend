import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

interface RentBreakdownProps {
  rentAmount: number;
  demurrageAmount: number;
}

export function RentBreakdown({
  rentAmount,
  demurrageAmount,
}: RentBreakdownProps) {
  const total = rentAmount + demurrageAmount;
  const rentPercentage = total > 0 ? (rentAmount / total) * 100 : 0;
  const demurragePercentage = total > 0 ? (demurrageAmount / total) * 100 : 0;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Income Breakdown</CardTitle>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Rent Amount</span>
            <span className="text-sm font-semibold text-primary">
              ৳{rentAmount.toLocaleString()}
            </span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-primary transition-all"
              style={{ width: `${rentPercentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground text-right">
            {rentPercentage.toFixed(1)}%
          </div>
        </div>

        <Separator />

        <div className="space-y-2">
          <div className="flex items-center justify-between">
            <span className="text-sm font-medium">Demurrage Amount</span>
            <span className="text-sm font-semibold text-orange-600">
              ৳{demurrageAmount.toLocaleString()}
            </span>
          </div>
          <div className="h-2 w-full bg-secondary rounded-full overflow-hidden">
            <div
              className="h-full bg-orange-600 transition-all"
              style={{ width: `${demurragePercentage}%` }}
            />
          </div>
          <div className="text-xs text-muted-foreground text-right">
            {demurragePercentage.toFixed(1)}%
          </div>
        </div>

        <Separator />

        <div className="flex items-center justify-between pt-2">
          <span className="font-semibold">Total Income</span>
          <span className="text-lg font-bold">৳{total.toLocaleString()}</span>
        </div>
      </CardContent>
    </Card>
  );
}
