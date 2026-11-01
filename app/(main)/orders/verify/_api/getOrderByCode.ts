import { getFetch } from "@/core/publicService";

export type PublicOrderStatus =
  | "pending"
  | "paid"
  | "cancelled"
  | "shipped"
  | "delivered"
  | "returned"
  | "refunded"
  | "failed"
  | "expired";

export interface PublicOrderProduct {
  id: number;
  title: string;
  image: string | null;
  code?: string | null;
  count: number;
  amount: string | number;
  status?: string | null;
  color_id: number | null;
  color?: string | null;
  size_id: number | null;
  size?: string | null;
}

export interface PublicOrder {
  code: string;
  product_count?: number;
  amount?: string | number;
  delivery_amount?: string | number;
  discount_amount?: string | number;
  total_amount?: string | number;
  status?: PublicOrderStatus;
  unlock_available?: boolean;
  recipient_unlock_available?: boolean;
  products?: PublicOrderProduct[];
  created_at?: string | null;
}

export interface UnlockedOrderDetails {
  code: string;
  status: PublicOrderStatus;
  product_count: number;
  amount: string | number;
  delivery_amount: string | number;
  discount_amount: string | number;
  total_amount: string | number;
  description: string | null;
  vip: boolean;
  fullname: string | null;
  mobile: string | null;
  address: string | null;
  postal_code: string | null;
  products: PublicOrderProduct[];
  created_at: string | null;
  unlock_token: string;
  unlock_expires_at: number | null;
}

interface PublicOrderResponse {
  status: number;
  data?: PublicOrder;
  message?: string;
}

export async function getOrderByCode(code: string): Promise<PublicOrder | null> {
  try {
    const res = await getFetch<PublicOrderResponse>(
      `/orders/by-code/${encodeURIComponent(code)}`
    );

    if (res?.status === 1 && res.data) {
      return res.data;
    }

    return null;
  } catch {
    return null;
  }
}
