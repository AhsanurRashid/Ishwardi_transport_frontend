"use client";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useRentStore } from "@/store/rentStore";

const Paid = () => {
  return <Badge className="bg-purple-500 text-white">Paid</Badge>;
};
const NoDemurrage = () => {
  return <Badge className="bg-yellow-500 text-white">No Demurrage</Badge>;
};
const Type = ({ type }: { type: "up" | "down" }) => {
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

const RentTable = () => {
  const { rentValue } = useRentStore();
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead className="text-center">Date</TableHead>
          <TableHead className="text-center">Company</TableHead>
          <TableHead className="text-center">Driver</TableHead>
          <TableHead className="text-center">Location</TableHead>
          <TableHead className="text-center">Type</TableHead>
          <TableHead className="text-center">Amount</TableHead>
          <TableHead className="text-center">Due</TableHead>
          <TableHead className="text-center">Demurrage</TableHead>
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
                <div className="font-medium">{<Type type={rent?.type} />}</div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium text-end">
                  {rent?.rentAmount || "N/A"}
                </div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium text-end">
                  {rent?.dueAmount || <Paid />}
                </div>
              </div>
            </TableCell>
            <TableCell className="font-medium">
              <div>
                <div className="font-medium text-end">
                  {rent?.demurrageAmount || <NoDemurrage />}
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
