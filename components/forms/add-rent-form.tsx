"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { RentCreationFromSchema } from "@/lib/schema";
import { createRentAction } from "@/app/actions/createRentAction";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import { ICompanyForRent, IDriversForRent, IVehicleForRent } from "@/lib/types";
import ComboboxField from "../common/combo-box-field";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import type { z } from "zod";

const AddRentForm = ({
  companies,
  vehicles,
  drivers,
}: {
  companies: ICompanyForRent[];
  vehicles: IVehicleForRent[];
  drivers: IDriversForRent[];
}) => {
  const [isPending, startTransition] = useTransition();
  console.log("Companies:", companies);
  console.log("Vehicles:", vehicles);
  console.log("Drivers:", drivers);



  // Prepare options for combobox fields
  const companyOptions = companies.list.map((company) => ({
    value: company.id.toString(),
    label: company.company_name,
  }));

  const vehicleOptions = vehicles.list.map((vehicle) => ({
    value: vehicle.id.toString(),
    label: `${vehicle.registration_number} - ${vehicle.vehicle_type}`,
  }));

  const driverOptions = drivers.list.map((driver) => ({
    value: driver.id.toString(),
    label: `${driver.name} - ${driver.phone}`,
  }));

  const form = useForm<z.infer<typeof RentCreationFromSchema>>({
    resolver: zodResolver(RentCreationFromSchema),
    defaultValues: {
      company: "",
      vehicle: "",
      driver: "",
      type: "up",
      rentAmount: "",
      demurrageAmount: "",
      fromLocation: "",
      toLocation: "",
      dueAmount: "",
      status: 1,
    },
  });

  const onSubmit = async (data: z.infer<typeof RentCreationFromSchema>) => {
    startTransition(async () => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        if (value instanceof Date) {
          formData.append(key, value.toISOString());
        } else {
          formData.append(key, value.toString());
        }
      });

      const response = await createRentAction(formData);

      if (response?.error) {
        toast.error(response.error);
      } else {
        toast.success("Rent created successfully!");
        form.reset();
      }
    });
  };

  return (
    <ScrollArea className="h-[80vh] w-full rounded-md border p-4">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  <FormControl>
                    <ComboboxField
                      value={field.value}
                      onChange={field.onChange}
                      options={companyOptions}
                      placeholder="Select or type company name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="driver"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Driver</FormLabel>
                  <FormControl>
                    <ComboboxField
                      value={field.value}
                      onChange={field.onChange}
                      options={driverOptions}
                      placeholder="Select or type driver name"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="vehicle"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Vehicle</FormLabel>
                  <FormControl>
                    <ComboboxField
                      value={field.value}
                      onChange={field.onChange}
                      options={vehicleOptions}
                      placeholder="Select or type vehicle"
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="type"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Type</FormLabel>
                  <Select onValueChange={field.onChange} value={field.value}>
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="up">Up</SelectItem>
                      <SelectItem value="down">Down</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="fromLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter pickup location" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="toLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Location</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter destination" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="rentAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Rent Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter rent amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="status"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Status</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(Number(value))}
                    value={field.value?.toString()}
                  >
                    <FormControl>
                      <SelectTrigger>
                        <SelectValue placeholder="Select status" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="0">Pending</SelectItem>
                      <SelectItem value="1">Active</SelectItem>
                      <SelectItem value="2">Completed</SelectItem>
                      <SelectItem value="3">Cancelled</SelectItem>
                    </SelectContent>
                  </Select>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" disabled={isPending} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Create Rent
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default AddRentForm;
