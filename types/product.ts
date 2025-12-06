import { PaginationLink } from "@/app/_components/pagination";
import { StatusCode } from "@/constants/enums";
import { Category } from "./category.type";
import { Review } from "./review.type";

export type ProductColumnType = "rate" | "order" | "view" | "discount" | "reviews" | "amount";

export type File = {
    id: number;
    path: string;
    type: "image" | "video"
}

export type ProductSummary = {
    id: number;
    title: string;
    amount: number;
    discount: number;
    image: string | null;
    rate: number;
}

export interface Product {
    product: {
        id: number;
        title: string;
        color_id: number;
        brand_id: number;
        amount: number;
        discount: number;
        status: string;
        description: string;
        vip: boolean;
        image: string;
        rate: number;
        reviews_count: number;
        files: File[];
        categories: Category[];
    };
    reviews: Review[];
    related_products: ProductSummary[];
}

export interface FeaturedProducts {
    status: StatusCode,
    data: ProductSummary[];
}

export interface ProductSearchResponse {
    current_page: number;
    data: ProductSummary[];
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