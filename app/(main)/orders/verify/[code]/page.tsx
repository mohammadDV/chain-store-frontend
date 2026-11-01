import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getOrderByCode } from "../_api/getOrderByCode";
import { OrderDetailsCard } from "../_components/OrderDetailsCard";
import { OrderUnlock } from "../_components/OrderUnlock";

interface PageProps {
  params: Promise<{ code: string }>;
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { code } = await params;
  return {
    title: `مشاهده سفارش ${code}`,
    robots: { index: false, follow: false },
  };
}

export default async function OrderVerifyPage({ params }: PageProps) {
  const { code } = await params;

  if (!/^\d{8,32}$/.test(code)) {
    notFound();
  }

  const order = await getOrderByCode(code);

  if (!order) {
    notFound();
  }

  const unlockRequired = Boolean(
    order.unlock_available ?? order.recipient_unlock_available
  );

  return (
    <div className="max-w-2xl mx-auto mt-8 lg:mt-16 px-4 lg:px-0 mb-16">
      <h1 className="text-xl lg:text-3xl font-bold text-title text-center">
        جزئیات سفارش
      </h1>
      <p className="text-sm text-description text-center mt-2">
        {unlockRequired
          ? "برای مشاهده کامل سفارش، رمز پیک/انبار را وارد کنید"
          : "اطلاعات سفارش بر اساس کد رهگیری فاکتور"}
      </p>

      {unlockRequired ? (
        <OrderUnlock orderCode={order.code} />
      ) : (
        <OrderDetailsCard order={order} />
      )}
    </div>
  );
}
