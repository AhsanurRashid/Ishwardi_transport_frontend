"use server";

import { getToken } from "@/lib/auth";

export const getUserDataAction = async () => {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }
  try {
    const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/profile`, {
      method: "GET",
      headers: {
        Authorization: `Bearer ${token}`,
      },
      cache: "force-cache",
      next: { tags: ["user-data"] },
    });

    if (!response.ok) {
      return { error: "Failed to fetch user data" };
    }
    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching user data",
      }
    );
  }
};
