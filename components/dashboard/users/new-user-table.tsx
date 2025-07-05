"use client";
import { getUserListAction } from "@/app/actions/getUserListAction";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { UserData } from "@/lib/types";
import { IdCard, Phone } from "lucide-react";
import { Suspense, useEffect, useState } from "react";
import Image from "next/image";
import UserActions from "./user-actions";
import GetStatusBadge from "@/components/common/get-status-badge";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

const NewUserTable = ({
  users,
  query,
  page,
  limit,
}: {
  users: UserData[];
  query: string;
  page: number;
  limit: number;
}) => {
  const router = useRouter();
  const [search, setSearch] = useState(query);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.push(`/dashboard/users?query=${search}&page=1&limit=${limit}`);
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [search]);

  const goToPage = (p: number) => {
    router.push(`/dashboard/users?query=${search}&page=${p}&limit=${limit}`);
  };

  const handleLimitChange = (value: string) => {
    const newLimit = parseInt(value);
    router.push(`/dashboard/users?query=${search}&page=1&limit=${newLimit}`);
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  const getRoleBadge = (role: UserData["role"]) => {
    if (!role)
      return <span className="text-muted-foreground text-sm">No role</span>;

    const colors = {
      Admin: "bg-purple-100 text-purple-800 hover:bg-purple-100",
      Manager: "bg-blue-100 text-blue-800 hover:bg-blue-100",
      User: "bg-gray-100 text-gray-800 hover:bg-gray-100",
    };

    return (
      <Badge
        variant="secondary"
        className={colors[role as keyof typeof colors]}
      >
        {role}
      </Badge>
    );
  };
  return (
    <>
      <input
        className="border px-3 py-2 mb-4 rounded w-full max-w-md"
        type="text"
        placeholder="Search by name, phone, etc."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Phone</TableHead>
            <TableHead>National ID</TableHead>
            <TableHead>Address</TableHead>
            <TableHead>Status</TableHead>
            <TableHead>Role</TableHead>
            <TableHead className="text-right">Actions</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          <Suspense fallback={<div>Loading...</div>}>
            {users.map((user: UserData) => (
              <TableRow
                key={`user_table_row_${user.id}`}
                className="hover:bg-muted/50"
              >
                <TableCell>
                  <div className="flex items-center space-x-3">
                    <Avatar className="h-10 w-10">
                      <AvatarImage
                        src={user.thumbnail || ""}
                        alt={user.name || "User"}
                      />
                      <AvatarFallback className="text-sm font-medium">
                        {getInitials(user.name || "User")}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <div className="font-medium">{user.name}</div>
                      <div className="text-sm text-muted-foreground">
                        {user.email || "No email"}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        ID: {user.id}
                      </div>
                    </div>
                  </div>
                </TableCell>
                <TableCell>
                  <div className="flex items-center space-x-2">
                    <Phone className="h-4 w-4 text-muted-foreground" />
                    <span className="text-sm">{user.phone}</span>
                  </div>
                </TableCell>
                <TableCell>
                  <>
                    {user.nid ? (
                      <div className="flex items-center space-x-2">
                        <IdCard className="h-4 w-4 text-muted-foreground" />
                        <span className="text-sm font-mono">{user.nid}</span>
                      </div>
                    ) : (
                      <span className="text-sm text-muted-foreground">
                        Not provided
                      </span>
                    )}
                    {user.nid_image ? (
                      <Image
                        src={user.nid_image || ""}
                        alt="NID"
                        width={100}
                        height={50}
                        className="object-contain"
                      />
                    ) : null}
                  </>
                </TableCell>
                <TableCell>
                  <span className="text-sm">
                    {user.address || (
                      <span className="text-muted-foreground">
                        Not provided
                      </span>
                    )}
                  </span>
                </TableCell>
                <TableCell>
                  {user.status ? (
                    <GetStatusBadge status={user.status} />
                  ) : (
                    "No status"
                  )}
                </TableCell>
                <TableCell>
                  {user.role ? getRoleBadge(user.role) : "No role"}
                </TableCell>
                <TableCell className="text-right">
                  <UserActions userId={user.id as number} />
                </TableCell>
              </TableRow>
            ))}
          </Suspense>
        </TableBody>
      </Table>
      <div className="flex justify-between mt-4 border-t pt-4">
        <div className="flex items-center gap-2">
          <span className="text-sm">Rows per page:</span>
          <Select value={limit.toString()} onValueChange={handleLimitChange}>
            <SelectTrigger className="w-[100px]">
              <SelectValue placeholder="Limit" />
            </SelectTrigger>
            <SelectContent>
              {[5, 10, 20, 50].map((value) => (
                <SelectItem key={value} value={value.toString()}>
                  {value}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <div className="mt-4 flex gap-2">
          <button
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            Prev
          </button>
          <button
            onClick={() => goToPage(page + 1)}
            className="px-3 py-1 border rounded"
          >
            Next
          </button>
        </div>
      </div>
    </>
  );
};

export default NewUserTable;
