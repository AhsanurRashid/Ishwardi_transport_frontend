"use server";

import { getToken } from "@/lib/auth";

export async function getVehicleForEditAction(id: string) {
  // Token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
    }
    
  // API call
  try {
    ("use cache");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle/edit/${Number(id)}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["vehicle-edit"] },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return { error: errorData?.message || "Failed to fetch vehicle data." };
    }
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching driver details for edit",
      }
    );
  }
}
