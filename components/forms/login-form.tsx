"use client";

import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";

import { toast } from "sonner";

import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { LoginFormSchema } from "@/lib/schema";
import { useRouter } from "next/navigation";
import { logInSubmitFormAction } from "@/app/actions/loginActions";
import { useTransition } from "react";
import { Loader2 } from "lucide-react";
import { useRoleStore } from "@/store/roleStore";

const LoginForm = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const { setRoleValue } = useRoleStore();

  const form = useForm<z.infer<typeof LoginFormSchema>>({
    resolver: zodResolver(LoginFormSchema),
    defaultValues: {
      phone: "",
      password: "",
    },
  });

  async function onSubmit(data: z.infer<typeof LoginFormSchema>) {
    const formData = new FormData();
    formData.append("phone", data.phone);
    formData.append("password", data.password);

    startTransition(async () => {
      const result = await logInSubmitFormAction(formData);

      if (result.error) {
        toast.error(result.error, {
          description: "Login failed",
          duration: 2000,
        });
        return;
      }

      if (result?.code === 400) {
        toast.error(`Login with: ${data.phone}`, {
          description: result?.message || "Invalid credentials",
          duration: 2000,
        });
        return;
      }

      if (result?.code === 200) {
        setRoleValue(result?.role[0]);
        toast.success(`Login with: ${data.phone}`, {
          description: "Login successful",
          duration: 2000,
        });
        // push to dashboard
        router.push("/dashboard");
        router.refresh();
      }
    });
  }

  return (
    <Card className="w-full px-4">
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(onSubmit)}
          className="w-full space-y-6"
        >
          <FormField
            control={form.control}
            name="phone"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Phone Number</FormLabel>
                <FormControl>
                  <Input type="text" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="password"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Password</FormLabel>
                <FormControl>
                  <Input type="password" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
          <Button
            className="w-full cursor-pointer dark:text-white"
            type="submit"
            disabled={isPending}
          >
            {isPending ? <Loader2 className="animate-spin" /> : null}
            {isPending ? "Logging in..." : "Login"}
          </Button>
        </form>
      </Form>
    </Card>
  );
};

export default LoginForm;
