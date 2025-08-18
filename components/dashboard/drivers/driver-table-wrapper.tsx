import Pagination from "@/components/common/pagination";
import SearchInput from "@/components/common/search-input";
import DriverTable from "./driver-table";
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
      <SearchInput limit={limit} route="drivers" />
      <Suspense fallback={<TableSkeleton />}>
        <DriverTable query={query} page={page} limit={limit} />
      </Suspense>
    </div>
  );
};

export default DriverTableWrapper;
