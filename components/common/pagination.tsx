"use client";
import { useRouter } from "next/navigation";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { useSearchStore } from "@/store/searchStore";
import { Button } from "../ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";

interface PaginationProps {
  page: number;
  limit: number;
  route: string;
  total: number; // Optional, if you want to display total records
}

const Pagination = ({ page, limit, route, total }: PaginationProps) => {
  const { searchValue } = useSearchStore();
  const router = useRouter();

  const goToPage = (p: number) => {
    router.push(
      `/dashboard/${route}?query=${searchValue}&page=${p}&limit=${limit}`
    );
  };

  const handleLimitChange = (value: string) => {
    const newLimit = parseInt(value);
    router.push(
      `/dashboard/${route}?query=${searchValue}&page=1&limit=${newLimit}`
    );
  };
  return (
    <div className="flex justify-between">
      <div className="flex items-center gap-2">
        <span className="text-sm">Per page:</span>
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
      {total && total <= limit ? (
        <div className="text-sm text-muted-foreground">
          Showing {total} result{total > 1 ? "s" : ""} in total
        </div>
      ) : (
        <div className="mt-4 flex gap-2">
          <Button
            variant="outline"
            size="icon"
            disabled={page <= 1}
            onClick={() => goToPage(page - 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            <ChevronLeft />
          </Button>
          {Array.from({ length: Math.ceil((total || 0) / limit) }, (_, i) => (
            <Button
              variant="outline"
              key={i}
              onClick={() => goToPage(i + 1)}
              className={`px-3 py-1 border rounded ${
                i + 1 === page ? "bg-primary text-white" : ""
              }`}
            >
              {i + 1}
            </Button>
          ))}
          <Button
            variant="outline"
            size="icon"
            disabled={total ? page * limit >= total : false}
            onClick={() => goToPage(page + 1)}
            className="px-3 py-1 border rounded disabled:opacity-50"
          >
            <ChevronRight />
          </Button>
        </div>
      )}
    </div>
  );
};

export default Pagination;
