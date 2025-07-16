"use client";
import { Button } from "@/components/ui/button";
import { useRoleStore } from "@/store/roleStore";
import { Plus } from "lucide-react";
import Link from "next/link";

const CreateVehicleBtn = () => {
    const { roleValue } = useRoleStore();
    if (roleValue !== "Admin") return null;
  return (
    <Link href="/dashboard/vehicles/add-vehicle">
      <Button className="cursor-pointer">
        <Plus />
        Create Vehicle
      </Button>
    </Link>
  );
};

export default CreateVehicleBtn;
