"use client";

import type React from "react";

import { useState, useTransition } from "react";
import { Loader2, Search, X } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface UserSearchProps {
  onSearch: (query: string) => void;
  initialQuery?: string;
}

export default function UserSearch({
  onSearch,
  initialQuery = "",
}: UserSearchProps) {
  const [query, setQuery] = useState(initialQuery);
  const [isPending, startTransition] = useTransition();

  const handleSearch = () => {
    startTransition(() => {
      onSearch(query);
    });
  };

  const handleClear = () => {
    setQuery("");
    startTransition(() => {
      onSearch("");
    });
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  return (
    <div className="flex items-center justify-center space-x-2 mb-6">
      <div className="relative flex-1 max-w-sm">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
        <Input
          type="text"
          placeholder="Search users by name, phone, or email..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyUp={handleKeyPress}
          className="pl-10 pr-10"
          disabled={isPending}
        />
        {query && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleClear}
            className="absolute right-1 top-1/2 transform -translate-y-1/2 h-6 w-6 p-0"
            disabled={isPending}
          >
            <X className="h-3 w-3" />
          </Button>
        )}
      </div>
      <Button onClick={handleSearch} disabled={isPending} className="px-6">
        {isPending ? <Loader2 className="animate-spin" /> : null}
        {isPending ? "Searching..." : "Search"}
      </Button>
    </div>
  );
}
