"use server";

import { getToken } from "@/lib/auth";
import { revalidateTag } from "next/cache";

export const userDeleteAction = async (id: number) => {
  // check token
  const token = await getToken(); // assuming getToken is async
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // check id
  if (!id) {
    return { error: "Invalid id" };
  }

  try {
    const res = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/delete/${id}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (res.ok) {
      revalidateTag("user-list");
      const data = await res.json();
      return data;
    } else {
      const errorData = await res.json();
      return { error: errorData?.message || "Failed to delete user." };
    }
  } catch (error: any) {
    console.error("error =>", error);
    return { error: error?.message || "An unexpected error occurred." };
  }
};
