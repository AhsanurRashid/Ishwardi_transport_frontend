"use client";

import { useSearchStore } from "@/store/searchStore";
import { Search, X } from "lucide-react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

const SearchInput = ({ limit, route }: { limit: number; route: string }) => {
  const router = useRouter();
  const { searchValue, setSearchValue, clearSearch } = useSearchStore();
  const [isFocused, setIsFocused] = useState(false);

  useEffect(() => {
    const delayDebounce = setTimeout(() => {
      router.push(
        `/dashboard/${route}?query=${searchValue}&page=1&limit=${limit}`
      );
    }, 500);
    return () => clearTimeout(delayDebounce);
  }, [searchValue]);

  useEffect(() => {
    handleClearSearch();
  }, [route]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const handleClearSearch = () => {
    clearSearch();
  };
  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="relative group">
        <div
          className={`
          relative flex items-center bg-white border rounded transition-all duration-300 ease-in-out
          ${
            isFocused
              ? "border-primary shadow-blue-100 shadow-xl"
              : "border-gray-200 hover:border-gray-300 hover:shadow-xl"
          }
        `}
        >
          <div className="flex items-center pl-4 pr-3 py-3">
            <Search
              className={`
              w-5 h-5 transition-colors duration-200
              ${isFocused ? "text-primary" : "text-gray-400"}
            `}
            />
          </div>

          <input
            type="text"
            value={searchValue}
            onChange={handleInputChange}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setIsFocused(false)}
            placeholder="Search with name or phone..."
            className="flex-1 py-3 pr-12 bg-transparent text-gray-700 placeholder-gray-400 focus:outline-none text-sm"
          />

          {searchValue && (
            <button
              onClick={handleClearSearch}
              className="absolute right-3 p-2 text-gray-400 hover:text-gray-600 transition-colors duration-200 hover:bg-gray-100 rounded-full"
            >
              <X className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchInput;
