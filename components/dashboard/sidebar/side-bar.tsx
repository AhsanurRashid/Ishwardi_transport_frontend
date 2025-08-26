import Logo from "@/components/common/logo";
import { Card } from "@/components/ui/card";
import React from "react";
import PageList from "./page-list";
import Link from "next/link";

const Sidebar = () => {
  return (
    <div className="2xl:min-w-[320px] min-w-[250px] min-h-screen bg-card shadow-md p-4 overflow-y-auto lg:block hidden">
      <div className="w-full h-full">
        <Link href={"/dashboard"}>
          <Card className="flex flex-row items-center gap-2 p-2">
            <Logo className="w-[30px] h-[30px]" />
            <p className="text-xs font-semibold tracking-wide">
              ISHWARDI TRANSPORT AND AGENCY
            </p>
          </Card>
        </Link>
        <PageList />
      </div>
    </div>
  );
};

export default Sidebar;
