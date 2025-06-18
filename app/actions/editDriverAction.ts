"use server";

import { getToken } from "@/lib/auth";
import { DriverCreationFromSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export const updateDriverAction = async (formData: FormData, id: number) => {
  // Check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // Data validation
  const driverData = {
    name: formData.get("name") as string,
    phone: formData.get("phone") as string,
    nid: formData.get("nid") as string,
    address: formData.get("address") as string,
    status: Number(formData.get("status")),
  };

  const validatedData = DriverCreationFromSchema.safeParse(driverData);
  if (!validatedData.success) {
    return { error: "Invalid input", details: validatedData.error.errors };
  }

  // Get file data
  const nidImage = formData.get("nidimage") as File;

  // Add validated data
  const apiFormData = new FormData();
  Object.entries(validatedData.data).forEach(([key, value]) => {
    apiFormData.append(key, value.toString());
  });

  // Add files
  apiFormData.append("nidimage", nidImage);

  // API call execution
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/driver/update/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: apiFormData,
      }
    );

    if (response.ok) {
        revalidateTag("driver-list");
        const data = await response.json();
        return data;
      } else {
        const errorData = await response.json();
        return { error: errorData?.message || "Failed to Update driver." };
      }
  } catch (error: any) {
    return error.response?.data || { error: "An error occurred during login" };
  }
};
