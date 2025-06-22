"use client";
import { VehicleCreationFromSchema } from "@/lib/schema";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { getYearsArray } from "@/lib/data";

const AddVehicleForm = () => {
  const form = useForm<z.infer<typeof VehicleCreationFromSchema>>({
    resolver: zodResolver(VehicleCreationFromSchema),
    defaultValues: {
      //Truck Identification
      registrationNumber: "",
      chassisNumber: "",
      engineNumber: "",
      vehicleType: "",
      brand: "",
      model: "",
      manufactureYear: "",
      color: "",

      //Legal Documents
      fitnessCertificateNumber: "",
      fitnessCertificateExpiry: new Date(),
      taxTokenNumber: 0,
      taxTokenExpiry: new Date(),
      insurancePolicyNumber: "",
      insuranceExpiryDate: new Date(),

      //Ownership & Contact
      ownerName: "",
      ownerPhone: "",
      ownerNid: "",
      ownerAddress: "",

      //Operational Info
      status: "",
      remarks: "",
    },
  });

  const onSubmit = async (data: z.infer<typeof VehicleCreationFromSchema>) => {
    console.log("Vehicle data =>", data);

    // const formData = new FormData();

    // Object.entries(data).forEach(([key, value]) => {
    //   formData.append(key, value.toString());
    // });

    // startTransition(async () => {
    //   const res = await createDriverAction(formData);
    //   if (res.errors) {
    //     if (res.errors?.phone) {
    //       toast.error(res.message, {
    //         description: res.errors?.phone[0],
    //         duration: 2000,
    //       });
    //     }
    //   }

    //   if (res.code === 200) {
    //     form.reset();
    //     handleRemoveNid();
    //     toast.success(res.message, {
    //       description: res.message || "Driver created successfully",
    //       duration: 2000,
    //     });
    //   }
    // });
  };
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6 w-full">
        <div className="border  border-cardinal-foreground p-2 rounded-md">
          <h2 className="text-lg font-semibold pb-3 text-center border-b border-cardinal-foreground mb-3">
            Truck Identification
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="registrationNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Registration Number:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chassisNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chassis Number:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="engineNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Engine Number:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
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
                  <FormLabel>Vehicle Type:</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field?.value?.toString()}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Vehicle Type" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      <SelectItem value="Truck">Truck</SelectItem>
                      <SelectItem value="Covered Van">Covered Van</SelectItem>
                      <SelectItem value="Lorry">Lorry</SelectItem>
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
                  <FormLabel>Brand:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="model"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Model:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="manufactureYear"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Manufactured Year:</FormLabel>
                  <Select
                    onValueChange={(value) => field.onChange(value)}
                    value={field?.value?.toString()}
                  >
                    <FormControl className="w-full">
                      <SelectTrigger>
                        <SelectValue placeholder="Select Manufactured Year" />
                      </SelectTrigger>
                    </FormControl>
                    <SelectContent>
                      {getYearsArray().map((year) => (
                        <SelectItem key={year} value={year.toString()}>
                          {year}
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
              name="color"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Color:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>

        <div className="border  border-cardinal-foreground p-2 rounded-md">
          <h2 className="text-lg font-semibold pb-3 text-center border-b border-cardinal-foreground mb-3">
            Legal Documents
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
            <FormField
              control={form.control}
              name="fitnessCertificateNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>FitnessCertificate Number:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="chassisNumber"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Chassis Number:</FormLabel>
                  <FormControl>
                    <Input type="text" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          </div>
        </div>
      </form>
    </Form>
  );
};

export default AddVehicleForm;
