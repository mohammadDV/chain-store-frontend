"use server"

import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";
import { unstable_rethrow } from "next/navigation";

export interface CheckDiscountPayload {
  discount_code: string;
}

export interface CheckDiscountResponse {
  status: StatusCode;
  message?: string;
  amount?: string | number;
  total_amount?: string | number;
  discount_amount?: string | number;
  delivery_amount?: string | number;
  discount_id?: number;
}

export const checkDiscountAction = async (
  orderId: number,
  payload: CheckDiscountPayload
): Promise<CheckDiscountResponse> => {
  try {
    return await postFetchAuth<CheckDiscountResponse>(
      `/profile/orders/${orderId}/check-discount`,
      payload
    );
  } catch (error) {
    unstable_rethrow(error);
    throw new Error("مشکل در دریافت اطلاعات");
  }
};

