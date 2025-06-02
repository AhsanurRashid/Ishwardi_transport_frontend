"use server";
import { getToken } from "@/lib/auth";

export async function getUserListAction(
  { 
    query = '',
    page = 1,
    limit = 10
  }: {
    query?: string;
    page?: number;
    limit?: number;
  }
) {

  //token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  //api call
  try {
    ("use cache");
    const response = await fetch(
      `${process.env.API_URL}/user/list?query=${encodeURIComponent(query)}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        cache: "force-cache",
        next: { tags: ["user-list"] },
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch user list" };
    };
    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching user list",
      }
    );
  }
}
