"use server"

import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";

export type CreateOrderProduct = {
  id: number;
  count: number;
  size_id: number | null;
};

export interface CreateOrderRequest {
  products: CreateOrderProduct[];
}

export interface CreateOrderResponse {
  status: StatusCode;
  message?: string;
  order?: any;
}

export const createOrderAction = async (
  payload: CreateOrderRequest
): Promise<CreateOrderResponse> => {
  try {
    return await postFetchAuth<CreateOrderResponse>("/profile/orders", payload);
  } catch (error) {
    throw new Error("مشکل در دریافت اطلاعات");
  }
};

