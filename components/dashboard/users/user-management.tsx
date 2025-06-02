"use client";

import { useState, useEffect, useTransition } from "react";
import { getUserListAction } from "@/app/actions/getUserListAction";
import type { User, UserListResponse } from "@/lib/types";
import UserTable from "./user-table";
import Pagination from "./pagination";
import UserSearch from "./user-search";
import { toast } from "sonner";

interface UserManagementProps {
  initialData: UserListResponse;
}

export default function UserManagement({ initialData }: UserManagementProps) {
  const [users, setUsers] = useState<User[]>(initialData.list || []);
  const [currentPage, setCurrentPage] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const [searchQuery, setSearchQuery] = useState("");
  const [totalItems, setTotalItems] = useState(initialData.list?.length || 0);
  const [isPending, startTransition] = useTransition();
  
  // Calculate total pages (Note: Your API might need to return total count for accurate pagination)
  const [totalPages, setTotalPages] = useState(1);

  const fetchUsers = async (query = "", page = 1, limit = 10) => {
    try {
      const response = await getUserListAction({ query, page, limit });

      if (response.error) {
        toast.error(response.error, {
          description: response.error,
          duration: 2000,
        });
        return;
      }

      // Handle your API response structure
      if (response.code === 200 && response.list) {
        setUsers(response.list);

        // Estimate total pages based on returned data
        // If we get a full page of results, assume there might be more
        if (response.list.length === limit) {
          setTotalPages(Math.max(page + 1, totalPages));
        } else {
          // If we get less than limit, this is likely the last page
          setTotalPages(page);
        }

        setTotalItems(response.list.length + (page - 1) * limit);
      } else {
        toast.error(response.error, {
          description: response.error,
          duration: 2000,
        });
      }
    } catch (error) {
      console.error("Error fetching users:", error);
      toast.error("Error", {
        description: "An unexpected error occurred while fetching users",
        duration: 2000,
      });
    }
  };

  const handleSearch = (query: string) => {
    setSearchQuery(query);
    setCurrentPage(1); // Reset to first page when searching
    startTransition(() => {
      fetchUsers(query, 1, pageSize);
    });
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    startTransition(() => {
      fetchUsers(searchQuery, page, pageSize);
    });
  };

  const handlePageSizeChange = (newPageSize: number) => {
    setPageSize(newPageSize);
    setCurrentPage(1); // Reset to first page when changing page size
    startTransition(() => {
      fetchUsers(searchQuery, 1, newPageSize);
    });
  };

  // Show error if initial data has error
  useEffect(() => {
    if (initialData.error) {
      toast.error("Error", {
        description: initialData.error,
        duration: 2000,
      });
    }
  }, [initialData.error, toast]);

  // Initialize total pages from initial data
  useEffect(() => {
    if (initialData.list && initialData.list.length === pageSize) {
      setTotalPages(2); // Assume at least 2 pages if we got a full first page
    }
  }, [initialData.list, pageSize]);

  return (
    <div className="space-y-6">
      <UserSearch onSearch={handleSearch} initialQuery={searchQuery} />

      <UserTable users={users} isLoading={isPending} />

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageSize={pageSize}
        totalItems={totalItems}
        onPageChange={handlePageChange}
        onPageSizeChange={handlePageSizeChange}
        isLoading={isPending}
      />
    </div>
  );
}
