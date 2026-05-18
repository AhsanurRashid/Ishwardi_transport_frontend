import SearchInput from "@/components/common/search-input";
import CompanyRentTable from "./company-rent-table";
import DateRangeFilter from "../rents/date-range-filter";
import { Suspense } from "react";
import TableSkeleton from "@/components/skeletons/table-skeleton";
import CompanyBillPrintButton from "./company-bill-print-button";

const CompanyRentTableWrapper = ({
  companyId,
  query,
  page,
  limit,
  from,
  to,
}: {
  companyId: number;
  query: string;
  page: number;
  limit: number;
  from?: string;
  to?: string;
}) => {
  return (
    <div className="space-y-4">
      <SearchInput limit={limit} route={`companies?company=${companyId}`} />
      <Suspense
        fallback={
          <div className="h-20 w-full bg-muted animate-pulse rounded" />
        }
      >
        <DateRangeFilter
          route={`companies?company=${companyId}`}
          extraButtons={
            <CompanyBillPrintButton companyId={companyId} from={from} to={to} />
          }
        />
      </Suspense>
      <Suspense fallback={<TableSkeleton />}>
        <CompanyRentTable
          companyId={companyId}
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

export default CompanyRentTableWrapper;
