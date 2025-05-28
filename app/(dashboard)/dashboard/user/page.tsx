import { UsersTable } from '@/components/dashboard/user-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddUserForm from '@/components/forms/add-user-form'
import { Suspense } from 'react'
import { getUserListAction } from '@/app/actions/getUserListAction'
import { UserType } from "@/lib/types";

const User = async() => {
  const users = await getUserListAction();

  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Users</h1>
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
      {users?.list?.length > 0 ?
        <Suspense fallback={<div>Loading...</div>}>
          <UsersTable userList={users?.list as UserType[]} />
        </Suspense> :
        <div className="text-center text-gray-500">No users found !</div>
      }
    </div>
  );
}

export default User
