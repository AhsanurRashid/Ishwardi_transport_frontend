"use server";

import { getToken } from "@/lib/auth";

export async function getDashboardStats() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/stats`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch dashboard stats" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching dashboard stats" };
  }
}

export async function getMonthlyRevenue() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/monthly-revenue`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch monthly revenue" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching monthly revenue" };
  }
}

export async function getTopCompanies() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/top-companies`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch top companies" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching top companies" };
  }
}

export async function getVehicleUtilization() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/vehicle-utilization`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch vehicle utilization" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching vehicle utilization" };
  }
}

export async function getDriverAvailability() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/driver-availability`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch driver availability" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching driver availability" };
  }
}

export async function getExpiringDocuments() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/expiring-documents`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch expiring documents" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching expiring documents" };
  }
}

export async function getRecentRents() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/recent-rents`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch recent rents" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching recent rents" };
  }
}

export async function getRentStatusBreakdown() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/rent-status`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch rent status breakdown" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching rent status breakdown" };
  }
}

export async function getPopularRoutes() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/popular-routes`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch popular routes" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching popular routes" };
  }
}

export async function getManagementOverview() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/management-overview`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch management overview" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching management overview" };
  }
}

export async function getDashboardAlerts() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/alerts`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch dashboard alerts" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching dashboard alerts" };
  }
}

export async function getRecentActivities() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access" };
  }

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard/recent-activities`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "no-store",
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch recent activities" };
    }

    const data = await response.json();
    return data;
  } catch (error: any) {
    return { error: "An error occurred while fetching recent activities" };
  }
}
