import SearchInput from "@/components/common/search-input";
import VehicleTable from "./vehicle-table";
import VehicleTableSkeleton from "@/components/skeletons/vehicle-table-skeleton";
import { Suspense } from "react";

const VehicleTableWrapper = async ({
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
      <SearchInput limit={limit} route="vehicles" />
      <Suspense fallback={<VehicleTableSkeleton />}>
        <VehicleTable query={query} page={page} limit={limit} />
      </Suspense>
    </div>
  );
};

export default VehicleTableWrapper;
