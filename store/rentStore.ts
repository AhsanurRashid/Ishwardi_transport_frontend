import { RentCreationFromSchema } from "@/lib/schema";
import { z } from "zod";
import { create } from "zustand";
import { persist } from "zustand/middleware";

interface RentState {
  rentValue: z.infer<typeof RentCreationFromSchema>[];
  setRentValue: (value: z.infer<typeof RentCreationFromSchema>) => void;
  setDemurrageAmount: (value: string, index: number) => void;
}

export const useRentStore = create<RentState>()(
  persist(
    (set, get) => ({
      rentValue: [],
      setRentValue: (value: z.infer<typeof RentCreationFromSchema>) =>
        set({ rentValue: [value, ...(get().rentValue as any[])] }),

      setDemurrageAmount: (value: string, index: number) => {
        const {
          rentValue,
        }: { rentValue: z.infer<typeof RentCreationFromSchema>[] } = get();
        const updatedRentValue = rentValue.map((item, i) =>
          i === index ? { ...item, demurrageAmount: value } : item
        );
        set({ rentValue: updatedRentValue });
      },
    }),
    {
      name: "rent-store",
    }
  )
);
