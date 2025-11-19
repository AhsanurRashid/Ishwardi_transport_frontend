"use server";

import { getToken } from "@/lib/auth";

interface RevenueFilterParams {
  period?: "monthly" | "yearly" | "lifetime" | "custom";
  startDate?: string;
  endDate?: string;
}

export async function getRevenueAnalytics(filters: RevenueFilterParams = {}) {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const params = new URLSearchParams();
    if (filters.period) params.append("period", filters.period);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/dashboard/revenue-analytics?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch revenue analytics" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching revenue analytics" };
  }
}

export async function getMonthlyRevenueData(year?: number) {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const params = new URLSearchParams();
    if (year) params.append("year", year.toString());

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/dashboard/revenue/monthly?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch monthly revenue data" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching monthly revenue data" };
  }
}

export async function getYearlyRevenueData(
  startYear?: number,
  endYear?: number
) {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const params = new URLSearchParams();
    if (startYear) params.append("startYear", startYear.toString());
    if (endYear) params.append("endYear", endYear.toString());

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/dashboard/revenue/yearly?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch yearly revenue data" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching yearly revenue data" };
  }
}

export async function getLifetimeRevenueData() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/revenue/lifetime`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch lifetime revenue data" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching lifetime revenue data" };
  }
}

export async function getCustomDateRangeRevenue(
  startDate: string,
  endDate: string
) {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const params = new URLSearchParams({
      startDate,
      endDate,
    });

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/dashboard/revenue/custom?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch custom date range revenue" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return {
      error: "An error occurred while fetching custom date range revenue",
    };
  }
}

export async function exportRevenueReport(filters: RevenueFilterParams = {}) {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const params = new URLSearchParams();
    if (filters.period) params.append("period", filters.period);
    if (filters.startDate) params.append("startDate", filters.startDate);
    if (filters.endDate) params.append("endDate", filters.endDate);

    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/dashboard/revenue/export?${params.toString()}`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to export revenue report" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while exporting revenue report" };
  }
}
