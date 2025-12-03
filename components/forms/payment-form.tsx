"use client";

import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { toast } from "sonner";
import { Button } from "../ui/button";
import { Input } from "../ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../ui/form";
import { z } from "zod";
import { makePaymentRentAction } from "@/app/actions/rent-action";

const PaymentFormSchema = z.object({
  amount: z.coerce.number().positive({
    message: "Amount must be a positive number.",
  }),
});

type PaymentFormData = z.infer<typeof PaymentFormSchema>;

const PaymentForm = ({
  rentId,
  dueAmount,
  onSuccess,
}: {
  rentId: number;
  dueAmount: number;
  onSuccess?: () => void;
}) => {
  const [isPending, startTransition] = useTransition();

  const PaymentFormSchemaWithMax = z.object({
    amount: z.coerce
      .number()
      .positive({
        message: "Amount must be a positive number.",
      })
      .max(Number(dueAmount), {
        message: `Amount cannot exceed due amount of ৳${dueAmount}`,
      }),
  });

  const form = useForm<PaymentFormData>({
    resolver: zodResolver(PaymentFormSchemaWithMax),
    defaultValues: {
      amount: 0,
    },
  });

    const onSubmit = async (data: PaymentFormData) => {
        startTransition(async () => {
            const result = await makePaymentRentAction(rentId, data.amount);

            if (result?.error) {
                toast.error(result.error, {
                    duration: 3000,
                });
            } else if (result?.code === 200) {
                toast.success(result.message || "Payment created successfully!", {
                    duration: 2000,
                });
                form.reset();
                onSuccess?.();
            } else {
                toast.error(result?.message || "Payment failed", {
                    description: result?.data,
                    duration: 3000,
                });
            }
        });
    };

    if (dueAmount <= 0) {
        return (
            <div className="mb-4 p-3 bg-yellow-100 rounded-md">
                <p className="text-sm text-yellow-800 text-center">
                    No due amount remaining for this rent.
                </p>
            </div>
        );
    }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="mb-4 p-3 bg-muted rounded-md">
          <p className="text-sm text-muted-foreground">
            Due Amount:{" "}
            <span className="font-semibold text-foreground">৳{dueAmount}</span>
          </p>
        </div>

        <FormField
          control={form.control}
          name="amount"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Payment Amount</FormLabel>
              <FormControl>
                <Input
                  type="number"
                  placeholder="Enter payment amount"
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

        <div className="flex justify-end gap-2">
          <Button type="submit" disabled={isPending && (form.getValues("amount") > Number(dueAmount))} className="w-full">
            {isPending && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            Submit Payment
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default PaymentForm;
