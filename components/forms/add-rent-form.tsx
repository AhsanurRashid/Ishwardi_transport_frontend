"use client";

import React, { useState } from "react";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { toast } from "sonner";
import { z } from "zod";
import { format } from "date-fns";

import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { RentCreationFromSchema } from "@/lib/schema";
import { ScrollArea } from "../ui/scroll-area";
import ComboboxField from "../common/combo-box-field";
import { cn } from "@/lib/utils";
import { ICompanyForRent, IDriversForRent, IVehicleForRent } from "@/lib/types";
import { placeOptions } from "@/lib/data";
import { useRentStore } from "@/store/rentStore";

const AddRentForm = ({
  companies,
  vehicles,
  drivers,
}: {
  companies: ICompanyForRent;
  vehicles: IVehicleForRent;
  drivers: IDriversForRent;
}) => {
  const { setRentValue } = useRentStore();
  const form = useForm<z.infer<typeof RentCreationFromSchema>>({
    resolver: zodResolver(RentCreationFromSchema),
    defaultValues: {
      company: "",
      vehicle: "",
      driver: "",
      rentAmount: "",
      demurrageAmount: "",
      fromLocation: "",
      toLocation: "",
    },
  });

  const companyOptions = companies.map((item: ICompanyForRent) => {
    return {
      value: item.company_name,
      label: item.company_name,
    };
  });

  const vehicleOptions = vehicles.map((item: IVehicleForRent) => {
    return {
      value: item.registration_number,
      label: item.registration_number,
    };
  });

  const driverOptions = drivers.map((item: IDriversForRent) => {
    return {
      value: item.name,
      label: item.name,
    };
  });

  function onSubmit(data: z.infer<typeof RentCreationFromSchema>) {
    setRentValue(data);

    toast("Form submitted successfully!", {
      description: (
        <pre className="mt-2 w-[320px] rounded-md bg-slate-950 p-4">
          <code className="text-white">{JSON.stringify(data, null, 2)}</code>
        </pre>
      ),
    });
  }

  return (
    <ScrollArea className="w-full max-h-[calc(100vh-100px)] pr-2 z-50">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                      placeholder="Select or type company..."
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
                      placeholder="Select or type vehicle..."
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
                      placeholder="Select or type driver..."
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
                  <Select
                    onValueChange={field.onChange}
                    defaultValue={field.value}
                  >
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
              name="date"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Date</FormLabel>
                  <Popover>
                    <PopoverTrigger asChild>
                      <FormControl>
                        <Button
                          variant={"outline"}
                          className={cn(
                            "w-full pl-3 text-left font-normal",
                            !field.value && "text-muted-foreground"
                          )}
                        >
                          {field.value ? (
                            format(field.value, "PPP")
                          ) : (
                            <span>Pick a date</span>
                          )}
                          <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                        </Button>
                      </FormControl>
                    </PopoverTrigger>
                    <PopoverContent className="w-auto p-0" align="start">
                      <Calendar
                        mode="single"
                        selected={field.value}
                        onSelect={field.onChange}
                        disabled={(date) =>
                          date < new Date(new Date().setHours(0, 0, 0, 0))
                        }
                        initialFocus
                      />
                    </PopoverContent>
                  </Popover>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
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
                name="demurrageAmount"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Demurrage Amount</FormLabel>
                    <FormControl>
                      <Input
                        type="number"
                        placeholder="Enter demurrage amount"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="fromLocation"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>From Location</FormLabel>
                  <FormControl>
                    <ComboboxField
                      value={field.value}
                      onChange={field.onChange}
                      options={placeOptions}
                      placeholder="Select or type from location..."
                    />
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
                    <ComboboxField
                      value={field.value}
                      onChange={field.onChange}
                      options={placeOptions}
                      placeholder="Select or type to location..."
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>

          <Button type="submit" className="w-full">
            Submit Transport Assignment
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default AddRentForm;
