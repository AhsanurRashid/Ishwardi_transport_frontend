"use client";

import { useState, useTransition } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CalendarIcon, Truck, FileText, Users, Info } from "lucide-react";
import { format } from "date-fns";

import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Calendar } from "@/components/ui/calendar";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormDescription,
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
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { z } from "zod";
import { VehicleCreationFromSchema } from "@/lib/schema";
import { convertDate, deconvertDate } from "@/lib/data";
import { ImageUpload } from "../common/image-upload";
import { toast } from "sonner";
import { createVehicleAction } from "@/app/actions/createVehicleAction";
import Link from "next/link";

const vehicle_types = [
  "Truck",
  "Bus",
  "Pickup",
  "Microbus",
  "CNG",
  "Car",
  "Motorcycle",
  "Others",
];

const vehicleBrands = [
  "Tata",
  "Ashok Leyland",
  "Mahindra",
  "Eicher",
  "Isuzu",
  "Hino",
  "Mitsubishi",
  "Toyota",
  "Others",
];

const vehicleStatuses = [
  {
    label: "Inactive",
    value: "0",
  },
  {
    label: "Active",
    value: "1",
  },
  {
    label: "Under Maintenance",
    value: "2",
  },
  {
    label: "Repaired",
    value: "3",
  },
];

const colors = [
  "Blue",
  "Yellow",
  // "White",
  // "Black",
  // "Red",
  // "Green",
  // "Silver",
  // "Gray",
  // "Others",
];

