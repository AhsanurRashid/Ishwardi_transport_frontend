"use server";

import { getToken } from "@/lib/auth";
import { RoleCreationFromSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export const createRoleAction = async (formData: FormData) => {
  //check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // api call execution
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/role/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      }
    );

    if (response.ok) {
      revalidateTag("role-list");
      revalidateTag("user-data");
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return { error: errorData?.message || "Failed to create role." };
    }
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred during role creation",
      }
    );
  }
};
