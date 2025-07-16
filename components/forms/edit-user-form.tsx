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
import { EditUserProfileFormSchema } from "@/lib/schema";
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
import { UserData } from "@/lib/types";
import { updateUserAction } from "@/app/actions/editUserAction";

const EditUserFrom = ({ user }: { user: UserData }) => {
  const [isPending, startTransition] = useTransition();

  const [nidImageFile, setNidImageFile] = useState<File | null>(null);
  const [thumbnailFile, setThumbnailFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<{
    nidImage?: string;
    thumbnail?: string;
  }>({});

  const [nidImagePreview, setNidImagePreview] = useState<string | null>(
    user.nid_image || null
  );
  const [thumbnailPreview, setThumbnailPreview] = useState<string | null>(null);

  const form = useForm<z.infer<typeof EditUserProfileFormSchema>>({
    resolver: zodResolver(EditUserProfileFormSchema),
    defaultValues: {
      name: user.name || "",
      phone: user.phone || "",
      nid: user.nid || "",
      address: user.address || "",
      role_id: Number(user.role_id),
      status: Number(user.status),
    },
  });

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

  // Handle thumbnail file change
  const handleThumbnailChange = (file: File) => {
    if (file) {
      if (!file.type.startsWith("image/")) {
        setFileError((prev) => ({
          ...prev,
          thumbnail: "File must be an image",
        }));
        return;
      }
      setThumbnailFile(file);
      setThumbnailPreview(URL.createObjectURL(file));
      setFileError((prev) => ({ ...prev, thumbnail: undefined }));
    }
  };

  const handleRemoveNid = () => {
    setNidImageFile(null);
    if (nidImagePreview) {
      URL.revokeObjectURL(nidImagePreview);
      setNidImagePreview(null);
    }
  };

  const handleRemoveThumbnail = () => {
    setThumbnailFile(null);
    if (thumbnailPreview) {
      URL.revokeObjectURL(thumbnailPreview);
      setThumbnailPreview(null);
    }
  };

  const onSubmit = async (data: z.infer<typeof EditUserProfileFormSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    if (nidImageFile) {
      formData.append("nidimage", nidImageFile);
    }

    if (thumbnailFile) {
      formData.append("thumbnail", thumbnailFile);
    }

    startTransition(async () => {
      const res = await updateUserAction(formData, user.id);
      
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
        form.reset({
          name: "",
          phone: "",
          nid: "",
          address: "",
          role_id: 1,
          status: 1,
        });
        handleRemoveNid();
        handleRemoveThumbnail();
        toast.success(res.message, {
          description: res.message || "User created successfully",
          duration: 2000,
        });
      }
    });
  };

  return (
    <ScrollArea className="w-full max-h-[calc(100vh-100px)] pr-2">
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
          <div className="space-y-1">
            <div className="text-sm font-medium">Thumbnail:</div>
            <ImageUpload
              onChange={(file) => handleThumbnailChange(file as File)}
              onRemove={handleRemoveThumbnail}
              maxSize={1}
              preview={thumbnailPreview}
            />
          </div>
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
            name="role_id"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Role:</FormLabel>
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
                    <SelectItem value="1">Admin</SelectItem>
                    <SelectItem value="2">User</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage />
              </FormItem>
            )}
          />
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
              "Edit User"
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default EditUserFrom;
