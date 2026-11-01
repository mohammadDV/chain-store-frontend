import { createFileUrl, putCommas } from "@/lib/utils";
import { Badge } from "@/ui/badge";
import { Icon } from "@/ui/icon";
import Image from "next/image";
import type { PublicOrder, PublicOrderProduct, UnlockedOrderDetails } from "../_api/getOrderByCode";
import { getStatusLabel, getStatusVariant } from "./orderStatus";

type OrderView = PublicOrder | UnlockedOrderDetails;

function isUnlocked(order: OrderView): order is UnlockedOrderDetails {
  return (
    "fullname" in order &&
    "mobile" in order &&
    "address" in order &&
    "postal_code" in order
  );
}

function productMeta(product: PublicOrderProduct) {
  return [product.color ? `رنگ: ${product.color}` : null, product.size ? `سایز: ${product.size}` : null, product.code ? `کد: ${product.code}` : null]
    .filter(Boolean)
    .join(" | ");
}

export function OrderDetailsCard({ order }: { order: OrderView }) {
  const goodsAmount = Number(order.amount || 0);
  const discountAmount = Number(order.discount_amount || 0);
  const deliveryAmount = Number(order.delivery_amount || 0);
  const payableAmount = Number(order.total_amount || 0);
  const products = order.products ?? [];
  const unlocked = isUnlocked(order);

  return (
    <div className="mt-8 bg-white border border-border rounded-2xl p-5 lg:p-6">
      <div className="flex items-center justify-between gap-3 flex-wrap">
        <div>
          <p className="text-xs text-description">کد رهگیری</p>
          <p className="text-base font-semibold text-title mt-1 tracking-wide">
            {order.code}
          </p>
        </div>
        {order.status ? (
          <Badge
            variant={getStatusVariant(order.status)}
            className="rounded-full px-3 py-1"
          >
            {getStatusLabel(order.status)}
          </Badge>
        ) : null}
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-3">
        <div className="rounded-xl bg-surface px-4 py-3">
          <p className="text-xs text-description">تاریخ سفارش</p>
          <p className="text-sm font-medium text-title mt-1">
            {order.created_at ?? "—"}
          </p>
        </div>
        <div className="rounded-xl bg-surface px-4 py-3">
          <p className="text-xs text-description">تعداد اقلام</p>
          <p className="text-sm font-medium text-title mt-1">
            {order.product_count ?? products.length}
          </p>
        </div>
        {unlocked && "vip" in order && order.vip ? (
          <div className="rounded-xl bg-surface px-4 py-3 sm:col-span-2">
            <p className="text-xs text-description">نوع سفارش</p>
            <p className="text-sm font-medium text-title mt-1">VIP</p>
          </div>
        ) : null}
      </div>

      {unlocked ? (
        <>
          <hr className="border-t border-dashed border-border my-5" />
          <h2 className="text-sm font-semibold text-title mb-3">اطلاعات گیرنده</h2>
          <div className="flex flex-col gap-3">
            <div className="rounded-xl bg-surface px-4 py-3">
              <p className="text-xs text-description">نام گیرنده</p>
              <p className="text-sm font-medium text-title mt-1">
                {order.fullname || "—"}
              </p>
            </div>
            <div className="rounded-xl bg-surface px-4 py-3">
              <p className="text-xs text-description">موبایل</p>
              <p className="text-sm font-medium text-title mt-1" dir="ltr">
                {order.mobile || "—"}
              </p>
            </div>
            <div className="rounded-xl bg-surface px-4 py-3">
              <p className="text-xs text-description">کدپستی</p>
              <p className="text-sm font-medium text-title mt-1" dir="ltr">
                {order.postal_code || "—"}
              </p>
            </div>
            <div className="rounded-xl bg-surface px-4 py-3">
              <p className="text-xs text-description">آدرس</p>
              <p className="text-sm font-medium text-title mt-1 leading-7">
                {order.address || "—"}
              </p>
            </div>
            {order.description ? (
              <div className="rounded-xl bg-surface px-4 py-3">
                <p className="text-xs text-description">توضیحات سفارش</p>
                <p className="text-sm font-medium text-title mt-1 leading-7">
                  {order.description}
                </p>
              </div>
            ) : null}
          </div>
        </>
      ) : null}

      <hr className="border-t border-dashed border-border my-5" />

      <h2 className="text-sm font-semibold text-title mb-3">اقلام سفارش</h2>
      {products.length === 0 ? (
        <p className="text-sm text-description text-center py-6">
          موردی جهت نمایش وجود ندارد.
        </p>
      ) : (
        <div className="flex flex-col gap-3">
          {products.map((product) => {
            const meta = productMeta(product);
            return (
              <div
                key={`${product.id}-${product.size_id}-${product.color_id}`}
                className="flex items-center gap-3 bg-surface rounded-xl p-3"
              >
                <div className="size-14 rounded-lg overflow-hidden bg-white shrink-0">
                  {product.image ? (
                    <Image
                      src={createFileUrl(product.image)}
                      alt={product.title}
                      width={56}
                      height={56}
                      className="size-14 object-cover"
                    />
                  ) : (
                    <div className="size-14 flex items-center justify-center">
                      <Icon
                        icon="solar--gallery-outline"
                        sizeClass="size-6"
                        className="text-description"
                      />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-title font-medium line-clamp-1">
                    {product.title}
                  </p>
                  <p className="text-xs text-description mt-1">
                    تعداد: {product.count}
                    {product.status ? ` | ${getStatusLabel(product.status)}` : ""}
                  </p>
                  {meta ? (
                    <p className="text-xs text-description mt-1 line-clamp-1">{meta}</p>
                  ) : null}
                </div>
                <div className="shrink-0 text-left">
                  <p className="text-sm font-bold text-secondary">
                    {putCommas(
                      Number(product.amount || 0) * Number(product.count || 0)
                    )}{" "}
                    تومان
                  </p>
                  <p className="text-[11px] text-description mt-0.5">
                    واحد: {putCommas(Number(product.amount || 0))}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      )}

      <hr className="border-t border-dashed border-border my-5" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <p className="text-sm text-description">جمع مبلغ کالاها</p>
          <p className="text-sm font-medium text-title">
            {putCommas(goodsAmount)} تومان
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-description">مبلغ تخفیف</p>
          <p className="text-sm font-medium text-title">
            {putCommas(discountAmount)} تومان
          </p>
        </div>
        <div className="flex items-center justify-between">
          <p className="text-sm text-description">هزینه ارسال</p>
          <p className="text-sm font-medium text-title">
            {deliveryAmount > 0
              ? `${putCommas(deliveryAmount)} تومان`
              : "رایگان"}
          </p>
        </div>
        <div className="flex items-center justify-between pt-2 border-t border-border">
          <p className="text-sm font-semibold text-title">مبلغ قابل پرداخت</p>
          <p className="text-base font-bold text-secondary">
            {putCommas(payableAmount)} تومان
          </p>
        </div>
      </div>
    </div>
  );
}
