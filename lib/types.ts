import { LucideIcon } from "lucide-react";

export interface Page {
  name: string;
  icon: LucideIcon;
  href: string;
}

export interface UserProfile {
  name: string | null;
  email?: string | null;
  phone: string | null;
  nid: string | null;
  nid_image: string | null;
  address: string | null;
  thumbnail: string | null;
  role: ["admin", "user", "moderator", "editor"] | null;
  permissions: string[] | null;
}

export interface UserType {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string | null;
  thumbnail: string | null;
  status: string | null;
  role: ["admin", "user", "moderator", "editor"] | null;
  role_id: number | null;
}
export interface UserData {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  nid: string | null;
  nid_image: string | null;
  address: string | null;
  thumbnail: string | null;
  status: Status | null;
  role: string | null;
  role_id: number | null;
}

export interface UserListResponse {
  code: number;
  message: string;
  list: UserData[];
  error?: string;
}

export interface UserSearchParams {
  query?: string;
  page?: number;
  limit?: number;
}
export interface PermissionListResponse {
  code: number;
  message: string;
  list: PermissionList;
  error?: string;
}
export interface PermissionMap {
  [key: string]: string;
}

export interface PermissionList {
  user_list: string;
  user_create: string;
  user_edit: string;
  user_delete: string;
  permission_list: string;
  permission_edit: string;
  permission_create: string;
  permission_delete: string;
  role_list: string;
  role_create: string;
  role_edit: string;
  role_delete: string;
  user_profile: string;
  driver_list: string;
  driver_create: string;
  driver_edit: string;
  driver_delete: string;
}

export type Status = "0" | "1";

export interface Driver {
  id: number;
  name: string;
  phone: string;
  nid: string;
  nid_image: string;
  address: string;
  status: Status;
}

export interface IVehicle {
  id: number;
  registration_number: string;
  chassis_number: string;
  engine_number: string;
  vehicle_type: string;
  brand: string;
  model: string;
  manufacture_year: string; // Consider changing to `Date` if you parse it as a Date object
  color: string;
  fitness_certificate_number: string;
  fitness_certificate_expiry_date: string; // Same here, could be Date
  tax_token_number: string;
  tax_token_expiry_date: string; // Same here, could be Date
  insurance_policy_number: string | null;
  insurance_policy_expiry_date: string | null;
  owner_name: string;
  owner_phone: string;
  owner_nid: string;
  owner_address: string;
  status: string; // You can use a union type like: "0" | "1" if status is limited
  remarks: string;
  image: string | null;
}

export interface ICompany {
  id: number;
  company_name: string;
  company_address: string;
  company_email: string;
  company_phone: string;
  company_invoice_number: string;
  status: Status; // or use a union type if it's always "0" | "1"
}

export interface ICompanyForRent {
  [x: string]: any;
  id: number;
  company_name: string;
  company_phone: string;
}

export interface IVehicleForRent {
  [x: string]: any;
  id: number;
  registration_number: string;
  chassis_number: string;
  vehicle_type: string;
  brand: string;
  model: string;
  owner_name: string;
  owner_phone: string; // or use a union type if it's always "0" | "1"
  list: any[];
}

export interface IDriversForRent {
  [x: string]: any;
  id: number;
  name: string;
  phone: string;
  list: any[];
}

export interface IRole {
  id: number;
  name: string;
  permissions: string[];
}

export interface IPermissionList {
  user_list: string;
  user_create: string;
  user_edit: string;
  user_delete: string;

  permission_list: string;
  permission_edit: string;
  permission_create: string;
  permission_delete: string;

  role_list: string;
  role_create: string;
  role_edit: string;
  role_delete: string;

  user_profile: string;

  driver_list: string;
  driver_create: string;
  driver_edit: string;
  driver_delete: string;

  company_list?: string;
  company_create?: string;
  company_edit?: string;
  company_delete?: string;

  rent_list?: string;
  rent_create?: string;
  rent_edit?: string;
  rent_delete?: string;
}

export interface IRent {
  id: number;
  company_id?: string;
  company: string;
  vehicle_id?: string;
  vehicle: string;
  driver_id?: string;
  driver: string;
  type: "up" | "down";
  payments_due?: number;
  from_date: string;
  to_date: string;
  rentAmount: string;
  demurrageAmount?: string;
  fromLocation: string;
  toLocation: string;
  dueAmount?: string;
  status: number; // 0: pending, 1: active, 2: completed, 3: cancelled
  createdAt?: string;
  updatedAt?: string;
}

export interface IPermissionResponse {
  list: IPermissionList;
}
