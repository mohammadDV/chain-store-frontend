"use client";

import Image from "next/image";
import { useState } from "react";
import { createFileUrl, putCommas } from "@/lib/utils";
import { Modal } from "@/app/_components/modal/Modal";
import { Icon } from "@/ui/icon";
import type { OrderProduct } from "@/types/Order.type";

type Props = {
  orderCode: string;
  products: OrderProduct[];
};

export const OrderProductsModal = ({ orderCode, products }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="size-8 rounded-full bg-white border border-border cursor-pointer flex items-center justify-center hover:border-secondary/50 transition-colors"
        onClick={() => setOpen(true)}
      >
        <Icon icon="solar--eye-bold" sizeClass="size-5" className="text-secondary" />
      </button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title={`محصولات سفارش ${orderCode}`}
        showConfirm={false}
        cancelText="بستن"
        cancelVariant="outline"
      >
        {products.length === 0 ? (
          <p className="text-sm text-description text-center py-6">موردی جهت نمایش وجود ندارد.</p>
        ) : (
          <div className="flex flex-col gap-3">
            {products.map((p) => (
              <div
                key={`${p.id}-${p.size_id}-${p.color_id}`}
                className="flex items-center gap-3 bg-surface rounded-xl p-3"
              >
                <div className="size-14 rounded-lg overflow-hidden bg-white shrink-0">
                  {p.image ? (
                    <Image
                      src={createFileUrl(p.image)}
                      alt={p.title}
                      width={56}
                      height={56}
                      className="size-14 object-cover"
                    />
                  ) : (
                    <div className="size-14 flex items-center justify-center">
                      <Icon icon="solar--gallery-outline" sizeClass="size-6" className="text-description" />
                    </div>
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm text-title font-medium line-clamp-1">{p.title}</p>
                  <p className="text-xs text-description mt-1">تعداد: {p.count}</p>
                </div>
                <div className="shrink-0 text-left">
                  <p className="text-sm font-bold text-secondary">
                    {putCommas(Number(p.amount || 0))} تومان
                  </p>
                </div>
              </div>
            ))}
          </div>
        )}
      </Modal>
    </>
  );
};
