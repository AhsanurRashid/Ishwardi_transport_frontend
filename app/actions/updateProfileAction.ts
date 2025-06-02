"use server";

import { getToken } from "@/lib/auth";
import { EditUserProfileFormSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export async function updateProfileAction(formData: FormData) {
  //token checking
  const token = getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  //data validation
  const validatedData = EditUserProfileFormSchema.safeParse({
    name: formData.get("name")?.toString(),
    phone: formData.get("phone")?.toString(),
    nid: formData.get("nid")?.toString(),
    nid_image: formData.get("nid_image")?.toString() || undefined,
    address: formData.get("address")?.toString(),
    thumbnail: formData.get("thumbnail")?.toString() || undefined,
    role: formData.get("role")?.toString(),
    permissions: JSON.parse(formData.get("permissions")?.toString() || "[]"),
  });
  if (!validatedData.success) {
    return { error: "Invalid input", details: validatedData.error.errors };
  }

  console.log("validatedData =>", validatedData);

  // api call execution
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/profile/update`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(validatedData.data),
      }
    );
    console.log("response =>", response);
    // if (!response.ok) {
    //   return { error: "Failed to update user profile" };
    // }

    revalidateTag("user-data");
    return response.json();
  } catch (error: any) {
    console.log("error =>", error);
    return (
      error.response?.data || {
        error: "An error occurred while updating user profile",
      }
    );
  }
}
