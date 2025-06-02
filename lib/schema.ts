import { z } from "zod";

export const LoginFormSchema = z.object({
  phone: z
    .string()
    .regex(
      /^(\+?88)?01[3-9]\d{8}$/,
      "Invalid phone number. Please use a valid Bangladeshi phone number format."
    ),
  password: z.string().min(8, {
    message: "Password must be at least 8 characters.",
  }),
});

export const AddUserFormSchema = z.object({
  name: z.string().min(1, "Name is required"),
  number: z.string().min(1, "Contact is required"),
  documents: z
    .array(z.any()) // You can be more specific if needed
    .min(1, "At least one document is required"),
});

// export const EditUserProfileFormSchema = z.object({
//   name: z.string().min(1, "Name is required"),
//   address: z.string().min(1, "Address is required"),
//   nid: z.string().min(1, "NID is required"),

//   // Optional image file, but if provided, must be an image
//   nid_image: z.any().optional(),

//   // Optional fields
//   email: z.string().email("Invalid email address").optional(),
//   phone: z
//     .string()
//     .transform((val) => (val === "" ? null : val))
//     .refine((val) => !val || /^(\+?88)?01[3-9]\d{8}$/.test(val), {
//       message:
//         "Invalid phone number. Please use a valid Bangladeshi phone number format.",
//     })
//     .optional(),

//   thumbnail: z.any().optional(),
//   role: z.string().optional(),
//   permissions: z
//     .union([
//       z.array(z.string()),
//       z.null(),
//       z.string().length(0), // handles empty string
//     ])
//     .transform((val) => (Array.isArray(val) ? val : []))
//     .optional(),
// });

// export const EditUserProfileFormSchema = z.object({
//   name: z
//     .string()
//     .min(1, "Name is required")
//     .max(100, "Name must be at most 100 characters"),

//   email: z.string().email("Invalid email address").nullable().optional(),

//   phone: z
//     .string()
//     .regex(/^01[3-9]\d{8}$/, "Invalid Bangladeshi phone number")
//     .nullable()
//     .optional(),

//   nid: z
//     .string()
//     .regex(/^\d+$/, "NID must be numeric")
//     .min(5, "NID is too short")
//     .max(30, "NID is too long")
//     .nullable()
//     .optional(),

//   nid_image: z.any().nullable().optional(), // Adjust with custom file validation if needed

//   address: z.string().min(1, "Address is required").nullable().optional(),

//   thumbnail: z.any().nullable().optional(), // Adjust with file validation if required

//   role: z.string().min(1, "Role is required").nullable().optional(),

//   permissions: z.array(z.string()).nullable().optional(),
// });

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
