import { getDriverListAction } from "@/app/actions/getDriverListAction";
import GetStatusBadge from "@/components/common/get-status-badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Driver, UserProfile } from "@/lib/types";
import { IdCard, Phone } from "lucide-react";
import Image from "next/image";
import DriverActions from "./driver-action";
import DataFetchingFailed from "@/components/common/date-fetching-failed";
import Pagination from "@/components/common/pagination";
import { getUserDataAction } from "@/app/actions/getUserdataAction";

const DriverTable = async ({
  query,
  page,
  limit,
}: {
  query: string;
  page: number;
  limit: number;
}) => {
  const [profile, driverData] = await Promise.all([
    getUserDataAction(),
    getDriverListAction({
      query,
      page,
      limit,
    }),
  ]);

  if (driverData?.error)
    return <DataFetchingFailed error={driverData?.error} />;

  return (
    <>
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>National ID</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {driverData?.list.map((driver: Driver) => (
            <TableRow
              key={`driver_table_row_${driver.id}`}
              className="hover:bg-muted/50"
            >
              <TableCell className="font-medium">
                <div>
                  <div className="font-medium">{driver.name || "N/A"}</div>
                  <div className="text-xs text-muted-foreground">
                    ID: {driver.id || "N/A"}
                  </div>
                </div>
              </TableCell>
              <TableCell>
                <div className="flex items-center space-x-2">
                  <Phone className="h-4 w-4 text-muted-foreground" />
                  <span className="text-sm">{driver.phone || "N/A"}</span>
                </div>
              </TableCell>
              <TableCell>
                <>
                  <div className="flex items-center space-x-2">
                    <IdCard className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm font-mono">
                      {driver.nid || "N/A"}
                    </span>
                  </div>
                  {driver.nid_image ? (
                    <Image
                      src={driver.nid_image}
                      alt="NID"
                      width={100}
                      height={50}
                      className="object-contain"
                    />
                  ) : null}
                </>
              </TableCell>
              <TableCell>{driver.address || "N/A"}</TableCell>
              <TableCell>
                {driver.status === null ? (
                  "N/A"
                ) : (
                  <GetStatusBadge status={driver.status} />
                )}
              </TableCell>
              <TableCell className="text-right">
                <DriverActions
                  driverId={driver.id as number}
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
        total={driverData?.total_record}
        route="drivers"
      />
    </>
  );
};

export default DriverTable;
