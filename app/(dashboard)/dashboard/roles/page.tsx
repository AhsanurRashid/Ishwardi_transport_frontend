import AddUserForm from '@/components/forms/add-user-form';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus } from 'lucide-react';
import React from 'react'

const RolesPage = () => {
  return (
    <div className="w-full">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Roles</h1>
        <Dialog>
          <DialogTrigger asChild>
            <Button className="cursor-pointer">
              <Plus />
              Create Role
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
    </div>
  );
}

export default RolesPage
