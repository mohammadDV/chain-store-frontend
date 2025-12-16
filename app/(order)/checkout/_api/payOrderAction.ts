"use server"

import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";

export type PaymentMethod = "bank" | "wallet";

export interface PayOrderPayload {
  payment_method: PaymentMethod;
  description?: string;
  address: string;
  fullname: string;
  postal_code: string;
}

export interface PayOrderResponse {
  status: StatusCode;
  message?: string;
  url?: string;
}

export const payOrderAction = async (
  orderId: number,
  payload: PayOrderPayload
): Promise<PayOrderResponse> => {
  try {
    return await postFetchAuth<PayOrderResponse>(`/profile/orders/${orderId}/pay`, payload);
  } catch (error) {
    throw new Error("مشکل در دریافت اطلاعات");
  }
};

