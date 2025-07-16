"use client";

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
import EditDriverForm from "@/components/forms/edit-driver-form";
import { ICompany } from "@/lib/types";
import { useRoleStore } from "@/store/roleStore";
import { deleteCompanyAction } from "@/app/actions/deleteCompanyAction";
import { getCompanyForEditAction } from "@/app/actions/getCompanyForEditAction";
import EditCompanyForm from "@/components/forms/edit-company-from";

const CompanyActions = ({ companyId }: { companyId: number }) => {
  const { roleValue } = useRoleStore();
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const actionSuccessful = useRef(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [company, setCompany] = useState<ICompany | null>(null);

  if (roleValue !== "Admin") {
    return (
      <div className="flex justify-center w-full">
        <TriangleAlert className="h-4 w-4 text-red-500" />
      </div>
    );
  }

  const handleAction = async () => {
    startTransition(async () => {
      const data = await deleteCompanyAction(companyId);

      if (data.code === 200) {
        toast.success(data.message, {
          description: data.message || "Company deleted successfully",
          duration: 2000,
        });
        actionSuccessful.current = true;
        setOpen(false);
      } else {
        toast.error(data.message, {
          description: data.message || "Company not deleted",
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
    const res = await getCompanyForEditAction({ companyId });
    if (res.code === 200) {
      setCompany(res.data);
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
            Edit Company
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
                <Trash2 className="mr-2 h-4 w-4 text-red-600" /> Delete Company
              </>
            )}
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle className="text-center">
              Edit Company: #{companyId}
            </DialogTitle>
          </DialogHeader>
          {company ? (
            <EditCompanyForm company={company as ICompany} />
          ) : (
            "No driver data available!"
          )}
        </DialogContent>
      </Dialog>
    </>
  );
};

export default CompanyActions;
