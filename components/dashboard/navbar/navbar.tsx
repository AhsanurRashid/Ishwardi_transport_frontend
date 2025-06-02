import { Card } from "@/components/ui/card";
import React from "react";
import UserInfo from "./user-info";

const Navbar = () => {
  return (
    <nav>
      <Card className="px-4 py-2 mb-4">
        <div className="flex items-center justify-end">
          {/* <ThemeSwitcher /> */}
          <UserInfo />
        </div>
      </Card>
    </nav>
  );
};

export default Navbar;
