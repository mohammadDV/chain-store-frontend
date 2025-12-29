"use client";

import { postFetch } from "@/core/publicService";
import { useDebounce } from "@/hooks/useDebounce";
import { createFileUrl, cn, putCommas } from "@/lib/utils";
import { SearchSuggestionsResponse } from "@/types/search-suggestions.type";
import { Icon } from "@/ui/icon";
import { Input } from "@/ui/input";
import Image from "next/image";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function normalizeImageUrl(url: string) {
  return url.replace(/`/g, "").trim();
}

export function HeaderSearch() {
  const [query, setQuery] = useState("");
  const debouncedQuery = useDebounce(query.trim(), 350);

  const [open, setOpen] = useState(false);
  const [data, setData] = useState<SearchSuggestionsResponse | null>(null);
  const [hasError, setHasError] = useState(false);

  const rootRef = useRef<HTMLDivElement | null>(null);
  const requestIdRef = useRef(0);

  const showPanel = open && debouncedQuery.length >= 2;

  const products = data?.products ?? [];
  const categories = data?.categories ?? [];

  const hasAnyResult = useMemo(() => {
    return products.length > 0 || categories.length > 0;
  }, [products.length, categories.length]);

  const fetchSuggestions = (q: string) => {
    const id = ++requestIdRef.current;
    setHasError(false);
    postFetch<SearchSuggestionsResponse>("/products/search-suggestions", {
      query: q,
    })
      .then((res) => {
        if (id !== requestIdRef.current) return;
        setData(res ?? null);
      })
      .catch(() => {
        if (id !== requestIdRef.current) return;
        setHasError(true);
        setData(null);
      });
  };

  useEffect(() => {
    if (!showPanel) {
      setData(null);
      setHasError(false);
      return;
    }

    fetchSuggestions(debouncedQuery);
  }, [debouncedQuery, showPanel]);

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (!rootRef.current) return;
      if (rootRef.current.contains(target)) return;
      setOpen(false);
    };

    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    document.addEventListener("keydown", handleKeyDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
      document.removeEventListener("keydown", handleKeyDown);
    };
  }, [open]);

  const clear = () => {
    setQuery("");
    setData(null);
    setHasError(false);
  };

  return (
    <div ref={rootRef} className="relative w-md">
      <Input
        value={query}
        placeholder="دنبال چه محصولی میگردی؟"
        className="w-full pl-10"
        onChange={(e) => {
          setQuery(e.target.value);
          setOpen(true);
        }}
        onFocus={() => setOpen(true)}
      />
      <Icon
        icon="solar--magnifer-outline"
        sizeClass="size-6"
        className="text-disabled absolute left-3 top-3"
      />

      {query.length > 0 && (
        <button
          type="button"
          className="absolute right-3 top-3 text-disabled hover:text-title"
          onClick={clear}
          aria-label="پاک کردن"
        >
          <Icon icon="solar--close-circle-outline" sizeClass="size-6" />
        </button>
      )}

      {showPanel && (
        <div className="absolute top-full left-0 right-0 z-50 mt-2 overflow-hidden rounded-xl border border-border bg-white shadow-card">
          {hasError && (
            <div className="p-3">
              <button
                type="button"
                className="w-full rounded-lg bg-surface px-3 py-2 text-right text-sm text-title hover:bg-surface/60"
                onClick={() => fetchSuggestions(debouncedQuery)}
              >
                تلاش مجدد
              </button>
            </div>
          )}

          {!hasError && !hasAnyResult && (
            <div className="p-4 text-sm text-muted">نتیجه‌ای یافت نشد</div>
          )}

          {!hasError && hasAnyResult && (
            <div className="max-h-[420px] overflow-auto p-2">
              {categories.length > 0 && (
                <div className="rounded-lg bg-surface/40 p-2">
                  <p className="px-2 pb-2 text-xs text-muted">دسته‌بندی‌ها</p>
                  <div className="space-y-1">
                    {categories.slice(0, 6).map((c) => (
                      <Link
                        key={c.id}
                        href={`/shop/${c.id}`}
                        className="flex items-center justify-between rounded-lg px-2 py-2 text-sm text-title hover:bg-white"
                        onClick={() => setOpen(false)}
                      >
                        <span className="line-clamp-1">{c.title}</span>
                        {c.parent?.title ? (
                          <span className="mr-3 line-clamp-1 text-xs text-muted">
                            {c.parent.title}
                          </span>
                        ) : null}
                      </Link>
                    ))}
                  </div>
                </div>
              )}

              {products.length > 0 && (
                <div className={cn("mt-2 rounded-lg p-2", categories.length > 0 && "bg-white")}>
                  <p className="px-2 pb-2 text-xs text-muted">محصولات</p>
                  <div className="space-y-1">
                    {products.slice(0, 8).map((p) => (
                      <Link
                        key={p.id}
                        href={`/product/${p.id}`}
                        className="flex items-center gap-3 rounded-lg px-2 py-2 hover:bg-surface"
                        onClick={() => setOpen(false)}
                      >
                        <div className="relative size-10 overflow-hidden rounded-lg bg-surface">
                          {normalizeImageUrl(p.image || "") ? (
                            <Image
                              src={createFileUrl(normalizeImageUrl(p.image || ""))}
                              alt={p.title}
                              fill
                              sizes="40px"
                              className="object-cover"
                            />
                          ) : (
                            <div className="flex h-full w-full items-center justify-center">
                              <Icon
                                icon="solar--gallery-outline"
                                sizeClass="size-6"
                                className="text-muted"
                              />
                            </div>
                          )}
                        </div>
                        <div className="min-w-0 flex-1">
                          <p className="line-clamp-1 text-sm text-title">{p.title}</p>
                          <p className="mt-1 text-xs text-muted">
                            {putCommas(p.amount)} تومان
                          </p>
                        </div>
                        <Icon
                          icon="solar--alt-arrow-left-outline"
                          sizeClass="size-4"
                          className="text-muted"
                        />
                      </Link>
                    ))}
                  </div>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
}
