"use server";

import { getToken } from "@/lib/auth";

export async function getDriverForEditAction({
  driverId = 0,
}: {
  driverId?: number;
}) {
  // Token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // API call
  try {
    ("use cache");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/driver/edit/${driverId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["driver-edit"] },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return { error: errorData?.message || "Failed to fetch driver data." };
    }
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching driver details for edit",
      }
    );
  }
}
