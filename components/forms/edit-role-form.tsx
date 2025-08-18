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
import { RoleCreationFromSchema } from "@/lib/schema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { IPermissionList, IRole } from "@/lib/types";
import { Checkbox } from "../ui/checkbox";
import { formatPermissionKey } from "@/lib/utils";
import { updateRoleAction } from "@/app/actions/editRoleAction";

const EditRoleForm = ({
  permissions,
  role,
}: {
  permissions: IPermissionList;
  role: IRole;
}) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof RoleCreationFromSchema>>({
    resolver: zodResolver(RoleCreationFromSchema),
    defaultValues: {
      name: role.name || "",
      permission: role.permissions || [],
    },
  });

  const onSubmit = async (data: z.infer<typeof RoleCreationFromSchema>) => {
    const formData = new FormData();

    formData.append("name", data.name);
    data.permission.forEach((perm) => formData.append("permission[]", perm));

    startTransition(async () => {
      const res = await updateRoleAction(formData, role.id);
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
        form.setValue("permission", []);
        form.setValue("name", "");
        toast.success(res.message, {
          description: res.message || "Role Updated successfully",
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
                  <Input
                    type="text"
                    {...field}
                    placeholder='Ex: "Admin" or "User for Vehicle Management" etc.'
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="permission"
            render={() => (
              <FormItem>
                <FormLabel>Permissions:</FormLabel>
                <div className="grid grid-cols-2 gap-3 mt-2">
                  {Object.values(permissions).map((permission) => (
                    <FormField
                      key={permission}
                      control={form.control}
                      name="permission"
                      render={({ field }) => {
                        return (
                          <FormItem
                            key={permission}
                            className="flex items-center space-x-2"
                          >
                            <FormControl>
                              <Checkbox
                                checked={field.value?.includes(permission)}
                                onCheckedChange={(checked) => {
                                  return checked
                                    ? field.onChange([
                                        ...field.value,
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
                              {formatPermissionKey(permission)}
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

          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Update Role"
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default EditRoleForm;
