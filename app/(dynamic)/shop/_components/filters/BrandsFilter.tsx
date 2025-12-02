"use client"

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";
import { Brand } from "@/types/brand.type";
import { Checkbox } from "@/ui/checkbox";

export const BrandsFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { response: brands, loading } = useFetchData<Brand[]>("/brands");

  const [selectedBrands, setSelectedBrands] = useState<number[]>(() => {
    const brandParams = searchParams.getAll("brands");
    return brandParams.map((id) => parseInt(id)).filter((id) => !isNaN(id));
  });

  const updateURL = useCallback(
    (newSelectedBrands: number[]) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("brands");

      newSelectedBrands.forEach((brandId) => {
        params.append("brands", brandId.toString());
      });

      params.delete("page");

      const newURL = `${pathname}?${params.toString()}`;
      router.push(newURL, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const handleBrandChange = (brandId: number, checked: boolean) => {
    let newSelectedBrands: number[];

    if (checked) {
      newSelectedBrands = [...selectedBrands, brandId];
    } else {
      newSelectedBrands = selectedBrands.filter((id) => id !== brandId);
    }

    setSelectedBrands(newSelectedBrands);
    updateURL(newSelectedBrands);
  };

  useEffect(() => {
    const brandParams = searchParams.getAll("brands");
    const urlBrands = brandParams
      .map((id) => parseInt(id))
      .filter((id) => !isNaN(id));

    if (
      JSON.stringify(urlBrands.slice().sort()) !==
      JSON.stringify(selectedBrands.slice().sort())
    ) {
      setSelectedBrands(urlBrands);
    }
  }, [searchParams]);

  if (loading) {
    return (
      <div className="space-y-3">
        {[1, 2, 3].map((i) => (
          <div key={i} className="flex items-center space-x-2 animate-pulse">
            <div className="w-5 h-5 bg-surface rounded"></div>
            <div className="h-5 bg-surface rounded w-20"></div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-3 max-h-44 overflow-auto">
      {brands?.map((brand) => (
        <div key={brand.id} className="flex items-center">
          <Checkbox
            id={`brand-${brand.id}`}
            checked={selectedBrands.includes(brand.id)}
            onCheckedChange={(checked) =>
              handleBrandChange(brand.id, checked as boolean)
            }
          />
          <label
            htmlFor={`brand-${brand.id}`}
            className="text-sm font-normal text-description mr-2 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {brand.title}
          </label>
        </div>
      ))}
    </div>
  );
};

