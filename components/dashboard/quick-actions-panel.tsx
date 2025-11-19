import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  PlusCircle,
  Truck,
  ShipWheel,
  Building2Icon,
  BadgeDollarSign,
} from "lucide-react";
import Link from "next/link";

export function QuickActionsPanel() {
  const actions = [
    {
      label: "Create New Rent",
      icon: BadgeDollarSign,
      href: "/dashboard/rents?action=create",
      color: "bg-primary hover:bg-primary/90 text-primary-foreground",
    },
    {
      label: "Add Vehicle",
      icon: Truck,
      href: "/dashboard/vehicles?action=create",
      color: "bg-green-600 hover:bg-green-700 text-white",
    },
    {
      label: "Register Driver",
      icon: ShipWheel,
      href: "/dashboard/drivers?action=create",
      color: "bg-blue-600 hover:bg-blue-700 text-white",
    },
    {
      label: "Add Company",
      icon: Building2Icon,
      href: "/dashboard/companies?action=create",
      color: "bg-orange-600 hover:bg-orange-700 text-white",
    },
  ];

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <PlusCircle className="h-5 w-5" />
          Quick Actions
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
          {actions.map((action, index) => (
            <Link key={index} href={action.href}>
              <Button
                className={`w-full h-auto py-4 flex-col gap-2 ${action.color}`}
              >
                <action.icon className="h-6 w-6" />
                <span className="text-sm font-medium">{action.label}</span>
              </Button>
            </Link>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
