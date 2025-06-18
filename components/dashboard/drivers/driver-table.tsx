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
import { Driver } from "@/lib/types";
import { IdCard, Phone } from "lucide-react";
import Image from "next/image";
import DriverActions from "./driver-action";

const DriverTable = async () => {
  const driverData = await getDriverListAction({
    query: "",
    page: 1,
    limit: 10,
  });
  return (
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
        {driverData?.list?.map((driver: Driver) => (
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
              <DriverActions driverId={driver.id as number} />
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default DriverTable;
