"use client";

import { useState } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Calendar, X } from "lucide-react";

const DateRangeFilter = ({ route }: { route: string }) => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const [fromDate, setFromDate] = useState(searchParams.get("from") || "");
  const [toDate, setToDate] = useState(searchParams.get("to") || "");

  const handleFilter = () => {
    const params = new URLSearchParams(searchParams.toString());
    const query = params.get("query") || "";
    const limit = params.get("limit") || "10";

    if (fromDate) {
      params.set("from", fromDate);
    } else {
      params.delete("from");
    }

    if (toDate) {
      params.set("to", toDate);
    } else {
      params.delete("to");
    }

    params.set("page", "1");
    params.set("query", query);
    params.set("limit", limit);

    router.push(`/dashboard/${route}?${params.toString()}`);
  };

  const handleClear = () => {
    setFromDate("");
    setToDate("");
    const params = new URLSearchParams(searchParams.toString());
    params.delete("from");
    params.delete("to");
    params.set("page", "1");

    router.push(`/dashboard/${route}?${params.toString()}`);
  };

  return (
    <div className="flex flex-wrap items-end gap-3">
      <div className="flex-1 min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">From Date</label>
        <Input
          type="date"
          value={fromDate}
          onChange={(e) => setFromDate(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex-1 min-w-[150px]">
        <label className="text-sm font-medium mb-1.5 block">To Date</label>
        <Input
          type="date"
          value={toDate}
          onChange={(e) => setToDate(e.target.value)}
          className="w-full"
        />
      </div>

      <div className="flex gap-2">
        <Button onClick={handleFilter} size="default">
          <Calendar className="h-4 w-4 mr-2" />
          Filter
        </Button>

        {(fromDate || toDate) && (
          <Button onClick={handleClear} variant="outline" size="default">
            <X className="h-4 w-4 mr-2" />
            Clear
          </Button>
        )}
      </div>
    </div>
  );
};

export default DateRangeFilter;
