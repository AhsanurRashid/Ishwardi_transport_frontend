import { create } from "zustand";
import { persist } from "zustand/middleware";

interface SearchState {
  roleValue: string;
  setRoleValue: (value: string) => void;
  clearRoleValue: () => void;
}

export const useRoleStore = create<SearchState>()(
  persist(
    (set) => ({
      roleValue: "",
      setRoleValue: (value: string) => set({ roleValue: value }),
      clearRoleValue: () => set({ roleValue: "" }),
    }),
    {
      name: "role-store",
    }
  )
);
