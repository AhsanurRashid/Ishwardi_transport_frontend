"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";

interface RentTypeChartProps {
  upTrips: number;
  downTrips: number;
}

export function RentTypeChart({ upTrips, downTrips }: RentTypeChartProps) {
  const total = upTrips + downTrips;
  const upPercentage = total > 0 ? (upTrips / total) * 100 : 50;
  const downPercentage = total > 0 ? (downTrips / total) * 100 : 50;

  return (
    <Card>
      <CardHeader>
        <CardTitle>Trips by Type</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-6">
          {/* Visual representation */}
          <div className="flex h-4 w-full rounded-full overflow-hidden">
            <div
              className="bg-green-500 transition-all"
              style={{ width: `${upPercentage}%` }}
            />
            <div
              className="bg-blue-500 transition-all"
              style={{ width: `${downPercentage}%` }}
            />
          </div>

          {/* Details */}
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2 p-3 bg-green-50 dark:bg-green-950/20 rounded-lg">
              <div className="flex items-center gap-2">
                <ArrowUpCircle className="h-5 w-5 text-green-600" />
                <span className="text-sm font-medium text-green-700 dark:text-green-400">
                  Up Trips
                </span>
              </div>
              <p className="text-2xl font-bold text-green-600">{upTrips}</p>
              <p className="text-xs text-muted-foreground">
                {upPercentage.toFixed(1)}% of total
              </p>
            </div>

            <div className="space-y-2 p-3 bg-blue-50 dark:bg-blue-950/20 rounded-lg">
              <div className="flex items-center gap-2">
                <ArrowDownCircle className="h-5 w-5 text-blue-600" />
                <span className="text-sm font-medium text-blue-700 dark:text-blue-400">
                  Down Trips
                </span>
              </div>
              <p className="text-2xl font-bold text-blue-600">{downTrips}</p>
              <p className="text-xs text-muted-foreground">
                {downPercentage.toFixed(1)}% of total
              </p>
            </div>
          </div>

          {/* Total */}
          <div className="pt-2 border-t">
            <div className="flex items-center justify-between">
              <span className="text-sm font-medium">Total Trips</span>
              <span className="text-lg font-bold">{total}</span>
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
