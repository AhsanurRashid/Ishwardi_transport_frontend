"use client";
import { useTransition } from "react";
import { Button } from "../ui/button";
import { Loader2, LogOut, SplineIcon } from "lucide-react";
import { useRouter } from "next/navigation";
import { logoutAction } from "@/app/actions/logoutAction";
import { toast } from "sonner";
import { useRoleStore } from "@/store/roleStore";

const LogoutBtn = () => {
  const { clearRoleValue } = useRoleStore();
  const router = useRouter();
  const [isPending, startTransition] = useTransition();

  const handleLogout = async () => { 
    startTransition(async () => { 
      const result = await logoutAction()

      if (result.error) {
        toast.error(result.error, {
          description: "Login failed",
          duration: 2000,
        });
        return;
      }

      if (result?.code === 200) {
        clearRoleValue()
        toast.success("Logout successful", {
          description: result?.message || "You have been logged out",
          duration: 2000,
        });
        // push to login page
        router.push("/login");
        router.refresh();
      } 
    })
  }

  return (
    <Button
      onClick={handleLogout}
      variant="destructive"
      className="w-full cursor-pointer flex items-center justify-start gap-2"
      type="submit"
      disabled={isPending}
    >
      {isPending ? (
        <>
          <Loader2 className="text-white animate-spin" />
          Please wait
        </>
      ) : (
        <>
          <LogOut className=" text-white" />
          Logout
        </>
      )}
    </Button>
  );
};

export default LogoutBtn;
