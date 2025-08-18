"use client";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRentStore } from "@/store/rentStore";

const RentTable = () => {
  const { rentValue } = useRentStore();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>Date</TableHead>
          <TableHead>Company</TableHead>
          <TableHead>Driver</TableHead>
          <TableHead>Location</TableHead>
          <TableHead>Type</TableHead>
          <TableHead>Amount</TableHead>
          <TableHead>Demurrage Amount</TableHead>
          <TableHead className="text-right">Actions</TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {rentValue.map((rent: any, index: number) => (
          <TableRow
            key={`rent_table_row_${index}`}
            className="hover:bg-muted/50"
          >
            <TableCell className="font-medium">
              <div>
                <div className="font-medium">
                  {new Date(rent?.date).toLocaleDateString() || "N/A"}
                </div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium">{rent?.company || "N/A"}</div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium">{rent?.driver || "N/A"}</div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium">
                  {rent?.fromLocation || "N/A"} - to -{" "}
                  {rent?.toLocation || "N/A"}
                </div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium">{rent?.type || "N/A"}</div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium">{rent?.rentAmount || "N/A"}</div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium">
                  {rent?.demurrageAmount || "N/A"}
                </div>
              </div>
            </TableCell>
            <TableCell className="font-medium text-right">
              <div>
                <div className="font-medium">...</div>
              </div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
};

export default RentTable;
