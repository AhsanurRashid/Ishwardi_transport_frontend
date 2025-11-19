import SearchInput from "@/components/common/search-input";
import UserTable from "./user-table";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";

const NewUserTable = ({
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
      <SearchInput limit={limit} route="users" />
      <Suspense fallback={<TableSkeleton />}>
        <UserTable query={query} page={page} limit={limit} />
      </Suspense>
    </div>
  );
};

export default NewUserTable;
