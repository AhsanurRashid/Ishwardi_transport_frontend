"use server";
import { getToken } from "@/lib/auth";

export async function getTotalRolesAction() {
  //token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  //api call
  try {
    ("use cache");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/role/list`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["role-list"] },
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch role list" };
    }
    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching role list",
      }
    );
  }
}
