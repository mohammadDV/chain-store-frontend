"use client"

import { StatusCode } from "@/constants/enums";
import { putCommas } from "@/lib/utils";
import { useCartStore } from "@/stores/cart";
import { Button } from "@/ui/button";
import { useRouter } from "next/navigation";
import { useMemo, useTransition } from "react";
import { toast } from "sonner";
import { createOrderAction } from "../_api/createOrderAction";

export const CartInvoice = () => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const items = useCartStore((s) => s.items);

  const originalAmount = useMemo(
    () =>
      items.reduce((sum, it) => {
        const amount = Number(it.amount || 0);
        const discount = Number(it.discount || 0);
        const count = Number(it.count || 0);
        const originalUnitAmount = discount > 0
          ? Math.round(amount / Math.max(1e-9, 1 - discount / 100))
          : amount;
        return sum + originalUnitAmount * count;
      }, 0),
    [items]
  );
  const itemsAmount = useMemo(
    () =>
      items.reduce((sum, it) => {
        const amount = Number(it.amount || 0);
        const count = Number(it.count || 0);
        return sum + amount * count;
      }, 0),
    [items]
  );
  const discountAmount = Math.max(0, originalAmount - itemsAmount);
  const payableAmount = itemsAmount;

  const onSubmit = () => {
    if (!items || items.length === 0) {
      toast.error("سبد خرید شما خالی است");
      return;
    }
    startTransition(async () => {
      const products = items.map((it) => ({
        id: it.id,
        count: it.count,
        size_id: it.size?.id ?? null,
      }));
      try {
        const res = await createOrderAction({ products });
        if (res.status === StatusCode.Success) {
          router.push(`/checkout/${res?.order?.id}`);
        } else {
          toast.error(res?.message || "خطای ناشناخته رخ داده است");
        }
      } catch {
        toast.error("مشکل در ثبت سفارش");
      }
    });
  };

  return (
    <div className="bg-surface p-4 lg:p-6 rounded-2xl lg:rounded-3xl sticky top-6">
      <h4 className="text-lg text-title font-bold mb-4">فاکتور خرید</h4>
      <div className="flex flex-col gap-3.5">
        <div className="flex items-center justify-between">
          <p className="text-muted">قیمت کالا ها</p>
          <p className="text-title font-medium">
            {putCommas(originalAmount)} تومان
          </p>
        </div>
        {discountAmount > 0 && (
          <div className="flex items-center justify-between">
            <p className="text-muted">تخفیف کالاها</p>
            <p className="text-title font-medium">
              {putCommas(discountAmount)} تومان
            </p>
          </div>
        )}
      </div>
      <hr className="border-t border-border my-5" />
      <div className="flex items-center justify-between">
        <p className="text-title font-medium">مبلغ قابل پرداخت</p>
        <p className="text-title font-bold">
          {putCommas(payableAmount)} تومان
        </p>
      </div>
      <Button
        variant={"primary"}
        size={"medium"}
        className="lg:w-full mt-6 fixed bottom-4 lg:static left-4 right-4 z-20"
        onClick={onSubmit}
        isLoading={isPending}
        disabled={items.length === 0}
      >
        تایید و تکمیل سفارش
      </Button>
    </div>
  );
};
