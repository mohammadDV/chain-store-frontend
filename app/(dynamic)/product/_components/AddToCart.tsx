"use client"

import { cn, isEmpty } from "@/lib/utils";
import { useCartStore, CartItem } from "@/stores/cart";
import { Size } from "@/types/product";
import { Button } from "@/ui/button";
import { Icon } from "@/ui/icon";
import { postFetch } from "@/core/publicService";
import { useMemo, useState } from "react";
import { toast } from "sonner";
import { SizeGuide } from "./SizeGuide";

type Props = {
  productId: number;
  sizes: Size[];
  amount: number;
  discount: number;
  image: string | null;
  title: string;
};

const getAvailableStock = (size: Size, productId: number, items: CartItem[]) => {
  const inCartCount = items.reduce((sum, it) => {
    const sizeId = it.size?.id ?? null;
    if (it.id === productId && sizeId === size.id) {
      return sum + Number(it.count || 0);
    }
    return sum;
  }, 0);
  return Number(size.stock || 0) - inCartCount;
};

const findFirstAvailableSizeId = (
  sizes: Size[],
  productId: number,
  items: CartItem[],
) => {
  const firstAvailable = sizes.find((size) => getAvailableStock(size, productId, items) > 0);
  return firstAvailable ? String(firstAvailable.id) : null;
};

export const AddToCart = ({ productId, sizes, amount, discount, image, title }: Props) => {
  const items = useCartStore((s) => s.items);
  const addOrUpdateItem = useCartStore((s) => s.addOrUpdateItem);
  const hasSizes = useMemo(() => Array.isArray(sizes) && sizes.length > 0, [sizes]);

  const [manualSizeId, setManualSizeId] = useState<string | null>(null);
  const [count, setCount] = useState<number>(1);
  const [isAdding, setIsAdding] = useState<boolean>(false);

  const selectedSizeId = useMemo(() => {
    if (!hasSizes) return null;

    if (manualSizeId) {
      const manualSize = sizes.find((s) => String(s.id) === manualSizeId);
      if (manualSize && getAvailableStock(manualSize, productId, items) > 0) {
        return manualSizeId;
      }
    }

    return findFirstAvailableSizeId(sizes, productId, items);
  }, [hasSizes, manualSizeId, sizes, productId, items]);

  const selectedSize = useMemo(() => {
    if (!hasSizes || !selectedSizeId) return null;
    return sizes.find((s) => String(s.id) === selectedSizeId) || null;
  }, [hasSizes, selectedSizeId, sizes]);

  const availableStockForSelectedSize = useMemo(() => {
    if (!selectedSize) return 0;
    return getAvailableStock(selectedSize, productId, items);
  }, [items, productId, selectedSize]);

  const safeCount = selectedSize
    ? Math.min(Math.max(1, count), Math.max(1, availableStockForSelectedSize))
    : Math.max(1, count);

  const isOutOfStock = hasSizes
    ? !selectedSize || availableStockForSelectedSize <= 0
    : false;

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
    if (hasSizes && safeCount > availableStockForSelectedSize) {
      setCount(Math.max(1, availableStockForSelectedSize));
      toast.error("موجودی این سایز کافی نیست");
      return;
    }
    setIsAdding(true);
    const nextSelectedSize = selectedSize;
    addOrUpdateItem({
      id: productId,
      count: safeCount,
      size: nextSelectedSize,
      amount,
      discount,
      image,
      title,
    });
    toast.success("به سبد خرید اضافه شد");
    void postFetch(`/products/${productId}/refresh-on-cart`, {}).catch(() => {});
    setIsAdding(false);
  };

  return (
    <>
      {!isEmpty(sizes) && <div className="mt-6 lg:mt-8">
        <div className="flex items-center mb-2.5 gap-2.5">
          <p className="text-title text-sm font-medium">انتخاب سایز</p>
          <SizeGuide />
        </div>
        <div className="flex flex-wrap gap-2">
          {sizes.map((item) => {
            const isSelected = String(item.id) === selectedSizeId;
            const availableStock = getAvailableStock(item, productId, items);
            const isDisabled = availableStock <= 0;

            return (
              <button
                key={item.id}
                type="button"
                disabled={isDisabled}
                onClick={() => {
                  if (isDisabled) return;
                  setManualSizeId(String(item.id));
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
            disabled={hasSizes ? !selectedSize || safeCount >= availableStockForSelectedSize : false}
          >
            <Icon icon="lucide--plus" sizeClass="size-5" className="text-secondary" />
          </button>
          <p className="text-xl font-medium text-title w-8 text-center">{safeCount}</p>
          <button
            type="button"
            className="size-11 bg-white rounded-full flex items-center justify-center cursor-pointer"
            onClick={decrement}
            aria-label="decrease count"
            disabled={safeCount <= 1 || (hasSizes && !selectedSize)}
          >
            <Icon icon="lucide--minus" sizeClass="size-5" className="text-secondary" />
          </button>
        </div>
      </div>
    </>
  );
};
