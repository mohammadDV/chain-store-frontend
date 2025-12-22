"use client"

import { useMemo, useState } from "react";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { useCartStore } from "@/stores/cart";
import { Size } from "@/types/product";
import { toast } from "sonner";
import { cn, isEmpty } from "@/lib/utils";

type Props = {
  productId: number;
  sizes: Size[];
  amount: number;
  discount: number;
  image: string | null;
  title: string;
};

export const AddToCart = ({ productId, sizes, amount, discount, image, title }: Props) => {
  const [selectedSizeId, setSelectedSizeId] = useState<string | null>(null);
  const [count, setCount] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);
  const addOrUpdateItem = useCartStore((s) => s.addOrUpdateItem);
  const hasSizes = useMemo(() => Array.isArray(sizes) && sizes.length > 0, [sizes]);

  const increment = () => setCount((c) => c + 1);
  const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

  const handleAdd = () => {
    if (hasSizes && !selectedSizeId) {
      toast.error("لطفا سایز مورد نظر را انتخاب کنید");
      return;
    }
    setIsAdding(true);
    const selectedSize = hasSizes
      ? sizes.find((s) => String(s.id) === selectedSizeId) || null
      : null;
    addOrUpdateItem({
      id: productId,
      count,
      size: selectedSize,
      amount,
      discount,
      image,
      title,
    });
    toast.success("به سبد خرید اضافه شد");
    setIsAdding(false);
  };

  return (
    <>
      {!isEmpty(sizes) && <div className="mt-6 lg:mt-8">
        <p className="text-title text-sm font-medium mb-2">انتخاب سایز</p>
        <div className="flex flex-wrap gap-2">
          {sizes.map((item) => {
            const isSelected = String(item.id) === selectedSizeId;

            return (
              <button
                key={item.id}
                onClick={() => setSelectedSizeId(String(item.id))}
                className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                  isSelected
                    ? "bg-secondary text-white shadow-md"
                    : "bg-surface text-secondary hover:bg-secondary/10"
                )}
              >
                {item.title}
              </button>
            );
          })}
        </div>
      </div>}
      <div className="lg:mt-8 fixed lg:static left-4 right-4 z-20 bottom-2 flex items-center justify-between gap-2 lg:gap-5">
        <Button
          variant={"primary"}
          size={"large"}
          className="flex-1"
          onClick={handleAdd}
          isLoading={isAdding}
        >
          افزودن به سبد خرید
        </Button>
        <div className="bg-surface rounded-full p-1.5 flex items-center justify-between gap-4 lg:gap-8">
          <button
            type="button"
            className="size-11 bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={increment}
            aria-label="increase count"
          >
            <Icon icon="lucide--plus" sizeClass="size-5" className="text-secondary" />
          </button>
          <p className="text-xl font-medium text-title w-8 text-center">{count}</p>
          <button
            type="button"
            className="size-11 bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={decrement}
            aria-label="decrease count"
          >
            <Icon icon="lucide--minus" sizeClass="size-5" className="text-secondary" />
          </button>
        </div>
      </div>
    </>
  );
};
