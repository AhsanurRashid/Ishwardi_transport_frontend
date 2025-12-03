"use client";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { useForm } from "react-hook-form";
import { Button } from "../ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { RentCreationFromSchema } from "@/lib/schema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition, useEffect, useState } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { editRentAction } from "@/app/actions/rent-action";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getCompanyListForRentAction } from "@/app/actions/getCompanyListForRent";
import { getDriverListForRentAction } from "@/app/actions/getDriverListForRent";
import { getVehicleListForRentAction } from "@/app/actions/getVehicleListForRent";
import {
  ICompanyForRent,
  IDriversForRent,
  IVehicleForRent,
  IRent,
} from "@/lib/types";

const EditRentForm = ({
  rent,
  onSuccess,
}: {
  rent: IRent;
  onSuccess?: () => void;
}) => {
  const [isPending, startTransition] = useTransition();
  const [companies, setCompanies] = useState<ICompanyForRent[]>([]);
  const [drivers, setDrivers] = useState<IDriversForRent[]>([]);
  const [vehicles, setVehicles] = useState<IVehicleForRent[]>([]);
  const [loading, setLoading] = useState(true);
  const [isOtherCompany, setIsOtherCompany] = useState(false);
  const [isOtherVehicle, setIsOtherVehicle] = useState(false);
  const [isOtherDriver, setIsOtherDriver] = useState(false);

  const form = useForm<z.infer<typeof RentCreationFromSchema>>({
    resolver: zodResolver(RentCreationFromSchema),
    defaultValues: {
      company: rent.company || "",
      vehicle: rent.vehicle || "",
      driver: rent.driver || "",
      type: rent.type || "up",
      from_date: rent.from_date || new Date().toISOString().split("T")[0],
      to_date: rent.to_date || "",
      rentAmount: Number(rent.rentAmount) || 0,
      demurrageAmount: rent.demurrageAmount ? Number(rent.demurrageAmount) : 0,
      fromLocation: rent.fromLocation || "",
      toLocation: rent.toLocation || "",
      dueAmount: rent.dueAmount || "",
      status: rent.status || 1,
    },
  });

  // Fetch required data on component mount
  useEffect(() => {
    const fetchData = async () => {
      try {
        const [companiesRes, driversRes, vehiclesRes] = await Promise.all([
          getCompanyListForRentAction(),
          getDriverListForRentAction(),
          getVehicleListForRentAction(),
        ]);

        if (companiesRes?.list) setCompanies(companiesRes.list);
        if (driversRes?.list) setDrivers(driversRes.list);
        if (vehiclesRes?.list) setVehicles(vehiclesRes.list);
      } catch (error) {
        toast.error("Failed to load form data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const onSubmit = async (data: z.infer<typeof RentCreationFromSchema>) => {
    startTransition(async () => {
      const formData = new FormData();

      Object.entries(data).forEach(([key, value]) => {
        formData.append(key, value.toString());
      });

      const response = await editRentAction(rent.id, formData);

      if (response?.error) {
        toast.error(response.error, {
          description: response.details
            ? response.details.map((d: any) => d.message).join(", ")
            : undefined,
          duration: 3000,
        });
      } else {
        toast.success("Rent updated successfully!", {
          duration: 2000,
        });
        onSuccess?.();
      }
    });
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center p-8">
        <Loader2 className="h-8 w-8 animate-spin" />
      </div>
    );
  }

  return (
    <ScrollArea className="h-[80vh] w-full rounded-md border p-4">

      <pre>
          {JSON.stringify(rent, null, 2)}
      </pre>
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 gap-4">
            {/* Company Selection */}
            <FormField
              control={form.control}
              name="company"
              render={({ field }) => (
                <FormItem className="w-full">
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
                      <SelectContent className="max-h-[300px] w-full">
                        {companies.map((company) => (
                          <SelectItem
                            key={company.id}
                            value={company.id.toString()}
                          >
                            {company.company}
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

            {/* Driver Selection */}
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
                      <SelectContent className="max-h-[300px] w-full">
                        {drivers.map((driver) => (
                          <SelectItem
                            key={driver.id}
                            value={driver.id.toString()}
                          >
                            {driver.name} - {driver.phone}
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

            {/* Vehicle Selection */}
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
                      <SelectContent className="max-h-[300px] w-full">
                        {vehicles.map((vehicle) => (
                          <SelectItem
                            key={vehicle.id}
                            value={vehicle.id.toString()}
                          >
                            {vehicle.registration_number} -{" "}
                            {vehicle.vehicle_type}
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

            {/* Type Selection */}
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

            {/* From Date */}
            <FormField
              control={form.control}
              name="from_date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Date</FormLabel>
                  <FormControl>
                    <Input type="date" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* To Date */}
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

            {/* From Location */}
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

            {/* To Location */}
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

            {/* Rent Amount */}
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

            {/* Demurrage Amount */}
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

            {/* Due Amount */}
            <FormField
              control={form.control}
              name="dueAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Due Amount (Optional)</FormLabel>
                  <FormControl>
                    <Input
                      type="number"
                      placeholder="Enter due amount"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            {/* Status */}
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
            Update Rent
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default EditRentForm;
