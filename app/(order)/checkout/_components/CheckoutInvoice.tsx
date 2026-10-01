"use client"

import { putCommas } from "@/lib/utils";
import { Order } from "@/types/Order.type";
import { Button } from "@/ui/button";
import { Label } from "@/ui/label";
import { RadioGroup, RadioGroupItem } from "@/ui/radio-group";
import Link from "next/link";
import { useState, useTransition } from "react";
import { toast } from "sonner";
import { StatusCode } from "@/constants/enums";
import { checkDiscountAction } from "../_api/checkDiscountAction";
import { PaymentMethod } from "../_api/payOrderAction";
import { getWalletPaymentStatus } from "../_lib/walletPayment";

type Props = {
  order: Order;
  paymentMethod: PaymentMethod;
  setPaymentMethod: (m: PaymentMethod) => void;
  onSubmit: () => void;
  isLoading?: boolean;
  appliedDiscountCode?: string | null;
  paymentGatewayEnabled?: boolean;
  paymentGatewayDisabledMessage?: string | null;
  deliveryFee?: number;
  freeShippingThreshold?: number;
  walletBalance?: number;
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
  paymentGatewayEnabled = true,
  paymentGatewayDisabledMessage = null,
  deliveryFee = 0,
  freeShippingThreshold = 0,
  walletBalance = 0,
  onDiscountApplied,
}: Props) => {
  const discountAmount = Number(order.discount_amount || 0);
  const productsAmount = Number(order.amount || 0);
  const isFreeShipping = productsAmount >= freeShippingThreshold;
  const deliveryAmount = isFreeShipping ? 0 : deliveryFee;
  const payableAmount = productsAmount - discountAmount + deliveryAmount;
  const remainingForFree = Math.max(0, freeShippingThreshold - productsAmount);
  const walletStatus = getWalletPaymentStatus(walletBalance, payableAmount);
  const walletSelected = paymentMethod === "wallet";
  const walletInsufficient = walletSelected && !walletStatus.sufficient;

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
          <p
            className={`font-medium ${
              isFreeShipping ? "text-success" : "text-title"
            }`}
          >
            {isFreeShipping ? "رایگان" : `${putCommas(deliveryAmount)} تومان`}
          </p>
        </div>
      </div>

      <div
        className={`mt-4 rounded-2xl border px-3.5 py-3 text-sm leading-6 ${
          isFreeShipping
            ? "border-success/30 bg-success/5 text-title"
            : "border-border bg-white text-title"
        }`}
      >
        {isFreeShipping ? (
          <p>
            ارسال این سفارش <span className="font-semibold text-success">رایگان</span> است،
            چون مبلغ کالاها به حد ارسال رایگان (
            {putCommas(freeShippingThreshold)} تومان) رسیده است.
          </p>
        ) : (
          <div className="space-y-1.5">
            <p>
              هزینه ارسال این سفارش{" "}
              <span className="font-semibold">{putCommas(deliveryFee)} تومان</span> است.
            </p>
            <p className="text-muted">
              با افزایش سبد به {putCommas(freeShippingThreshold)} تومان، ارسال رایگان
              می‌شود
              {remainingForFree > 0
                ? ` (حدود ${putCommas(remainingForFree)} تومان دیگر).`
                : "."}
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
        {!paymentGatewayEnabled && paymentGatewayDisabledMessage ? (
          <p className="mb-3 text-sm text-secondary leading-6">
            {paymentGatewayDisabledMessage}
          </p>
        ) : null}
        <RadioGroup
          value={paymentMethod}
          onValueChange={(v) => setPaymentMethod(v as PaymentMethod)}
          className="grid grid-cols-2 gap-3"
        >
          <div
            className={`group border border-border rounded-2xl p-3 flex items-center gap-3 transition-colors ${
              paymentGatewayEnabled
                ? "cursor-pointer hover:border-secondary/50"
                : "opacity-50 cursor-not-allowed"
            }`}
          >
            <RadioGroupItem
              value="bank"
              id="payment-bank"
              disabled={!paymentGatewayEnabled}
            />
            <Label
              htmlFor="payment-bank"
              className={`text-sm text-title group-data-[state=checked]:text-secondary ${
                paymentGatewayEnabled ? "cursor-pointer" : "cursor-not-allowed"
              }`}
            >
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

        {walletSelected ? (
          <div
            className={`mt-3 rounded-2xl border px-3.5 py-3 text-sm leading-6 ${
              walletStatus.sufficient
                ? "border-success/30 bg-success/5 text-title"
                : "border-error/30 bg-error/5 text-title"
            }`}
          >
            <div className="flex items-center justify-between gap-3">
              <p className="text-muted">موجودی کیف پول</p>
              <p className="font-semibold">{putCommas(walletStatus.balance)} تومان</p>
            </div>
            {walletStatus.sufficient ? (
              <p className="mt-2 text-success">
                موجودی برای پرداخت این سفارش کافی است.
              </p>
            ) : (
              <p className="mt-2 text-error">
                موجودی کافی نیست؛ {putCommas(walletStatus.shortfall)} تومان کسری دارید.
              </p>
            )}
            <Link
              href="/profile/wallet"
              className="mt-3 inline-flex text-sm font-medium text-secondary underline-offset-4 hover:underline"
            >
              شارژ کیف پول
            </Link>
          </div>
        ) : null}
      </div>
      <Button
        variant={"primary"}
        size={"medium"}
        className="lg:w-full mt-6 fixed bottom-4 lg:static left-4 right-4 z-20"
        onClick={onSubmit}
        isLoading={isLoading}
        disabled={walletInsufficient}
      >
        تایید و تکمیل سفارش
      </Button>
    </div>
  );
};
