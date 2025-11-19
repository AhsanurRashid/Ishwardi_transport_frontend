"use client";

import { AdvancedRevenueChart } from "@/components/dashboard/advanced-revenue-chart";
import { useState, useEffect, useTransition } from "react";
import { getRevenueAnalytics } from "@/app/actions/getRevenueAnalyticsAction";
import { toast } from "sonner";

interface RevenueDataPoint {
  label: string;
  value: number;
  date: string;
}

interface RevenueChartData {
  data: RevenueDataPoint[];
  totalRevenue: number;
  averageRevenue: number;
}

// Generate mock data based on period
function generateMockData(
  period: "monthly" | "yearly" | "lifetime" | "custom",
  startDate?: Date,
  endDate?: Date
): RevenueChartData {
  if (period === "monthly") {
    // Last 12 months
    const months = [
      "Jan",
      "Feb",
      "Mar",
      "Apr",
      "May",
      "Jun",
      "Jul",
      "Aug",
      "Sep",
      "Oct",
      "Nov",
      "Dec",
    ];
    const currentMonth = new Date().getMonth();
    const currentYear = new Date().getFullYear();

    const data: RevenueDataPoint[] = [];
    for (let i = 11; i >= 0; i--) {
      const monthIndex = (currentMonth - i + 12) % 12;
      const year = currentMonth - i < 0 ? currentYear - 1 : currentYear;
      data.push({
        label: months[monthIndex],
        value: Math.floor(Math.random() * 2000000) + 1000000,
        date: new Date(year, monthIndex, 1).toISOString(),
      });
    }

    const total = data.reduce((sum, d) => sum + d.value, 0);
    return {
      data,
      totalRevenue: total,
      averageRevenue: Math.floor(total / data.length),
    };
  } else if (period === "yearly") {
    // Last 5 years
    const currentYear = new Date().getFullYear();
    const data: RevenueDataPoint[] = [];

    for (let i = 4; i >= 0; i--) {
      const year = currentYear - i;
      data.push({
        label: year.toString(),
        value: Math.floor(Math.random() * 20000000) + 15000000,
        date: new Date(year, 0, 1).toISOString(),
      });
    }

    const total = data.reduce((sum, d) => sum + d.value, 0);
    return {
      data,
      totalRevenue: total,
      averageRevenue: Math.floor(total / data.length),
    };
  } else if (period === "lifetime") {
    // Yearly from inception (e.g., 2020 to current)
    const currentYear = new Date().getFullYear();
    const startYear = 2020;
    const data: RevenueDataPoint[] = [];

    for (let year = startYear; year <= currentYear; year++) {
      data.push({
        label: year.toString(),
        value: Math.floor(Math.random() * 18000000) + 12000000,
        date: new Date(year, 0, 1).toISOString(),
      });
    }

    const total = data.reduce((sum, d) => sum + d.value, 0);
    return {
      data,
      totalRevenue: total,
      averageRevenue: Math.floor(total / data.length),
    };
  } else {
    // Custom date range - generate daily/weekly data
    if (!startDate || !endDate) {
      return { data: [], totalRevenue: 0, averageRevenue: 0 };
    }

    const data: RevenueDataPoint[] = [];
    const daysDiff = Math.floor(
      (endDate.getTime() - startDate.getTime()) / (1000 * 60 * 60 * 24)
    );

    if (daysDiff <= 31) {
      // Daily data
      for (let i = 0; i <= daysDiff; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i);
        data.push({
          label: date.getDate().toString(),
          value: Math.floor(Math.random() * 200000) + 50000,
          date: date.toISOString(),
        });
      }
    } else {
      // Weekly data
      const weeks = Math.ceil(daysDiff / 7);
      for (let i = 0; i < weeks; i++) {
        const date = new Date(startDate);
        date.setDate(date.getDate() + i * 7);
        data.push({
          label: `Week ${i + 1}`,
          value: Math.floor(Math.random() * 1500000) + 500000,
          date: date.toISOString(),
        });
      }
    }

    const total = data.reduce((sum, d) => sum + d.value, 0);
    return {
      data,
      totalRevenue: total,
      averageRevenue: data.length > 0 ? Math.floor(total / data.length) : 0,
    };
  }
}

export function RevenueChartWrapper() {
  const [isPending, startTransition] = useTransition();
  const [chartData, setChartData] = useState<RevenueChartData>(
    generateMockData("monthly")
  );

  const handleFilterChange = async (filter: {
    period: "monthly" | "yearly" | "lifetime" | "custom";
    startDate?: Date;
    endDate?: Date;
  }) => {
    startTransition(async () => {
      // TODO: Replace with actual API call
      // const result = await getRevenueAnalytics({
      //   period: filter.period,
      //   startDate: filter.startDate?.toISOString(),
      //   endDate: filter.endDate?.toISOString(),
      // });

      // if (result.error) {
      //   toast.error(result.error);
      //   return;
      // }

      // For now, use mock data
      const mockData = generateMockData(
        filter.period,
        filter.startDate,
        filter.endDate
      );
      setChartData(mockData);

      toast.success(`Updated to ${filter.period} view`);
    });
  };

  return (
    <AdvancedRevenueChart
      data={chartData.data}
      totalRevenue={chartData.totalRevenue}
      averageRevenue={chartData.averageRevenue}
      onFilterChange={handleFilterChange}
    />
  );
}
