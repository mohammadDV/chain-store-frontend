"use client";

import { Icon } from "@/ui/icon";
import { useRouter, useSearchParams } from "next/navigation";
import { ChangeEvent } from "react";

export const ReviewsSort = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const currentQuery = searchParams.get("query");
  const currentColumn = searchParams.get("column");

  const handleChange = (e: ChangeEvent<HTMLSelectElement>) => {
    const value = e.target.value;
    const params = new URLSearchParams(searchParams.toString());

    if (value) {
      params.set("query", value);
      params.set("column", "rate");
      params.set("page", "1");
    } else {
      params.delete("query");
      params.delete("column");
      params.set("page", "1");
    }

    router.replace(`?${params.toString()}`, { scroll: false });
  };

  return (
    <div className="relative min-w-[140px]">
      <select
        value={currentColumn === "rate" ? currentQuery || "" : ""}
        onChange={handleChange}
        className="w-full appearance-none bg-surface rounded-lg px-3 py-2 text-sm text-title pl-9 focus:outline-none focus:border-secondary cursor-pointer"
      >
        <option value="">همه دیدگاه‌ها</option>
        <option value="5">۵ ستاره</option>
        <option value="4">۴ ستاره</option>
        <option value="3">۳ ستاره</option>
        <option value="2">۲ ستاره</option>
        <option value="1">۱ ستاره</option>
      </select>
      <div className="absolute left-3 top-1/2 -translate-y-1/2 pointer-events-none text-description">
        <Icon icon="solar--alt-arrow-down-outline" sizeClass="size-4" />
      </div>
    </div>
  );
};
