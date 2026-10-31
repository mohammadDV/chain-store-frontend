"use server"

import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";
import { cookies } from "next/headers";
import { redirect, unstable_rethrow } from "next/navigation";

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
  const token = (await cookies()).get("token")?.value;
  if (!token) {
    redirect("/auth/login");
  }

  try {
    return await postFetchAuth<CreateOrderResponse>("/profile/orders", payload);
  } catch (error) {
    unstable_rethrow(error);
    throw new Error("مشکل در دریافت اطلاعات");
  }
};

