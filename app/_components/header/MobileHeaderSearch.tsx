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

interface MobileHeaderSearchProps {
    onClose: () => void;
}

const POPULAR_SEARCHES = [
    "ساعت هوشمند",
    "کفش ورزشی",
    "لباس مردانه",
];

export function MobileHeaderSearch({ onClose }: MobileHeaderSearchProps) {
    const [query, setQuery] = useState("");
    const debouncedQuery = useDebounce(query.trim(), 350);

    const [data, setData] = useState<SearchSuggestionsResponse | null>(null);
    const [hasError, setHasError] = useState(false);

    const requestIdRef = useRef(0);
    const inputRef = useRef<HTMLInputElement>(null);

    const products = data?.products ?? [];
    const categories = data?.categories ?? [];

    const hasAnyResult = useMemo(() => {
        return products.length > 0 || categories.length > 0;
    }, [products.length, categories.length]);

    const fetchSuggestions = (q: string) => {
        if (q.length < 2) {
            setData(null);
            return;
        }

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
        fetchSuggestions(debouncedQuery);
    }, [debouncedQuery]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
        document.body.style.overflow = "hidden";
        return () => {
            document.body.style.overflow = "unset";
        };
    }, []);

    const clear = () => {
        setQuery("");
        setData(null);
        setHasError(false);
        inputRef.current?.focus();
    };

    return (
        <div className="fixed inset-0 z-100 flex flex-col bg-white">
            <div className="flex items-center gap-2 p-4 border-b border-border">
                <button onClick={onClose} className="p-2 -mr-2">
                    <Icon icon="solar--arrow-right-outline" sizeClass="size-6" className="text-title" />
                </button>
                <div className="relative flex-1">
                    <Input
                        ref={inputRef}
                        value={query}
                        placeholder="جستجو در بوف استور..."
                        className="w-full pr-4 pl-10 h-10 bg-surface border-none focus-visible:ring-0"
                        onChange={(e) => setQuery(e.target.value)}
                    />
                    {query.length > 0 ? (
                        <button
                            type="button"
                            className="absolute left-3 top-2.5 text-disabled hover:text-title"
                            onClick={clear}
                        >
                            <Icon icon="solar--close-circle-outline" sizeClass="size-5" />
                        </button>
                    ) : (
                        <Icon
                            icon="solar--magnifer-outline"
                            sizeClass="size-5"
                            className="text-disabled absolute left-3 top-2.5"
                        />
                    )}
                </div>
            </div>

            <div className="flex-1 overflow-y-auto p-4">
                {query.length === 0 && (
                    <div className="mb-6">
                        <p className="mb-3 text-sm font-bold text-title">جستجوهای پرطرفدار</p>
                        <div className="flex flex-wrap gap-2">
                            {POPULAR_SEARCHES.map((item) => (
                                <button
                                    key={item}
                                    onClick={() => setQuery(item)}
                                    className="rounded-full bg-surface px-4 py-2 text-xs text-muted transition-colors hover:bg-surface/80 hover:text-title"
                                >
                                    {item}
                                </button>
                            ))}
                        </div>
                    </div>
                )}

                {hasError && (
                    <div className="flex flex-col items-center justify-center pt-10">
                        <p className="text-sm text-muted mb-4">خطا در دریافت اطلاعات</p>
                        <button
                            type="button"
                            className="rounded-lg bg-surface px-4 py-2 text-sm text-title hover:bg-surface/60"
                            onClick={() => fetchSuggestions(debouncedQuery)}
                        >
                            تلاش مجدد
                        </button>
                    </div>
                )}

                {!hasError && !hasAnyResult && debouncedQuery.length >= 2 && (
                    <div className="text-center pt-10 text-sm text-muted">نتیجه‌ای یافت نشد</div>
                )}

                {!hasError && hasAnyResult && (
                    <div className="space-y-6">
                        {categories.length > 0 && (
                            <div>
                                <p className="mb-2 text-xs font-bold text-muted">دسته‌بندی‌ها</p>
                                <div className="space-y-1">
                                    {categories.map((c) => (
                                        <Link
                                            key={c.id}
                                            href={`/shop/${c.id}`}
                                            className="flex items-center justify-between gap-2 rounded-lg py-3 border-b border-border/50 last:border-0"
                                            onClick={onClose}
                                        >
                                            <span className="text-sm text-title font-medium">{c.title}</span>
                                            {c.parent?.title ? (
                                                <span className="text-xs text-muted">
                                                    {c.parent.title}
                                                </span>
                                            ) : null}
                                            <Icon
                                                icon="solar--alt-arrow-left-outline"
                                                sizeClass="size-4"
                                                className="text-muted mr-auto"
                                            />
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}

                        {products.length > 0 && (
                            <div>
                                <p className="mb-2 text-xs font-bold text-muted">محصولات</p>
                                <div className="space-y-3">
                                    {products.map((p) => (
                                        <Link
                                            key={p.id}
                                            href={`/product/${p.id}`}
                                            className="flex items-center gap-3 rounded-lg"
                                            onClick={onClose}
                                        >
                                            <div className="relative size-16 overflow-hidden rounded-lg bg-surface shrink-0">
                                                {normalizeImageUrl(p.image || "") ? (
                                                    <Image
                                                        src={createFileUrl(normalizeImageUrl(p.image || ""))}
                                                        alt={p.title}
                                                        fill
                                                        sizes="64px"
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
                                                <p className="line-clamp-2 text-sm text-title font-medium leading-relaxed">{p.title}</p>
                                                <p className="mt-1 text-sm font-bold text-primary">
                                                    {putCommas(p.amount)} <span className="text-xs font-normal text-muted">تومان</span>
                                                </p>
                                            </div>
                                        </Link>
                                    ))}
                                </div>
                            </div>
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
