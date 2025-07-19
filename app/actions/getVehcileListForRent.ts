"use server"

import { getToken } from "@/lib/auth";

export async function getVehicleListForRentAction() {
  // Token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // API call
  try {
    ("use cache");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rent/vehicle-list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["vehicle-list"] },
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch vehicle list" };
    }
    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching vehicle list",
      }
    );
  }
}