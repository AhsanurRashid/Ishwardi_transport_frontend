"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import * as React from "react";
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
  const [isOtherCompany, setIsOtherCompany] = React.useState(false);
  const [isOtherVehicle, setIsOtherVehicle] = React.useState(false);
  const [isOtherDriver, setIsOtherDriver] = React.useState(false);

  // Prepare options for combobox fields
  const companyOptions = companies.map((company) => ({
    value: company.id.toString(),
    label: company.company_name,
  }));

  const vehicleOptions = vehicles.map((vehicle) => ({
    value: vehicle.id.toString(),
    label: `${vehicle.registration_number} - ${vehicle.vehicle_type}`,
  }));

  const driverOptions = drivers.map((driver) => ({
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
      rentAmount: 0,
      demurrageAmount: 0,
      fromLocation: "",
      toLocation: "",
      dueAmount: "",
      status: 1,
      from_date: new Date().toISOString().split("T")[0],
      to_date: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof RentCreationFromSchema>) => {
    startTransition(async () => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const response = await createRentAction(formData);

      if (response?.error) {
        //check for error in response is a object or not
        if (typeof response.error === "object") {
          // if so then show the properties of the object in toast
          Object.values(response.error).forEach((errMsg) => {
            toast.error(errMsg as string);
          });
          return;
        }
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
          <div className="grid grid-cols-1 gap-4">
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Company</FormLabel>
                  {!isOtherCompany ? (
                    <Select
                      onValueChange={(value) => {
                        if (value === "other") {
                          setIsOtherCompany(true);
                          field.onChange("");
                        } else {
                          field.onChange(value);
                        }
                      }}
                      value={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select company" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="w-full">
                        {companyOptions.map((company) => (
                          <SelectItem key={company.value} value={company.value}>
                            {company.label}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">
                          Other (Manual Entry)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="space-y-2">
                      <Input placeholder="Enter company name" {...field} />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsOtherCompany(false);
                          field.onChange("");
                        }}
                      >
                        Back to Select
                      </Button>
                    </div>
                  )}
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
                  {!isOtherDriver ? (
                    <Select
                      onValueChange={(value) => {
                        if (value === "other") {
                          setIsOtherDriver(true);
                          field.onChange("");
                        } else {
                          field.onChange(value);
                        }
                      }}
                      value={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select driver" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {driverOptions.map((driver) => (
                          <SelectItem key={driver.value} value={driver.value}>
                            {driver.label}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">
                          Other (Manual Entry)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="space-y-2">
                      <Input placeholder="Enter driver name" {...field} />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsOtherDriver(false);
                          field.onChange("");
                        }}
                      >
                        Back to Select
                      </Button>
                    </div>
                  )}
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
                  {!isOtherVehicle ? (
                    <Select
                      onValueChange={(value) => {
                        if (value === "other") {
                          setIsOtherVehicle(true);
                          field.onChange("");
                        } else {
                          field.onChange(value);
                        }
                      }}
                      value={field.value}
                    >
                      <FormControl className="w-full">
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent className="max-h-[300px]">
                        {vehicleOptions.map((vehicle) => (
                          <SelectItem key={vehicle.value} value={vehicle.value}>
                            {vehicle.label}
                          </SelectItem>
                        ))}
                        <SelectItem value="other">
                          Other (Manual Entry)
                        </SelectItem>
                      </SelectContent>
                    </Select>
                  ) : (
                    <div className="space-y-2">
                      <Input
                        placeholder="Enter vehicle registration"
                        {...field}
                      />
                      <Button
                        type="button"
                        variant="outline"
                        size="sm"
                        onClick={() => {
                          setIsOtherVehicle(false);
                          field.onChange("");
                        }}
                      >
                        Back to Select
                      </Button>
                    </div>
                  )}
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
                    <FormControl className="w-full">
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
              name="from_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Date</FormLabel>
                  <FormControl className="w-full">
                    <Input className="w-full" type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="to_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>To Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
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
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : Number(value));
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="demurrageAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Demurrage Amount (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter demurrage amount"
                      value={field.value || ""}
                      onChange={(e) => {
                        const value = e.target.value;
                        field.onChange(value === "" ? "" : Number(value));
                      }}
                      onBlur={field.onBlur}
                      name={field.name}
                      ref={field.ref}
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
                    <FormControl className="w-full">
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
            Create Rent Rent
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default AddRentForm;
