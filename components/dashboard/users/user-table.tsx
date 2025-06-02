"use client";

import type { User } from "@/lib/types";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import {
  Edit,
  Eye,
  Trash2,
  Phone,
  Mail,
  MapPin,
  CreditCard,
} from "lucide-react";
import Image from "next/image";

interface UserTableProps {
  users: User[];
  isLoading?: boolean;
}

export default function UserTable({
  users,
  isLoading = false,
}: UserTableProps) {
  const getStatusBadge = (status: string) => {
    return status === "1" ? (
      <Badge
        variant="default"
        className="bg-green-100 text-green-800 hover:bg-green-100"
      >
        Active
      </Badge>
    ) : (
      <Badge
        variant="secondary"
        className="bg-red-100 text-red-800 hover:bg-red-100"
      >
        Inactive
      </Badge>
    );
  };

  const getRoleBadge = (role: string | null) => {
    if (!role) return <Badge variant="outline">No Role</Badge>;

    return role === "Admin" ? (
      <Badge variant="destructive">Admin</Badge>
    ) : (
      <Badge variant="default">User</Badge>
    );
  };

  const getInitials = (name: string) => {
    return name
      .split(" ")
      .map((word) => word.charAt(0))
      .join("")
      .toUpperCase()
      .slice(0, 2);
  };

  if (isLoading) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="space-y-4">
            {[...Array(5)].map((_, i) => (
              <div
                key={i}
                className="flex items-center space-x-4 animate-pulse"
              >
                <div className="w-10 h-10 bg-muted rounded-full"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-4 bg-muted rounded w-1/4"></div>
                  <div className="h-3 bg-muted rounded w-1/3"></div>
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>
    );
  }

  if (users.length === 0) {
    return (
      <Card>
        <CardHeader>
          <CardTitle>Users</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-center py-8">
            <p className="text-muted-foreground">No users found!</p>
          </div>
        </CardContent>
      </Card>
    );
  }

  return (
    <Card>
      <CardHeader>
        <CardTitle>Users ({users.length})</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="rounded-md border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>User</TableHead>
                <TableHead>Contact</TableHead>
                <TableHead>Role</TableHead>
                <TableHead>Status</TableHead>
                <TableHead>NID</TableHead>
                <TableHead className="text-right">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {users.map((user) => (
                <TableRow key={user.id}>
                  <TableCell>
                    <div className="flex items-center space-x-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={user.thumbnail || undefined}
                          alt={user.name || "User"}
                        />
                        <AvatarFallback>
                          {getInitials(user.name || "Name not found")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="text-xs">
                        <div className="font-medium">
                          {user.name || "No Name"}
                        </div>
                        <div className="text-muted-foreground">
                          ID: {user.id}
                        </div>
                      </div>
                    </div>
                  </TableCell>
                  <TableCell>
                    <div className="space-y-1 text-xs">
                      <div className="flex items-center font-medium">
                        <Phone className="h-3 w-3 mr-1 text-muted-foreground" />
                        {user.phone || "No Phone"}
                      </div>
                      {/* {user.email && (
                        <div className="flex items-center text-sm text-muted-foreground">
                          <Mail className="h-3 w-3 mr-1" />
                          {user.email}
                        </div>
                      )} */}
                      {user.address && (
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-3 w-3 mr-1" />
                          {user.address}
                        </div>
                      )}
                    </div>
                  </TableCell>
                  <TableCell>{getRoleBadge(user.role)}</TableCell>
                  <TableCell>
                    {getStatusBadge(user.status || "No Status")}
                  </TableCell>
                  <TableCell>
                    {user.nid ? (
                      <div className="flex flex-col items-start gap-2">
                        <div className="flex space-x-2">
                          <CreditCard className="h-3 w-3 text-muted-foreground" />
                          <span className="text-xs font-medium">
                            {user.nid}
                          </span>
                        </div>
                        {user.nid_image && (
                          <Image
                            src={user.nid_image}
                            alt="NID"
                            width={100}
                            height={100}
                          />
                        )}
                      </div>
                    ) : (
                      <span className="text-red-500 text-xs">No NID</span>
                    )}
                  </TableCell>
                  <TableCell className="text-right">
                    <div className="flex items-center justify-end space-x-2">
                      <Button variant="ghost" size="sm">
                        <Edit className="h-4 w-4" />
                      </Button>
                      <Button
                        variant="ghost"
                        size="sm"
                        className="text-destructive hover:text-destructive"
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>
      </CardContent>
    </Card>
  );
}
