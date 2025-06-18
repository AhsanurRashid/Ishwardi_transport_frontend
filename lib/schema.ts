import { Driver } from './types';
import { z } from "zod";

export const LoginFormSchema = z.object({
  phone: z
    .string()
    .regex(
      /^(\+?88)?01[3-9]\d{8}$/,
      "Invalid phone number. Please use a valid Bangladeshi phone number format."
    ),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
});

export const AddUserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z.string().min(1, "Contact is required"),
  documents: z
    .array(z.any()) // You can be more specific if needed
    .min(1, "At least one document is required"),
});

const bdPhoneRegex = /^(\+88)?01[3-9]\d{8}$/;

export const EditUserProfileFormSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  email: z
    .string()
    .email({
      message: "Please enter a valid email address.",
    })
    .optional(),
  phone: z
    .string()
    .regex(bdPhoneRegex, {
      message:
        "Please enter a valid Bangladesh phone number (e.g., 01712345678 or +8801712345678).",
    })
    .optional(),
  nid: z
    .string()
    .min(5, {
      message: "NID must be at least 5 characters.",
    })
    .max(20, {
      message: "NID must not exceed 20 characters.",
    }),
  nid_image: z
    .instanceof(File, {
      message: "Please upload a valid NID image.",
    })
    .optional(),
  address: z.string().min(10, {
    message: "Address must be at least 10 characters.",
  }),
  thumbnail: z
    .instanceof(File, {
      message: "Please upload a valid thumbnail image.",
    })
    .optional(),
  role: z
    .enum(["Admin", "User", "Moderator", "Editor"], {
      required_error: "Please select a role.",
    })
    .optional(),
  permissions: z
    .array(z.string())
    .min(1, {
      message: "Please select at least one permission.",
    })
    .optional(),
});

export const UserCreationFromSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().regex(bdPhoneRegex, {
    message:
      "Please enter a valid Bangladesh phone number (e.g., 01712345678 or +8801712345678).",
  }),
  password: z.string().min(5, {
    message: "Password must be at least 5 characters.",
  }),
  nid: z
    .string()
    .min(5, {
      message: "NID must be at least 5 characters.",
    })
    .max(20, {
      message: "NID must not exceed 20 characters.",
    }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.", 
  }),
  role_id: z.coerce.number().int().positive(),
  status: z.coerce.number().int().min(0).max(1),
});


export const DriverCreationFromSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  phone: z.string().regex(bdPhoneRegex, {
    message:
      "Please enter a valid Bangladesh phone number (e.g., 01712345678 or +8801712345678).",
  }),
  nid: z
    .string()
    .min(5, {
      message: "NID must be at least 5 characters.",
    })
    .max(20, {
      message: "NID must not exceed 20 characters.",
    }),
  address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  status: z.coerce.number().int().min(0).max(1),
});