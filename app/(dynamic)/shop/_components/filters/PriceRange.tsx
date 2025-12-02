"use client"

import { useCallback, useEffect, useMemo, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Slider } from "@/ui/slider";

const MIN_PRICE = 0;
const MAX_PRICE = 20000000;

function formatNumber(n: number) {
  return new Intl.NumberFormat("fa-IR").format(n);
}

export const PriceRange = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const initialValues: [number, number] = useMemo(() => {
    const startAmount = searchParams.get("start_amount");
    const endAmount = searchParams.get("end_amount");
    return [
      startAmount ? parseInt(startAmount, 10) : MIN_PRICE,
      endAmount ? parseInt(endAmount, 10) : MAX_PRICE,
    ];
  }, [searchParams]);

  const [values, setValues] = useState<[number, number]>(initialValues);

  const updateURL = useCallback(
    (newValues: [number, number]) => {
      const params = new URLSearchParams(window.location.search);

      if (newValues[0] > MIN_PRICE) {
        params.set("start_amount", newValues[0].toString());
      } else {
        params.delete("start_amount");
      }

      if (newValues[1] < MAX_PRICE) {
        params.set("end_amount", newValues[1].toString());
      } else {
        params.delete("end_amount");
      }

      params.delete("page");

      const newURL = `${pathname}?${params.toString()}`;
      router.push(newURL, { scroll: false });
    },
    [pathname, router]
  );

  const handleValueCommit = (newValues: number[]) => {
    const range: [number, number] = [newValues[0], newValues[1]];
    setValues(range);
    updateURL(range);
  };

  useEffect(() => {
    const startAmount = searchParams.get("start_amount");
    const endAmount = searchParams.get("end_amount");
    const urlValues: [number, number] = [
      startAmount ? parseInt(startAmount, 10) : MIN_PRICE,
      endAmount ? parseInt(endAmount, 10) : MAX_PRICE,
    ];
    if (urlValues[0] !== values[0] || urlValues[1] !== values[1]) {
      setValues(urlValues);
    }
  }, [searchParams, values]);

  return (
    <div className="space-y-3.5">
      <div className="flex justify-between items-center">
        <div className="text-xs text-description">
          <span>{formatNumber(values[1])}</span>
          <span className="mr-1">تومان</span>
        </div>
        <div className="text-xs text-description">
          <span>{formatNumber(values[0])}</span>
          <span className="mr-1">تومان</span>
        </div>
      </div>
      <Slider
        defaultValue={values}
        min={MIN_PRICE}
        max={MAX_PRICE}
        onValueCommit={handleValueCommit}
      />
    </div>
  );
};

