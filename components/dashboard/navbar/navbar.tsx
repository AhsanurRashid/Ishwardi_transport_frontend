import { Card } from "@/components/ui/card";
import React from "react";
import UserInfo from "./user-info";
import ThemeSwitcher from "@/components/common/theme-switcher";
import NavbarMenuListMobile from "./navbar-menu-list-mobile";

const Navbar = () => {
  return (
    <nav>
      <Card className="px-4 py-2 mb-4 flex flex-row items-center lg:justify-end justify-between">
        <NavbarMenuListMobile />
        <div className="flex items-center justify-end gap-4">
          <UserInfo />
          <ThemeSwitcher />
        </div>
      </Card>
    </nav>
  );
};

export default Navbar;
