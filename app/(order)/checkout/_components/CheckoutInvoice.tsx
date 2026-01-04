"use client"

import { putCommas } from "@/lib/utils";
import { Order } from "@/types/Order.type";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { StatusCode } from "@/constants/enums";
import { checkDiscountAction } from "../_api/checkDiscountAction";
import { PaymentMethod } from "../_api/payOrderAction";

type Props = {
  order: Order;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (m: PaymentMethod) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  appliedDiscountCode?: string | null;
  onDiscountApplied: (payload: {
    discount_code: string;
    amount: string;
    total_amount: string;
    discount_amount: string;
    delivery_amount: string;
  }) => void;
};

export const CheckoutInvoice = ({
  order,
  paymentMethod,
  setPaymentMethod,
  onSubmit,
  isLoading,
  appliedDiscountCode,
  onDiscountApplied,
}: Props) => {
  const totalAmount = Number(order.total_amount || 0);
  const discountAmount = Number(order.discount_amount || 0);
  const deliveryAmount = Number(order.delivery_amount || 0);
  const productsAmount = Number(order.amount || 0);

  const [discountCode, setDiscountCode] = useState(appliedDiscountCode ?? "");
  const [isCheckingDiscount, startCheckingDiscount] = useTransition();

  const handleCheckDiscount = () => {
    const code = discountCode.trim();
    if (!code) {
      toast.error("کد تخفیف را وارد کنید");
      return;
    }

    startCheckingDiscount(async () => {
      try {
        const res = await checkDiscountAction(order.id, { discount_code: code });
        if (res.status === StatusCode.Success) {
          onDiscountApplied({
            discount_code: code,
            amount: String(res.amount ?? order.amount ?? 0),
            total_amount: String(res.total_amount ?? order.total_amount ?? 0),
            discount_amount: String(res.discount_amount ?? order.discount_amount ?? 0),
            delivery_amount: String(res.delivery_amount ?? order.delivery_amount ?? 0),
          });
          toast.success(res.message || "کد تخفیف اعمال شد");
        } else {
          toast.error(res.message || "کد تخفیف معتبر نیست");
        }
      } catch {
        toast.error("مشکل در بررسی کد تخفیف");
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
            {putCommas(productsAmount)} تومان
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted">کد تخفیف</p>
          <p className="text-title font-medium">
            {putCommas(discountAmount)} تومان
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-muted">هزینه ارسال</p>
          <p className="text-title font-medium">
            {putCommas(deliveryAmount)} تومان
          </p>
        </div>
      </div>
      <hr className="border-t border-border my-5" />
      <div className="flex items-center justify-between">
        <p className="text-title font-medium">مبلغ قابل پرداخت</p>
        <p className="text-title font-bold">
          {putCommas(totalAmount)} تومان
        </p>
      </div>
      <div className="flex items-center justify-between gap-3 mt-6">
        <input
          className="h-12 bg-white rounded-full text-sm placeholder:text-disabled outline-none px-4 flex-1"
          placeholder="کد تخفیف دارید؟"
          value={discountCode}
          onChange={(e) => setDiscountCode(e.target.value)}
          onKeyDown={(e) => {
            if (e.key === "Enter") {
              e.preventDefault();
              handleCheckDiscount();
            }
          }}
        />
        <Button
          variant={"outline"}
          onClick={handleCheckDiscount}
          isLoading={isCheckingDiscount}
          disabled={!discountCode.trim()}
        >
          ثبت کد
        </Button>
      </div>
      <div className="mt-5">
        <p className="text-muted mb-2">روش پرداخت</p>
        <RadioGroup
          value={paymentMethod}
          onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
          className="grid grid-cols-2 gap-3"
        >
          <div className="group cursor-pointer border border-border rounded-2xl p-3 flex items-center gap-3 hover:border-secondary/50 transition-colors">
            <RadioGroupItem value="bank" id="payment-bank" />
            <Label htmlFor="payment-bank" className="cursor-pointer text-sm text-title group-data-[state=checked]:text-secondary">
              درگاه بانکی
            </Label>
          </div>
          <div className="group cursor-pointer border border-border rounded-2xl p-3 flex items-center gap-3 hover:border-secondary/50 transition-colors">
            <RadioGroupItem value="wallet" id="payment-wallet" />
            <Label htmlFor="payment-wallet" className="cursor-pointer text-sm text-title group-data-[state=checked]:text-secondary">
              کیف پول
            </Label>
          </div>
        </RadioGroup>
      </div>
      <Button
        variant={"primary"}
        size={"medium"}
        className="lg:w-full mt-6 fixed bottom-4 lg:static left-4 right-4 z-20"
        onClick={onSubmit}
        isLoading={isLoading}
      >
        تایید و تکمیل سفارش
      </Button>
    </div>
  );
};
