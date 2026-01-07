"use client"

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Order } from "@/types/Order.type";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutInvoice } from "./CheckoutInvoice";
import { payOrderAction, PaymentMethod } from "../_api/payOrderAction";
import { StatusCode } from "@/constants/enums";
import { useCartStore } from "@/stores/cart";

type Props = { order: Order };

type FormValues = {
  fullname: string;
  postal_code: string;
  address: string;
  description?: string;
};

export const CheckoutClient = ({ order }: Props) => {
  const router = useRouter();
  const clearCart = useCartStore((s) => s.clear);

  const [isPending, startTransition] = useTransition();
  const [currentOrder, setCurrentOrder] = useState<Order>(order);
  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    postal_code: "",
    address: "",
    description: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");
  const [appliedDiscountCode, setAppliedDiscountCode] = useState<string | null>(null);

  const onSubmit = () => {
    if (!formValues.fullname || !formValues.postal_code || !formValues.address) {
      toast.error("اطلاعات صورتحساب را کامل کنید");
      return;
    }
    startTransition(async () => {
      try {
        const res = await payOrderAction(order.id, {
          payment_method: paymentMethod,
          discount_code: appliedDiscountCode || undefined,
          description: formValues.description,
          address: formValues.address,
          fullname: formValues.fullname,
          postal_code: formValues.postal_code,
        });
        if (res.status === StatusCode.Success) {
          if (res.url) {
            router.replace(res.url);
          } else {
            toast.error(res?.message || "سفارش با موفقیت ثبت شد!");
            router.replace("/profile/orders");
          }
          clearCart();
        } else {
          toast.error(res?.message || "خطای ناشناخته رخ داده است");
        }
      } catch {
        toast.error("مشکل در پرداخت سفارش");
      }
    });
  };

  return (
    <div className="flex flex-col lg:flex-row justify-between gap-5 lg:gap-10 mt-4 lg:mt-12 container mx-auto px-4 lg:px-0">
      <div className="lg:w-2/3">
        <CheckoutForm onValuesChange={setFormValues} />
      </div>
      <div className="lg:w-1/3">
        <CheckoutInvoice
          order={currentOrder}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onSubmit={onSubmit}
          isLoading={isPending}
          appliedDiscountCode={appliedDiscountCode}
          onDiscountApplied={(payload) => {
            setAppliedDiscountCode(payload.discount_code);
            setCurrentOrder((prev) => ({
              ...prev,
              amount: payload.amount,
              total_amount: payload.total_amount,
              discount_amount: payload.discount_amount,
              delivery_amount: payload.delivery_amount,
            }));
          }}
        />
      </div>
    </div>
  );
};
