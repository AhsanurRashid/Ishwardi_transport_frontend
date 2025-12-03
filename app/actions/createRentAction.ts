"use server";

import { getToken } from "@/lib/auth";
import { RentCreationFromSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export const createRentAction = async (formData: FormData) => {
  // Check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // Data validation
  const rentData = {
    company: formData.get("company") as string,
    vehicle: formData.get("vehicle") as string,
    driver: formData.get("driver") as string,
    type: formData.get("type") as "up" | "down",
    from_date: formData.get("from_date") as string,
    to_date: formData.get("to_date") as string,
    rentAmount: Number(formData.get("rentAmount")),
    demurrageAmount: formData.get("demurrageAmount")
      ? Number(formData.get("demurrageAmount"))
      : undefined,
    fromLocation: formData.get("fromLocation") as string,
    toLocation: formData.get("toLocation") as string,
    dueAmount: formData.get("dueAmount") as string,
    status: Number(formData.get("status")),
  };

  const validatedData = RentCreationFromSchema.safeParse(rentData);
  if (!validatedData.success) {
    return { error: "Invalid input", details: validatedData.error.errors };
  }

  // Prepare API data (no file uploads for rent)
  const apiData = validatedData.data;

  // API call execution
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rent/create`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiData),
      }
    );

    if (response.ok) {
      try {
        revalidateTag("rent-list");
      } catch (err) {
        console.error("Revalidation failed:", err);
      }
    }
    const data = await response.json();
    return data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred during rent creation",
      }
    );
  }
};
