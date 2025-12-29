"use client";

import { getFetch } from "@/core/publicService";
import { cn } from "@/lib/utils";
import { Category } from "@/types/category.type";
import { Icon } from "@/ui/icon";
import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";

function getRootCategories(categories: Category[]) {
  const roots = categories.filter((c) => !c.parent_id || c.parent_id === 0);
  return roots.length ? roots : categories;
}

export function MegaMenu() {
  const [open, setOpen] = useState(false);
  const [categories, setCategories] = useState<Category[]>([]);
  const [hasError, setHasError] = useState(false);
  const [activeRootId, setActiveRootId] = useState<number | null>(null);
  const rootRef = useRef<HTMLDivElement | null>(null);
  const hoverTimeoutRef = useRef<number | null>(null);
  const hasFetchedRef = useRef(false);

  const rootCategories = useMemo(() => getRootCategories(categories), [categories]);

  const activeRootCategory = useMemo(() => {
    if (!rootCategories.length) return null;
    return (
      rootCategories.find((c) => c.id === activeRootId) ?? rootCategories[0]
    );
  }, [activeRootId, rootCategories]);

  useEffect(() => {
    if (!rootCategories.length) return;
    if (activeRootId !== null) return;
    setActiveRootId(rootCategories[0].id);
  }, [activeRootId, rootCategories]);

  useEffect(() => {
    if (!open) return;
    hasFetchedRef.current = true;
    setHasError(false);
    getFetch<Category[]>("/categories/all")
      .then((res) => {
        setCategories(Array.isArray(res) ? res : []);
      })
      .catch(() => {
        setHasError(true);
        hasFetchedRef.current = false;
      });
  }, [open]);

  const refetch = () => {
    hasFetchedRef.current = true;
    setHasError(false);
    getFetch<Category[]>("/categories/all")
      .then((res) => {
        setCategories(Array.isArray(res) ? res : []);
      })
      .catch(() => {
        setHasError(true);
        hasFetchedRef.current = false;
      });
  };

  useEffect(() => {
    if (!open) return;
    const handlePointerDown = (e: MouseEvent | TouchEvent) => {
      const target = e.target as Node | null;
      if (!target) return;
      if (!rootRef.current) return;
      if (rootRef.current.contains(target)) return;
      setOpen(false);
    };

    document.addEventListener("mousedown", handlePointerDown);
    document.addEventListener("touchstart", handlePointerDown);
    return () => {
      document.removeEventListener("mousedown", handlePointerDown);
      document.removeEventListener("touchstart", handlePointerDown);
    };
  }, [open]);

  const scheduleOpenChange = (nextOpen: boolean) => {
    if (hoverTimeoutRef.current) {
      window.clearTimeout(hoverTimeoutRef.current);
      hoverTimeoutRef.current = null;
    }
    hoverTimeoutRef.current = window.setTimeout(() => {
      setOpen(nextOpen);
    }, nextOpen ? 50 : 120);
  };

  const secondLevel = activeRootCategory?.children ?? [];

  return (
    <div
      ref={rootRef}
      className="relative"
      onMouseEnter={() => scheduleOpenChange(true)}
      onMouseLeave={() => scheduleOpenChange(false)}
    >
      <button
        type="button"
        className={cn(
          "flex items-center gap-5 rounded-lg px-3 py-2 transition-colors",
          open ? "bg-surface" : "hover:bg-surface"
        )}
        aria-haspopup="menu"
        aria-expanded={open}
        onClick={() => setOpen((v) => !v)}
      >
        <Icon
          icon="solar--hamburger-menu-outline"
          sizeClass="size-6"
          className="text-primary"
        />
        <p className="text-title text-sm">دسته بندی محصولات</p>
        <Icon
          icon="solar--alt-arrow-down-outline"
          sizeClass={cn("size-4 transition-transform", open && "rotate-180")}
          className="text-primary"
        />
      </button>

      {open && (
        <div className="absolute right-0 top-full z-40 mt-3 w-[min(1200px,calc(100vw-2rem))]">
          <div className="overflow-hidden rounded-xl border border-border bg-white shadow-card">
            <div className="grid grid-cols-[220px_1fr]">
              <div className="bg-surface p-3">
                <div className="flex items-center justify-between px-2 py-2">
                  <p className="text-xs text-muted">دسته‌بندی‌ها</p>
                </div>

                {hasError && (
                  <button
                    type="button"
                    className="w-full rounded-lg bg-white px-3 py-2 text-right text-sm text-title hover:bg-white/60"
                    onClick={refetch}
                  >
                    تلاش مجدد
                  </button>
                )}

                <div className="max-h-[420px] space-y-1 overflow-auto">
                  {rootCategories.map((category) => {
                    const isActive = category.id === activeRootCategory?.id;
                    return (
                      <button
                        key={category.id}
                        type="button"
                        className={cn(
                          "flex w-full items-center justify-between rounded-lg px-2 py-2 text-right text-sm transition-colors",
                          isActive
                            ? "bg-white text-secondary"
                            : "text-title hover:bg-white/60"
                        )}
                        onMouseEnter={() => setActiveRootId(category.id)}
                        onFocus={() => setActiveRootId(category.id)}
                      >
                        <span className="line-clamp-1">{category.title}</span>
                        <Icon
                          icon="solar--alt-arrow-left-outline"
                          sizeClass="size-4"
                          className={cn(
                            "text-muted transition-colors",
                            isActive && "text-secondary"
                          )}
                        />
                      </button>
                    );
                  })}
                </div>
              </div>

              <div className="p-5 h-[580px] overflow-auto">
                <div className="flex items-center justify-between">
                  <Link
                    href={
                      activeRootCategory ? `/shop/${activeRootCategory.id}` : "/shop"
                    }
                    className="text-sm font-semibold text-title hover:text-secondary"
                    onClick={() => setOpen(false)}
                  >
                    مشاهده همه محصولات
                  </Link>
                </div>

                <div className="mt-4 grid grid-cols-4 gap-6">
                  {secondLevel.slice(0, 12).map((sub) => (
                    <div key={sub.id} className="min-w-0">
                      <Link
                        href={`/shop/${sub.id}`}
                        className="line-clamp-1 text-sm font-semibold text-title hover:text-secondary"
                        onClick={() => setOpen(false)}
                      >
                        {sub.title}
                      </Link>
                      {!!sub.children?.length && (
                        <div className="mt-2 space-y-2.5">
                          {sub.children.slice(0, 8).map((leaf) => (
                            <Link
                              key={leaf.id}
                              href={`/shop/${leaf.id}`}
                              className="block line-clamp-1 text-sm text-description hover:text-secondary"
                              onClick={() => setOpen(false)}
                            >
                              {leaf.title}
                            </Link>
                          ))}
                        </div>
                      )}
                    </div>
                  ))}

                  {!hasError && !secondLevel.length && (
                    <div className="col-span-3 flex items-center justify-center py-10">
                      <span className="text-sm text-muted">
                        زیر‌دسته‌ای برای نمایش وجود ندارد
                      </span>
                    </div>
                  )}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
