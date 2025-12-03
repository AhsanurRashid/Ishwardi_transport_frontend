import SearchInput from "@/components/common/search-input";
import CompanyRentTable from "./company-rent-table";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";

const CompanyRentTableWrapper = ({
  companyId,
  query,
  page,
  limit,
}: {
  companyId: number;
  query: string;
  page: number;
  limit: number;
}) => {
  return (
    <div className="space-y-4">
      <SearchInput limit={limit} route={`companies?company=${companyId}`} />
      <Suspense fallback={<TableSkeleton />}>
        <CompanyRentTable
          companyId={companyId}
          query={query}
          page={page}
          limit={limit}
        />
      </Suspense>
    </div>
  );
};

export default CompanyRentTableWrapper;
