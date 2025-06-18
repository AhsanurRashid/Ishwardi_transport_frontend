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
import { DriverCreationFromSchema } from "@/lib/schema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { ImageUpload } from "../common/image-upload";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useState, useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { Driver } from "@/lib/types";
import { updateDriverAction } from "@/app/actions/editDriverAction";

const EditDriverForm = ({ driver }: { driver: Driver }) => {
  const [isPending, startTransition] = useTransition();

  const [nidImageFile, setNidImageFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<{
    nidImage?: string;
  }>({});

  const [nidImagePreview, setNidImagePreview] = useState<string | null>(
    driver.nid_image || null
  );

  const form = useForm<z.infer<typeof DriverCreationFromSchema>>({
    resolver: zodResolver(DriverCreationFromSchema),
    defaultValues: {
      name: driver.name || "",
      phone: driver.phone || "",
      nid: driver.nid || "",
      address: driver.address || "",
      status: Number(driver.status),
    },
  });

  console.log("Driver data:", form.getValues());

  const handleNidImageChange = (file: File) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFileError((prev) => ({
          ...prev,
          nidImage: "File must be an image",
        }));
        return;
      }
      setNidImageFile(file);
      setNidImagePreview(URL.createObjectURL(file));
      setFileError((prev) => ({ ...prev, nidImage: undefined }));
    }
  };

  const handleRemoveNid = () => {
    setNidImageFile(null);
    if (nidImagePreview) {
      URL.revokeObjectURL(nidImagePreview);
      setNidImagePreview(null);
    }
  };

  const onSubmit = async (data: z.infer<typeof DriverCreationFromSchema>) => {
    
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
  
    {
      if (nidImageFile) {
        formData.append("nidimage", nidImageFile);
      }
    }

    startTransition(async () => {
      const res = await updateDriverAction(formData, driver.id);
      if (res.errors) {
        if (res.errors?.phone) {
          toast.error(res.message, {
            description: res.errors?.phone[0],
            duration: 2000,
          });
        }
      }

      if (res.code === 200) {
        form.reset();
        handleRemoveNid();
        toast.success(res.message, {
          description: res.message || "Driver updated successfully",
          duration: 2000,
        });
      }
    });
  };

  return (
    <ScrollArea className="h-[430px] pr-2">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Name:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="nid"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Nid Number:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <div className="space-y-1">
            <div className="text-sm font-medium">Nid Card:</div>
            <ImageUpload
              onChange={(file) => handleNidImageChange(file as File)}
              onRemove={handleRemoveNid}
              maxSize={1}
              preview={nidImagePreview}
            />
          </div>
          <FormField
            control={form.control}
            name="status"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Status:</FormLabel>
                <Select
                  onValueChange={(value) => field.onChange(Number(value))}
                  value={field?.value?.toString()}
                >
                  <FormControl className="w-full">
                    <SelectTrigger>
                      <SelectValue placeholder="Select a role" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="1">Active</SelectItem>
                    <SelectItem value="0">In-active</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Address:</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Driver"
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default EditDriverForm;
