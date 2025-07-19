"use server";

import { getToken } from "@/lib/auth";

export async function getCompanyListForRentAction() {
  // Token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // API call
  try {
    ("use cache");
    const response = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/rent/company-list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["company-list"] },
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch driver list" };
    }
    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching driver list",
      }
    );
  }
}
