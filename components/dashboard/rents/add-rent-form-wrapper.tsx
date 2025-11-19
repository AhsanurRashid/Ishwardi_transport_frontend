"use client";

import AddRentForm from "@/components/forms/add-rent-form";
import { Button } from "@/components/ui/button";
import { ICompanyForRent, IDriversForRent, IVehicleForRent } from "@/lib/types";
import { Plus, X } from "lucide-react";
import { useState } from "react";
import RentTableWrapper from "./rent-table-wrapper";

const AddRentFormWrapper = ({
  companies,
  vehicles,
  drivers,
}: {
  companies: ICompanyForRent[];
  vehicles: IVehicleForRent[];
  drivers: IDriversForRent[];
}) => {
  const [showForm, setShowForm] = useState(false);
  return (
    <div className="space-y-4">
      <div className="flex items-center justify-between mb-4">
        <h1 className="text-2xl font-bold">Rent Management</h1>
        {!showForm ? (
          <Button className="cursor-pointer" onClick={() => setShowForm(true)}>
            <Plus />
            Create Rent
          </Button>
        ) : (
          <Button className="cursor-pointer" onClick={() => setShowForm(false)}>
            <X />
          </Button>
        )}
      </div>
      {showForm && (
        <AddRentForm
          companies={companies}
          vehicles={vehicles}
          drivers={drivers}
        />
      )}
      <RentTableWrapper query="" page={1} limit={10} />
    </div>
  );
};

export default AddRentFormWrapper;
