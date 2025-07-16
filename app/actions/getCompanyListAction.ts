"use server";

import { getToken } from "@/lib/auth";

export async function getCompanyListAction({
  query = "",
  page = 1,
  limit = 10,
}: {
  query?: string;
  page?: number;
  limit?: number;
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
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/company/list?query=${encodeURIComponent(
        query
      )}&page=${page}&limit=${limit}`,
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
