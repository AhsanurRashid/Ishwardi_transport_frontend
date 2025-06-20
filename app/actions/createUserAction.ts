"use server";

import { getToken } from "@/lib/auth";
import { UserCreationFromSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export const createUserAction = async (formData: FormData) => {
  //check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  //data validation
  const userData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    password: formData.get("password") as string,
    address: formData.get("address") as string,
    role_id: Number(formData.get("role_id")),
    status: Number(formData.get("status")),
    nid: formData.get("nid") as string,
  };

  const validatedData = UserCreationFromSchema.safeParse(userData);
  if (!validatedData.success) {
    return { error: "Invalid input", details: validatedData.error.errors };
  }

  // Get file data
  const nidImage = formData.get("nid_image") as File;
  const thumbnail = formData.get("thumbnail") as File;

  // Add validated data
  const apiFormData = new FormData();
  Object.entries(validatedData.data).forEach(([key, value]) => {
    apiFormData.append(key, value.toString());
  });

  // Add files
  apiFormData.append("nid_image", nidImage);
  apiFormData.append("thumbnail", thumbnail);

  // api call execution
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/user/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: apiFormData,
      }
    );

    if (response.ok) {
      try {
        revalidateTag("user-list");
      } catch (err) {
        console.error("Revalidate failed:", err);
      }
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return error.response?.data || { error: "An error occurred during login" };
  }
};
