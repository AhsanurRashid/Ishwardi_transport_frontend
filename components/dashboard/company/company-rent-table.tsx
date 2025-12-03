"use server";

import GetStatusBadge from "@/components/common/get-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IRent, UserProfile } from "@/lib/types";
import { CalendarDays, MapPin, Truck, User } from "lucide-react";
import { getRentCompanyWise } from "@/app/actions/rent-action";
import RentActions from "../rents/rent-action";
import DataFetchingFailed from "@/components/common/date-fetching-failed";
import Pagination from "@/components/common/pagination";
import { getUserDataAction } from "@/app/actions/getUserdataAction";
import { Badge } from "@/components/ui/badge";

const RentTypeBadge = ({ type }: { type: "up" | "down" }) => {
  return (
    <Badge
      className={
        type === "up" ? "bg-green-500 text-white" : "bg-red-500 text-white"
      }
    >
      {type === "up" ? "Up" : "Down"}
    </Badge>
  );
};

const CompanyRentTable = async ({
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
  const [profile, rentData] = await Promise.all([
    getUserDataAction(),
    getRentCompanyWise({
      companyId,
      page,
      limit,
    }),
  ]);

  if (rentData?.error) return <DataFetchingFailed error={rentData?.error} />;

  if (!rentData?.list || rentData.list.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-12 border rounded-lg bg-muted/20">
        <Truck className="h-12 w-12 text-muted-foreground mb-4" />
        <h3 className="text-lg font-semibold text-muted-foreground mb-2">
          No Rent Records Found
        </h3>
        <p className="text-sm text-muted-foreground">
          This company has no rent records yet.
        </p>
      </div>
    );
  }

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Company & Driver</TableHead>
            <TableHead>Vehicle</TableHead>
            <TableHead>Location</TableHead>
            <TableHead>Type</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {rentData.list.map((rent: IRent) => (
            <TableRow
              key={`rent_table_row_${rent.id}`}
              className="hover:bg-muted/50"
            >
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(rent.from_date).toLocaleDateString() || "N/A"} →{" "}
                    {new Date(rent.to_date).toLocaleDateString() || "N/A"}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2">
                    <span className="text-sm font-medium">
                      {rent.company || "N/A"}
                    </span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <User className="h-3 w-3 text-muted-foreground" />
                    <span className="text-xs text-muted-foreground">
                      {rent.driver || "N/A"}
                    </span>
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Truck className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{rent.vehicle || "N/A"}</span>
                </div>
              </TableCell>
              <TableCell className="max-w-[200px]">
                <div className="flex items-center space-x-2">
                  <MapPin className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm truncate">
                    {rent.fromLocation} → {rent.toLocation}
                  </span>
                </div>
              </TableCell>
              <TableCell>
                <RentTypeBadge type={rent.type} />
              </TableCell>
              <TableCell>
                <div className="space-y-1">
                  <div className="text-sm font-medium">
                    ৳{rent.rentAmount || "0"}
                  </div>
                  <div className="text-xs text-red-600">
                    Due: ৳{rent.payments_due}
                  </div>
                  {rent.demurrageAmount && (
                    <div className="text-xs text-muted-foreground">
                      Demurrage: ৳{rent.demurrageAmount}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {rent.payments_due === 0 ? (
                  <div className="text-green-600 bg-green-100 text-center py-1 font-semibold">
                    Paid
                  </div>
                ) : (
                  <div className="text-red-600 bg-red-100 text-center py-1 font-semibold">
                    Due
                  </div>
                )}
              </TableCell>
              <TableCell className="text-right">
                <RentActions
                  rentId={rent.id as number}
                  profile={profile?.profile as UserProfile}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
      <Pagination
        page={page}
        limit={limit}
        route={`companies?company=${companyId}`}
        total={rentData?.total_record || 0}
      />
    </>
  );
};

export default CompanyRentTable;
