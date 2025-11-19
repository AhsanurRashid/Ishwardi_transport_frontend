"use server";

import { getToken } from "@/lib/auth";

export async function getPermissionsAction() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/permission/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "force-cache",
        next: { tags: ["permission-list"] },
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch permission list data" };
    }

    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching permissions",
      }
    );
  }
}
