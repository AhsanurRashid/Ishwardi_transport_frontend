"use client";

import { deleteDriverAction } from "@/app/actions/deleteDriver";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Edit, Loader2, MoreHorizontal, Trash2 } from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import EditDriverForm from "@/components/forms/edit-driver-form";
import { get } from "http";
import { getDriverForEditAction } from "@/app/actions/getDriverForEditAction";
import { Driver } from "@/lib/types";

const DriverActions = ({ driverId }: { driverId: number }) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const actionSuccessful = useRef(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [driver, setDriver] = useState<Driver | null>(null);

  const handleAction = async () => {
    startTransition(async () => {
      const data = await deleteDriverAction(driverId);

      if (data.code === 200) {
        toast.success(data.message, {
          description: data.message || "User deleted successfully",
          duration: 2000,
        });
        actionSuccessful.current = true;
        setOpen(false);
      } else {
        toast.error(data.message, {
          description: data.message || "User not deleted",
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

  const handleClick = async () => {
    const res = await getDriverForEditAction({ driverId })
    if (res.code === 200) { 
      setDriver(res.data);
    }
    setEditDialogOpen(true);
    setOpen(false);
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
          <DropdownMenuItem
            className="cursor-pointer text-primary hover:text-primary-foreground"
            onClick={handleClick}
          >
            <Edit className="mr-2 h-4 w-4" />
            Edit Driver
          </DropdownMenuItem>
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
                <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete Driver
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">Edit Driver: #{driverId}</DialogTitle>
          </DialogHeader>
          {
            driver ? <EditDriverForm driver={driver as Driver} /> : 'No driver data available!'
          }
          
        </DialogContent>
      </Dialog>
    </>
  );
};

export default DriverActions;
