import { z } from "zod";

export const LoginFormSchema = z.object({
    id: z.string().min(2, {
        message: "Username must be at least 2 characters.",
    }),
    password: z.string().min(8, {
        message: "Password must be at least 8 characters.",
    }),
})

export const AddUserFormSchema = z.object({
    name: z.string().min(1, "Name is required"),
    number: z.string().min(1, "Contact is required"),
    documents: z
    .array(z.any()) // You can be more specific if needed
    .min(1, "At least one document is required"),
})
