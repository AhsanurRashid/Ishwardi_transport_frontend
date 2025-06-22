"use server"

import { getToken } from "@/lib/auth";


export const getUserForEditAction = async (id: number) => {
  // Check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // API call execution
  try {
    ("use cache");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/edit/${id}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["user-edit"] },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return { error: errorData?.message || "Failed to fetch user data." };
    }
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching user details for edit",
      }
    );
  }
};