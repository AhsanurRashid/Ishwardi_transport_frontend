import SearchInput from "@/components/common/search-input";
import RentTable from "./rent-table";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";

const RentTableWrapper = ({
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
      <SearchInput limit={limit} route="rents" />
      <Suspense fallback={<TableSkeleton />}>
        <RentTable query={query} page={page} limit={limit} />
      </Suspense>
    </div>
  );
};

export default RentTableWrapper;
