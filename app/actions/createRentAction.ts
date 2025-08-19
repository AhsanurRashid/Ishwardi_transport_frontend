"use server";

import { getToken } from "@/lib/auth";
import { DriverCreationFromSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";
import { date } from "zod";

export const createRentAction = async (formData: FormData) => {
  // Check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // Data validation
  const driverData = {
    company: formData.get("company") as string,
    vehicle: formData.get("vehicle") as string,
    driver: formData.get("driver") as string,
    type: formData.get("type") as "up" | "down",
    date: formData.get("date") as string,
    rentAmount: formData.get("rentAmount") as string,
    demurrageAmount: formData.get("demurrageAmount") as string,
    fromLocation: formData.get("fromLocation") as string,
    toLocation: formData.get("toLocation") as string,
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
      `${process.env.NEXT_PUBLIC_API_URL}/driver/create`,
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
        revalidateTag("driver-list");
      } catch (err) {
        console.error("Revalidation failed:", err);
      }
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred during driver creation",
      }
    );
  }
};
