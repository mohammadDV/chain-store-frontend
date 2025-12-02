"use client"

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Input } from "@/ui/input";
import { useDebounce } from "@/hooks/useDebounce";
import { Icon } from "@/ui/icon";

export const QueryFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const [query, setQuery] = useState<string>(() => searchParams.get("query") || "");
  const debouncedQuery = useDebounce(query, 500);

  const updateURL = useCallback(
    (nextQuery: string) => {
      const params = new URLSearchParams(window.location.search);
      if (nextQuery && nextQuery.trim().length > 0) {
        params.set("query", nextQuery.trim());
      } else {
        params.delete("query");
      }
      params.delete("page");
      const newURL = `${pathname}?${params.toString()}`;
      router.push(newURL, { scroll: false });
    },
    [pathname, router]
  );

  useEffect(() => {
    const current = searchParams.get("query") || "";
    const next = debouncedQuery.trim();
    if (next === current) return;
    updateURL(next);
  }, [debouncedQuery, updateURL, searchParams]);

  useEffect(() => {
    const current = searchParams.get("query") || "";
    if (current !== query) {
      setQuery(current);
    }
  }, [searchParams]);

  return (
    <div className="relative">
      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="جستجوی محصول"
      />
      <Icon icon="solar--magnifer-outline" sizeClass="size-5" className="absolute top-1/2 -translate-y-1/2 left-3 text-disabled" />
    </div>
  );
};
