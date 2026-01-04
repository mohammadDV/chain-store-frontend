"use client"

import Image from "next/image";
import { Icon } from "@/ui/icon";
import { useCartStore } from "@/stores/cart";
import { createFileUrl, putCommas } from "@/lib/utils";
import Link from "next/link";
import { Button } from "@/ui/button";
import { toast } from "sonner";

export const CartItemsList = () => {
  const items = useCartStore((s) => s.items);
  const addOrUpdateItem = useCartStore((s) => s.addOrUpdateItem);
  const removeItem = useCartStore((s) => s.removeItem);

  if (!items || items.length === 0) {
    return (
      <div className="text-center border border-border rounded-2xl lg:rounded-3xl py-8">
        <div className="mb-6 text-center text-muted">
          سبد خرید شما خالی است
        </div>
        <Link href="/shop">
          <Button variant={"secondary"}>
            مشاهده محصولات
          </Button>
        </Link>
      </div>
    );
  }

  return (
    <div className="border border-border p-2 lg:p-6 rounded-2xl lg:rounded-3xl flex flex-col gap-3 lg:gap-6 divide-y divide-border">
      {items.map((item) => {
        const isFree = item.amount === 0;
        const originalAmount = Math.round(
          item.amount / Math.max(1e-9, 1 - (item.discount || 0) / 100)
        );
        const stock = item.size?.stock ?? null;
        const isOutOfStock = stock !== null && stock <= 0;
        const canIncrement = stock === null ? true : item.count < stock;
        const canDecrement = item.count > 1;
        return (
          <div key={`${item.id}-${item.size?.id ?? "nosize"}`} className="flex gap-3 lg:gap-5 pb-4 lg:pb-6">
            <Link href={`/product/${item.id}`}>
              <Image
                src={createFileUrl(item.image || "")}
                width={112}
                height={112}
                alt="product"
                className="size-20 lg:size-28 rounded-xl lg:rounded-2xl aspect-square"
              />
            </Link>
            <div className="flex-1 flex flex-col justify-between">
              <div className="flex justify-between">
                <Link href={`/product/${item.id}`}>
                  <h3 className="text-title font-bold text-sm lg:text-lg mb-1.5 lg:mb-2">
                    {item.title}
                  </h3>
                  {item.size?.title && (
                    <p className="text-description text-xs lg:text-sm mb-1 lg:mb-1.5">
                      سایز: {item.size.title}
                    </p>
                  )}
                </Link>
                <button
                  type="button"
                  className="size-8 lg:size-9 rounded-full bg-surface flex items-center justify-center cursor-pointer"
                  onClick={() => removeItem(item.id, item.size?.id ?? null)}
                  aria-label="remove item"
                >
                  <Icon
                    icon="solar--trash-bin-trash-bold"
                    sizeClass="size-5 lg:size-6"
                    className="text-secondary"
                  />
                </button>
              </div>
              <div className="flex justify-between items-center">
                <div>
                  <p className="text-secondary text-sm lg:text-base font-bold">
                    {!isFree && item.discount > 0 ? (
                      <span className="flex items-center gap-2">
                        <del className="text-disabled font-medium">
                          {putCommas(originalAmount)}
                        </del>
                        <span>
                          {putCommas(item.amount)} تومان
                        </span>
                      </span>
                    ) : (
                      <span>
                        {isFree ? "رایگان" : `${putCommas(item.amount)} تومان`}
                      </span>
                    )}
                  </p>
                </div>
                <div className="bg-surface rounded-full p-1 flex items-center justify-between gap-3 lg:gap-6">
                  <button
                    type="button"
                    className="size-7 lg:size-8 bg-white rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      if (isOutOfStock) {
                        toast.error("این کالا ناموجود است");
                        return;
                      }
                      if (!canIncrement) {
                        toast.error("موجودی کافی نیست");
                        return;
                      }
                      addOrUpdateItem({ ...item, count: 1 });
                    }}
                    aria-label="increase count"
                    disabled={!canIncrement || isOutOfStock}
                  >
                    <Icon
                      icon="lucide--plus"
                      sizeClass="size-4"
                      className="text-secondary"
                    />
                  </button>
                  <p className="text-sm lg:text-lg font-medium text-title">
                    {item.count}
                  </p>
                  <button
                    type="button"
                    className="size-7 lg:size-8 bg-white rounded-full flex items-center justify-center cursor-pointer"
                    onClick={() => {
                      if (canDecrement) {
                        addOrUpdateItem({ ...item, count: -1 });
                      }
                    }}
                    aria-label="decrease count"
                    disabled={!canDecrement}
                  >
                    <Icon
                      icon="lucide--minus"
                      sizeClass="size-4"
                      className="text-secondary"
                    />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};
