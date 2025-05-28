'use server'
import { getToken } from "@/lib/auth";
import axios from "axios";

export async function getUserListAction() {
    const token = await getToken();
    if (!token) {
        return { error: "Unauthorized access, please log in." };
    }
    try {
        const response = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/user/list`,
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );
        return response.data;
    } catch (error: any) {
        return error.response?.data || { error: "An error occurred while fetching user list" };
    }
}