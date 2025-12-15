"use client"

import { create } from "zustand";
import { persist } from "zustand/middleware";
import { Size } from "@/types/product";

export type CartItem = {
  id: number;
  count: number;
  size: Size | null;
  amount: number;
  discount: number;
  image: string | null;
  title: string;
};

type CartState = {
  items: CartItem[];
  addOrUpdateItem: (item: CartItem) => void;
  removeItem: (id: number, size_id: number | null) => void;
  clear: () => void;
};

export const useCartStore = create<CartState>()(
  persist(
    (set, get) => ({
      items: [],
      addOrUpdateItem: (item) => {
        const items = get().items.slice();
        const idx = items.findIndex(
          (it) => it.id === item.id && (it.size?.id ?? null) === (item.size?.id ?? null)
        );
        if (idx >= 0) {
          const current = items[idx];
          const nextCount = Number(current.count) + Number(item.count || 0);
          items[idx] = { ...current, count: nextCount };
        } else {
          items.push(item);
        }
        set({ items });
      },
      removeItem: (id, size_id) => {
        set({
          items: get().items.filter(
            (it) => !(it.id === id && (it.size?.id ?? null) === size_id)
          ),
        });
      },
      clear: () => set({ items: [] }),
    }),
        {
            name: "cart",
            version: 1,
        }
    )
);

