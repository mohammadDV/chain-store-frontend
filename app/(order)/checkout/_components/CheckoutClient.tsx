"use client"

import { useState, useTransition } from "react";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { Order } from "@/types/Order.type";
import { CheckoutForm } from "./CheckoutForm";
import { CheckoutInvoice } from "./CheckoutInvoice";
import { payOrderAction, PaymentMethod } from "../_api/payOrderAction";

type Props = { order: Order };

type FormValues = {
  fullname: string;
  postal_code: string;
  address: string;
  description?: string;
};

export const CheckoutClient = ({ order }: Props) => {
  const router = useRouter();
  const [isPending, startTransition] = useTransition();
  const [formValues, setFormValues] = useState<FormValues>({
    fullname: "",
    postal_code: "",
    address: "",
    description: "",
  });
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("bank");

  const onSubmit = () => {
    if (!formValues.fullname || !formValues.postal_code || !formValues.address) {
      toast.error("اطلاعات صورتحساب را کامل کنید");
      return;
    }
    startTransition(async () => {
      try {
        const res = await payOrderAction(order.id, {
          payment_method: paymentMethod,
          description: formValues.description,
          address: formValues.address,
          fullname: formValues.fullname,
          postal_code: formValues.postal_code,
        });
        if (res.status === 1 && res.url) {
          router.replace(res.url);
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
          order={order}
          paymentMethod={paymentMethod}
          setPaymentMethod={setPaymentMethod}
          onSubmit={onSubmit}
          isLoading={isPending}
        />
      </div>
    </div>
  );
};

