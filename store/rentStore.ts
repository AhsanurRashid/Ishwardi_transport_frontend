import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RentState {
  rentValue: any;
  setRentValue: (value: any) => void;
}

export const useRentStore = create<RentState>()(
  persist(
    (set, get) => ({
      rentValue: [],
      setRentValue: (value: any) => set({ rentValue: [value, ...(get().rentValue as any[])] }),
    }),
    {
      name: "rent-store",
    }
  )
);
