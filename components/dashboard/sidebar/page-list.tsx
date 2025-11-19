"use client";
import { pages } from "@/lib/data";
import { Page } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";

const PageList = () => {
  const [activePage, setActivePage] = useState<string>();
  const pathname = usePathname();

  useEffect(() => {
    const pathNameArray = pathname.split("/");

    if (pathNameArray.length > 2) {
      const pageName = pathNameArray[2];
      const page = pages.find((page: Page) => {
        return pageName === page.name.toLowerCase();
      });

      if (page) {
        setActivePage(page.name);
      } else {
        setActivePage("Dashboard");
      }
    } else {
      setActivePage("Dashboard");
    }
  }, [pathname]);

  return (
    <div className="py-6 flex flex-col gap-1">
      {pages.map((page: Page) => (
        <Link href={page.href} key={page.name}>
          <motion.div
            whileHover={{
              transition: {
                duration: 0.2,
                ease: "easeInOut",
              },
            }}
            whileTap={{ transition: { duration: 0.1 } }}
            className={cn(
              activePage === page.name && "bg-primary text-primary-foreground",
              "flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary hover:text-primary-foreground"
            )}
          >
            <page.icon size={15} />
            <p className="text-sm tracking-wide">{page.name}</p>
          </motion.div>
        </Link>
      ))}
    </div>
  );
};

export default PageList;
