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
export interface User {
  id: number | null;
  name: string | null;
  email: string | null;
  phone: string | null;
  nid: string | null;
  nid_image: string | null;
  address: string | null;
  thumbnail: string | null;
  status: string | null;
  role: string | null;
  role_id: number | null;
}

export interface UserListResponse {
  code: number;
  message: string;
  list: User[];
  error?: string;
}

export interface UserSearchParams {
  query?: string;
  page?: number;
  limit?: number;
}

export interface PermissionMap {
  [key: string]: string;
}