"use server";

import { getToken } from "@/lib/auth";
import { convertDate } from "@/lib/data";
import { VehicleCreationFromSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export const createVehicleAction = async (data: FormData) => {
  // Check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // Data validation
  const vehicleData = {
    registration_number: data.get("registration_number") as string,
    chassis_number: data.get("chassis_number")?.toString() || undefined,
    engine_number: data.get("engine_number")?.toString() || undefined,
    vehicle_type: data.get("vehicle_type")?.toString() || undefined,
    brand: data.get("brand")?.toString() || undefined,
    model: data.get("model")?.toString() || undefined,
    manufacture_year: data.get("manufacture_year")?.toString() || undefined,
    color: data.get("color")?.toString() || undefined,

    fitness_certificate_number:
      data.get("fitness_certificate_number")?.toString() || undefined,
    fitness_certificate_expiry_date: data.get("fitness_certificate_expiry_date")
      ? (data.get("fitness_certificate_expiry_date") as unknown as Date)
      : undefined,
    tax_token_number: data.get("tax_token_number")?.toString() || undefined,
    tax_token_expiry_date: data.get("tax_token_expiry_date")
      ? (data.get("tax_token_expiry_date") as unknown as Date)
      : undefined,

    insurance_policy_number:
      data.get("insurance_policy_number")?.toString() || undefined,
    insurance_policy_expiry_date: data.get("insurance_policy_expiry_date")
      ? data.get("insurance_policy_expiry_date")?.toString()
      : null,

    owner_name: data.get("owner_name")?.toString() || undefined,
    owner_phone: data.get("owner_phone")?.toString() || undefined,
    owner_address: data.get("owner_address")?.toString() || undefined,
    owner_nid: data.get("owner_nid")?.toString() || undefined,

    status: data.get("status") as string,
    remarks: data.get("remarks")?.toString() || undefined,
  };

  const validateData = VehicleCreationFromSchema.safeParse(vehicleData);
  if (!validateData.success) {
    return { error: "Invalid input", details: validateData.error.errors };
  }

  const apiFromData = new FormData();

  // Get file data
  const image = data.get("image") as File;

  if (image) {
    apiFromData.append("image", image);
  }

  Object.entries(validateData.data).forEach(([key, value]) => {
    if (value !== null && value !== undefined) {
      if (
        key === "fitness_certificate_expiry_date" ||
        key === "tax_token_expiry_date" ||
        key === "insurance_policy_expiry_date"
      ) {
        apiFromData.append(key, convertDate(value as Date));
      } else {
        apiFromData.append(key, value.toString());
      }
    }
  });

  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/vehicle/create`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: apiFromData,
      }
    );
    if (response.ok) {
      try {
        revalidateTag("vehicle-list", "default");
        revalidateTag("dashboard-data", "default");
        revalidateTag("activity-logs", "default");
      } catch (err) {
        console.error("Revalidation failed:", err);
      }
    }
    const result = await response.json();
    return result;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred during vehicle creation",
      }
    );
  }
};
