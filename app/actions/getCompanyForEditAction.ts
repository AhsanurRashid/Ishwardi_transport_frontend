"use server";

import { getToken } from "@/lib/auth";

export async function getCompanyForEditAction({
  companyId = 0,
}: {
  companyId?: number;
}) {
  // Token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // API call
  try {
    ("use cache");
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/company/edit/${companyId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["company-edit"] },
      }
    );

    if (response.ok) {
      const data = await response.json();
      return data;
    } else {
      const errorData = await response.json();
      return { error: errorData?.message || "Failed to fetch company data." };
    }
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching company details for edit",
      }
    );
  }
}
