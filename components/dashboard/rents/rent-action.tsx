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
  Banknote,
} from "lucide-react";
import { useRef, useState, useTransition } from "react";
import { toast } from "sonner";
import {
  deleteRentAction,
  getRentForEditAction,
} from "@/app/actions/rent-action";
import { IRent, UserProfile } from "@/lib/types";
import EditRentForm from "@/components/forms/edit-rent-form";
import PaymentForm from "@/components/forms/payment-form";

const RentActions = ({
  rentId,
  profile,
}: {
  rentId: number;
  profile: UserProfile;
}) => {
  const [isPending, startTransition] = useTransition();
  const [open, setOpen] = useState(false);
  const actionSuccessful = useRef(false);
  const [editDialogOpen, setEditDialogOpen] = useState(false);
  const [paymentDialogOpen, setPaymentDialogOpen] = useState(false);
  const [rent, setRent] = useState<IRent | null>(null);

  const handleDelete = async () => {
    startTransition(async () => {
      try {
        const data = await deleteRentAction(rentId);

        if (data.code === 200 || data.success) {
          toast.success("Rent deleted successfully", {
            duration: 2000,
          });
          actionSuccessful.current = true;
          setOpen(false);
        } else {
          toast.error(data.message || "Failed to delete rent", {
            duration: 2000,
          });
        }
      } catch (error) {
        toast.error("Failed to delete rent", {
          duration: 2000,
        });
      }
    });
  };

  const handleEdit = async () => {
    try {
      const data = await getRentForEditAction(rentId);
      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
      } else {
        setRent(data?.data);
        setEditDialogOpen(true);
      }
    } catch (error) {
      toast.error("Failed to fetch rent data", {
        duration: 2000,
      });
    }
  };

  const handlePayment = async () => {
    try {
      const data = await getRentForEditAction(rentId);
      if (data.error) {
        toast.error(data.error, {
          duration: 2000,
        });
      } else {
        setRent(data?.data);
        setPaymentDialogOpen(true);
      }
    } catch (error) {
      toast.error("Failed to fetch rent data", {
        duration: 2000,
      });
    }
  };

  return (
    <>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button variant="ghost" className="h-8 w-8 p-0">
            <span className="sr-only">Open menu</span>
            <MoreHorizontal className="h-4 w-4" />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end">
          <>
            {profile?.permissions?.includes("rent_edit") && (
              <DropdownMenuItem onClick={handlePayment}>
                <Banknote className="mr-2 h-4 w-4 text-green-500" />
                Payment
              </DropdownMenuItem>
            )}
            {/* {profile?.permissions?.includes("rent_edit") && (
              <DropdownMenuItem onClick={handleEdit}>
                <Edit className="mr-2 h-4 w-4 text-blue-500" />
                Edit
              </DropdownMenuItem>
            )} */}
          </>
          {profile?.permissions?.includes("rent_delete") && (
            <DropdownMenuItem onClick={() => setOpen(true)}>
              <Trash2 className="mr-2 h-4 w-4 text-red-500" />
              Delete
            </DropdownMenuItem>
          )}
        </DropdownMenuContent>
      </DropdownMenu>

      {/* Delete Confirmation Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle className="flex items-center gap-2">
              <TriangleAlert className="h-5 w-5 text-destructive" />
              Delete Rent
            </DialogTitle>
          </DialogHeader>
          <div className="py-4">
            <p className="text-sm text-muted-foreground">
              Are you sure you want to delete this rent record? This action
              cannot be undone.
            </p>
          </div>
          <div className="flex justify-end gap-2">
            <Button
              variant="outline"
              onClick={() => setOpen(false)}
              disabled={isPending}
            >
              Cancel
            </Button>
            <Button
              variant="destructive"
              onClick={handleDelete}
              disabled={isPending}
            >
              {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
              Delete
            </Button>
          </div>
        </DialogContent>
      </Dialog>

      {/* Edit Dialog */}
      <Dialog open={editDialogOpen} onOpenChange={setEditDialogOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit Rent</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {rent ? (
              <EditRentForm
                rent={rent}
                onSuccess={() => {
                  setEditDialogOpen(false);
                  setRent(null);
                }}
              />
            ) : (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>

      {/* Payment Dialog */}
      <Dialog open={paymentDialogOpen} onOpenChange={setPaymentDialogOpen}>
        <DialogContent className="sm:max-w-[500px]">
          <DialogHeader>
            <DialogTitle>Payment for Rent #{rentId}</DialogTitle>
          </DialogHeader>
          <div className="py-4">
            {rent ? (
              <PaymentForm
                rentId={rentId}
                dueAmount={rent.payments_due as number}
                onSuccess={() => {
                  setPaymentDialogOpen(false);
                  setRent(null);
                }}
              />
            ) : (
              <div className="flex items-center justify-center p-8">
                <Loader2 className="h-8 w-8 animate-spin" />
              </div>
            )}
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
};

export default RentActions;
