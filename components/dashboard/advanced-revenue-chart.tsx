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
import { CalendarIcon, TrendingUp, Download } from "lucide-react";
import { format } from "date-fns";
import { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import { formatNumber } from "@/lib/utils";

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

// Custom Tooltip Component for Recharts
const CustomTooltip = ({ active, payload }: any) => {
  if (active && payload && payload.length) {
    return (
      <div className="bg-popover border rounded-lg shadow-lg p-3">
        <p className="font-semibold">{payload[0].payload.label}</p>
        <p className="text-sm text-muted-foreground">
          {format(new Date(payload[0].payload.date), "MMM dd, yyyy")}
        </p>
        <p className="text-lg font-bold text-primary mt-1">
          ৳{formatNumber(payload[0].value)}
        </p>
      </div>
    );
  }
  return null;
};

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
            <p className="text-xs text-white">Total Revenue</p>
            <p className="text-2xl font-bold text-white">
              ৳{formatNumber(totalRevenue)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white">Average Revenue</p>
            <p className="text-2xl font-bold text-white">
              ৳{formatNumber(averageRevenue)}
            </p>
          </div>
          <div className="space-y-1">
            <p className="text-xs text-white">Data Points</p>
            <p className="text-2xl font-bold text-white">{data.length}</p>
          </div>
        </div>

        {/* Recharts Graph */}
        {data.length === 0 ? (
          <div className="text-center py-12 text-muted-foreground">
            No revenue data available for the selected period
          </div>
        ) : (
          <div className="w-full h-[400px]">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={data}
                margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
                <XAxis
                  dataKey="label"
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                />
                <YAxis
                  className="text-xs"
                  tick={{ fill: "hsl(var(--muted-foreground))" }}
                  tickFormatter={(value) => `৳${(value / 1000000).toFixed(1)}M`}
                />
                <Tooltip
                  content={<CustomTooltip />}
                  cursor={{ fill: "hsl(var(--muted))", opacity: 0.3 }}
                />
                <Legend
                  wrapperStyle={{
                    paddingTop: "20px",
                  }}
                  iconType="square"
                />
                <Bar
                  dataKey="value"
                  name="Revenue"
                  fill="hsl(var(--primary))"
                  radius={[8, 8, 0, 0]}
                  animationDuration={800}
                  className="fill-primary"
                />
              </BarChart>
            </ResponsiveContainer>
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
