import SearchInput from "@/components/common/search-input";
import RentTable from "./rent-table";
import DateRangeFilter from "./date-range-filter";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";

const RentTableWrapper = ({
  query,
  page,
  limit,
  from,
  to,
}: {
  query: string;
  page: number;
  limit: number;
  from?: string;
  to?: string;
}) => {
  return (
    <div className="space-y-4">
      <SearchInput limit={limit} route="rents" />
      <Suspense
        fallback={
          <div className="h-20 w-full bg-muted animate-pulse rounded" />
        }
      >
        <DateRangeFilter route="rents" />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <RentTable
          query={query}
          page={page}
          limit={limit}
          from={from}
          to={to}
        />
      </Suspense>
    </div>
  );
};

export default RentTableWrapper;