export function VehicleRegistrationForm() {
  const [isPending, startTransition] = useTransition();
  const [vehicleImageFile, setVehicleImageFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<{
    vehicleImageFile?: string;
  }>({});
  const [vehicleImagePreview, setVehicleImagePreview] = useState<string | null>(
    null
  );

  const form = useForm<z.infer<typeof VehicleCreationFromSchema>>({
    resolver: zodResolver(VehicleCreationFromSchema),
    defaultValues: {
      registration_number: "",
      chassis_number: "",
      engine_number: "",
      vehicle_type: "",
      brand: "",
      model: "",
      manufacture_year: "",
      color: "",
      fitness_certificate_number: "",
      fitness_certificate_expiry_date: undefined,
      tax_token_number: "",
      tax_token_expiry_date: undefined,
      insurance_policy_number: "",
      insurance_policy_expiry_date: null,
      owner_name: "",
      owner_phone: "",
      owner_nid: "",
      owner_address: "",
      status: 0,
      remarks: "",
    },
  });

  const handleVehicleImage = (file: File) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFileError((prev) => ({
          ...prev,
          vehicleImage: "File must be an image",
        }));
        return;
      }
      setVehicleImageFile(file);
      setVehicleImagePreview(URL.createObjectURL(file));
      setFileError((prev) => ({ ...prev, vehicleImage: undefined }));
    }
  };

  const handleRemoveVehicleImage = () => {
    setVehicleImageFile(null);
    if (vehicleImagePreview) {
      URL.revokeObjectURL(vehicleImagePreview);
      setVehicleImagePreview(null);
    }
  };

  async function onSubmit(data: z.infer<typeof VehicleCreationFromSchema>) {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      if (value !== null && value !== undefined) {
        if (
          key === "fitness_certificate_expiry_date" ||
          key === "tax_token_expiry_date" ||
          key === "insurance_policy_expiry_date"
        ) {
          formData.append(key, convertDate(value as Date));
        } else {
          formData.append(key, value.toString());
        }
      }
    });

    if (vehicleImageFile) {
      formData.append("image", vehicleImageFile);
    }

    startTransition(async () => {
      const res = await createVehicleAction(formData);

      if (res.errors) {
        const errorList: string[] = [];

        Object.entries(res.errors).forEach(([key, value]: any) => {
          errorList.push(value[0]);
        });

        toast.error(res.message, {
          description: (
            <ul className="list-disc list-inside space-y-1">
              {errorList.map((err, index) => (
                <li key={index}>{err}</li>
              ))}
            </ul>
          ),
          duration: 2000,
        });
      }

      if (res.code === 200) {
        form.reset();
        handleRemoveVehicleImage();
        toast.success(res.message, {
          description: res.message || "vehicle created successfully",
          duration: 2000,
        });
      }
    });
  }

  return (
    <div className="container mx-auto py-8 px-4 max-w-4xl">
      <div className="mb-8">
        <div className="flex items-center justify-between">
          <h1 className="md:text-3xl text-lg font-bold tracking-tight">
            Vehicle Registration
          </h1>
          <Link className="text-xs underline" href="/dashboard/vehicles">
            View all vehicles
          </Link>
        </div>

        <p className="md:text-md text-sm text-muted-foreground mt-2">
          Register a new vehicle in the system with all required documentation
          and details.
        </p>
      </div>

      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
          {/* Vehicle Identification Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Truck className="h-5 w-5" />
                Vehicle Identification
              </CardTitle>
              <CardDescription>
                Basic information about the vehicle
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="registration_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Registration Number</FormLabel>
                    <FormControl>
                      <Input placeholder="ABC-123" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="chassis_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Chassis Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter chassis number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="engine_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Engine Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter engine number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="vehicle_type"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Vehicle Type</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select vehicle type" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicle_types.map((type) => (
                          <SelectItem key={type} value={type}>
                            {type}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="brand"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Brand</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select brand" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicleBrands.map((brand) => (
                          <SelectItem key={brand} value={brand}>
                            {brand}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="model"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Model</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter model" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="manufacture_year"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Manufacture Year</FormLabel>
                    <FormControl>
                      <Input placeholder="2024" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="color"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Color</FormLabel>
                    <Select
                      onValueChange={field.onChange}
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select color" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {colors.map((color) => (
                          <SelectItem key={color} value={color}>
                            {color}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Legal Documents Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <FileText className="h-5 w-5" />
                Legal Documents
              </CardTitle>
              <CardDescription>
                Required legal documentation and certificates
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="fitness_certificate_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Fitness Certificate Number</FormLabel>
                    <FormControl>
                      <Input
                        placeholder="Enter certificate number"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="fitness_certificate_expiry_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Fitness Certificate Expiry</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal h-10",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick expiry date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-white shadow-lg border rounded-lg"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          disabled={(date: Date) => date < new Date()}
                          initialFocus
                          captionLayout="dropdown"
                          fromYear={new Date().getFullYear()}
                          toYear={new Date().getFullYear() + 50}
                          classNames={{
                            months:
                              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 calender",
                            month: "space-y-4 flex items-center flex-col",
                            caption:
                              "flex justify-center pt-1 relative items-center gap-1",
                            caption_label: "text-sm font-medium",
                            caption_dropdowns: "flex justify-center gap-1",
                            nav: "flex items-center justify-between absolute top-3 left-0 right-0 w-full  m-0",
                            nav_button: cn(
                              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                            ),
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex",
                            head_cell:
                              "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                            row: "flex w-full mt-2",
                            cell: cn(
                              "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                              "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                            ),
                            day: cn(
                              "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                            ),
                            day_range_end: "day-range-end",
                            day_selected:
                              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                            day_today:
                              "bg-accent text-accent-foreground font-semibold",
                            day_outside:
                              "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                            day_disabled: "text-muted-foreground opacity-50",
                            day_range_middle:
                              "aria-selected:bg-accent aria-selected:text-accent-foreground",
                            day_hidden: "invisible",
                            dropdown:
                              "px-3 py-2 text-sm bg-white border rounded-md shadow-sm min-w-[120px]",
                            dropdown_month:
                              "px-3 py-2 text-sm bg-white border rounded-md shadow-sm min-w-[120px]",
                            dropdown_year:
                              "px-3 py-2 text-sm bg-white border rounded-md shadow-sm min-w-[120px]",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tax_token_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tax Token Number</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter tax token number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="tax_token_expiry_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Tax Token Expiry</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal h-10",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick expiry date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-white shadow-lg border rounded-lg"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          disabled={(date: Date) => date < new Date()}
                          initialFocus
                          captionLayout="dropdown"
                          fromYear={new Date().getFullYear()}
                          toYear={new Date().getFullYear() + 50}
                          classNames={{
                            months:
                              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 calender",
                            month: "space-y-4 flex items-center flex-col",
                            caption:
                              "flex justify-center pt-1 relative items-center gap-1",
                            caption_label: "text-sm font-medium",
                            caption_dropdowns: "flex justify-center gap-1",
                            nav: "flex items-center justify-between absolute top-3 left-0 right-0 w-full  m-0",
                            nav_button: cn(
                              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                            ),
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex",
                            head_cell:
                              "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                            row: "flex w-full mt-2",
                            cell: cn(
                              "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                              "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                            ),
                            day: cn(
                              "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                            ),
                            day_range_end: "day-range-end",
                            day_selected:
                              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                            day_today:
                              "bg-accent text-accent-foreground font-semibold",
                            day_outside:
                              "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                            day_disabled: "text-muted-foreground opacity-50",
                            day_range_middle:
                              "aria-selected:bg-accent aria-selected:text-accent-foreground",
                            day_hidden: "invisible",
                            dropdown:
                              "px-3 py-2 text-sm bg-white border rounded-md shadow-sm min-w-[120px]",
                            dropdown_month:
                              "px-3 py-2 text-sm bg-white border rounded-md shadow-sm min-w-[120px]",
                            dropdown_year:
                              "px-3 py-2 text-sm bg-white border rounded-md shadow-sm min-w-[120px]",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="insurance_policy_number"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Insurance Policy Number (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter policy number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="insurance_policy_expiry_date"
                render={({ field }) => (
                  <FormItem className="flex flex-col">
                    <FormLabel>Insurance Expiry Date (Optional)</FormLabel>
                    <Popover>
                      <PopoverTrigger asChild>
                        <FormControl>
                          <Button
                            variant={"outline"}
                            className={cn(
                              "w-full pl-3 text-left font-normal h-10",
                              !field.value && "text-muted-foreground"
                            )}
                          >
                            {field.value ? (
                              format(field.value, "PPP")
                            ) : (
                              <span>Pick expiry date</span>
                            )}
                            <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                          </Button>
                        </FormControl>
                      </PopoverTrigger>
                      <PopoverContent
                        className="w-auto p-0 bg-white shadow-lg border rounded-lg"
                        align="start"
                      >
                        <Calendar
                          mode="single"
                          selected={field.value ?? undefined}
                          onSelect={field.onChange}
                          disabled={(date: Date) => date < new Date()}
                          initialFocus
                          captionLayout="dropdown"
                          fromYear={new Date().getFullYear()}
                          toYear={new Date().getFullYear() + 50}
                          classNames={{
                            months:
                              "flex flex-col sm:flex-row space-y-4 sm:space-x-4 sm:space-y-0 calender",
                            month: "space-y-4 flex items-center flex-col",
                            caption:
                              "flex justify-center pt-1 relative items-center gap-1",
                            caption_label: "text-sm font-medium",
                            caption_dropdowns: "flex justify-center gap-1",
                            nav: "flex items-center justify-between absolute top-3 left-0 right-0 w-full  m-0",
                            nav_button: cn(
                              "h-7 w-7 bg-transparent p-0 opacity-50 hover:opacity-100"
                            ),
                            nav_button_previous: "absolute left-1",
                            nav_button_next: "absolute right-1",
                            table: "w-full border-collapse space-y-1",
                            head_row: "flex",
                            head_cell:
                              "text-muted-foreground rounded-md w-8 font-normal text-[0.8rem]",
                            row: "flex w-full mt-2",
                            cell: cn(
                              "relative p-0 text-center text-sm focus-within:relative focus-within:z-20 [&:has([aria-selected])]:bg-accent [&:has([aria-selected].day-outside)]:bg-accent/50 [&:has([aria-selected].day-range-end)]:rounded-r-md",
                              "first:[&:has([aria-selected])]:rounded-l-md last:[&:has([aria-selected])]:rounded-r-md"
                            ),
                            day: cn(
                              "h-8 w-8 p-0 font-normal aria-selected:opacity-100 hover:bg-accent hover:text-accent-foreground rounded-md transition-colors"
                            ),
                            day_range_end: "day-range-end",
                            day_selected:
                              "bg-primary text-primary-foreground hover:bg-primary hover:text-primary-foreground focus:bg-primary focus:text-primary-foreground",
                            day_today:
                              "bg-accent text-accent-foreground font-semibold",
                            day_outside:
                              "day-outside text-muted-foreground opacity-50 aria-selected:bg-accent/50 aria-selected:text-muted-foreground aria-selected:opacity-30",
                            day_disabled: "text-muted-foreground opacity-50",
                            day_range_middle:
                              "aria-selected:bg-accent aria-selected:text-accent-foreground",
                            day_hidden: "invisible",
                            dropdown:
                              "px-3 py-2 text-sm bg-white border rounded-md shadow-sm min-w-[120px]",
                            dropdown_month:
                              "px-3 py-2 text-sm bg-white border rounded-md shadow-sm min-w-[120px]",
                            dropdown_year:
                              "px-3 py-2 text-sm bg-white border rounded-md shadow-sm min-w-[120px]",
                          }}
                        />
                      </PopoverContent>
                    </Popover>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Ownership & Contact Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="h-5 w-5" />
                Ownership & Contact
              </CardTitle>
              <CardDescription>
                Owner information and contact details
              </CardDescription>
            </CardHeader>
            <CardContent className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <FormField
                control={form.control}
                name="owner_name"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Name</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter owner name" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="owner_phone"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner Phone</FormLabel>
                    <FormControl>
                      <Input placeholder="01712345678" {...field} />
                    </FormControl>
                    <FormDescription>
                      Format: 01712345678 or +8801712345678
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="owner_nid"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Owner NID</FormLabel>
                    <FormControl>
                      <Input placeholder="Enter NID number" {...field} />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="owner_address"
                render={({ field }) => (
                  <FormItem className="md:col-span-2">
                    <FormLabel>Owner Address</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter complete address"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          {/* Operational Info Section */}
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Info className="h-5 w-5" />
                Operational Information
              </CardTitle>
              <CardDescription>
                Current status and additional information
              </CardDescription>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="space-y-1">
                <div className="text-sm font-medium text-gray-800">
                  Vehicle Image:
                </div>
                <ImageUpload
                  onChange={(file) => handleVehicleImage(file as File)}
                  onRemove={handleRemoveVehicleImage}
                  maxSize={1}
                  preview={vehicleImagePreview}
                />
              </div>
              <FormField
                control={form.control}
                name="status"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Status</FormLabel>
                    <Select onValueChange={field.onChange}>
                      <FormControl>
                        <SelectTrigger className="w-full md:w-[300px]">
                          <SelectValue placeholder="Select status" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {vehicleStatuses.map((status) => (
                          <SelectItem key={status.value} value={status.value}>
                            {status.label}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="remarks"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Remarks (Optional)</FormLabel>
                    <FormControl>
                      <Textarea
                        placeholder="Enter any additional remarks or notes"
                        className="resize-none"
                        {...field}
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
          </Card>

          <Separator />

          <div className="flex justify-end space-x-4">
            <Button
              type="button"
              variant="outline"
              onClick={() => form.reset()}
              disabled={isPending}
            >
              Reset Form
            </Button>
            <Button type="submit" disabled={isPending}>
              {isPending ? "Registering..." : "Register Vehicle"}
            </Button>
          </div>
        </form>
      </Form>
    </div>
  );
}
