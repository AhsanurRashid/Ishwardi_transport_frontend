import { getUserDataAction } from "@/app/actions/getUserdataAction";
import DataFetchingFailed from "@/components/common/date-fetching-failed";
import LogoutBtn from "@/components/common/logout-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";
import { Suspense } from "react";

const UserInfo = async () => {
  const user = await getUserDataAction();

  if (user.error) return <DataFetchingFailed error={user.error} />;

  return (
    <div>
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <div className="flex items-center gap-2 cursor-pointer">
            <Avatar>
              <AvatarImage src={user?.profile?.thumbnail || ""} />
              <AvatarFallback>
                {user?.profile?.name
                  ? user.profile.name
                      .split(" ")
                      .map((n: string) => n[0])
                      .join("")
                  : "U"}
              </AvatarFallback>
            </Avatar>
            <Suspense
              fallback={
                <div className="h-4 w-16 animate-pulse rounded bg-muted"></div>
              }
            >
              <p className="text-xs font-light">{user?.profile?.name || "user"}</p>
            </Suspense>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32" align="end">
          <Link href="/dashboard/profile">
            <DropdownMenuItem className="cursor-pointer gap-2">
              <User /> Profile
            </DropdownMenuItem>
          </Link>
          <DropdownMenuSeparator />
          <DropdownMenuItem className="p-0">
            <LogoutBtn />
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </div>
  );
};

export default UserInfo;
