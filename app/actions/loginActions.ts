"use server";

import { setRole, setToken } from "@/lib/auth";
import { LoginFormSchema } from "@/lib/schema";
import axios from "axios";

export async function logInSubmitFormAction(formData: FormData) {
  const validatedData = LoginFormSchema.safeParse({
    phone: formData.get("phone")?.toString(),
    password: formData.get("password")?.toString(),
  });

  if (!validatedData.success) {
    return { error: "Invalid input", details: validatedData.error.errors };
  }

  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/login`,
      validatedData.data
    );

    if (response.data?.code === 200) {
      await setToken(response.data.token);
      await setRole(response.data.role[0]);
    }

    return response.data;
  } catch (error: any) {
    return error.response?.data || { error: "An error occurred during login" };
  }
}
