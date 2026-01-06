import { getFetch } from "@/core/publicService";
import { ReviewsResponse } from "@/types/review.type";

interface GetReviewsParams {
    page?: string | number;
    query?: string;
    column?: string;
}

export const getReviews = async (id: string, params?: GetReviewsParams): Promise<ReviewsResponse> => {
    const searchParams = new URLSearchParams({ count: "6" });
    if (params?.page) searchParams.set("page", params.page.toString());
    if (params?.query) searchParams.set("query", params.query);
    if (params?.column) searchParams.set("column", params.column);

    const queryString = searchParams.toString();
    return getFetch<ReviewsResponse>(`/products/${id}/reviews${queryString ? `?${queryString}` : ""}`);
}
