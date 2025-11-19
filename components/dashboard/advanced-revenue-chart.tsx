"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { cn } from "@/lib/utils";
import { CalendarIcon, TrendingUp, Download } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";

interface RevenueDataPoint {
  label: string;
  value: number;
  date: string;
}

interface AdvancedRevenueChartProps {
  data: RevenueDataPoint[];
  totalRevenue: number;
  averageRevenue: number;
  onFilterChange?: (filter: {
    period: "monthly" | "yearly" | "lifetime" | "custom";
    startDate?: Date;
    endDate?: Date;
  }) => void;
}

export function AdvancedRevenueChart({
  data,
  totalRevenue,
  averageRevenue,
  onFilterChange,
}: AdvancedRevenueChartProps) {
  const [selectedPeriod, setSelectedPeriod] = useState<
    "monthly" | "yearly" | "lifetime" | "custom"
  >("monthly");
  const [startDate, setStartDate] = useState<Date>();
  const [endDate, setEndDate] = useState<Date>();
  const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

  const maxRevenue = Math.max(...data.map((d) => d.value), 1);

  const handlePeriodChange = (
    period: "monthly" | "yearly" | "lifetime" | "custom"
  ) => {
    setSelectedPeriod(period);
    if (period !== "custom") {
      setStartDate(undefined);
      setEndDate(undefined);
      onFilterChange?.({ period });
    }
  };

  const handleCustomDateApply = () => {
    if (startDate && endDate) {
      onFilterChange?.({ period: "custom", startDate, endDate });
    }
  };

  const handleExport = () => {
    // Export data as CSV
    const csvContent = [
      ["Date", "Label", "Revenue"],
      ...data.map((d) => [d.date, d.label, d.value]),
    ]
      .map((row) => row.join(","))
      .join("\n");

    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `revenue-report-${format(new Date(), "yyyy-MM-dd")}.csv`;
    a.click();
  };

  return (
    <Card className="col-span-full">
      <CardHeader>
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <CardTitle className="flex items-center gap-2">
              <TrendingUp className="h-5 w-5" />
              Revenue Analytics
            </CardTitle>
            <p className="text-sm text-muted-foreground mt-1">
              Track your revenue performance over time
            </p>
          </div>
          <Button
            variant="outline"
            size="sm"
            onClick={handleExport}
            className="self-end sm:self-auto"
          >
            <Download className="h-4 w-4 mr-2" />
            Export
          </Button>
        </div>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Filter Controls */}
        <div className="flex flex-wrap items-center gap-3">
          <div className="flex gap-2">
            <Button
              variant={selectedPeriod === "monthly" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange("monthly")}
            >
              Monthly
            </Button>
            <Button
              variant={selectedPeriod === "yearly" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange("yearly")}
            >
              Yearly
            </Button>
            <Button
              variant={selectedPeriod === "lifetime" ? "default" : "outline"}
              size="sm"
              onClick={() => handlePeriodChange("lifetime")}
            >
              Lifetime
            </Button>
          </div>

          <div className="h-6 w-px bg-border" />

          {/* Custom Date Range Picker */}
          <div className="flex items-center gap-2">
            <Popover>
              <PopoverTrigger asChild>
                <Button
                  variant={selectedPeriod === "custom" ? "default" : "outline"}
                  size="sm"
                  className="justify-start text-left font-normal"
                  onClick={() => setSelectedPeriod("custom")}
                >
                  <CalendarIcon className="mr-2 h-4 w-4" />
                  {startDate && endDate ? (
                    <>
                      {format(startDate, "MMM dd, yyyy")} -{" "}
                      {format(endDate, "MMM dd, yyyy")}
                    </>
                  ) : (
                    "Custom Range"
                  )}
                </Button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <div className="p-3 space-y-3">
                  <div className="space-y-2">
                    <label className="text-sm font-medium">Start Date</label>
                    <Calendar
                      mode="single"
                      selected={startDate}
                      onSelect={setStartDate}
                      disabled={(date) =>
                        date > new Date() || (endDate ? date > endDate : false)
                      }
                      initialFocus
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-sm font-medium">End Date</label>
                    <Calendar
                      mode="single"
                      selected={endDate}
                      onSelect={setEndDate}
                      disabled={(date) =>
                        date > new Date() ||
                        (startDate ? date < startDate : false)
                      }
                    />
                  </div>
                  <Button
                    size="sm"
                    className="w-full"
                    onClick={handleCustomDateApply}
                    disabled={!startDate || !endDate}
                  >
                    Apply Filter
                  </Button>
                </div>
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Summary Stats */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 p-4 bg-accent rounded-lg">
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Total Revenue</p>
            <p className="text-2xl font-bold text-primary">
              ৳{totalRevenue.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Average Revenue</p>
            <p className="text-2xl font-bold">
              ৳{averageRevenue.toLocaleString()}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-muted-foreground">Data Points</p>
            <p className="text-2xl font-bold">{data.length}</p>
          </div>
        </div>

        {/* Graph */}
        {data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No revenue data available for the selected period
          </div>
        ) : (
          <div className="space-y-4">
            <div className="relative h-[300px] flex items-end gap-2">
              {data.map((item, index) => {
                const percentage = (item.value / maxRevenue) * 100;
                const isHovered = hoveredIndex === index;
                return (
                  <div
                    key={index}
                    className="flex-1 flex flex-col items-center gap-2 group"
                    onMouseEnter={() => setHoveredIndex(index)}
                    onMouseLeave={() => setHoveredIndex(null)}
                  >
                    {/* Tooltip */}
                    {isHovered && (
                      <div className="absolute bottom-full mb-2 z-10 bg-popover border rounded-lg shadow-lg p-3 min-w-[200px]">
                        <p className="font-semibold">{item.label}</p>
                        <p className="text-sm text-muted-foreground">
                          {format(new Date(item.date), "MMM dd, yyyy")}
                        </p>
                        <p className="text-lg font-bold text-primary mt-1">
                          ৳{item.value.toLocaleString()}
                        </p>
                      </div>
                    )}

                    {/* Bar */}
                    <div
                      className={cn(
                        "w-full rounded-t-md transition-all duration-300 cursor-pointer",
                        isHovered
                          ? "bg-primary shadow-lg scale-105"
                          : "bg-primary/70 hover:bg-primary/90"
                      )}
                      style={{ height: `${percentage}%` }}
                    />

                    {/* Label */}
                    <p
                      className={cn(
                        "text-xs text-center transition-colors",
                        isHovered
                          ? "font-semibold text-foreground"
                          : "text-muted-foreground"
                      )}
                    >
                      {item.label}
                    </p>
                  </div>
                );
              })}
            </div>

            {/* Legend/Scale */}
            <div className="flex justify-between items-center text-xs text-muted-foreground pt-4 border-t">
              <span>৳0</span>
              <span>৳{(maxRevenue / 2).toLocaleString()}</span>
              <span>৳{maxRevenue.toLocaleString()}</span>
            </div>
          </div>
        )}

        {/* Period Badge */}
        <div className="flex items-center justify-center">
          <Badge variant="outline" className="text-xs">
            Showing {selectedPeriod} data
            {selectedPeriod === "custom" && startDate && endDate && (
              <>
                {" "}
                from {format(startDate, "MMM dd")} to{" "}
                {format(endDate, "MMM dd")}
              </>
            )}
          </Badge>
        </div>
      </CardContent>
    </Card>
  );
}
