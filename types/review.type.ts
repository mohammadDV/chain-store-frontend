import { PaginationLink } from "@/app/_components/pagination";
import { UserData, UserInfo } from "./user.type";
import { ProductSummary } from "./product";

export type ReviewStatus = "approved" | "cancelled" | "pending";

export interface ReviewStatistic {
    title: string;
    rate: number;
    count: number;
    percentage: number;
}

export interface Review {
    id: number;
    comment: string;
    rate: number;
    status: ReviewStatus;
    product_id: number;
    user_id: number;
    user: UserInfo;
    likes_count: number | null;
    created_at: string;
}

export interface ReviewsResponse {
    current_page: number;
    data: Review[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}

export interface MyReview {
    id: number;
    comment: string;
    rate: number;
    active: number;
    status: ReviewStatus;
    product_id: number;
    user_id: number;
    created_at: string;
    updated_at: string;
    likes_count: number | null;
    user: UserData;
    product?: ProductSummary;
}

export interface MyReviewsResponse {
    current_page: number;
    data: MyReview[];
    first_page_url: string;
    from: number;
    last_page: number;
    last_page_url: string;
    links: PaginationLink[];
    next_page_url: string | null;
    path: string;
    per_page: number;
    prev_page_url: string | null;
    to: number;
    total: number;
}
