import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatPermissionKey(key: string): string {
  return key
    .split("_") // split by underscore
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1)) // capitalize each word
    .join(" "); // join with spaces
}
