"use client";
import { pages } from "@/lib/data";
import { Page } from "@/lib/types";
import { cn } from "@/lib/utils";
import Link from "next/link";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { motion } from "motion/react";
import { ChevronDown, ChevronRight } from "lucide-react";
import { getCompanyListAction } from "@/app/actions/getCompanyListAction";

const PageList = () => {
  const [activePage, setActivePage] = useState<string>();
  const [companiesOpen, setCompaniesOpen] = useState(false);
  const [companies, setCompanies] = useState<any[]>([]);
  const [loadingCompanies, setLoadingCompanies] = useState(false);
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

  const handleCompaniesToggle = async () => {
    if (!companiesOpen && companies.length === 0) {
      setLoadingCompanies(true);
      try {
        const result = await getCompanyListAction({
          query: "",
          page: 1,
          limit: 100,
        });
        if (result?.list) {
          setCompanies(result.list);
        }
      } catch (error) {
        console.error("Failed to fetch companies:", error);
      } finally {
        setLoadingCompanies(false);
      }
    }
    setCompaniesOpen(!companiesOpen);
  };

  return (
    <div className="py-6 flex flex-col gap-1">
      {pages.map((page: Page) => (
        <div key={page.name}>
          {page.name === "Companies" ? (
            <>
              <div
                onClick={handleCompaniesToggle}
                className={cn(
                  activePage === page.name &&
                    "bg-primary text-primary-foreground",
                  "flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary hover:text-primary-foreground"
                )}
              >
                <page.icon size={15} />
                <p className="text-sm tracking-wide flex-1">{page.name}</p>
                {loadingCompanies ? (
                  <div className="animate-spin h-4 w-4 border-2 border-current border-t-transparent rounded-full" />
                ) : companiesOpen ? (
                  <ChevronDown size={15} />
                ) : (
                  <ChevronRight size={15} />
                )}
              </div>
              {companiesOpen && (
                <motion.div
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: "auto" }}
                  exit={{ opacity: 0, height: 0 }}
                  transition={{ duration: 0.2 }}
                  className="ml-6 mt-1 flex flex-col gap-1"
                >
                  <Link href="/dashboard/companies">
                    <div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-muted text-sm">
                      All Companies
                    </div>
                  </Link>
                  {companies.map((company) => (
                    <Link
                      href={`/dashboard/companies?company=${company.id}`}
                      key={company.id}
                    >
                      <div className="flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-muted text-sm truncate">
                        {company.company_name}
                      </div>
                    </Link>
                  ))}
                </motion.div>
              )}
            </>
          ) : (
            <Link href={page.href}>
              <motion.div
                whileHover={{
                  transition: {
                    duration: 0.2,
                    ease: "easeInOut",
                  },
                }}
                whileTap={{ transition: { duration: 0.1 } }}
                className={cn(
                  activePage === page.name &&
                    "bg-primary text-primary-foreground",
                  "flex items-center gap-2 p-2 rounded-md cursor-pointer hover:bg-primary hover:text-primary-foreground"
                )}
              >
                <page.icon size={15} />
                <p className="text-sm tracking-wide">{page.name}</p>
              </motion.div>
            </Link>
          )}
        </div>
      ))}
    </div>
  );
};

export default PageList;
