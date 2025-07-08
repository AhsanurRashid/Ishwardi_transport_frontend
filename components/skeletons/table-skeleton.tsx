import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const UserTableSkeleton = () => {
  return (
    <Table>
      <TableHeader>
        <TableRow>
          <TableHead>
            <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
          </TableHead>
          <TableHead>
            <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
          </TableHead>
          <TableHead>
            <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
          </TableHead>
          <TableHead>
            <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
          </TableHead>
          <TableHead>
            <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
          </TableHead>
          <TableHead>
            <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
          </TableHead>
          <TableHead>
            <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
          </TableHead>
        </TableRow>
      </TableHeader>
      <TableBody>
        {[1, 2, 3, 4, 5].map((row) => (
          <TableRow key={row}>
            <TableCell className="py-6">
              <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
            </TableCell>
            <TableCell>
              <div className="w-full h-6 bg-muted rounded animate-pulse"></div>
            </TableCell>
          </TableRow>
        ))}
      </TableBody>
    </Table>
  );
}

export default UserTableSkeleton