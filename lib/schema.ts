import { Driver } from "./types";
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
  role_id: z.coerce.number().int().positive(),
  status: z.coerce.number().int().min(0).max(1),
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

//Vehicle Creation Schema
export const VehicleCreationFromSchema = z.object({
  //Truck Identification
  registration_number: z.string().min(2, {
    message: "Registration number must be at least 2 characters.",
  }),
  chassis_number: z.string().min(2, {
    message: "Chassis number must be at least 2 characters.",
  }),
  engine_number: z.string().min(2, {
    message: "Engine number must be at least 2 characters.",
  }),
  vehicle_type: z.string().min(2, {
    message: "Vehicle type must be at least 2 characters.",
  }),
  brand: z.string().min(2, {
    message: "Brand must be at least 2 characters.",
  }),
  model: z.string().min(2, {
    message: "Model must be at least 2 characters.",
  }),
  manufacture_year: z.string().min(4, {
    message: "Manufacture year must be at least 4 characters.",
  }),
  color: z.string().min(2, {
    message: "Color must be at least 2 characters.",
  }),

  //Legal Documents
  fitness_certificate_number: z.string().min(1, {
    message: "Fitness certificate number must be a positive number.",
  }),
  fitness_certificate_expiry_date: z.coerce
    .date()
    .refine((date) => date > new Date(), {
      message: "Fitness certificate expiry must be a future date.",
    }),
  tax_token_number: z.string().min(1, {
    message: "Tax token number must be a positive number.",
  }),
  tax_token_expiry_date: z.coerce.date().refine((date) => date > new Date(), {
    message: "Tax token expiry must be a future date.",
  }),
  insurance_policy_number: z.string().optional(),
  insurance_policy_expiry_date: z.coerce
    .date()
    .refine((date) => date > new Date(), {
      message: "Insurance expiry date must be a future date.",
    })
    .optional()
    .nullable(),

  //Ownership & Contact
  owner_name: z.string().min(2, {
    message: "Owner name must be at least 2 characters.",
  }),
  owner_phone: z.string().regex(bdPhoneRegex, {
    message:
      "Please enter a valid Bangladesh phone number (e.g., 01712345678 or +8801712345678).",
  }),
  owner_nid: z
    .string()
    .min(5, {
      message: "NID must be at least 5 characters.",
    })
    .max(20, {
      message: "NID must not exceed 20 characters.",
    }),
  owner_address: z.string().min(2, {
    message: "Owner address must be at least 2 characters.",
  }),

  //Operational Info
  status: z.coerce.number().int().min(0).max(3),
  remarks: z.string().optional(),

  /*
    Additional three image fields can be added here if needed.
    For example:  fontImage, sideImage, backImage, numberPlateImage
  */
});

export const CompanyCreationFromSchema = z.object({
  company_name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  company_phone: z.string().regex(bdPhoneRegex, {
    message:
      "Please enter a valid Bangladesh phone number (e.g., 01712345678 or +8801712345678).",
  }),
  company_address: z.string().min(2, {
    message: "Address must be at least 2 characters.",
  }),
  company_email: z.string().email().optional(),
  company_invoice_number: z.string().min(2, {
    message: "Invoice number must be at least 2 characters.",
  }),
  status: z.coerce.number().int().min(0).max(1),
});

export const RentCreationFromSchema = z.object({
  company: z.string().min(1, {
    message: "Company is required.",
  }),
  vehicle: z.string().min(1, {
    message: "Vehicle is required.",
  }),
  driver: z.string().min(1, {
    message: "Driver is required.",
  }),
  type: z.enum(["up", "down"], {
    required_error: "Please select a type.",
  }),
  date: z.date({
    required_error: "Date is required.",
  }),
  rentAmount: z
    .string()
    .min(1, {
      message: "Rent amount is required.",
    })
    .refine((val) => !isNaN(Number(val)) && Number(val) > 0, {
      message: "Rent amount must be a positive number.",
    }),
  demurrageAmount: z.string().optional(),
  fromLocation: z.string().min(1, {
    message: "From location is required.",
  }),
  toLocation: z.string().min(1, {
    message: "To location is required.",
  }),
  dueAmount: z.string().optional(),
  status: z.coerce.number().int().min(0).max(3),
});

export const RoleCreationFromSchema = z.object({
  name: z.string().min(2, {
    message: "Name must be at least 2 characters.",
  }),
  permission: z
    .array(z.string())
    .refine((value) => value.some((item) => item), {
      message: "You have to select at least one item.",
    }),
});
