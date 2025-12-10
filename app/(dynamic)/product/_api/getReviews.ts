import { getFetch } from "@/core/publicService";
import { ReviewsResponse } from "@/types/review.type";

export const getReviews = async (id: string): Promise<ReviewsResponse> => {
    return getFetch<ReviewsResponse>(`/products/${id}/reviews`);
}