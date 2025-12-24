"use server";

import { getToken } from "@/lib/auth";
import { EditUserProfileFormSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export const updateUserAction = async (formData: FormData, id: number) => {
  // Check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // Data validation
  const userData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    address: formData.get("address") as string,
    role_id: Number(formData.get("role_id")),
    status: Number(formData.get("status")),
    nid: formData.get("nid") as string,
  };

  const validatedData = EditUserProfileFormSchema.safeParse(userData);
  if (!validatedData.success) {
    return { error: "Invalid input", details: validatedData.error.errors };
  }

  // Get file data
  const nidImage = formData.get("nidimage") as File;
  const thumbnail = formData.get("thumbnail") as File;

  // Add validated data
  const apiFormData = new FormData();
  Object.entries(validatedData.data).forEach(([key, value]) => {
    apiFormData.append(key, value.toString());
  });

  // Add files
  apiFormData.append("nidimage", nidImage);
  apiFormData.append("thumbnail", thumbnail);

  // API call execution
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/update/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: apiFormData,
      }
    );

    if (response.ok) {
      revalidateTag("user-list", "default");
      revalidateTag("activity-logs", "default");
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return { error: errorData?.message || "Failed to update user." };
    }
  } catch (error: any) {
    return error.response?.data || { error: "An unexpected error occurred." };
  }
};
