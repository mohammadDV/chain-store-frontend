"use client";

import { Modal } from "@/app/_components/modal";
import { SlidersHorizontal } from "lucide-react";
import { useState } from "react";
import { ProductsFilters } from "./Filters";

export function MobileFilters() {
  const [open, setOpen] = useState(false);

  return (
    <>
      <button
        type="button"
        className="bg-white border border-surface text-primary size-10 rounded-full flex items-center justify-center"
        aria-label="فیلتر"
        onClick={() => setOpen(true)}
      >
        <SlidersHorizontal className="size-5" />
      </button>

      <Modal
        open={open}
        onOpenChange={setOpen}
        title="فیلتر محصولات"
        showConfirm={false}
        cancelText="مشاهده محصولات"
        onCancel={() => setOpen(false)}
      >
        <ProductsFilters />
      </Modal>
    </>
  );
}

