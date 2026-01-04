"use server";

import { StatusCode } from "@/constants/enums";
import { postFetchAuth } from "@/core/privateService";

export interface PostProductReviewPayload {
  rate: number;
  comment: string;
}

export interface PostProductReviewData {
  id: number;
  comment: string;
  rate: number;
  status: string;
  product_id: number;
  user_id: number;
  likes_count: number | null;
  created_at: string;
}

export interface PostProductReviewResponse {
  status: StatusCode;
  message?: string;
  data?: PostProductReviewData;
  errors?: { [key: string]: string[] };
}

export const postProductReviewAction = async (
  productId: number,
  payload: PostProductReviewPayload
): Promise<PostProductReviewResponse> => {
  try {
    return await postFetchAuth<PostProductReviewResponse>(
      `/profile/reviews/${productId}`,
      payload
    );
  } catch (error) {
    throw new Error("مشکل در ثبت نظر");
  }
};

