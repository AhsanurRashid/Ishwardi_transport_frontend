"use client";

import Logo from "@/components/common/logo";
import { Menu, X } from "lucide-react";
import { useState } from "react";
import PageList from "../sidebar/page-list";
import Link from "next/link";
import { Card } from "@/components/ui/card";

const NavbarMenuListMobile = () => {
  const [showMenu, setShowMenu] = useState(false);
  return (
    <div className="lg:hidden flex items-center gap-2">
      <Logo className="w-[30px] h-[30px]" />
      <Menu className="cursor-pointer" onClick={() => setShowMenu(!showMenu)} />
      {showMenu && (
        <div className="fixed inset-0 w-full h-full bg-black/50 z-50 flex">
          <div className="2xl:min-w-[320px] min-w-[250px] min-h-screen bg-card shadow-md p-4 overflow-y-auto">
            <div className="w-full h-full">
              <div className="flex justify-between items-center gap-10">
                <Link href={"/dashboard"}>
                  <Card className="flex flex-row items-center gap-2 p-2">
                    <Logo className="w-[30px] h-[30px]" />
                    <p className="text-xs font-semibold tracking-wide">
                      ISHWARDI TRANSPORT AND AGENCY
                    </p>
                  </Card>
                </Link>
                <X
                  className="cursor-pointer"
                  onClick={() => setShowMenu(!showMenu)}
                />
              </div>
              <PageList />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavbarMenuListMobile;
