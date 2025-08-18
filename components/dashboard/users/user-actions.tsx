"use client";

import { userDeleteAction } from "@/app/actions/userDeleteAction";
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
import {
  Edit,
  Loader2,
  MoreHorizontal,
  Trash2,
  TriangleAlert,
} from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import { getUserForEditAction } from "@/app/actions/getUserForEditAction";
import { IRole, UserData } from "@/lib/types";
import EditUserFrom from "@/components/forms/edit-user-form";
import { useRoleStore } from "@/store/roleStore";

const UserActions = ({ userId, roles }: { userId: number; roles: IRole[] }) => {
  const { roleValue } = useRoleStore();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const actionSuccessful = useRef(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [user, setUser] = useState<UserData | null>(null);

  if (roleValue !== "Admin") {
    return (
      <div className="flex justify-center w-full">
        <TriangleAlert className="h-4 w-4 text-red-500" />
      </div>
    );
  }

  const handleAction = async () => {
    startTransition(async () => {
      const data = await userDeleteAction(userId);

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
    const res = await getUserForEditAction(userId);
    if (res.code === 200) {
      setUser(res.data);
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
            Edit User
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
                <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete User
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Edit User: #{userId}
            </DialogTitle>
          </DialogHeader>
          {user ? (
            <EditUserFrom user={user as UserData} roles={roles as IRole[]} />
          ) : (
            "No user data available!"
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default UserActions;
