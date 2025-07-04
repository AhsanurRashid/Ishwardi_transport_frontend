import VehicleTable from "@/components/dashboard/vehicle/vehicle-tbale";
import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const VehiclesPage = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Vehicle Management</h1>
        <Link href="/dashboard/vehicles/add-vehicle">
          <Button className="cursor-pointer">
            <Plus />
            Add Vehicle
          </Button>
        </Link>
      </div>
      <VehicleTable />
    </div>
  );
};

export default VehiclesPage;
