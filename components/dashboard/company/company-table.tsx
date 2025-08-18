import GetStatusBadge from "@/components/common/get-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { ICompany } from "@/lib/types";
import { IdCard, Mail, Phone } from "lucide-react";
import { getCompanyListAction } from "@/app/actions/getCompanyListAction";
import CompanyActions from "./company-action";
import DataFetchingFailed from "@/components/common/date-fetching-failed";
import Pagination from "@/components/common/pagination";

const CompanyTable = async ({
  query,
  page,
  limit,
}: {
  query: string;
  page: number;
  limit: number;
}) => {
  const companyData = await getCompanyListAction({
    query,
    page,
    limit,
  });

  if (companyData?.error)
    return <DataFetchingFailed error={companyData?.error} />;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Info</TableHead>
            <TableHead>Invoice No</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {companyData?.list.map((company: ICompany) => (
            <TableRow
              key={`driver_table_row_${company.id}`}
              className="hover:bg-muted/50"
            >
              <TableCell className="font-medium">
                <div>
                  <div className="font-medium">
                    {company.company_name || "N/A"}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Mail className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {company.company_email || "N/A"}
                  </span>
                </div>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {company.company_phone || "N/A"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <>
                  <div className="flex items-center space-x-2">
                    <IdCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono">
                      {company.company_invoice_number || "N/A"}
                    </span>
                  </div>
                </>
              </TableCell>
              <TableCell className="max-w-[200px] whitespace-normal break-words">
                <p className="text-sm">{company.company_address || "N/A"}</p>
              </TableCell>
              <TableCell>
                {company.status === null ? (
                  "N/A"
                ) : (
                  <GetStatusBadge status={company.status} />
                )}
              </TableCell>
              <TableCell className="text-right">
                <CompanyActions companyId={company.id as number} />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        page={page}
        limit={limit}
        total={companyData?.total_record}
        route="companies"
      />
    </>
  );
};

export default CompanyTable;
