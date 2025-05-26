import { z } from "zod";

export const LoginFormSchema = z.object({
    phone: z.string().regex(
        /^(\+?88)?01[3-9]\d{8}$/,
        "Invalid phone number. Please use a valid Bangladeshi phone number format."
    ),
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

// export const AddVehicleFormSchema = z.object({
//     number: z.string().min(1, "Contact is required"),
//     documents: z
//     .array(z.any()) // You can be more specific if needed
//     .min(1, "At least one document is required"),
//     driver
// })