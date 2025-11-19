"use server"

import { getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export const deleteDriverAction = async (id: number) => {
  // Check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // Check id
  if (!id) {
    return { error: "Invalid id" };
  }

    // API call to delete driver
  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/driver/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (res.ok) {
      revalidateTag("driver-list");
      const data = await res.json();
      return data;
    } else {
      const errorData = await res.json();
      return { error: errorData?.message || "Failed to delete driver." };
    }
  } catch (error: any) {
    return { error: error?.message || "An unexpected error occurred." };
  }
}