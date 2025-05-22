
import { Page } from "./types";
import { Users, LayoutDashboard, Truck, Phone, ShipWheel } from "lucide-react";

export const pages: Page[] = [ 
{
    name: "Dashboard",
    icon: LayoutDashboard,
    href: "/dashboard",    
  },                           
  {
    name: "User",
    icon: Users,
    href: "/dashboard/user",    
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
  }
]


// Mock user data
const users = Array.from({ length: 100 }, (_, i) => ({
  id: i + 1,
  name: `User ${i + 1}`,
  email: `user${i + 1}@example.com`,
  phone: `123-456-789${i % 10}`,
  role: i % 5 === 0 ? "Admin" : i % 3 === 0 ? "Editor" : "User",
  status: i % 4 === 0 ? "inactive" : "active",
}))

/**
 * Fetch users with pagination
 *
 * In a real application, this would be a server action or API call
 * that fetches data from a database with proper pagination
 */
export async function fetchUsers(page = 1, pageSize = 10) {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 800))

  // Calculate start and end indices
  const start = (page - 1) * pageSize
  const end = start + pageSize

  // Return paginated data and total count
  return {
    data: users.slice(start, end),
    total: users.length,
  }
}

