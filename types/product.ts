import { PaginationLink } from "@/app/_components/pagination";
import { StatusCode } from "@/constants/enums";
import { Brand } from "./brand.type";
import { Category } from "./category.type";
import { File } from "./file.type";
import { ReviewStatistic } from "./review.type";

export type ProductColumnType = "rate" | "order" | "view" | "discount" | "reviews" | "amount";

export type Attribute = {
    id: number;
    title: string;
    value: string;
}

export type Size = {
    id: number;
    title: string;
    stock: number;
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
        brand: Brand;
        amount: number;
        discount: number;
        status: string;
        description: string | null;
        details: string | null;
        vip: boolean;
        image: string;
        rate: number;
        reviews_count: number;
        files: File[];
        categories: Category[];
        attributes: Attribute[];
        sizes: Size[];
        is_favorite: boolean;
    };
    reviews: ReviewStatistic[];
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