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
import { CompanyCreationFromSchema } from "@/lib/schema";
import type { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../ui/select";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { Textarea } from "../ui/textarea";
import { toast } from "sonner";
import { ICompany } from "@/lib/types";
import { updateCompanyAction } from "@/app/actions/editCompanyAction";

const EditCompanyForm = ({ company }: { company: ICompany }) => {
  const [isPending, startTransition] = useTransition();

  const form = useForm<z.infer<typeof CompanyCreationFromSchema>>({
    resolver: zodResolver(CompanyCreationFromSchema),
    defaultValues: {
      company_name: company.company_name || "",
      company_phone: company.company_phone || "",
      company_email: company.company_email || "",
      company_invoice_number: company.company_invoice_number || "",
      company_address: company.company_address || "",
      status: Number(company.status),
    },
  });

  const onSubmit = async (data: z.infer<typeof CompanyCreationFromSchema>) => {
    const formData = new FormData();

    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });

    startTransition(async () => {
      const res = await updateCompanyAction(formData, company.id);

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
        toast.success(res.message, {
          description: res.message || "Driver updated successfully",
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
            name="company_name"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Name:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_email"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Email: (Optional)</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Phone Number:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_invoice_number"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Invoice Number:</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="company_address"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Company Address:</FormLabel>
                <FormControl>
                  <Textarea rows={3} {...field} />
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

          <Button disabled={isPending} className="w-full" type="submit">
            {isPending ? (
              <Loader2 className="mr-2 h-4 w-4 animate-spin" />
            ) : (
              "Create Company"
            )}
          </Button>
        </form>
      </Form>
    </ScrollArea>
  );
};

export default EditCompanyForm;
