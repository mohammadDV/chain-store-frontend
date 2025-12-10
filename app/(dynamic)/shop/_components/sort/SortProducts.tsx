"use client"

import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Icon } from "@/ui/icon";
import { cn } from "@/lib/utils";
import { useCallback } from "react";

type SortOption = "default" | "cheapest" | "expensive" | "topRated";

export const SortProducts = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();

  const currentSort = searchParams.get("sort");
  const currentColumn = searchParams.get("column");

  const getActiveSortOption = (): SortOption => {
    if (currentColumn === "amount" && currentSort === "asc") return "cheapest";
    if (currentColumn === "amount" && currentSort === "desc") return "expensive";
    if (currentColumn === "rate" && currentSort === "desc") return "topRated";
    return "default";
  };

  const activeSortOption = getActiveSortOption();

  const createQueryString = useCallback(
    (updates: Record<string, string | null>) => {
      const params = new URLSearchParams(searchParams.toString());

      Object.entries(updates).forEach(([key, value]) => {
        if (value === null || value === "") {
          params.delete(key);
        } else {
          params.set(key, value);
        }
      });

      return params.toString();
    },
    [searchParams]
  );

  const handleSortChange = (sortOption: SortOption) => {
    const updates: Record<string, string | null> = {};

    if (sortOption === "cheapest") {
      updates.sort = "asc";
      updates.column = "amount";
    } else if (sortOption === "expensive") {
      updates.sort = "desc";
      updates.column = "amount";
    } else if (sortOption === "topRated") {
      updates.sort = "desc";
      updates.column = "rate";
    } else {
      updates.sort = null;
      updates.column = null;
    }

    const queryString = createQueryString(updates);
    router.push(`${pathname}${queryString ? `?${queryString}` : ""}`);
  };

  return (
    <div className="flex items-center gap-2 lg:gap-4 bg-white lg:bg-transparent lg:p-0 pl-1.5 py-1 rounded-full">
      <div className="flex items-center gap-2 lg:gap-3">
        <Icon icon="solar--sort-outline" sizeClass="size-4.5 lg:size-6" className="text-primary" />
        <p className="hidden lg:block text-description">مرتب سازی</p>
      </div>
      <div className="hidden lg:block h-3 w-0.5 bg-border"></div>
      <div className="flex items-center gap-0.5 lg:gap-3">
        <button
          onClick={() => handleSortChange("default")}
          className={cn(
            "text-sm px-2 lg:px-0.5 rounded-full py-0.5 transition-colors cursor-pointer",
            activeSortOption === "default"
              ? "bg-secondary/10 lg:bg-transparent text-secondary font-medium"
              : "text-muted font-normal hover:text-secondary"
          )}
        >
          پیش فرض
        </button>
        <button
          onClick={() => handleSortChange("cheapest")}
          className={cn(
            "text-sm px-2 lg:px-0.5 rounded-full py-0.5 transition-colors cursor-pointer",
            activeSortOption === "cheapest"
              ? "bg-secondary/10 lg:bg-transparent text-secondary font-medium"
              : "text-muted font-normal hover:text-secondary"
          )}
        >
          ارزان ترین
        </button>
        <button
          onClick={() => handleSortChange("expensive")}
          className={cn(
            "text-sm px-2 lg:px-0.5 rounded-full py-0.5 transition-colors cursor-pointer",
            activeSortOption === "expensive"
              ? "bg-secondary/10 lg:bg-transparent text-secondary font-medium"
              : "text-muted font-normal hover:text-secondary"
          )}
        >
          گران ترین
        </button>
        <button
          onClick={() => handleSortChange("topRated")}
          className={cn(
            "text-sm px-2 lg:px-0.5 rounded-full py-0.5 transition-colors cursor-pointer",
            activeSortOption === "topRated"
              ? "bg-secondary/10 lg:bg-transparent text-secondary font-medium"
              : "text-muted font-normal hover:text-secondary"
          )}
        >
          محبوب ترین
        </button>
      </div>
    </div>
  );
};
