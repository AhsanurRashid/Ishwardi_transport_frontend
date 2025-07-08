import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchState {
  searchValue: string;
  setSearchValue: (value: string) => void;
  clearSearch: () => void;
}

export const useSearchStore = create<SearchState>()(
  persist(
    (set) => ({
      searchValue: "",
      setSearchValue: (value: string) => set({ searchValue: value }),
      clearSearch: () => set({ searchValue: "" }),
    }),
    {
      name: "search-store",
    }
  )
);
