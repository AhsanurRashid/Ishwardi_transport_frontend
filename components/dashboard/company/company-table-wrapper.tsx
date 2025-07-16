import Pagination from "@/components/common/pagination";
import SearchInput from "@/components/common/search-input";
import CompanyTable from "./company-table";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";

const DriverTableWrapper = ({
  query,
  page,
  limit,
}: {
  query: string;
  page: number;
  limit: number;
}) => {
  return (
    <div className="space-y-4">
      <SearchInput limit={limit} route="companies" />
      <Suspense fallback={<TableSkeleton />}>
        <CompanyTable query={query} page={page} limit={limit} />
      </Suspense>
      <Pagination page={page} limit={limit} route="companies" />
    </div>
  );
};

export default DriverTableWrapper;
