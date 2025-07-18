"use client";

import { deleteVehicleAction } from "@/app/actions/deleteVehicleAction";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Edit, Loader2, MoreHorizontal, Trash2, TriangleAlert } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import Link from "next/link";
import { useRoleStore } from "@/store/roleStore";

const VehicleAction = ({ vehicleId }: { vehicleId: number }) => {
  const {roleValue} = useRoleStore()
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const actionSuccessful = useRef(false);

  if (roleValue !== "Admin") {
    return null
  }

  const handleAction = async () => {
    startTransition(async () => {
      const data = await deleteVehicleAction(vehicleId);

      if (data.code === 200) {
        toast.success(data.message, {
          description: data.message || "Vehicle deleted successfully",
          duration: 2000,
        });
        actionSuccessful.current = true;
        setOpen(false);
      } else {
        toast.error(data.message, {
          description: data.message || "Vehicle not deleted",
          duration: 2000,
        });
        actionSuccessful.current = false;
      }
    });
  };

  const handleOpenChange = (newOpen: boolean) => {
    // If trying to close the dropdown
    if (!newOpen) {
      // Only allow closing if we're not in a pending state or if the action was successful
      if (!isPending || actionSuccessful.current) {
        setOpen(false);
        // Reset the success flag after closing
        actionSuccessful.current = false;
      }
    } else {
      // Always allow opening
      setOpen(true);
    }
  };

  return (
    <>
      <DropdownMenu open={open} onOpenChange={handleOpenChange}>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <Link href={`/dashboard/vehicles/${vehicleId}`}>
            <DropdownMenuItem className="cursor-pointer text-primary hover:text-primary-foreground">
              <Edit className="mr-2 h-4 w-4" />
              Edit Vehicle
            </DropdownMenuItem>
          </Link>
          <DropdownMenuItem
            onClick={handleAction}
            className="text-red-600 focus:text-red-600"
          >
            {isPending ? (
              <div className="flex justify-center w-full">
                <Loader2 className="mr-2 h-4 w-4 animate-spin" />
              </div>
            ) : (
              <>
                <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete Vehicle
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default VehicleAction;
