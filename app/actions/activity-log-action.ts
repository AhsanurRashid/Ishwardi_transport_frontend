"use server";

import { getToken } from "@/lib/auth";

export async function getRecentActivityLogsAction(limit: number = 10) {
  // Token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // API call
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/activity-log/recent?limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["activity-logs"] },
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch activity logs" };
    }
    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching activity logs",
      }
    );
  }
}
