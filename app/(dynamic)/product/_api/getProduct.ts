import { getFetch } from "@/core/publicService";
import { Product } from "@/types/product";

export const getProduct = async (id: string): Promise<Product> => {
    return getFetch<Product>(`/products/${id}`);
}