import { getUserDataAction } from "@/app/actions/getUserdataAction";
import LogoutBtn from "@/components/common/logout-btn";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { LogOut, User } from "lucide-react";

const UserInfo = async () => {
  const user = await getUserDataAction();

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
            <p className="text-xs font-light">
              {user?.profile?.name || "user"}
            </p>
          </div>
        </DropdownMenuTrigger>
        <DropdownMenuContent className="w-32" align="end">
          <DropdownMenuItem className="cursor-pointer gap-2">
            <User /> Profile
          </DropdownMenuItem>
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
