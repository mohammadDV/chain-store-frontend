import { getFetchAuth } from "@/core/privateService";
import type { MyReviewsResponse } from "@/types/review.type";

interface GetMyReviewsParams {
  page?: number;
}

export async function getMyReviews({
  page = 1,
}: GetMyReviewsParams): Promise<MyReviewsResponse> {
  const searchParams = new URLSearchParams({
    page: page.toString(),
  });

  return getFetchAuth<MyReviewsResponse>(
    `/profile/my-reviews?${searchParams.toString()}`
  );
}

