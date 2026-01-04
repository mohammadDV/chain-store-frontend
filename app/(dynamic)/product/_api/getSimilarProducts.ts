import { getFetch } from "@/core/publicService";
import { ProductSummary } from "@/types/product";

export const getSimilarProducts = async (id: string): Promise<ProductSummary[]> => {
    return getFetch<ProductSummary[]>(`/products/${id}/similar`);
}