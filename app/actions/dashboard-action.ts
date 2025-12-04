"use server";

import { getToken } from "@/lib/auth";

export async function getDashboardDataAction() {
  // Token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // API call
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/dashboard`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["dashboard-data"] },
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch dashboard data" };
    }
    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching dashboard data",
      }
    );
  }
}
