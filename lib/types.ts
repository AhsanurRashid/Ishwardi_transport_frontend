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
  address: string  | null;
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