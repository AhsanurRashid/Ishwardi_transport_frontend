"use server";

import { getToken, removeToken } from "@/lib/auth";
import axios from "axios";

export async function logoutAction() {
  const token = await getToken();
  if (!token) {
    return { error: "Unauthorized access, please log in." };
  }
  try {
    const response = await axios.post(
      `${process.env.API_URL}/logout`,
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
    if (response.data?.code === 200) {
      await removeToken();
    }
    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "An error occurred during logout" };
  }
}
