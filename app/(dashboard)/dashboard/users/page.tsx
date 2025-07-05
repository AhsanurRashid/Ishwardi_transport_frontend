import { Button } from "@/components/ui/button";
import { Loader2, Plus } from "lucide-react";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import AddUserForm from "@/components/forms/add-user-form";
import NewUserTable from "@/components/dashboard/users/new-user-table";
import { getUserListAction } from "@/app/actions/getUserListAction";
import { Suspense } from "react";

const User = async ({
  searchParams,
}: {
  searchParams?: { query?: string; page?: string; limit?: string };
  }) => {
    const query = searchParams?.query || "";
    const page = parseInt(searchParams?.page || "1", 10);
  const limit = parseInt(searchParams?.limit || "5", 10);
  const userData = await getUserListAction({
    query,
    page,
    limit
  });
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
            <AddUserForm />
          </DialogContent>
        </Dialog>
      </div>
      <Suspense
        fallback={
          <div className="flex justify-center w-full">
            <Loader2 className="mr-2 h-4 w-4 animate-spin" />
          </div>
        }
      >
        <NewUserTable
          users={userData.list}
          query={query}
          page={page}
          limit={limit}
        />
      </Suspense>
    </div>
  );
};

export default User;
