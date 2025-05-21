import { UsersTable } from '@/components/dashboard/user-table'
import { Button } from '@/components/ui/button'
import { Plus } from 'lucide-react'
import Link from 'next/link'
import React from 'react'

const VehiclesPage = () => {
  return (
    <div className='w-full'>
        <div className='flex items-center justify-between mb-4'>
            <h1 className='text-2xl font-bold'>Users</h1>
            <Link href='/dashboard/vehicles/add-vehicle'>
              <Button className='cursor-pointer'>
                <Plus />Add Vehicle
              </Button>
            </Link>
        </div>
        <UsersTable />
    </div>
  )
}

export default VehiclesPage
