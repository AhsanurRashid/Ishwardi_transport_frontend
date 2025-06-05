import { Button } from "@/components/ui/button";
import { Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUserForm from "@/components/forms/add-user-form";
import NewUserTable from "@/components/dashboard/new-users/new-user-table";
import { Suspense } from "react";

const User = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4 border-b pb-4">
        <h1 className="text-2xl font-bold">User Management</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus />
              Create User
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px] boxed">
            <DialogHeader>
              <DialogTitle className="text-center">Add User</DialogTitle>
            </DialogHeader>
            <Suspense fallback={<div>Loading...</div>}>
              <AddUserForm />
            </Suspense>
          </DialogContent>
        </Dialog>
      </div>
      <NewUserTable />
    </div>
  );
};

export default User;
