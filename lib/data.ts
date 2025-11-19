import { Page } from "./types";
import {
  Users,
  LayoutDashboard,
  Truck,
  ShipWheel,
  UserCog,
  BadgeDollarSign,
  Building2Icon,
} from "lucide-react";

export const pages: Page[] = [
  {
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",
  },
  {
    name: "Users",
    icon: Users,
    href: "/dashboard/users",
  },
  {
    name: "Companies",
    icon: Building2Icon,
    href: "/dashboard/companies",
  },
  {
    name: "Roles",
    icon: UserCog,
    href: "/dashboard/roles",
  },
  {
    name: "Drivers",
    icon: ShipWheel,
    href: "/dashboard/drivers",
  },
  {
    name: "Vehicles",
    icon: Truck,
    href: "/dashboard/vehicles",
  },
  {
    name: "Rents",
    icon: BadgeDollarSign,
    href: "/dashboard/rents",
  },
];

// Mock user data
const users = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `123-456-789${i % 10}`,
  role: i % 5 === 0 ? "Admin" : i % 3 === 0 ? "Editor" : "User",
  status: i % 4 === 0 ? "inactive" : "active",
}));

/**
 * Fetch users with pagination
 *
 * In a real application, this would be a server action or API call
 * that fetches data from a database with proper pagination
 */
export async function fetchUsers(page = 1, pageSize = 10) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800));

  // Calculate start and end indices
  const start = (page - 1) * pageSize;
  const end = start + pageSize;

  // Return paginated data and total count
  return {
    data: users.slice(start, end),
    total: users.length,
  };
}

/**
 * Returns an array of years from the given start year to the given end year (inclusive)
 *
 * @param {number} [start=1952] - The start year of the range
 * @param {number} [end=2025] - The end year of the range
 * @returns {number[]} - An array of years in the given range
 */
export function getYearsArray(start = 1952, end = 2025) {
  const years = [];
  for (let year = start; year <= end; year++) {
    years.push(year);
  }
  return years;
}

export function convertDate(dateStr: string | Date): string {
  const date = new Date(dateStr);
  const formatted = `${date.getFullYear()}-${
    date.getMonth() + 1
  }-${date.getDate()}`;
  return formatted;
}

export function deconvertDate(formatted: string): Date {
  const [year, month, day] = formatted.split("-").map(Number);
  return new Date(year, month - 1, day); // month is 0-indexed in JS
}

export const placeOptions = [
  {
    value: "ঈশ্বরদী",
    label: "ঈশ্বরদী",
  },
  {
    value: "ঢাকা",
    label: "ঢাকা",
  },
  {
    value: "চট্টগ্রাম",
    label: "চট্টগ্রাম",
  },
  {
    value: "রংপুর",
    label: "রংপুর",
  },
  {
    value: "রাজশাহী",
    label: "রাজশাহী",
  },
  {
    value: "খুলনা",
    label: "খুলনা",
  },
  {
    value: "বরিশাল",
    label: "বরিশাল",
  },
  {
    value: "সিলেট",
    label: "সিলেট",
  },
  {
    value: "ময়মনসিংহ",
    label: "ময়মনসিংহ",
  },
];
