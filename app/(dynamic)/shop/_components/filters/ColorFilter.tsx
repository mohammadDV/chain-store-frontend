"use client"

import { useCallback, useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useFetchData } from "@/hooks/useFetchData";
import { Color } from "@/types/color.type";
import { Checkbox } from "@/ui/checkbox";

export const ColorFilter = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const pathname = usePathname();

  const { response: colors, loading } = useFetchData<Color[]>("/colors/active");

  const [selectedColors, setSelectedColors] = useState<number[]>(() => {
    const colorParams = searchParams.getAll("colors");
    return colorParams.map((id) => parseInt(id)).filter((id) => !isNaN(id));
  });

  const updateURL = useCallback(
    (newSelectedColors: number[]) => {
      const params = new URLSearchParams(searchParams.toString());

      params.delete("colors");

      newSelectedColors.forEach((colorId) => {
        params.append("colors", colorId.toString());
      });

      params.delete("page");

      const newURL = `${pathname}?${params.toString()}`;
      router.push(newURL, { scroll: false });
    },
    [searchParams, pathname, router]
  );

  const handleColorChange = (colorId: number, checked: boolean) => {
    let newSelectedColors: number[];

    if (checked) {
      newSelectedColors = [...selectedColors, colorId];
    } else {
      newSelectedColors = selectedColors.filter((id) => id !== colorId);
    }

    setSelectedColors(newSelectedColors);
    updateURL(newSelectedColors);
  };

  useEffect(() => {
    const colorParams = searchParams.getAll("colors");
    const urlColors = colorParams
      .map((id) => parseInt(id))
      .filter((id) => !isNaN(id));

    if (
      JSON.stringify(urlColors.slice().sort()) !==
      JSON.stringify(selectedColors.slice().sort())
    ) {
      setSelectedColors(urlColors);
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
      {colors?.map((color) => (
        <div key={color.id} className="flex items-center">
          <Checkbox
            id={`color-${color.id}`}
            checked={selectedColors.includes(color.id)}
            onCheckedChange={(checked) =>
              handleColorChange(color.id, checked as boolean)
            }
          />
          <label
            htmlFor={`color-${color.id}`}
            className="text-sm font-normal text-description mr-2 cursor-pointer leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
          >
            {color.title}
          </label>
        </div>
      ))}
    </div>
  );
};