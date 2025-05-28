import { LucideIcon } from "lucide-react";

export interface Page {
    name: string;
    icon: LucideIcon;
    href: string;
}

export interface UserProfile {
  name: string;
  email?: string;
  phone: string;
  address: string;
  thumbnail: string;
  role: string;
  permissions: string[];
}

export interface UserType {
  id: number;
  name: string | null;
  email: string | null;
  phone: string | null;
  address: string  | null;
  thumbnail: string | null;
  status: string | null;
  role: string | null;
  role_id: number | null;
}