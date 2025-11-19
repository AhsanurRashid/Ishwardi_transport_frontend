"use server";

import { getToken } from "@/lib/auth";

export async function getRentListAction({
  query = "",
  page = 1,
  limit = 10,
}: {
  query?: string;
  page?: number;
  limit?: number;
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
      `${process.env.NEXT_PUBLIC_API_URL}/rent/list?query=${encodeURIComponent(
        query
      )}&page=${page}&limit=${limit}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        next: { tags: ["rent-list"] },
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch driver list" };
    }
    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching rent list",
      }
    );
  }
}

export async function getRentForEditAction(rentId: number) {
  // Token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // API call
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rent/${rentId}`,
      {
        method: "GET",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.ok) {
      return { error: "Failed to fetch rent details" };
    }
    return response.json();
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while fetching rent details",
      }
    );
  }
}

export async function deleteRentAction(rentId: number) {
  // Token checking
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }

  // API call
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rent/${rentId}`,
      {
        method: "DELETE",
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    const data = await response.json();

    if (response.ok) {
      try {
        const { revalidateTag } = await import("next/cache");
        revalidateTag("rent-list");
      } catch (err) {
        console.error("Revalidation failed:", err);
      }
    }

    return data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while deleting rent",
      }
    );
  }
}

export async function editRentAction(rentId: number, formData: FormData) {
  // Token checking
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
    date: new Date(formData.get("date") as string),
    rentAmount: formData.get("rentAmount") as string,
    demurrageAmount: formData.get("demurrageAmount") as string,
    fromLocation: formData.get("fromLocation") as string,
    toLocation: formData.get("toLocation") as string,
    dueAmount: formData.get("dueAmount") as string,
    status: Number(formData.get("status")),
  };

  const { RentCreationFromSchema } = await import("@/lib/schema");
  const validatedData = RentCreationFromSchema.safeParse(rentData);
  if (!validatedData.success) {
    return { error: "Invalid input", details: validatedData.error.errors };
  }

  // Prepare API data
  const apiData = {
    ...validatedData.data,
    date: validatedData.data.date.toISOString(),
  };

  // API call
  try {
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/rent/${rentId}`,
      {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(apiData),
      }
    );

    const data = await response.json();

    if (response.ok) {
      try {
        const { revalidateTag } = await import("next/cache");
        revalidateTag("rent-list");
      } catch (err) {
        console.error("Revalidation failed:", err);
      }
    }

    return data;
  } catch (error: any) {
    return (
      error.response?.data || {
        error: "An error occurred while updating rent",
      }
    );
  }
}
