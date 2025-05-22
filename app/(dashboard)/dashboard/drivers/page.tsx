import { UsersTable } from '@/components/dashboard/user-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'

import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog"
import AddUserForm from '@/components/forms/add-user-form'
import { Suspense } from 'react'

const Drivers = () => {
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold'>Drivers List</h1>
            <Dialog>
              <DialogTrigger asChild>
                <Button className='cursor-pointer'>
                  <Plus />Add Driver
                </Button>
              </DialogTrigger>
              <DialogContent className="sm:max-w-[425px] boxed">
                <DialogHeader>
                  <DialogTitle className='text-center'>Add Driver</DialogTitle>
                </DialogHeader>
                <AddUserForm />
              </DialogContent>
            </Dialog>
        </div>
        <Suspense fallback={<div>Loading...</div>}>
          <UsersTable />
        </Suspense>
    </div>
  )
}

export default Drivers

