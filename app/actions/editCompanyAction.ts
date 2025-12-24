"use server";

import { getToken } from "@/lib/auth";
import { CompanyCreationFromSchema } from "@/lib/schema";
import { revalidateTag } from "next/cache";

export const updateCompanyAction = async (formData: FormData, id: number) => {
  // Check token
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // Data validation
  const companyData = {
    company_name: formData.get("company_name") as string,
    company_phone: formData.get("company_phone") as string,
    company_address: formData.get("company_address") as string,
    company_email: formData.get("company_email") as string,
    company_invoice_number: formData.get("company_invoice_number") as string,
    status: Number(formData.get("status")),
  };

  const validatedData = CompanyCreationFromSchema.safeParse(companyData);
  if (!validatedData.success) {
    return { error: "Invalid input", details: validatedData.error.errors };
  }

  // Add validated data
  const apiFormData = new FormData();
  Object.entries(validatedData.data).forEach(([key, value]) => {
    apiFormData.append(key, value.toString());
  });

  // API call execution
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/update/${id}`,
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: apiFormData,
      }
    );

    if (response.ok) {
      revalidateTag("company-list", "default");
      revalidateTag("activity-logs", "default");
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return { error: errorData?.message || "Failed to Update company." };
    }
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred during company update.",
      }
    );
  }
};
