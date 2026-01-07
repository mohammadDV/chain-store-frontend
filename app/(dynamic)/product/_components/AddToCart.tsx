"use client"

import { cn, isEmpty } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { Size } from "@/types/product";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { useEffect, useMemo, useState } from "react";
import { toast } from "sonner";

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

  const items = useCartStore((s) => s.items);
  const addOrUpdateItem = useCartStore((s) => s.addOrUpdateItem);
  const hasSizes = useMemo(() => Array.isArray(sizes) && sizes.length > 0, [sizes]);

  const selectedSize = useMemo(() => {
    if (!hasSizes || !selectedSizeId) return null;
    return sizes.find((s) => String(s.id) === selectedSizeId) || null;
  }, [hasSizes, selectedSizeId, sizes]);

  const inCartCountForSelectedSize = useMemo(() => {
    if (!selectedSize) return 0;
    return items.reduce((sum, it) => {
      const sizeId = it.size?.id ?? null;
      if (it.id === productId && sizeId === selectedSize.id) {
        return sum + Number(it.count || 0);
      }
      return sum;
    }, 0);
  }, [items, productId, selectedSize]);

  const availableStockForSelectedSize = useMemo(() => {
    if (!selectedSize) return 0;
    return Number(selectedSize.stock || 0) - inCartCountForSelectedSize;
  }, [inCartCountForSelectedSize, selectedSize]);

  const isOutOfStock = hasSizes
    ? !selectedSize || availableStockForSelectedSize <= 0
    : false;

  useEffect(() => {
    if (!hasSizes) return;
    if (!selectedSize) return;
    if (availableStockForSelectedSize <= 0) {
      setSelectedSizeId(null);
      setCount(1);
      return;
    }
    setCount((c) => Math.min(Math.max(1, c), availableStockForSelectedSize));
  }, [availableStockForSelectedSize, hasSizes, selectedSize]);

  const increment = () => {
    if (hasSizes && !selectedSize) return;
    setCount((c) => {
      if (!hasSizes) return c + 1;
      return Math.min(c + 1, Math.max(1, availableStockForSelectedSize));
    });
  };
  const decrement = () => setCount((c) => (c > 1 ? c - 1 : 1));

  const handleAdd = () => {
    if (hasSizes && !selectedSizeId) {
      toast.error("لطفا سایز مورد نظر را انتخاب کنید");
      return;
    }
    if (hasSizes && isOutOfStock) {
      toast.error("موجودی این سایز کافی نیست");
      return;
    }
    if (hasSizes && count > availableStockForSelectedSize) {
      setCount(Math.max(1, availableStockForSelectedSize));
      toast.error("موجودی این سایز کافی نیست");
      return;
    }
    setIsAdding(true);
    const nextSelectedSize = selectedSize;
    addOrUpdateItem({
      id: productId,
      count,
      size: nextSelectedSize,
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
            const inCartCount = items.reduce((sum, it) => {
              const sizeId = it.size?.id ?? null;
              if (it.id === productId && sizeId === item.id) {
                return sum + Number(it.count || 0);
              }
              return sum;
            }, 0);
            const availableStock = Number(item.stock || 0) - inCartCount;
            const isDisabled = availableStock <= 0;

            return (
              <button
                key={item.id}
                type="button"
                disabled={isDisabled}
                onClick={() => {
                  if (isDisabled) return;
                  setSelectedSizeId(String(item.id));
                  setCount(1);
                }}
                className={cn("px-4 py-2 rounded-full text-sm font-medium transition-all cursor-pointer duration-200",
                  isSelected
                    ? "bg-secondary text-white shadow-md"
                    : "bg-surface text-secondary hover:bg-secondary/10",
                  isDisabled && "opacity-50 cursor-not-allowed hover:bg-surface"
                )}
              >
                {isDisabled ? <del>{item.title}</del> : item.title}

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
          disabled={hasSizes ? isOutOfStock : false}
        >
          افزودن به سبد خرید
        </Button>
        <div className="bg-surface rounded-full p-1.5 flex items-center justify-between gap-4 lg:gap-8">
          <button
            type="button"
            className="size-11 bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={increment}
            aria-label="increase count"
            disabled={hasSizes ? !selectedSize || count >= availableStockForSelectedSize : false}
          >
            <Icon icon="lucide--plus" sizeClass="size-5" className="text-secondary" />
          </button>
          <p className="text-xl font-medium text-title w-8 text-center">{count}</p>
          <button
            type="button"
            className="size-11 bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={decrement}
            aria-label="decrease count"
            disabled={count <= 1 || (hasSizes && !selectedSize)}
          >
            <Icon icon="lucide--minus" sizeClass="size-5" className="text-secondary" />
          </button>
        </div>
      </div>
    </>
  );
};
