import { StatusCode } from "@/constants/enums";

export type ProductColumnType = "rate" | "order" | "view" | "discount" | "reviews" | "amount"

export type ProductSummary = {
    id: number;
    title: string;
    amount: number;
    discount: number;
    image: string | null;
    rate: number;
}

export interface FeaturedProducts {
    status: StatusCode,
    data: ProductSummary[];
}