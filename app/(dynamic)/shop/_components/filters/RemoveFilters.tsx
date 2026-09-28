"use client"

import { useParams, useRouter, useSearchParams } from "next/navigation";

export const RemoveFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams() as { slug?: string | string[]; id?: string | string[] };

  const handleClearFilters = () => {
    let target = "/shop";
    const slugParam = params?.slug ?? params?.id;
    if (slugParam) {
      const seg = Array.isArray(slugParam) ? slugParam.join("/") : slugParam;
      target = `/shop/${seg}`;
    }
    router.push(target, { scroll: false });
  };

  const hasFilters = searchParams.toString().length > 0;

  return (
    hasFilters ? (
      <span
        className="text-sm text-secondary flex items-center gap-1 bg-white lg:bg-transparent px-3 py-1.5 lg:p-0 rounded-full font-normal cursor-pointer hover:underline transition-colors"
        onClick={handleClearFilters}
        role="button"
        tabIndex={0}
      >
        حذف فیلتر ها
      </span>
    ) : null
  );
};

