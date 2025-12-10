"use client"

import { useParams, usePathname, useRouter, useSearchParams } from "next/navigation";

export const RemoveFilters = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const params = useParams() as { id?: string | string[] };
  const pathname = usePathname();

  const handleClearFilters = () => {
    let target = "/shop";
    if (params?.id) {
      const seg = Array.isArray(params.id) ? params.id.join("/") : params.id;
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

