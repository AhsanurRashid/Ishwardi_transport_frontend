import { Button } from "@/components/ui/button";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import DriverTable from "@/components/dashboard/drivers/driver-table";
import AddDriverForm from "@/components/forms/add-driver-form";

const Drivers = () => {
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
      <DriverTable />
    </div>
  );
};

export default Drivers;
