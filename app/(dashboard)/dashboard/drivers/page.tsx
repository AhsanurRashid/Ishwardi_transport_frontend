import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import DriverTableWrapper from "@/components/dashboard/drivers/driver-table-wrapper";
import AddDriverForm from "@/components/forms/add-driver-form";
import { Driver } from "@/lib/types";

const Drivers = async ({
  searchParams,
}: {
  searchParams?: Promise<{ query?: string; page?: string; limit?: string }>;
}) => {
  const params = await searchParams;
  const query = params?.query || "";
  const page = parseInt(params?.page || "1", 10);
  const limit = parseInt(params?.limit || "5", 10);
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Drivers List</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus />
              Add Driver
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] boxed">
            <DialogHeader>
              <DialogTitle className="text-center">Add Driver</DialogTitle>
            </DialogHeader>
            <AddDriverForm />
          </DialogContent>
        </Dialog>
      </div>
      <DriverTableWrapper
        query={query}
        page={page}
        limit={limit}
      />
    </div>
  );
};

export default Drivers;
