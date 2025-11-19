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
import { getRentListAction } from "@/app/actions/rent-action";
import RentActions from "./rent-action";
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

const RentTable = async ({
  query,
  page,
  limit,
}: {
  query: string;
  page: number;
  limit: number;
}) => {
  const [profile, rentData] = await Promise.all([
    getUserDataAction(),
    getRentListAction({
      query,
      page,
      limit,
    }),
  ]);

  if (rentData?.error) return <DataFetchingFailed error={rentData?.error} />;

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
          {rentData?.list?.map((rent: IRent) => (
            <TableRow
              key={`rent_table_row_${rent.id}`}
              className="hover:bg-muted/50"
            >
              <TableCell className="font-medium">
                <div className="flex items-center space-x-2">
                  <CalendarDays className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">
                    {new Date(rent.date).toLocaleDateString() || "N/A"}
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
                  {rent.demurrageAmount && (
                    <div className="text-xs text-muted-foreground">
                      Demurrage: ৳{rent.demurrageAmount}
                    </div>
                  )}
                  {rent.dueAmount && (
                    <div className="text-xs text-red-600">
                      Due: ৳{rent.dueAmount}
                    </div>
                  )}
                </div>
              </TableCell>
              <TableCell>
                {rent.status === null || rent.status === undefined ? (
                  "N/A"
                ) : (
                  <GetStatusBadge
                    status={rent.status.toString() as "0" | "1"}
                  />
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
        total={rentData?.total_record}
        route="rents"
      />
    </>
  );
};

export default RentTable;
