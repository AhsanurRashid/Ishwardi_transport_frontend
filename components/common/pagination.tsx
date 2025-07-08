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

interface PaginationProps {
  page: number;
  limit: number;
  route: string;
}

const Pagination = ({ page, limit, route }: PaginationProps) => {
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
  );
};

export default Pagination;
