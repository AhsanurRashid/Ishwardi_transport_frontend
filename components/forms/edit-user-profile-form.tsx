import { EditUserProfileFormSchema } from "@/lib/schema";
import { PermissionMap, UserProfile } from "@/lib/types";
import { useForm } from "react-hook-form";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { ImageUpload } from "../common/image-upload";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { Textarea } from "../ui/textarea";
import { Checkbox } from "../ui/checkbox";
import { start } from "repl";
import { startTransition } from "react";
import { updateProfileAction } from "@/app/actions/updateProfileAction";

const EditUserProfileForm = ({
  profile,
  permissions,
}: {
  profile: UserProfile;
  permissions: PermissionMap;
}) => {
  const form = useForm<z.infer<typeof EditUserProfileFormSchema>>({
    resolver: zodResolver(EditUserProfileFormSchema),
    defaultValues: {
      name: profile?.name || "",
      email: profile?.email || "",
      phone: profile?.phone || "",
      nid: profile?.nid || "",
      nid_image: undefined,
      address: profile?.address || "",
      thumbnail: undefined,
      role: (() => {
        const roleValue = Array.isArray(profile?.role)
          ? profile?.role[0]
          : profile?.role;
        switch ((roleValue || "").toLowerCase()) {
          case "admin":
            return "Admin";
          case "user":
            return "User";
          case "moderator":
            return "Moderator";
          case "editor":
            return "Editor";
          default:
            return "Admin";
        }
      })(),
      permissions: profile?.permissions || [],
    },
  });

  const onSubmit = async(data: z.infer<typeof EditUserProfileFormSchema>) => {
    const formData = new FormData();
    formData.append("name", data.name);
    formData.append("phone", data.phone || "");
    formData.append("nid", data.nid || "");
    formData.append("nid_image", data.nid_image || "");
    formData.append("address", data.address || "");
    formData.append("thumbnail", data.thumbnail || "");
    formData.append("role", data.role || "");
    formData.append("permissions", JSON.stringify(data.permissions));

    startTransition(async () => {
      const result = await updateProfileAction(formData);
      console.log("update profile =>", result);
    })
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="w-full space-y-6">
        {/* // Form fields - name */}
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="Enter your full name" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* // Form fields - phone */}
        <FormField
          control={form.control}
          name="phone"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Phone Number</FormLabel>
              <FormControl>
                <Input placeholder="01712345678 or +8801712345678" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* // Form fields - nid */}
        <FormField
          control={form.control}
          name="nid"
          render={({ field }) => (
            <FormItem>
              <FormLabel>National ID (NID)</FormLabel>
              <FormControl>
                <Input placeholder="Enter your NID number" {...field} />
              </FormControl>
              <FormDescription>Your National ID card number.</FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* // Form fields - address */}
        <FormField
          control={form.control}
          name="address"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Address</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Enter your complete address"
                  className="resize-none"
                  rows={3}
                  {...field}
                />
              </FormControl>
              <FormDescription>
                Your complete residential address.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* // Form fields - nid image */}
        <FormField
          control={form.control}
          name="nid_image"
          render={({ field }) => (
            <FormItem>
              <FormLabel>NID Image:</FormLabel>
              <FormControl>
                <ImageUpload
                  onChange={(file) => field.onChange(file)}
                  maxSize={5} // Maximum file size in MB
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* // Form fields - thumbnail */}
        <FormField
          control={form.control}
          name="thumbnail"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Thumbnail:</FormLabel>
              <FormControl>
                <ImageUpload
                  onChange={(file) => field.onChange(file)}
                  maxSize={5} // Maximum file size in MB
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* // Form fields - role */}
        <FormField
          control={form.control}
          name="role"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Role:</FormLabel>
              <Select onValueChange={field.onChange} value={field.value}>
                <FormControl className="w-full">
                  <SelectTrigger>
                    <SelectValue placeholder="Select a role" />
                  </SelectTrigger>
                </FormControl>
                <SelectContent>
                  <SelectItem value="Admin">Admin</SelectItem>
                  <SelectItem value="User">User</SelectItem>
                  <SelectItem value="Moderator">Moderator</SelectItem>
                  <SelectItem value="Editor">Editor</SelectItem>
                </SelectContent>
              </Select>
              <FormMessage />
            </FormItem>
          )}
        />

        {/* // Form fields - permissions */}
        <FormField
          control={form.control}
          name="permissions"
          render={() => (
            <FormItem>
              <div className="mb-4">
                <FormLabel className="text-base">Permissions:</FormLabel>
              </div>
              <div className="grid grid-cols-2 gap-2">
                {Object.values(permissions).map((permission, index) => (
                  <FormField
                    key={index}
                    control={form.control}
                    name="permissions"
                    render={({ field }) => {
                      return (
                        <FormItem
                          key={index}
                          className="flex flex-row items-start space-x-3 space-y-0"
                        >
                          <FormControl>
                            <Checkbox
                              checked={field.value?.includes(permission)}
                              onCheckedChange={(checked) => {
                                return checked
                                  ? field.onChange([
                                      ...(field.value ?? []),
                                      permission,
                                    ])
                                  : field.onChange(
                                      field.value?.filter(
                                        (value) => value !== permission
                                      )
                                    );
                              }}
                            />
                          </FormControl>
                          <FormLabel className="text-sm font-normal">
                            {permission}
                          </FormLabel>
                        </FormItem>
                      );
                    }}
                  />
                ))}
              </div>
              <FormMessage />
            </FormItem>
          )}
        />
        <Button className="w-full" type="submit">
          Create
        </Button>
      </form>
    </Form>
  );
};

export default EditUserProfileForm;
