import SearchInput from "@/components/common/search-input";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import RoleTable from "./role-table";

const RoleTableWrapper = ({
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
      <SearchInput limit={limit} route="roles" />
      <Suspense fallback={<TableSkeleton />}>
        <RoleTable query={query} page={page} limit={limit} />
      </Suspense>
    </div>
  );
};

export default RoleTableWrapper;
